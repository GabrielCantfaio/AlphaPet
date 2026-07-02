import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Star, Search, Filter, Sparkles, Check, Flame } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: 'beauty' | 'treats' | 'toys' | 'collars';
  price: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  tag?: string;
}

const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Shampoo Hipoalergênico Flor de Algodão',
    category: 'beauty',
    price: 49,
    rating: 4.9,
    reviews: 124,
    image: 'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&q=80&w=400',
    description: 'Fórmula ultra suave para peles extremamente sensíveis. PH balanceado e livre de parabenos.',
    tag: 'Mais Vendido',
  },
  {
    id: 'prod-2',
    name: 'Condicionador Brilho Intenso de Coco',
    category: 'beauty',
    price: 54,
    rating: 4.8,
    reviews: 82,
    image: 'https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&q=80&w=400',
    description: 'Desembaraça, hidrata e devolve o brilho natural dos pelos. Fragrância suave e duradoura.',
  },
  {
    id: 'prod-3',
    name: 'Petisco Gourmet Coxinha de Frango',
    category: 'treats',
    price: 24,
    rating: 5.0,
    reviews: 310,
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=400',
    description: 'Petisco 100% natural, desidratado e livre de conservantes químicos. Altamente palatável.',
    tag: 'Favorito',
  },
  {
    id: 'prod-4',
    name: 'Brinquedo Mordedor Interativo KONG Bone',
    category: 'toys',
    price: 89,
    rating: 4.7,
    reviews: 195,
    image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=400',
    description: 'Borracha natural super resistente, excelente para rechear com petiscos ou pastas e aliviar o estresse.',
  },
  {
    id: 'prod-5',
    name: 'Coleira de Couro Natural Trançado',
    category: 'collars',
    price: 119,
    rating: 4.9,
    reviews: 64,
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&q=80&w=400',
    description: 'Confeccionada artesanalmente com couro macio e fivela de latão sólido. Conforto e elegância incomparáveis.',
    tag: 'Premium',
  },
  {
    id: 'prod-6',
    name: 'Kit Spray Bucal Halito Fresco Menta',
    category: 'beauty',
    price: 32,
    rating: 4.6,
    reviews: 43,
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=400',
    description: 'Spray prático para escovação rápida. Ajuda a reduzir o tártaro e remove o mau hálito instantaneamente.',
  }
];

interface StoreMockProps {
  onAddToCart: () => void;
}

export default function StoreMock({ onAddToCart }: StoreMockProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [addedItemIds, setAddedItemIds] = useState<string[]>([]);

  const handleBuy = (id: string) => {
    onAddToCart();
    setAddedItemIds([...addedItemIds, id]);
    setTimeout(() => {
      setAddedItemIds(prev => prev.filter(itemId => itemId !== id));
    }, 1500);
  };

  const filteredProducts = PRODUCTS.filter(prod => {
    const matchesSearch = prod.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          prod.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || prod.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      
      {/* Search and Title section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2.5 inline-block">
            🎁 AlphaPet Boutique
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-brand-on-surface tracking-tight">
            Pet Store &amp; Acessórios
          </h2>
          <p className="text-brand-on-surface-variant text-sm mt-1">
            Produtos selecionados pelos nossos especialistas em bem-estar para o seu pet.
          </p>
        </div>

        {/* Search bar */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Pesquisar produto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-brand-outline-variant hover:border-primary-container focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none text-sm transition-all bg-white"
          />
          <Search className="w-4 h-4 text-brand-on-surface-variant/75 absolute left-3.5 top-3.5" />
        </div>
      </div>

      {/* Categories buttons */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-8 snap-x scrollbar-none">
        {[
          { id: 'all', label: 'Todos' },
          { id: 'beauty', label: 'Shampoo & Higiene' },
          { id: 'treats', label: 'Petiscos' },
          { id: 'toys', label: 'Brinquedos' },
          { id: 'collars', label: 'Guias & Coleiras' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`py-2 px-5 rounded-full text-xs sm:text-sm font-semibold snap-center shrink-0 transition-all ${
              selectedCategory === cat.id
                ? 'bg-primary text-white shadow-sm'
                : 'bg-white border border-brand-outline-variant/20 hover:border-brand-outline-variant/60 text-brand-on-surface-variant'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-brand-outline-variant/10 max-w-md mx-auto">
          <Search className="w-12 h-12 text-brand-on-surface-variant/40 mx-auto mb-4 animate-bounce" />
          <h4 className="font-display font-bold text-lg text-brand-on-surface">Nenhum produto encontrado</h4>
          <p className="text-sm text-brand-on-surface-variant/70 mt-1 px-4">
            Não encontramos resultados para sua busca. Tente buscar por outros termos!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((prod) => {
            const isAdded = addedItemIds.includes(prod.id);

            return (
              <motion.div
                key={prod.id}
                whileHover={{ y: -6 }}
                className="bg-white rounded-2xl border border-brand-outline-variant/15 overflow-hidden flex flex-col justify-between shadow-sm relative group"
              >
                {/* Header Image */}
                <div className="relative h-56 w-full bg-brand-surface-low overflow-hidden">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {prod.tag && (
                    <span className="absolute top-3 left-3 bg-secondary-container text-on-secondary-container text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-sm">
                      {prod.tag}
                    </span>
                  )}
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 text-yellow-600 shadow-sm">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{prod.rating}</span>
                    <span className="text-brand-on-surface-variant/50 font-normal">({prod.reviews})</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-primary uppercase font-bold tracking-widest block mb-1">
                      {prod.category === 'beauty' && 'Shampoo & Estética'}
                      {prod.category === 'treats' && 'Gourmet / Petiscos'}
                      {prod.category === 'toys' && 'Divertimento'}
                      {prod.category === 'collars' && 'Guias & Acessórios'}
                    </span>
                    <h3 className="font-display font-extrabold text-brand-on-surface text-base group-hover:text-primary transition-colors line-clamp-1">
                      {prod.name}
                    </h3>
                    <p className="text-xs text-brand-on-surface-variant/80 mt-2 line-clamp-2 leading-relaxed">
                      {prod.description}
                    </p>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-brand-surface-low/80 mt-4 shrink-0">
                    <div>
                      <span className="text-[10px] text-brand-on-surface-variant/45 uppercase block font-semibold leading-tight">Preço à vista</span>
                      <span className="font-display font-black text-xl text-brand-on-surface">
                        R$ {prod.price}
                      </span>
                    </div>

                    <button
                      onClick={() => handleBuy(prod.id)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold font-sans flex items-center gap-1.5 transition-all shadow-sm active:scale-95 ${
                        isAdded
                          ? 'bg-green-600 text-white shadow-none'
                          : 'bg-primary hover:bg-primary-container text-white'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Adicionado!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" />
                          <span>Adicionar</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
