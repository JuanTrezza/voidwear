import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingCart, 
  User, 
  Search, 
  Menu, 
  X, 
  ChevronRight, 
  Plus, 
  Minus, 
  Cpu, 
  Shield, 
  Zap, 
  Volume2, 
  Wifi, 
  Terminal,
  ArrowRight
} from 'lucide-react';
import { PRODUCTS, FEATURED_PRODUCT, REVIEWS } from './constants';
import { Product, CartItem } from './types';

// --- Small Utility Components ---

const CyberButton = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '' 
}: { 
  children: React.ReactNode; 
  onClick?: () => void; 
  variant?: 'primary' | 'secondary' | 'alert' | 'ghost';
  className?: string;
}) => {
  const variants = {
    primary: 'bg-brand-yellow text-black hover:bg-brand-yellow/80',
    secondary: 'bg-brand-cyan text-black hover:bg-brand-cyan/80',
    alert: 'bg-brand-red text-white hover:bg-brand-red/80',
    ghost: 'border border-brand-cyan text-brand-cyan hover:bg-brand-cyan/10',
  };

  return (
    <button 
      onClick={onClick}
      className={`clip-path-button px-6 py-2 font-mono font-bold uppercase transition-all duration-300 active:scale-95 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

const SectionTitle = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-8 border-l-4 border-brand-cyan pl-4">
    <p className="font-mono text-xs text-brand-cyan tracking-widest uppercase mb-1">{subtitle || '// DATA_ENTRY'}</p>
    <h2 className="font-display text-4xl tracking-tight uppercase">{title}</h2>
  </div>
);

// --- Main Components ---

const Navbar = ({ onCartOpen, cartCount }: { onCartOpen: () => void; cartCount: number }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-black/80 backdrop-blur-md border-b border-brand-cyan/20 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <div className="font-display text-2xl tracking-tighter flex items-center gap-2">
          <span className="text-white">VOID</span>
          <span className="text-brand-cyan select-none">//</span>
          <span className="text-white">WEAR</span>
          <div className="hidden md:flex items-center gap-2 ml-4">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
             <span className="font-mono text-[10px] text-green-500 uppercase tracking-widest">ONLINE_SYS_01</span>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center gap-6 font-mono text-xs tracking-widest uppercase">
          {['CHAQUETAS', 'PANTALONES', 'ACCESORIOS', 'CATÁLOGO'].map((item) => (
            <a key={item} href="#" className="hover:text-brand-cyan transition-colors">[{item}]</a>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-brand-cyan/10 transition-colors"><Search size={18} /></button>
        <button className="p-2 hover:bg-brand-cyan/10 transition-colors relative" onClick={onCartOpen}>
          <ShoppingCart size={18} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-brand-red text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {cartCount}
            </span>
          )}
        </button>
        <button className="p-2 hover:bg-brand-cyan/10 transition-colors"><User size={18} /></button>
      </div>
    </nav>
  );
};

const Hero = () => (
  <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
    <div className="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1605142859862-978be7eba909?auto=format&fit=crop&q=80&w=2000" 
        alt="Cyberpunk Street" 
        className="w-full h-full object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-black/40 via-transparent to-brand-black"></div>
    </div>
    
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative z-10 text-center px-4"
    >
      <p className="font-mono text-brand-cyan tracking-[0.5em] uppercase mb-4 drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]">
        // DISTRITO 7 DE NIGHT CITY // COLECCIÓN 2077
      </p>
      <h1 className="font-display text-7xl md:text-9xl leading-[0.85] tracking-tight mb-8 uppercase max-w-4xl mx-auto italic drop-shadow-2xl">
        DRESS FOR THE <br /> <span className="text-brand-yellow drop-shadow-[0_0_20px_rgba(255,230,0,0.3)]">APOCALYPSE</span>
      </h1>
      
      <div className="flex flex-col items-center gap-6">
        <CyberButton className="text-xl px-12 py-4">
          INITIALIZE_LOADOUT
        </CyberButton>
        <div className="flex items-center gap-12 font-mono text-[10px] text-white/50 tracking-widest uppercase">
          <div className="flex flex-col items-center">
            <span>LAT: 35.6895 N</span>
            <span>LNG: 139.6917 E</span>
          </div>
          <div className="flex flex-col items-center">
            <span>TEMP: -12.4 C</span>
            <span>HUM: 0%</span>
          </div>
        </div>
      </div>
    </motion.div>

    <div className="absolute top-1/4 left-10 hidden xl:block">
       <div className="border border-brand-cyan/30 w-32 h-32 relative">
          <div className="absolute -top-1 -left-1 w-2 h-2 bg-brand-cyan"></div>
          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-brand-cyan"></div>
          <div className="p-2 space-y-1">
             <div className="w-full h-1 bg-brand-cyan/20"></div>
             <div className="w-2/3 h-1 bg-brand-cyan/20"></div>
             <div className="w-3/4 h-1 bg-brand-cyan/20"></div>
             <div className="w-full h-1 bg-brand-cyan/20"></div>
          </div>
       </div>
    </div>
  </section>
);

const Ticker = () => {
  const items = Array(10).fill("NUEVO LANZAMIENTO // EQUIPO TÁCTICO // STOCK LIMITADO // ").join("");
  return (
    <div className="bg-brand-red py-2 overflow-hidden whitespace-nowrap border-y border-brand-red z-20 relative">
      <motion.div 
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="font-display text-sm tracking-widest uppercase text-white"
      >
        {items}
      </motion.div>
    </div>
  );
};

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAdd }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="group relative"
    >
      <div className="aspect-[4/5] overflow-hidden bg-brand-surface border border-brand-cyan/10 relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
        />
        <div className="absolute top-2 left-2 bg-brand-cyan/20 px-2 py-0.5 font-mono text-[8px] text-brand-cyan backdrop-blur-sm">
          {product.sku}
        </div>
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <CyberButton 
            variant="ghost" 
            className="w-full text-xs py-1"
            onClick={() => onAdd(product)}
          >
            ADD_TO_RIG
          </CyberButton>
        </div>
      </div>
      <div className="mt-3 flex justify-between items-start">
        <div>
          <h3 className="font-display text-xl uppercase tracking-tight">{product.name}</h3>
          <p className="font-mono text-[10px] text-brand-cyan uppercase tracking-widest">UNIT_PRICE: ${product.price.toFixed(2)}</p>
        </div>
        <Cpu className="text-brand-cyan opacity-20" size={16} />
      </div>
    </motion.div>
  );
};

const CartSidebar = ({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQty, 
  onRemove 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  items: CartItem[];
  onUpdateQty: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}) => {
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-black/60 backdrop-blur-sm z-[100]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-brand-surface z-[101] border-l border-brand-cyan/20 p-8 flex flex-col"
          >
            <div className="flex items-center justify-between mb-8 border-b border-brand-cyan/20 pb-4">
              <h2 className="font-display text-3xl uppercase tracking-tighter">
                <span className="text-brand-cyan select-none mr-2">{'>'}</span>
                RESUMEN_EQUIPAMIENTO //
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-brand-cyan/10 transition-colors"><X size={24} /></button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6 pr-2">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-white/30 font-mono text-sm uppercase tracking-widest">
                  <Terminal className="mb-4 opacity-50" size={48} />
                  EQUIPAMIENTO_VACÍO
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 border border-brand-cyan/10 p-4 bg-brand-black/40">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover" />
                    <div className="flex-1">
                      <h4 className="font-display text-lg uppercase leading-none mb-1">{item.name}</h4>
                      <p className="font-mono text-xs text-brand-cyan mb-3">${item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-brand-cyan/20">
                          <button onClick={() => onUpdateQty(item.id, -1)} className="p-1 hover:bg-brand-cyan/10"><Minus size={12} /></button>
                          <span className="w-8 text-center font-mono text-xs">{item.quantity}</span>
                          <button onClick={() => onUpdateQty(item.id, 1)} className="p-1 hover:bg-brand-cyan/10"><Plus size={12} /></button>
                        </div>
                        <button onClick={() => onRemove(item.id)} className="text-[10px] font-mono text-brand-red uppercase tracking-widest hover:underline underline-offset-4">REMOVER</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-8 border-t border-brand-cyan/20 pt-6 space-y-4">
              <div className="flex justify-between font-mono uppercase tracking-widest">
                <span className="text-white/60">TOTAL_CRÉDITOS:</span>
                <span className="text-brand-yellow font-bold">${total.toFixed(2)}</span>
              </div>
              <CyberButton variant="primary" className="w-full py-4 text-xl">
                EXECUTE_TRANSACTION
              </CyberButton>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [filter, setFilter] = useState('TODO');

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQty = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const filteredProducts = filter === 'TODO' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-brand-black relative">
      {/* Background Grid Decoration */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-10">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'linear-gradient(to right, #00F0FF 1px, transparent 1px), linear-gradient(to bottom, #00F0FF 1px, transparent 1px)',
          backgroundSize: '100px 100px'
        }}></div>
      </div>

      <Navbar onCartOpen={() => setIsCartOpen(true)} cartCount={cartItems.length} />
      
      <Hero />
      <Ticker />

      <main className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        {/* Inventory Section */}
        <section id="inventory">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
            <SectionTitle title="CURRENT_INVENTORY" subtitle="// STOCK_STATUS: READY" />
            
            <div className="flex flex-wrap gap-2 font-mono text-[10px] tracking-widest">
              {['TODO', 'CHAQUETAS', 'PANTALONES', 'CALZADO', 'ACCESORIOS'].map(cat => (
                <button 
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-1.5 border ${filter === cat ? 'bg-brand-yellow text-black border-brand-yellow' : 'border-brand-cyan/30 text-white/50 hover:border-brand-cyan'} transition-all`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} onAdd={addToCart} />
            ))}
          </div>
        </section>

        {/* Featured Section */}
        <section className="mt-32 border-t border-brand-cyan/10 pt-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 border border-brand-magenta/30 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative aspect-square overflow-hidden bg-brand-surface clip-path-box">
                <img 
                  src={FEATURED_PRODUCT.image} 
                  alt={FEATURED_PRODUCT.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-brand-magenta/80 px-4 py-1 font-mono text-xs uppercase italic drop-shadow-lg">
                  // FEATURED_UNIT_OF_THE_WEEK
                </div>
              </div>
            </div>

            <div>
              <p className="font-mono text-brand-yellow tracking-widest uppercase mb-2">
                {'>'} DATA_ENTRY: {FEATURED_PRODUCT.sku}
              </p>
              <h2 className="font-display text-6xl md:text-8xl leading-none uppercase mb-8">
                {FEATURED_PRODUCT.name}
              </h2>
              
              <div className="space-y-4 mb-10 font-mono text-xs uppercase tracking-widest text-white/70">
                {FEATURED_PRODUCT.specs.map(spec => (
                  <div key={spec.label} className="flex justify-between border-b border-brand-cyan/10 pb-2">
                    <span className="text-brand-cyan">[{spec.label}]:</span>
                    <span>{spec.value}</span>
                  </div>
                ))}
              </div>

              <CyberButton variant="alert" className="w-full py-6 text-2xl" onClick={() => addToCart(FEATURED_PRODUCT)}>
                ADQUIRIR_ACTIVO // ${FEATURED_PRODUCT.price.toFixed(2)}
              </CyberButton>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="mt-32 bg-brand-yellow py-10 px-12 grid grid-cols-1 md:grid-cols-3 gap-12 text-black clip-path-box">
          <div className="text-center md:text-left border-b md:border-b-0 md:border-r border-black/10 pb-8 md:pb-0">
             <div className="flex items-center justify-center md:justify-start gap-4">
               <span className="font-display text-5xl">12.847</span>
               <div className="font-mono text-[10px] uppercase leading-tight">unidades<br/>desplegadas</div>
             </div>
          </div>
          <div className="text-center md:text-left border-b md:border-b-0 md:border-r border-black/10 pb-8 md:pb-0">
             <div className="flex items-center justify-center md:justify-start gap-4">
               <span className="font-display text-5xl">99.8%</span>
               <div className="font-mono text-[10px] uppercase leading-tight">satisfaccion<br/>operativa</div>
             </div>
          </div>
          <div className="text-center md:text-left">
             <div className="flex items-center justify-center md:justify-start gap-4">
               <span className="font-display text-5xl">402</span>
               <div className="font-mono text-[10px] uppercase leading-tight">tiempo máx.<br/>entrega</div>
             </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="mt-32">
          <div className="text-center mb-16">
            <p className="font-mono text-[10px] text-brand-cyan tracking-[0.4em] uppercase mb-2">// REVISION_OPERADOR::</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map(review => (
              <div key={review.id} className="bg-brand-surface/30 border border-brand-cyan/10 p-6 relative group hover:border-brand-cyan/40 transition-colors">
                <div className="flex gap-1 mb-4">
                  {Array(5).fill(0).map((_, i) => (
                    <div key={i} className={`w-3 h-1 ${i < review.rating ? 'bg-brand-yellow' : 'bg-white/10'}`}></div>
                  ))}
                </div>
                <p className="font-sans text-sm text-white/80 leading-relaxed mb-6">
                  "{review.text}"
                </p>
                <div className="font-mono text-[10px] tracking-widest text-brand-cyan uppercase">
                  ID: {review.user} // RANGO: {review.rank}
                </div>
                <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Terminal size={14} className="text-brand-cyan" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="mt-32 relative overflow-hidden bg-white/5 py-24 px-12 clip-path-box border border-white/5">
           <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-magenta/40 via-transparent to-transparent"></div>
           </div>
           <div className="relative z-10 max-w-2xl mx-auto text-center">
              <h2 className="font-display text-6xl uppercase tracking-widest mb-4">ÚNETE A LA RED</h2>
              <p className="font-mono text-xs text-white/50 tracking-widest uppercase mb-12">// RECIBE INTEL SOBRE NUEVOS LANZAMIENTOS Y EQUIPO TÁCTICO</p>
              
              <div className="flex flex-col sm:flex-row gap-0 group">
                <input 
                  type="text" 
                  placeholder="INGRESAR_DIRECCIÓN_NODO_" 
                  className="flex-1 bg-brand-black/50 border border-brand-cyan/30 px-6 py-4 font-mono text-sm uppercase tracking-widest outline-none focus:border-brand-cyan transition-colors"
                />
                <button className="bg-brand-red px-8 py-4 font-mono font-bold uppercase text-sm tracking-widest hover:bg-brand-red/80 transition-colors flex items-center justify-center gap-2">
                  INITIALIZE_CONNECTION <ArrowRight size={16} />
                </button>
              </div>
           </div>
        </section>
      </main>

      <footer className="mt-32 border-t border-brand-cyan/10 bg-brand-black/80 py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="col-span-1 md:col-span-2">
            <div className="font-display text-4xl mb-6">VOID//WEAR</div>
            <p className="font-sans text-sm text-white/50 max-w-sm leading-relaxed mb-8">
              ROPA AVANZADA PARA EL FUTURO DESCENTRALIZADO. DISEÑADA PARA ENTORNOS DE ALTO RIESGO Y REBELIÓN DIGITAL.
            </p>
            <div className="flex gap-4 font-mono text-[10px] tracking-widest text-brand-yellow uppercase">
              <a href="#" className="hover:underline">[TWITTER]</a>
              <a href="#" className="hover:underline">[INSTAGRAM]</a>
              <a href="#" className="hover:underline">[DISCORD]</a>
            </div>
          </div>
          
          <div>
            <h4 className="font-mono text-xs text-brand-cyan uppercase tracking-widest mb-6">ENLACES_SISTEMA</h4>
            <ul className="space-y-4 font-mono text-[11px] text-white/60 uppercase tracking-widest">
              <li><a href="#" className="hover:text-white transition-colors">[PROT_PRIVACIDAD]</a></li>
              <li><a href="#" className="hover:text-white transition-colors">[ESTADO_SISTEMA]</a></li>
              <li><a href="#" className="hover:text-white transition-colors">[NODOS_DATOS]</a></li>
              <li><a href="#" className="hover:text-white transition-colors">[MAPA_RED]</a></li>
            </ul>
          </div>

          <div>
             <h4 className="font-mono text-xs text-brand-cyan uppercase tracking-widest mb-6">ESTADO_RED</h4>
             <ul className="space-y-2 font-mono text-[10px] text-white/40 uppercase tracking-widest">
               <li>VOID_HQ:: SECTOR_04</li>
               <li>NEO_TOKYO_DISTRICT</li>
               <li>ENCRYPTED_COMMS_ONLY</li>
             </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-mono text-[10px] text-white/30 uppercase tracking-widest">
            © 2024 VOID//WEAR SYSTEM ADM. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-4 font-mono text-[10px] text-white/30 uppercase tracking-widest">
            <span>ESTADO_SISTEMA: <span className="text-green-500">NOMINAL</span></span>
            <span>V2.077.1</span>
          </div>
        </div>
      </footer>

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onUpdateQty={updateQty}
        onRemove={removeItem}
      />
    </div>
  );
}
