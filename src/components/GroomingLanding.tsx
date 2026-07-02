import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, Scissors, Ear, Wind, Shield, Smile, 
  Sparkle, ArrowRight, CheckCircle2, BadgeCheck, 
  ChevronRight, Calendar, Info, Clock, DollarSign
} from 'lucide-react';
import { BookingTier, ActiveTab, PetSize } from '../types';

interface GroomingLandingProps {
  onStartBooking: (tier: BookingTier) => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export default function GroomingLanding({ onStartBooking, setActiveTab }: GroomingLandingProps) {
  const [selectedTier, setSelectedTier] = useState<BookingTier>('classic');

  const handleContinueBooking = () => {
    onStartBooking(selectedTier);
  };

  const getTierPrice = (tier: BookingTier): number => {
    switch(tier) {
      case 'classic': return 80;
      case 'hygienic': return 120;
      case 'complete': return 160;
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full h-[540px] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCviACr6Mhm5r0sU60ejG83TUxk9ijXu7E7lxBppng1jxMPyfe-rCJ6MCBSndLzT7VJpdXiMo--73FkEFyKBNMhKQzMkLQdJix6ulw_uZZAB_VMHGN8aezqs3pqrsTbzoQgKtfmc8ee_GcakMR_i2TpSq6TUJMAVmcqxAYojPe16J2MONp8kfFejLHQA_lP7y7cF6VF_8yfm9LKVKk-4F__cYGNn1YLU7YE-kexguEZcJgIk_f4ssQEjOw8nGGF3qy4bCXsFAhwtwF2"
            alt="Golden Retriever feliz após o banho"
            className="w-full h-full object-cover object-center scale-105 hover:scale-100 transition-transform duration-10000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="bg-secondary-container text-on-secondary-container px-4 py-1.5 rounded-full font-sans text-xs font-semibold tracking-wider uppercase mb-5 inline-block shadow-sm">
              ✨ Estética Premium
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white mb-5 text-shadow-sm tracking-tight leading-tight">
              Banho e Tosa Profissional
            </h1>
            <p className="text-white/90 font-sans text-lg sm:text-xl max-w-xl leading-relaxed font-normal">
              O cuidado que seu pet merece com a técnica e o carinho que você confia. Transformamos o dia de beleza em uma experiência de relaxamento, carinho e saúde.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Grid Content */}
      <section className="py-16 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Side: Services & Description */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* Service Description Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-brand-surface-lowest p-6 sm:p-10 rounded-2xl shadow-[0_4px_20px_rgba(42,123,191,0.04)] border border-brand-outline-variant/10"
          >
            <h2 className="font-display text-2xl font-bold text-primary mb-6">
              Descrição do Serviço
            </h2>
            <div className="space-y-6 text-brand-on-surface-variant font-sans text-base leading-relaxed">
              <p>
                Nosso serviço de <strong className="text-primary font-semibold">Banho e Tosa</strong> vai muito além da estética. É um ritual completo de higiene e bem-estar, realizado por especialistas em comportamento animal para garantir que seu pet se sinta seguro, relaxado e confortável durante todo o processo.
              </p>

              {/* Feature Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-10 pt-6 border-t border-brand-outline-variant/15">
                
                <div className="flex gap-4">
                  <div className="bg-primary-fixed/50 p-2.5 h-11 w-11 rounded-xl flex items-center justify-center shrink-0">
                    <Sparkles className="text-primary w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-brand-on-surface text-base">
                      Shampoo Especializado
                    </h4>
                    <p className="text-sm text-brand-on-surface-variant/90 mt-1">
                      Produtos hipoalergênicos e específicos para cada tipo de pelagem e sensibilidade.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-primary-fixed/50 p-2.5 h-11 w-11 rounded-xl flex items-center justify-center shrink-0">
                    <Scissors className="text-primary w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-brand-on-surface text-base">
                      Corte de Unhas
                    </h4>
                    <p className="text-sm text-brand-on-surface-variant/90 mt-1">
                      Remoção e lixamento cuidadoso para evitar desconforto e problemas posturais.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-primary-fixed/50 p-2.5 h-11 w-11 rounded-xl flex items-center justify-center shrink-0">
                    <Ear className="text-primary w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-brand-on-surface text-base">
                      Limpeza de Ouvidos
                    </h4>
                    <p className="text-sm text-brand-on-surface-variant/90 mt-1">
                      Prevenção eficaz de otites e inflamações com produtos extremamente suaves.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-primary-fixed/50 p-2.5 h-11 w-11 rounded-xl flex items-center justify-center shrink-0">
                    <Wind className="text-primary w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-brand-on-surface text-base">
                      Secagem Terapêutica
                    </h4>
                    <p className="text-sm text-brand-on-surface-variant/90 mt-1">
                      Temperatura rigorosamente controlada e ruído reduzido para evitar estresse.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

          {/* Additional Benefits */}
          <div>
            <h2 className="font-display text-2xl font-bold text-primary mb-6">
              Benefícios Adicionais
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-tertiary-fixed p-6 rounded-2xl border border-brand-outline-variant/10 flex flex-col justify-between"
              >
                <div>
                  <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-sm border border-primary/5">
                    <Shield className="text-primary w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-brand-on-surface text-base mb-1">
                    Saúde Dermatológica
                  </h3>
                </div>
                <p className="text-sm text-on-tertiary-fixed-variant mt-2">
                  Identificação precoce de parasitas, alergias ou eventuais alterações de pele.
                </p>
              </motion.div>

              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-tertiary-fixed p-6 rounded-2xl border border-brand-outline-variant/10 flex flex-col justify-between"
              >
                <div>
                  <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-sm border border-primary/5">
                    <Smile className="text-primary w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-brand-on-surface text-base mb-1">
                    Redução de Estresse
                  </h3>
                </div>
                <p className="text-sm text-on-tertiary-fixed-variant mt-2">
                  Ambiente com climatização amena, música suave e terapeutas treinados em bem-estar.
                </p>
              </motion.div>

              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-tertiary-fixed p-6 rounded-2xl border border-brand-outline-variant/10 flex flex-col justify-between"
              >
                <div>
                  <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-sm border border-primary/5">
                    <Sparkle className="text-primary w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-brand-on-surface text-base mb-1">
                    Higiene Profunda
                  </h3>
                </div>
                <p className="text-sm text-on-tertiary-fixed-variant mt-2">
                  Cuidados com glândulas analógicas e higienização em áreas sensíveis com altíssima precisão.
                </p>
              </motion.div>

            </div>
          </div>

        </div>

        {/* Right Side: Booking Sidebar */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 space-y-6">
            
            <div className="bg-white p-6 rounded-2xl shadow-[0_10px_30px_rgba(42,123,191,0.08)] border border-primary/10">
              <h3 className="font-display text-xl font-bold text-brand-on-surface mb-1">
                Agende Agora
              </h3>
              <p className="text-brand-on-surface-variant text-sm mb-6">
                Selecione o plano ideal para as necessidades do seu melhor amigo.
              </p>

              {/* Tiers List */}
              <div className="space-y-3 mb-6">
                
                {/* Tier 1 */}
                <label 
                  className={`block cursor-pointer border-2 rounded-xl p-4 transition-all duration-200 ${
                    selectedTier === 'classic' 
                      ? 'border-primary bg-primary-fixed/25 shadow-sm' 
                      : 'border-brand-surface-low hover:border-primary-container bg-brand-surface-low/30'
                  }`}
                >
                  <input 
                    type="radio" 
                    name="sidebar-tier" 
                    checked={selectedTier === 'classic'}
                    onChange={() => setSelectedTier('classic')}
                    className="sr-only" 
                  />
                  <div className="flex justify-between items-center">
                    <span className="font-display font-bold text-brand-on-surface text-sm sm:text-base">
                      Banho Clássico
                    </span>
                    <span className="text-primary font-extrabold text-base sm:text-lg">
                      R$ 80
                    </span>
                  </div>
                  <p className="text-xs text-brand-on-surface-variant/80 mt-1">
                    Higiene básica essencial, corte de unhas e limpeza de ouvidos.
                  </p>
                </label>

                {/* Tier 2 */}
                <label 
                  className={`block cursor-pointer border-2 rounded-xl p-4 transition-all duration-200 ${
                    selectedTier === 'hygienic' 
                      ? 'border-primary bg-primary-fixed/25 shadow-sm' 
                      : 'border-brand-surface-low hover:border-primary-container bg-brand-surface-low/30'
                  }`}
                >
                  <input 
                    type="radio" 
                    name="sidebar-tier" 
                    checked={selectedTier === 'hygienic'}
                    onChange={() => setSelectedTier('hygienic')}
                    className="sr-only" 
                  />
                  <div className="flex justify-between items-center">
                    <span className="font-display font-bold text-brand-on-surface text-sm sm:text-base">
                      Tosa Higiênica
                    </span>
                    <span className="text-primary font-extrabold text-base sm:text-lg">
                      R$ 120
                    </span>
                  </div>
                  <p className="text-xs text-brand-on-surface-variant/80 mt-1">
                    Banho completo + aparo higiênico em patas, barriga e rosto.
                  </p>
                </label>

                {/* Tier 3 */}
                <label 
                  className={`block cursor-pointer border-2 rounded-xl p-4 transition-all duration-200 ${
                    selectedTier === 'complete' 
                      ? 'border-primary bg-primary-fixed/25 shadow-sm' 
                      : 'border-brand-surface-low hover:border-primary-container bg-brand-surface-low/30'
                  }`}
                >
                  <input 
                    type="radio" 
                    name="sidebar-tier" 
                    checked={selectedTier === 'complete'}
                    onChange={() => setSelectedTier('complete')}
                    className="sr-only" 
                  />
                  <div className="flex justify-between items-center">
                    <span className="font-display font-bold text-brand-on-surface text-sm sm:text-base">
                      Banho &amp; Tosa Completa
                    </span>
                    <span className="text-primary font-extrabold text-base sm:text-lg">
                      R$ 160
                    </span>
                  </div>
                  <p className="text-xs text-brand-on-surface-variant/80 mt-1">
                    Banho + Tosa da raça (máquina/tesoura) + hidratação premium de pelagem.
                  </p>
                </label>

              </div>

              {/* Action Button */}
              <button 
                onClick={handleContinueBooking}
                className="w-full bg-secondary-container hover:bg-secondary-container/90 text-on-secondary-container py-4 rounded-xl font-bold font-sans text-sm sm:text-base flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98] group"
              >
                <span>Continuar Agendamento</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

            </div>

            {/* Satisfaction Guarantee */}
            <div className="bg-brand-surface-low p-5 rounded-2xl border border-brand-outline-variant/15 flex gap-3">
              <BadgeCheck className="text-primary w-6 h-6 shrink-0 mt-0.5" />
              <div>
                <span className="font-display font-bold text-sm text-brand-on-surface block mb-1">
                  Garantia de Satisfação P&amp;P
                </span>
                <p className="text-xs text-brand-on-surface-variant/90 leading-relaxed">
                  Se você ou seu querido pet não ficarem 100% felizes com o resultado, oferecemos um novo ajuste estético gratuito em até 48 horas.
                </p>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* Pricing Tiers Detailed */}
      <section className="bg-brand-surface-low py-16">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display text-3xl font-bold text-brand-on-surface">
              Tabela de Preços Detalhada
            </h2>
            <p className="text-brand-on-surface-variant/80 mt-2 text-sm sm:text-base">
              Os valores abaixo representam a média e podem variar conforme o porte do pet e o estado real da pelagem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Small Dog */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="bg-white p-6 rounded-2xl border border-brand-outline-variant/20 flex flex-col justify-between shadow-sm relative overflow-hidden"
            >
              <div>
                <span className="text-secondary font-display font-bold text-lg block text-center border-b border-brand-surface-low pb-3 mb-4">
                  Pequeno Porte
                </span>
                <ul className="w-full space-y-3.5 text-sm">
                  <li className="flex justify-between border-b border-brand-surface-low/80 pb-1.5 text-brand-on-surface-variant">
                    <span>Banho</span> 
                    <span className="font-semibold text-brand-on-surface">R$ 60 - 80</span>
                  </li>
                  <li className="flex justify-between border-b border-brand-surface-low/80 pb-1.5 text-brand-on-surface-variant">
                    <span>Tosa Higiênica</span> 
                    <span className="font-semibold text-brand-on-surface">R$ 100</span>
                  </li>
                  <li className="flex justify-between border-b border-brand-surface-low/80 pb-1.5 text-brand-on-surface-variant">
                    <span>Tosa Máquina</span> 
                    <span className="font-semibold text-brand-on-surface">R$ 130</span>
                  </li>
                  <li className="flex justify-between border-b border-brand-surface-low/80 pb-1.5 text-brand-on-surface-variant">
                    <span>Tosa Tesoura</span> 
                    <span className="font-semibold text-brand-on-surface">R$ 150</span>
                  </li>
                </ul>
              </div>
              <p className="text-xs italic text-brand-on-surface-variant/70 text-center mt-6 pt-4 border-t border-brand-surface-low/80">
                Ex: Shih Tzu, Maltês, Poodle Toy, Gatos menores
              </p>
            </motion.div>

            {/* Medium Dog */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="bg-white p-6 rounded-2xl border-2 border-primary shadow-md flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-4 right-[-32px] bg-primary text-white text-[9px] px-8 py-1 font-bold uppercase rotate-45">
                Popular
              </div>
              <div>
                <span className="text-primary font-display font-bold text-lg block text-center border-b border-brand-surface-low pb-3 mb-4">
                  Médio Porte
                </span>
                <ul className="w-full space-y-3.5 text-sm">
                  <li className="flex justify-between border-b border-brand-surface-low/80 pb-1.5 text-brand-on-surface-variant">
                    <span>Banho</span> 
                    <span className="font-semibold text-brand-on-surface">R$ 90 - 110</span>
                  </li>
                  <li className="flex justify-between border-b border-brand-surface-low/80 pb-1.5 text-brand-on-surface-variant">
                    <span>Tosa Higiênica</span> 
                    <span className="font-semibold text-brand-on-surface">R$ 140</span>
                  </li>
                  <li className="flex justify-between border-b border-brand-surface-low/80 pb-1.5 text-brand-on-surface-variant">
                    <span>Tosa Máquina</span> 
                    <span className="font-semibold text-brand-on-surface">R$ 170</span>
                  </li>
                  <li className="flex justify-between border-b border-brand-surface-low/80 pb-1.5 text-brand-on-surface-variant">
                    <span>Tosa Tesoura</span> 
                    <span className="font-semibold text-brand-on-surface">R$ 200</span>
                  </li>
                </ul>
              </div>
              <p className="text-xs italic text-brand-on-surface-variant/70 text-center mt-6 pt-4 border-t border-brand-surface-low/80">
                Ex: Cocker, Border Collie, Beagle, Bulldog Francês
              </p>
            </motion.div>

            {/* Large Dog */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="bg-white p-6 rounded-2xl border border-brand-outline-variant/20 flex flex-col justify-between shadow-sm relative overflow-hidden"
            >
              <div>
                <span className="text-secondary font-display font-bold text-lg block text-center border-b border-brand-surface-low pb-3 mb-4">
                  Grande Porte
                </span>
                <ul className="w-full space-y-3.5 text-sm">
                  <li className="flex justify-between border-b border-brand-surface-low/80 pb-1.5 text-brand-on-surface-variant">
                    <span>Banho</span> 
                    <span className="font-semibold text-brand-on-surface">R$ 130 - 160</span>
                  </li>
                  <li className="flex justify-between border-b border-brand-surface-low/80 pb-1.5 text-brand-on-surface-variant">
                    <span>Tosa Higiênica</span> 
                    <span className="font-semibold text-brand-on-surface">R$ 190</span>
                  </li>
                  <li className="flex justify-between border-b border-brand-surface-low/80 pb-1.5 text-brand-on-surface-variant">
                    <span>Tosa Máquina</span> 
                    <span className="font-semibold text-brand-on-surface">R$ 240</span>
                  </li>
                  <li className="flex justify-between border-b border-brand-surface-low/80 pb-1.5 text-brand-on-surface-variant">
                    <span>Tosa Tesoura</span> 
                    <span className="font-semibold text-brand-on-surface">R$ 280</span>
                  </li>
                </ul>
              </div>
              <p className="text-xs italic text-brand-on-surface-variant/70 text-center mt-6 pt-4 border-t border-brand-surface-low/80">
                Ex: Golden Retriever, Bernese, Husky, Pastor Alemão
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-primary-container rounded-3xl p-8 sm:p-14 overflow-hidden relative shadow-lg">
          
          {/* Decorative Paw Silhouette */}
          <div className="absolute top-[-50px] right-[-50px] opacity-[0.06] select-none pointer-events-none">
            <svg width="400" height="400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,14A3,3 0 0,1 9,11A3,3 0 0,1 12,8A3,3 0 0,1 15,11A3,3 0 0,1 12,14M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,16.5C9.5,16.5 7.5,14.5 7.5,12C7.5,9.5 9.5,7.5 12,7.5C14.5,7.5 16.5,9.5 16.5,12C16.5,14.5 14.5,16.5 12,16.5Z" />
            </svg>
          </div>
          
          <div className="relative z-10 text-center max-w-2xl mx-auto space-y-6">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Seu pet renovado e feliz
            </h2>
            <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mx-auto font-light">
              Agende hoje mesmo o serviço de Banho e Tosa e veja a diferença de um cuidado verdadeiramente profissional, com profissionais apaixonados por animais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button 
                onClick={() => setActiveTab('booking')}
                className="bg-secondary-container hover:bg-secondary-container/95 text-on-secondary-container px-8 py-4 rounded-xl font-bold font-sans text-sm sm:text-base shadow-md transition-all active:scale-[0.98]"
              >
                Reservar Horário
              </button>
              <button 
                onClick={() => setActiveTab('store')}
                className="border-2 border-white/65 hover:border-white text-white px-8 py-4 rounded-xl font-bold font-sans text-sm sm:text-base hover:bg-white/10 transition-all active:scale-[0.98]"
              >
                Ver Pet Store
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
