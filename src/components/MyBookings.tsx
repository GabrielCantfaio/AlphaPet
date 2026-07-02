import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, Clock, CheckCircle2, AlertCircle, Trash2, 
  ChevronDown, ChevronUp, FileText, PawPrint, ExternalLink, 
  ShieldAlert, Sparkles, Phone, User, MessageSquareCode
} from 'lucide-react';
import { Booking, BookingTier } from '../types';

interface MyBookingsProps {
  bookings: Booking[];
  onCancelBooking: (id: string) => void;
  onNavigateToBooking: () => void;
}

export default function MyBookings({ bookings, onCancelBooking, onNavigateToBooking }: MyBookingsProps) {
  const [expandedBookingId, setExpandedBookingId] = useState<string | null>(null);
  const [confirmCancelId, setConfirmCancelId] = useState<string | null>(null);

  const getTierLabel = (tier: BookingTier) => {
    switch(tier) {
      case 'classic': return 'Banho Clássico';
      case 'hygienic': return 'Tosa Higiênica';
      case 'complete': return 'Banho & Tosa Completa';
    }
  };

  const toggleExpand = (id: string) => {
    if (expandedBookingId === id) {
      setExpandedBookingId(null);
    } else {
      setExpandedBookingId(id);
    }
  };

  const handleCancelRequest = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setConfirmCancelId(id);
  };

  const confirmCancel = () => {
    if (confirmCancelId) {
      onCancelBooking(confirmCancelId);
      setConfirmCancelId(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      
      {/* Title */}
      <div className="mb-10 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-primary tracking-tight">
            Meus Agendamentos
          </h2>
          <p className="text-brand-on-surface-variant text-sm mt-1">
            Consulte seus horários marcados, status e faça cancelamentos ou alterações
          </p>
        </div>
        
        {bookings.length > 0 && (
          <button 
            onClick={onNavigateToBooking}
            className="bg-primary hover:bg-primary-container text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all active:scale-95"
          >
            Novo Agendamento
          </button>
        )}
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {confirmCancelId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white p-6 sm:p-8 rounded-2xl max-w-md w-full shadow-2xl border border-red-100"
            >
              <div className="flex gap-4 items-start">
                <div className="bg-red-100 p-3 rounded-full text-red-600 shrink-0">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-brand-on-surface">
                    Deseja cancelar o agendamento?
                  </h3>
                  <p className="text-sm text-brand-on-surface-variant/90 mt-2 leading-relaxed">
                    Esta ação é irreversível. O horário voltará a ficar disponível na agenda do salão para outros pets.
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-8">
                <button
                  onClick={() => setConfirmCancelId(null)}
                  className="px-4 py-2.5 rounded-xl bg-brand-surface-low hover:bg-brand-surface-low/80 text-brand-on-surface-variant font-semibold text-sm transition-colors"
                >
                  Manter Ativo
                </button>
                <button
                  onClick={confirmCancel}
                  className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition-colors shadow-sm"
                >
                  Confirmar Cancelamento
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bookings List */}
      {bookings.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center bg-white rounded-2xl p-12 shadow-[0_4px_30px_rgba(42,123,191,0.04)] border border-brand-outline-variant/10 max-w-xl mx-auto"
        >
          <div className="bg-primary-fixed/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <PawPrint className="w-8 h-8 text-primary fill-primary" />
          </div>
          <h3 className="font-display font-extrabold text-xl text-brand-on-surface mb-2">
            Nenhum agendamento encontrado
          </h3>
          <p className="text-brand-on-surface-variant text-sm max-w-xs mx-auto mb-8 leading-relaxed">
            Seu pet está precisando de um banho caprichado ou tosa estilosa? Agende um horário agora mesmo!
          </p>
          <button
            onClick={onNavigateToBooking}
            className="bg-secondary-container hover:bg-secondary-container/95 text-on-secondary-container px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-md transition-all active:scale-[0.98]"
          >
            Agendar Primeiro Horário
          </button>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => {
            const isExpanded = expandedBookingId === booking.id;
            const isCanceled = booking.status === 'Cancelado';

            return (
              <motion.div 
                key={booking.id}
                layout
                className={`bg-white rounded-2xl shadow-[0_4px_15px_rgba(42,123,191,0.03)] border transition-all overflow-hidden ${
                  isCanceled
                    ? 'border-brand-outline-variant/30 opacity-75'
                    : isExpanded 
                      ? 'border-primary shadow-md'
                      : 'border-brand-outline-variant/15 hover:border-brand-outline-variant/40'
                }`}
              >
                
                {/* Main Row / Header of Card */}
                <div 
                  onClick={() => toggleExpand(booking.id)}
                  className="p-5 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 cursor-pointer select-none"
                >
                  
                  <div className="flex gap-4 items-center">
                    <div className={`p-3 rounded-xl shrink-0 ${
                      isCanceled 
                        ? 'bg-gray-100 text-gray-500' 
                        : 'bg-primary-fixed/40 text-primary'
                    }`}>
                      <PawPrint className="w-6 h-6 fill-current" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display font-extrabold text-brand-on-surface text-base sm:text-lg">
                          {booking.petName}
                        </span>
                        <span className="text-xs text-brand-on-surface-variant/60">
                          ({booking.petType} - {booking.size})
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-brand-on-surface-variant mt-1.5 font-medium">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-primary shrink-0" />
                          {booking.date.split('-').reverse().join('/')}
                        </span>
                        <span className="hidden sm:inline text-brand-outline-variant">•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
                          {booking.time}h
                        </span>
                        <span className="hidden sm:inline text-brand-outline-variant">•</span>
                        <span className="text-brand-on-surface font-semibold bg-brand-surface-low px-2 py-0.5 rounded-full text-[10px]">
                          {getTierLabel(booking.tier)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Price & Expand Indicator */}
                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 pt-4 sm:pt-0 border-t sm:border-t-0 border-brand-surface-low">
                    <div className="text-left sm:text-right">
                      <span className="text-[10px] text-brand-on-surface-variant/50 uppercase font-bold tracking-wider block">
                        Valor Total
                      </span>
                      <span className="font-display font-black text-lg text-secondary">
                        R$ {booking.totalPrice}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full ${
                        isCanceled 
                          ? 'bg-red-50 text-red-600' 
                          : 'bg-green-50 text-green-600'
                      }`}>
                        {booking.status}
                      </span>
                      {isExpanded ? <ChevronUp className="w-5 h-5 text-brand-on-surface-variant" /> : <ChevronDown className="w-5 h-5 text-brand-on-surface-variant" />}
                    </div>
                  </div>

                </div>

                {/* Expanded Details section */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      className="border-t border-brand-surface-low bg-brand-surface-low/10 overflow-hidden"
                    >
                      <div className="p-5 sm:p-6 space-y-6 text-sm">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          
                          {/* Left Column: Pet details & contact */}
                          <div className="space-y-3.5">
                            <span className="font-display font-bold text-xs uppercase tracking-wider text-primary block">
                              Dados da Ficha
                            </span>
                            <div className="space-y-2.5 bg-white p-4 rounded-xl border border-brand-outline-variant/15">
                              <div className="flex items-center gap-2 text-brand-on-surface-variant">
                                <User className="w-4 h-4 text-primary" />
                                <span className="font-semibold text-brand-on-surface">{booking.customerName}</span>
                                <span className="text-xs text-brand-on-surface-variant/70">(Tutor)</span>
                              </div>
                              <div className="flex items-center gap-2 text-brand-on-surface-variant">
                                <Phone className="w-4 h-4 text-primary" />
                                <span className="font-medium text-brand-on-surface">{booking.customerPhone}</span>
                              </div>
                              {booking.notes && (
                                <div className="flex gap-2 text-brand-on-surface-variant border-t border-brand-surface-low pt-2.5 mt-2 text-xs">
                                  <FileText className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                                  <p className="italic leading-relaxed">
                                    &ldquo;{booking.notes}&rdquo;
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Right Column: Receipt Breakdown */}
                          <div className="space-y-3.5">
                            <span className="font-display font-bold text-xs uppercase tracking-wider text-primary block">
                              Detalhamento do Preço
                            </span>
                            <div className="space-y-2 bg-white p-4 rounded-xl border border-brand-outline-variant/15">
                              <div className="flex justify-between">
                                <span className="text-brand-on-surface-variant">{getTierLabel(booking.tier)} ({booking.size})</span>
                                <span className="font-semibold">R$ {booking.totalPrice - (booking.extras.length > 0 ? booking.extras.reduce((sum, eId) => sum + (eId === 'hydration' ? 35 : eId === 'dental' ? 20 : eId === 'ear-deep' ? 15 : 40), 0) : 0)}</span>
                              </div>
                              {booking.extras.map((extraId) => {
                                const extraPrice = extraId === 'hydration' ? 35 : extraId === 'dental' ? 20 : extraId === 'ear-deep' ? 15 : 40;
                                const extraName = extraId === 'hydration' ? 'Hidratação Coco & Argan' : extraId === 'dental' ? 'Escovação de Dentes' : extraId === 'ear-deep' ? 'Limpeza de Ouvidos Profunda' : 'Banho Antipulgas';
                                return (
                                  <div key={extraId} className="flex justify-between text-xs text-brand-on-surface-variant/95">
                                    <span>+ {extraName}</span>
                                    <span>R$ {extraPrice}</span>
                                  </div>
                                );
                              })}
                              <div className="border-t border-brand-surface-low pt-2 mt-2 flex justify-between font-extrabold text-brand-on-surface">
                                <span>Total Geral</span>
                                <span className="text-secondary text-base">R$ {booking.totalPrice}</span>
                              </div>
                            </div>
                          </div>

                        </div>

                        {/* Actions Inside Card */}
                        {!isCanceled && (
                          <div className="flex justify-between items-center pt-4 border-t border-brand-surface-low">
                            <span className="text-[11px] text-brand-on-surface-variant/60">
                              Agendado em: {new Date(booking.createdAt).toLocaleString('pt-BR')}
                            </span>
                            <button
                              onClick={(e) => handleCancelRequest(e, booking.id)}
                              className="text-red-600 hover:text-red-700 font-semibold text-xs flex items-center gap-1.5 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Cancelar Horário
                            </button>
                          </div>
                        )}

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
