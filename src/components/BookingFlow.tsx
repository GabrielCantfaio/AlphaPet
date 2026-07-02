import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, Clock, User, Phone, CheckCircle, ArrowLeft, 
  Sparkles, ShieldCheck, Heart, ArrowRight, Dog, Cat, 
  HelpCircle, ChevronRight, CheckCircle2, Ticket, Sparkle 
} from 'lucide-react';
import { Booking, BookingTier, PetSize, ExtraService } from '../types';

interface BookingFlowProps {
  initialTier: BookingTier;
  customerName: string | null;
  customerPhone: string;
  onBookingComplete: (booking: Booking) => void;
  onCancel: () => void;
}

const EXTRA_SERVICES: ExtraService[] = [
  { id: 'hydration', name: 'Hidratação de Coco & Argan', description: 'Pelagem revitalizada, incrivelmente macia e perfumada.', price: 35 },
  { id: 'dental', name: 'Escovação de Dentes', description: 'Prevenção de tártaro e hálito fresco com escova individual.', price: 20 },
  { id: 'ear-deep', name: 'Limpeza de Ouvidos Profunda', description: 'Higienização aprofundada com loção antisséptica preventiva.', price: 15 },
  { id: 'flea', name: 'Banho Antipulgas Preventivo', description: 'Shampoo especial com ativos protetores contra parasitas.', price: 40 },
];

export default function BookingFlow({
  initialTier,
  customerName,
  customerPhone,
  onBookingComplete,
  onCancel,
}: BookingFlowProps) {
  // Step: 1 (Pet Info), 2 (Plan & Extras), 3 (Date & Time), 4 (Contact), 5 (Summary)
  const [step, setStep] = useState(1);
  const [petType, setPetType] = useState<'Cachorro' | 'Gato'>('Cachorro');
  const [petSize, setPetSize] = useState<PetSize>('Médio');
  const [tier, setTier] = useState<BookingTier>(initialTier);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [petName, setPetName] = useState('');
  const [petBreed, setPetBreed] = useState('');
  
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  
  const [name, setName] = useState(customerName || '');
  const [phone, setPhone] = useState(customerPhone || '');
  const [notes, setNotes] = useState('');

  // Auto-fill form values if login changes
  useEffect(() => {
    if (customerName && !name) {
      setName(customerName);
    }
  }, [customerName]);

  // Calculate pricing
  const getBasePrice = (currentSize: PetSize, currentTier: BookingTier) => {
    if (currentTier === 'classic') {
      if (currentSize === 'Pequeno') return 80;
      if (currentSize === 'Médio') return 100;
      return 145;
    } else if (currentTier === 'hygienic') {
      if (currentSize === 'Pequeno') return 100;
      if (currentSize === 'Médio') return 140;
      return 190;
    } else { // complete
      if (currentSize === 'Pequeno') return 150;
      if (currentSize === 'Médio') return 200;
      return 280;
    }
  };

  const basePrice = getBasePrice(petSize, tier);
  const extrasPrice = selectedExtras.reduce((sum, extraId) => {
    const service = EXTRA_SERVICES.find(s => s.id === extraId);
    return sum + (service ? service.price : 0);
  }, 0);
  const totalPrice = basePrice + extrasPrice;

  // Generate tomorrow and some dates
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 10; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      
      // Skip sundays unless requested, but let's keep them
      const dayName = nextDate.toLocaleDateString('pt-BR', { weekday: 'short' });
      const dayNum = nextDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
      const rawDate = nextDate.toISOString().split('T')[0];
      
      dates.push({
        raw: rawDate,
        dayName: dayName.replace('.', '').toUpperCase(),
        dayNum: dayNum
      });
    }
    return dates;
  };

  const availableTimes = [
    '08:00', '09:30', '11:00', '13:00', '14:30', '16:00', '17:30', '19:00'
  ];

  const toggleExtra = (id: string) => {
    if (selectedExtras.includes(id)) {
      setSelectedExtras(selectedExtras.filter(item => item !== id));
    } else {
      setSelectedExtras([...selectedExtras, id]);
    }
  };

  const handleSubmit = () => {
    if (!petName.trim() || !date || !time || !name.trim() || !phone.trim()) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const bookingId = `PP-${Math.floor(10000 + Math.random() * 90000)}`;
    const newBooking: Booking = {
      id: bookingId,
      petName,
      petType,
      size: petSize,
      tier,
      extras: selectedExtras,
      date,
      time,
      customerName: name,
      customerPhone: phone,
      status: 'Confirmado', // Real-time direct booking
      totalPrice,
      notes: notes.trim() || undefined,
      createdAt: new Date().toISOString()
    };

    onBookingComplete(newBooking);
  };

  const getTierLabel = (t: BookingTier) => {
    switch(t) {
      case 'classic': return 'Banho Clássico';
      case 'hygienic': return 'Tosa Higiênica';
      case 'complete': return 'Banho & Tosa Completa';
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      
      {/* Header Info & Progress Bar */}
      <div className="mb-10 text-center relative">
        <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-primary tracking-tight">
          Agendamento de Estética
        </h2>
        <p className="text-brand-on-surface-variant text-sm mt-1">
          Finalize seu agendamento em poucos cliques
        </p>

        {/* Progress steps indicators */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-4 mt-8 max-w-lg mx-auto">
          {[1, 2, 3, 4].map((s) => (
            <React.Fragment key={s}>
              <div className="flex items-center gap-1.5">
                <div 
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    step >= s 
                      ? 'bg-primary text-white shadow-sm' 
                      : 'bg-brand-surface-low text-brand-on-surface-variant/50 border border-brand-outline-variant/20'
                  }`}
                >
                  {s}
                </div>
                <span className={`hidden sm:inline text-xs font-semibold ${step >= s ? 'text-primary' : 'text-brand-on-surface-variant/50'}`}>
                  {s === 1 && 'Pet'}
                  {s === 2 && 'Serviço'}
                  {s === 3 && 'Data & Hora'}
                  {s === 4 && 'Revisão'}
                </span>
              </div>
              {s < 4 && (
                <div className={`h-0.5 flex-1 max-w-[50px] transition-all ${step > s ? 'bg-primary' : 'bg-brand-surface-low'}`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-[0_4px_30px_rgba(42,123,191,0.06)] border border-brand-outline-variant/10">
        
        <AnimatePresence mode="wait">
          
          {/* STEP 1: PET INFORMATION */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-8"
            >
              <div>
                <h3 className="font-display text-lg font-bold text-brand-on-surface mb-1">
                  1. Sobre seu querido pet
                </h3>
                <p className="text-xs text-brand-on-surface-variant/70">
                  Diga-nos o tipo, tamanho e nome para personalizarmos os cuidados.
                </p>
              </div>

              {/* Pet Type Selector (Clickable Selection Cards) */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-brand-on-surface">
                  Tipo de Pet
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setPetType('Cachorro')}
                    className={`p-6 rounded-xl border-2 flex flex-col items-center justify-center gap-3 transition-all ${
                      petType === 'Cachorro'
                        ? 'border-primary bg-primary-fixed/20 text-primary font-bold'
                        : 'border-brand-surface-low hover:border-brand-outline-variant/50 hover:bg-brand-surface-low/20 text-brand-on-surface-variant'
                    }`}
                  >
                    <Dog className={`w-10 h-10 ${petType === 'Cachorro' ? 'text-primary' : 'text-brand-on-surface-variant/70'}`} />
                    <span className="text-sm font-medium">Cachorro</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPetType('Gato')}
                    className={`p-6 rounded-xl border-2 flex flex-col items-center justify-center gap-3 transition-all ${
                      petType === 'Gato'
                        ? 'border-primary bg-primary-fixed/20 text-primary font-bold'
                        : 'border-brand-surface-low hover:border-brand-outline-variant/50 hover:bg-brand-surface-low/20 text-brand-on-surface-variant'
                    }`}
                  >
                    <Cat className={`w-10 h-10 ${petType === 'Gato' ? 'text-primary' : 'text-brand-on-surface-variant/70'}`} />
                    <span className="text-sm font-medium">Gato</span>
                  </button>
                </div>
              </div>

              {/* Pet Size */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-brand-on-surface">
                  Porte do Pet
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['Pequeno', 'Médio', 'Grande'] as PetSize[]).map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setPetSize(size)}
                      className={`py-3.5 px-2 rounded-xl border-2 text-center transition-all ${
                        petSize === size
                          ? 'border-primary bg-primary-fixed/20 text-primary font-bold'
                          : 'border-brand-surface-low hover:border-brand-outline-variant/50 text-brand-on-surface-variant text-sm font-medium'
                      }`}
                    >
                      <span className="block text-sm sm:text-base">{size}</span>
                      <span className="text-[10px] text-brand-on-surface-variant/60 block mt-0.5">
                        {size === 'Pequeno' && 'Até 10kg'}
                        {size === 'Médio' && '10kg a 25kg'}
                        {size === 'Grande' && 'Acima de 25kg'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Pet Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="petName" className="block text-sm font-semibold text-brand-on-surface">
                    Nome do Pet *
                  </label>
                  <input
                    id="petName"
                    type="text"
                    required
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                    placeholder="Ex: Pipoca"
                    className="w-full px-4 py-3 rounded-xl border border-brand-outline-variant hover:border-primary-container focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none text-sm transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="petBreed" className="block text-sm font-semibold text-brand-on-surface">
                    Raça (Opcional)
                  </label>
                  <input
                    id="petBreed"
                    type="text"
                    value={petBreed}
                    onChange={(e) => setPetBreed(e.target.value)}
                    placeholder="Ex: Golden, Srd, Persian"
                    className="w-full px-4 py-3 rounded-xl border border-brand-outline-variant hover:border-primary-container focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none text-sm transition-all"
                  />
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex justify-between items-center pt-6 border-t border-brand-surface-low mt-8">
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-5 py-3 rounded-xl hover:bg-brand-surface-low font-semibold text-brand-on-surface-variant transition-colors text-sm"
                >
                  Voltar
                </button>
                <button
                  type="button"
                  disabled={!petName.trim()}
                  onClick={() => setStep(2)}
                  className={`px-6 py-3.5 rounded-xl font-bold font-sans text-sm flex items-center gap-2 transition-all shadow-md ${
                    petName.trim()
                      ? 'bg-primary text-white hover:bg-primary-container'
                      : 'bg-brand-surface-low text-brand-on-surface-variant/40 cursor-not-allowed shadow-none'
                  }`}
                >
                  <span>Próximo Passo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: PLANS & EXTRAS */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-8"
            >
              <div>
                <h3 className="font-display text-lg font-bold text-brand-on-surface mb-1">
                  2. Seleção de Plano &amp; Mimos Adicionais
                </h3>
                <p className="text-xs text-brand-on-surface-variant/70">
                  Valores ajustados automaticamente para o porte <strong className="text-primary font-semibold">{petSize}</strong>.
                </p>
              </div>

              {/* Tiers List (interactive block) */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-brand-on-surface">
                  Plano Principal
                </label>
                {(['classic', 'hygienic', 'complete'] as BookingTier[]).map((t) => (
                  <label
                    key={t}
                    className={`block cursor-pointer border-2 rounded-xl p-4 transition-all duration-200 ${
                      tier === t 
                        ? 'border-primary bg-primary-fixed/25 shadow-sm font-semibold' 
                        : 'border-brand-surface-low hover:border-primary-container bg-brand-surface-low/20'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="booking-tier" 
                      checked={tier === t}
                      onChange={() => setTier(t)}
                      className="sr-only" 
                    />
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-display font-bold text-brand-on-surface text-sm sm:text-base">
                          {getTierLabel(t)}
                        </span>
                        <p className="text-xs text-brand-on-surface-variant/80 mt-1">
                          {t === 'classic' && 'Higiene básica essencial, corte de unhas e limpeza de ouvidos.'}
                          {t === 'hygienic' && 'Banho completo + aparo higiênico de pelos (barriga, patas e focinho).'}
                          {t === 'complete' && 'Tosa completa da raça (tesoura/máquina) + hidratação premium.'}
                        </p>
                      </div>
                      <span className="text-primary font-extrabold text-base sm:text-lg shrink-0 ml-4">
                        R$ {getBasePrice(petSize, t)}
                      </span>
                    </div>
                  </label>
                ))}
              </div>

              {/* Extra Custom Services */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-brand-on-surface">
                  Quer adicionar algum mimo? (Opcionais)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {EXTRA_SERVICES.map((extra) => {
                    const isSelected = selectedExtras.includes(extra.id);
                    return (
                      <button
                        key={extra.id}
                        type="button"
                        onClick={() => toggleExtra(extra.id)}
                        className={`p-4 rounded-xl border-2 text-left transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'border-primary bg-primary-fixed/15 text-primary'
                            : 'border-brand-surface-low hover:border-brand-outline-variant/40 bg-brand-surface-low/10'
                        }`}
                      >
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <span className="font-display font-bold text-brand-on-surface text-xs sm:text-sm">
                              {extra.name}
                            </span>
                            <span className="font-semibold text-primary text-xs shrink-0 bg-primary-fixed/30 px-2 py-0.5 rounded-full">
                              +R$ {extra.price}
                            </span>
                          </div>
                          <p className="text-[11px] text-brand-on-surface-variant/80 mt-1.5 leading-snug">
                            {extra.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Real-time Subtotal */}
              <div className="bg-brand-surface-low/50 p-4 rounded-xl flex justify-between items-center">
                <span className="text-xs text-brand-on-surface-variant font-medium">Subtotal calculado:</span>
                <span className="font-display font-extrabold text-lg text-primary">R$ {totalPrice}</span>
              </div>

              {/* Actions Footer */}
              <div className="flex justify-between items-center pt-6 border-t border-brand-surface-low mt-8">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-3 rounded-xl hover:bg-brand-surface-low font-semibold text-brand-on-surface-variant transition-colors text-sm flex items-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Voltar</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="bg-primary hover:bg-primary-container text-white px-6 py-3.5 rounded-xl font-bold font-sans text-sm flex items-center gap-2 transition-all shadow-md"
                >
                  <span>Avançar</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: DATE & TIME SELECTOR */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-8"
            >
              <div>
                <h3 className="font-display text-lg font-bold text-brand-on-surface mb-1">
                  3. Escolha uma data e horário
                </h3>
                <p className="text-xs text-brand-on-surface-variant/70">
                  Selecione o melhor dia e período para trazer seu bichinho.
                </p>
              </div>

              {/* Date Cards */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-brand-on-surface">
                  Dia da Visita *
                </label>
                <div className="flex gap-2.5 overflow-x-auto pb-3 snap-x scrollbar-thin">
                  {getAvailableDates().map((d) => (
                    <button
                      key={d.raw}
                      type="button"
                      onClick={() => setDate(d.raw)}
                      className={`flex flex-col items-center justify-center p-3.5 rounded-xl border-2 min-w-[76px] snap-center shrink-0 transition-all ${
                        date === d.raw
                          ? 'border-primary bg-primary text-white font-bold scale-[1.03] shadow-md'
                          : 'border-brand-surface-low bg-white hover:border-brand-outline-variant/60 text-brand-on-surface-variant'
                      }`}
                    >
                      <span className={`text-[10px] uppercase font-bold tracking-wider ${date === d.raw ? 'text-white/80' : 'text-brand-on-surface-variant/60'}`}>
                        {d.dayName}
                      </span>
                      <span className="text-lg font-extrabold font-display leading-tight mt-1">
                        {d.dayNum.split('/')[0]}
                      </span>
                      <span className={`text-[9px] mt-0.5 ${date === d.raw ? 'text-white/70' : 'text-brand-on-surface-variant/50'}`}>
                        {d.dayNum.split('/')[1] === '07' ? 'Julho' : 'Agosto'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-brand-on-surface">
                  Horário Disponível *
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3.5">
                  {availableTimes.map((t) => (
                    <button
                      key={t}
                      type="button"
                      disabled={!date}
                      onClick={() => setTime(t)}
                      className={`py-3 rounded-xl border-2 text-center text-sm font-semibold transition-all ${
                        !date 
                          ? 'bg-brand-surface-low/40 border-transparent text-brand-on-surface-variant/20 cursor-not-allowed'
                          : time === t
                            ? 'border-primary bg-primary-fixed/35 text-primary font-bold shadow-sm'
                            : 'border-brand-surface-low bg-white hover:border-brand-outline-variant/60 text-brand-on-surface-variant'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                {!date && (
                  <p className="text-[11px] text-orange-600 font-medium">
                    * Selecione primeiro um dia da visita para carregar os horários.
                  </p>
                )}
              </div>

              {/* Actions Footer */}
              <div className="flex justify-between items-center pt-6 border-t border-brand-surface-low mt-8">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-3 rounded-xl hover:bg-brand-surface-low font-semibold text-brand-on-surface-variant transition-colors text-sm flex items-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Voltar</span>
                </button>
                <button
                  type="button"
                  disabled={!date || !time}
                  onClick={() => setStep(4)}
                  className={`px-6 py-3.5 rounded-xl font-bold font-sans text-sm flex items-center gap-2 transition-all shadow-md ${
                    date && time
                      ? 'bg-primary text-white hover:bg-primary-container'
                      : 'bg-brand-surface-low text-brand-on-surface-variant/40 cursor-not-allowed shadow-none'
                  }`}
                >
                  <span>Avançar</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: CONTACT & FINAL CONFIRMATION */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-8"
            >
              <div>
                <h3 className="font-display text-lg font-bold text-brand-on-surface mb-1">
                  4. Informações de Contato &amp; Revisão
                </h3>
                <p className="text-xs text-brand-on-surface-variant/70">
                  Preencha seus dados para receber o comprovante e lembretes de visita.
                </p>
              </div>

              {/* Contact Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="custName" className="block text-sm font-semibold text-brand-on-surface">
                    Seu Nome *
                  </label>
                  <input
                    id="custName"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Gabriel Cantafio"
                    className="w-full px-4 py-3 rounded-xl border border-brand-outline-variant hover:border-primary-container focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none text-sm transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="custPhone" className="block text-sm font-semibold text-brand-on-surface">
                    Seu Telefone / WhatsApp *
                  </label>
                  <input
                    id="custPhone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Ex: (11) 99999-8888"
                    className="w-full px-4 py-3 rounded-xl border border-brand-outline-variant hover:border-primary-container focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none text-sm transition-all"
                  />
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <label htmlFor="notes" className="block text-sm font-semibold text-brand-on-surface">
                  Alguma recomendação especial? (Opcional)
                </label>
                <textarea
                  id="notes"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ex: Ele tem medo de soprador forte, por favor usar toalhas extras. Tem alergia a talco."
                  className="w-full px-4 py-3 rounded-xl border border-brand-outline-variant hover:border-primary-container focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none text-sm transition-all resize-none"
                />
              </div>

              {/* Mini Summary Receipt */}
              <div className="bg-brand-surface-low/40 p-5 rounded-2xl border border-brand-outline-variant/15 space-y-4">
                <span className="font-display font-bold text-xs uppercase tracking-wider text-primary block">
                  Resumo do Agendamento
                </span>

                <div className="grid grid-cols-2 gap-y-2.5 text-sm">
                  <div className="text-brand-on-surface-variant/80 font-medium">Pet:</div>
                  <div className="text-brand-on-surface font-semibold text-right">
                    {petName} ({petType} - {petBreed || petSize})
                  </div>

                  <div className="text-brand-on-surface-variant/80 font-medium">Serviço:</div>
                  <div className="text-brand-on-surface font-semibold text-right">
                    {getTierLabel(tier)} ({petSize})
                  </div>

                  {selectedExtras.length > 0 && (
                    <>
                      <div className="text-brand-on-surface-variant/80 font-medium">Mimos Extras:</div>
                      <div className="text-brand-on-surface font-semibold text-right text-xs">
                        {selectedExtras.map(id => EXTRA_SERVICES.find(e => e.id === id)?.name).join(', ')}
                      </div>
                    </>
                  )}

                  <div className="text-brand-on-surface-variant/80 font-medium">Data &amp; Hora:</div>
                  <div className="text-brand-on-surface font-semibold text-right text-primary">
                    {date.split('-').reverse().join('/')} às {time}
                  </div>
                </div>

                <div className="border-t border-brand-outline-variant/20 pt-4 flex justify-between items-center">
                  <span className="font-display font-extrabold text-brand-on-surface">Total Geral:</span>
                  <span className="font-display font-black text-xl text-secondary">R$ {totalPrice}</span>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex justify-between items-center pt-6 border-t border-brand-surface-low mt-8">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-5 py-3 rounded-xl hover:bg-brand-surface-low font-semibold text-brand-on-surface-variant transition-colors text-sm flex items-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Voltar</span>
                </button>
                <button
                  type="button"
                  disabled={!name.trim() || !phone.trim()}
                  onClick={handleSubmit}
                  className={`px-8 py-4 rounded-xl font-bold font-sans text-sm sm:text-base flex items-center gap-2 transition-all shadow-md ${
                    name.trim() && phone.trim()
                      ? 'bg-secondary-container hover:bg-secondary-container/90 text-on-secondary-container'
                      : 'bg-brand-surface-low text-brand-on-surface-variant/40 cursor-not-allowed shadow-none'
                  }`}
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Finalizar Reserva</span>
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </div>
  );
}
