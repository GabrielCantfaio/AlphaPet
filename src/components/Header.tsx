import React from 'react';
import { PawPrint, Search, ShoppingBag, Calendar, User, LogIn, LogOut } from 'lucide-react';
import { ActiveTab } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  cartCount: number;
  userName: string | null;
  onLoginToggle: () => void;
  bookingCount: number;
}

export default function Header({
  activeTab,
  setActiveTab,
  cartCount,
  userName,
  onLoginToggle,
  bookingCount,
}: HeaderProps) {
  return (
    <header className="bg-brand-surface-lowest dark:bg-brand-on-surface w-full top-0 sticky z-50 shadow-[0_2px_10px_rgba(42,123,191,0.06)] border-b border-brand-outline-variant/10">
      <nav className="flex justify-between items-center px-6 py-3 max-w-7xl mx-auto h-16">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => setActiveTab('services')}
        >
          <div className="bg-primary/10 p-2 rounded-full group-hover:bg-primary/20 transition-all">
            <PawPrint className="text-primary w-6 h-6 fill-primary" />
          </div>
          <span className="font-display text-xl font-bold text-primary tracking-tight">
            Paws &amp; Palms
          </span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-8 items-center">
          <button
            onClick={() => setActiveTab('services')}
            className={`font-sans text-sm font-medium transition-all duration-200 py-1 border-b-2 ${
              activeTab === 'services'
                ? 'text-primary border-secondary font-semibold'
                : 'text-brand-on-surface-variant/80 border-transparent hover:text-primary'
            }`}
          >
            Serviços
          </button>
          
          <button
            onClick={() => setActiveTab('booking')}
            className={`font-sans text-sm font-medium transition-all duration-200 py-1 border-b-2 ${
              activeTab === 'booking'
                ? 'text-primary border-secondary font-semibold'
                : 'text-brand-on-surface-variant/80 border-transparent hover:text-primary'
            }`}
          >
            Agendar
          </button>

          <button
            onClick={() => setActiveTab('my-bookings')}
            className={`font-sans text-sm font-medium transition-all duration-200 py-1 border-b-2 relative ${
              activeTab === 'my-bookings'
                ? 'text-primary border-secondary font-semibold'
                : 'text-brand-on-surface-variant/80 border-transparent hover:text-primary'
            }`}
          >
            Meus Agendamentos
            {bookingCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-secondary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold animate-pulse">
                {bookingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('store')}
            className={`font-sans text-sm font-medium transition-all duration-200 py-1 border-b-2 ${
              activeTab === 'store'
                ? 'text-primary border-secondary font-semibold'
                : 'text-brand-on-surface-variant/80 border-transparent hover:text-primary'
            }`}
          >
            Pet Store
          </button>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-4">
          {/* Cart Icon (only relevant/shows items when items are bought in Pet Store) */}
          <button 
            onClick={() => setActiveTab('store')}
            className="relative p-2 hover:bg-brand-surface-low rounded-full transition-colors group"
            title="Carrinho de Compras"
          >
            <ShoppingBag className="w-5 h-5 text-brand-on-surface-variant hover:text-primary" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-secondary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Sign In State */}
          {userName ? (
            <div className="flex items-center gap-2">
              <div className="hidden lg:flex flex-col items-end text-xs">
                <span className="font-semibold text-brand-on-surface">{userName}</span>
                <span className="text-brand-on-surface-variant/70 text-[10px]">Cliente Premium</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="bg-primary/10 w-9 h-9 rounded-full flex items-center justify-center text-primary font-bold border border-primary/20">
                  {userName.charAt(0)}
                </div>
                <button 
                  onClick={onLoginToggle}
                  className="p-1.5 text-brand-on-surface-variant hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                  title="Sair"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={onLoginToggle}
              className="bg-primary hover:bg-primary-container text-white px-5 py-2 rounded-lg font-sans text-xs font-semibold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
            >
              <LogIn className="w-3.5 h-3.5" />
              Entrar
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
