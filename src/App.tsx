import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, AlertCircle, PawPrint, LogIn, 
  X, Calendar, Clock, Smile, User, Phone, Mail, ArrowRight
} from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import GroomingLanding from './components/GroomingLanding';
import BookingFlow from './components/BookingFlow';
import MyBookings from './components/MyBookings';
import StoreMock from './components/StoreMock';
import { Booking, BookingTier, ActiveTab } from './types';

// Pre-filled booking to make the app look alive immediately
const getTomorrowDateString = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
};

const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'PP-48201',
    petName: 'Pipoca',
    petType: 'Cachorro',
    size: 'Pequeno',
    tier: 'complete',
    extras: ['hydration', 'dental'],
    date: getTomorrowDateString(),
    time: '14:30',
    customerName: 'Gabriel Cantafio',
    customerPhone: '(11) 99999-1234',
    status: 'Confirmado',
    totalPrice: 205, // 150 + 35 + 20
    notes: 'Tem alergia a shampoos comuns, usar a linha hipoalergênica especial.',
    createdAt: new Date().toISOString()
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('services');
  const [cartCount, setCartCount] = useState<number>(0);
  const [userName, setUserName] = useState<string | null>('Gabriel Cantafio');
  const [userPhone, setUserPhone] = useState<string>('(11) 99999-1234');
  const [userEmail, setUserEmail] = useState<string>('gabrielcantafio1@gmail.com');
  
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('pawspalms_bookings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_BOOKINGS;
  });

  const [selectedBookingTier, setSelectedBookingTier] = useState<BookingTier>('classic');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [showBookingSuccess, setShowBookingSuccess] = useState<Booking | null>(null);

  // Form states for login modal
  const [loginName, setLoginName] = useState('Gabriel Cantafio');
  const [loginEmail, setLoginEmail] = useState('gabrielcantafio1@gmail.com');
  const [loginPhone, setLoginPhone] = useState('(11) 99999-1234');

  // Save bookings to localStorage
  useEffect(() => {
    localStorage.setItem('pawspalms_bookings', JSON.stringify(bookings));
  }, [bookings]);

  const handleStartBooking = (tier: BookingTier) => {
    setSelectedBookingTier(tier);
    setActiveTab('booking');
  };

  const handleBookingComplete = (newBooking: Booking) => {
    setBookings([newBooking, ...bookings]);
    setShowBookingSuccess(newBooking);
    setActiveTab('my-bookings');
  };

  const handleCancelBooking = (id: string) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: 'Cancelado' as const } : b));
  };

  const handleLoginToggle = () => {
    if (userName) {
      // Logout
      setUserName(null);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginName.trim()) {
      setUserName(loginName.trim());
      setUserEmail(loginEmail.trim());
      setUserPhone(loginPhone.trim());
      setIsLoginModalOpen(false);
    }
  };

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-brand-surface text-brand-on-surface flex flex-col justify-between selection:bg-primary-fixed selection:text-primary">
      
      {/* Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        cartCount={cartCount}
        userName={userName}
        onLoginToggle={handleLoginToggle}
        bookingCount={bookings.filter(b => b.status === 'Confirmado').length}
      />

      {/* Booking Success Modal Banner */}
      <AnimatePresence>
        {showBookingSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              className="bg-white p-6 sm:p-10 rounded-3xl max-w-lg w-full shadow-2xl border border-green-100 text-center relative"
            >
              <button 
                onClick={() => setShowBookingSuccess(null)}
                className="absolute top-4 right-4 p-2 hover:bg-brand-surface-low rounded-full transition-colors text-brand-on-surface-variant/70"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                <CheckCircle2 className="w-10 h-10 fill-green-100" />
              </div>

              <h3 className="font-display font-black text-2xl text-brand-on-surface leading-tight mb-2">
                Agendamento Confirmado!
              </h3>
              <p className="text-sm text-brand-on-surface-variant leading-relaxed max-w-sm mx-auto mb-6">
                O horário de <strong>{showBookingSuccess.petName}</strong> foi reservado com extremo carinho. Veja o resumo abaixo:
              </p>

              {/* Receipt info */}
              <div className="bg-brand-surface-low/50 p-4 sm:p-6 rounded-2xl border border-brand-outline-variant/15 text-left text-sm mb-6 space-y-3">
                <div className="flex justify-between">
                  <span className="text-brand-on-surface-variant">Código do Agendamento:</span>
                  <span className="font-mono font-extrabold text-primary">{showBookingSuccess.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-on-surface-variant">Data da Visita:</span>
                  <span className="font-bold">{showBookingSuccess.date.split('-').reverse().join('/')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-on-surface-variant">Horário:</span>
                  <span className="font-bold text-primary">{showBookingSuccess.time}h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-on-surface-variant">Pet:</span>
                  <span className="font-bold">{showBookingSuccess.petName}</span>
                </div>
                <div className="flex justify-between border-t border-brand-outline-variant/20 pt-3 font-bold text-base">
                  <span className="text-brand-on-surface">Total Pago no Local:</span>
                  <span className="text-secondary">R$ {showBookingSuccess.totalPrice}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowBookingSuccess(null)}
                  className="flex-1 bg-primary hover:bg-primary-container text-white py-3.5 rounded-xl font-bold font-sans text-sm shadow-md transition-all active:scale-[0.98]"
                >
                  Ver Meus Agendamentos
                </button>
                <button
                  onClick={() => {
                    setShowBookingSuccess(null);
                    setActiveTab('services');
                  }}
                  className="flex-1 bg-brand-surface-low hover:bg-brand-surface-low/80 text-brand-on-surface-variant py-3.5 rounded-xl font-semibold font-sans text-sm transition-all"
                >
                  Voltar para o Início
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* User Login/Register Modal */}
      <AnimatePresence>
        {isLoginModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white p-6 sm:p-8 rounded-3xl max-w-md w-full shadow-2xl border border-brand-outline-variant/10 relative"
            >
              <button 
                onClick={() => setIsLoginModalOpen(false)}
                className="absolute top-4 right-4 p-2 hover:bg-brand-surface-low rounded-full transition-colors text-brand-on-surface-variant/70"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-6">
                <PawPrint className="text-primary w-6 h-6 fill-primary" />
                <span className="font-display text-lg font-black text-brand-on-surface">Paws &amp; Palms Sign In</span>
              </div>

              <h3 className="font-display font-extrabold text-xl text-brand-on-surface mb-2 leading-tight">
                Seja bem-vindo de volta!
              </h3>
              <p className="text-xs text-brand-on-surface-variant mb-6 leading-relaxed">
                Insira seus dados para sincronizar seus agendamentos e acessar a loja boutique.
              </p>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label htmlFor="loginName" className="block text-xs font-bold text-brand-on-surface uppercase tracking-wider">
                    Nome Completo
                  </label>
                  <input
                    id="loginName"
                    type="text"
                    required
                    value={loginName}
                    onChange={(e) => setLoginName(e.target.value)}
                    placeholder="Ex: Gabriel Cantafio"
                    className="w-full px-4 py-3 rounded-xl border border-brand-outline-variant focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none text-sm transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="loginEmail" className="block text-xs font-bold text-brand-on-surface uppercase tracking-wider">
                    E-mail
                  </label>
                  <input
                    id="loginEmail"
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="Ex: gabrielcantafio1@gmail.com"
                    className="w-full px-4 py-3 rounded-xl border border-brand-outline-variant focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none text-sm transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="loginPhone" className="block text-xs font-bold text-brand-on-surface uppercase tracking-wider">
                    Celular / WhatsApp
                  </label>
                  <input
                    id="loginPhone"
                    type="text"
                    required
                    value={loginPhone}
                    onChange={(e) => setLoginPhone(e.target.value)}
                    placeholder="Ex: (11) 99999-1234"
                    className="w-full px-4 py-3 rounded-xl border border-brand-outline-variant focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none text-sm transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-container text-white py-3.5 rounded-xl font-bold font-display text-sm sm:text-base mt-6 flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Entrar com Segurança</span>
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main Content Render */}
      <main className="flex-grow">
        
        <AnimatePresence mode="wait">
          
          {activeTab === 'services' && (
            <motion.div
              key="services"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <GroomingLanding 
                onStartBooking={handleStartBooking} 
                setActiveTab={setActiveTab}
              />
            </motion.div>
          )}

          {activeTab === 'booking' && (
            <motion.div
              key="booking"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <BookingFlow
                initialTier={selectedBookingTier}
                customerName={userName}
                customerPhone={userPhone}
                onBookingComplete={handleBookingComplete}
                onCancel={() => setActiveTab('services')}
              />
            </motion.div>
          )}

          {activeTab === 'my-bookings' && (
            <motion.div
              key="my-bookings"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <MyBookings 
                bookings={bookings}
                onCancelBooking={handleCancelBooking}
                onNavigateToBooking={() => handleStartBooking('classic')}
              />
            </motion.div>
          )}

          {activeTab === 'store' && (
            <motion.div
              key="store"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <StoreMock onAddToCart={handleAddToCart} />
            </motion.div>
          )}

        </AnimatePresence>

      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

    </div>
  );
}
