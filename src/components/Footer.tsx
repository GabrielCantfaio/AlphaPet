import React from 'react';
import { PawPrint, Share2, MessageCircle, Heart, MapPin, Phone, Mail } from 'lucide-react';
import { ActiveTab } from '../types';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  return (
    <footer className="bg-brand-surface-low dark:bg-brand-on-surface w-full mt-20 border-t border-brand-outline-variant/20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-6 py-12 max-w-7xl mx-auto">
        
        {/* Brand Column */}
        <div className="col-span-1 space-y-4">
          <div className="flex items-center gap-2">
            <PawPrint className="text-secondary w-6 h-6 fill-secondary" />
            <span className="font-display text-lg font-bold text-secondary tracking-tight">
              Paws &amp; Palms
            </span>
          </div>
          <p className="font-sans text-sm text-brand-on-surface-variant leading-relaxed">
            Excelência em cuidados veterinários e estética pet. Oferecemos o que há de mais moderno e carinhoso para o bem-estar do seu melhor amigo. Seu pet em ótimas mãos.
          </p>
          <div className="flex items-center gap-2 text-xs text-brand-on-surface-variant/80">
            <MapPin className="w-4 h-4 text-secondary shrink-0" />
            <span>Av. das Palmeiras, 1024 - Jardins, SP</span>
          </div>
        </div>

        {/* Navigation Links */}
        <div>
          <h4 className="font-display font-bold text-primary mb-4 text-sm uppercase tracking-wider">
            Navegação
          </h4>
          <ul className="space-y-3 font-sans text-sm">
            <li>
              <button 
                onClick={() => setActiveTab('services')}
                className="text-brand-on-surface-variant hover:text-secondary underline decoration-secondary-container transition-all text-left"
              >
                Serviços de Estética
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('booking')}
                className="text-brand-on-surface-variant hover:text-secondary underline decoration-secondary-container transition-all text-left"
              >
                Agendar Horário
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('my-bookings')}
                className="text-brand-on-surface-variant hover:text-secondary underline decoration-secondary-container transition-all text-left"
              >
                Meus Agendamentos
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('store')}
                className="text-brand-on-surface-variant hover:text-secondary underline decoration-secondary-container transition-all text-left"
              >
                Pet Store &amp; Acessórios
              </button>
            </li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h4 className="font-display font-bold text-primary mb-4 text-sm uppercase tracking-wider">
            Suporte &amp; Info
          </h4>
          <ul className="space-y-3 font-sans text-sm">
            <li>
              <a href="#privacy" className="text-brand-on-surface-variant hover:text-secondary underline decoration-secondary-container transition-all block">
                Políticas de Privacidade
              </a>
            </li>
            <li>
              <a href="#terms" className="text-brand-on-surface-variant hover:text-secondary underline decoration-secondary-container transition-all block">
                Termos de Serviço
              </a>
            </li>
            <li>
              <a href="#contact" className="text-brand-on-surface-variant hover:text-secondary underline decoration-secondary-container transition-all block">
                Fale Conosco
              </a>
            </li>
            <li>
              <a href="#faq" className="text-brand-on-surface-variant hover:text-secondary underline decoration-secondary-container transition-all block">
                Dúvidas Frequentes (FAQ)
              </a>
            </li>
          </ul>
        </div>

        {/* Hours & Contact */}
        <div>
          <h4 className="font-display font-bold text-primary mb-4 text-sm uppercase tracking-wider">
            Atendimento
          </h4>
          <p className="font-sans text-sm text-brand-on-surface-variant leading-relaxed mb-4">
            Segunda a Sábado: 08h às 20h<br />
            Domingos e Feriados: 09h às 14h
          </p>
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-xs text-brand-on-surface-variant/85">
              <Phone className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>(11) 4004-PETS / (11) 99999-5555</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-brand-on-surface-variant/85">
              <Mail className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>contato@pawspalms.com.br</span>
            </div>
          </div>
          <div className="flex gap-2">
            <a 
              href="#share" 
              className="w-8 h-8 rounded-full bg-primary hover:bg-primary-container flex items-center justify-center text-white transition-all transform hover:-translate-y-1"
              title="Compartilhar"
            >
              <Share2 className="w-4 h-4" />
            </a>
            <a 
              href="#chat" 
              className="w-8 h-8 rounded-full bg-primary hover:bg-primary-container flex items-center justify-center text-white transition-all transform hover:-translate-y-1"
              title="Chat WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>

      <div className="border-t border-brand-outline-variant/30 py-6 text-center px-6">
        <p className="font-sans text-xs text-brand-on-surface-variant/70 flex items-center justify-center gap-1">
          <span>© 2026 Paws &amp; Palms Pet Boutique. Todos os direitos reservados.</span>
          <span className="text-red-500 font-bold">♥</span>
          <span>Feito para o bem-estar do seu pet.</span>
        </p>
      </div>
    </footer>
  );
}
