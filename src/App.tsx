import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'motion/react';
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
  Terminal,
  ArrowRight,
} from 'lucide-react';
import { PRODUCTS, FEATURED_PRODUCT, REVIEWS } from './constants';
import { Product, CartItem } from './types';

// ─── Utility Components ──────────────────────────────────────────────────────

const CyberButton = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  disabled = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'alert' | 'ghost';
  className?: string;
  disabled?: boolean;
}) => {
  const variants = {
    primary:   'bg-brand-yellow text-black hover:bg-brand-yellow/80',
    secondary: 'bg-brand-cyan text-black hover:bg-brand-cyan/80',
    alert:     'bg-brand-red text-white hover:bg-brand-red/80',
    ghost:     'border border-brand-cyan text-brand-cyan hover:bg-brand-cyan/10',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`clip-path-button px-6 py-2 font-mono font-bold uppercase transition-all duration-300 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

const SectionTitle = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-8 border-l-4 border-brand-cyan pl-4">
    <p className="font-mono text-xs text-brand-cyan tracking-widest uppercase mb-1 neon-text-cyan">
      {subtitle || '// DATA_ENTRY'}
    </p>
    <h2 className="font-display text-4xl tracking-tight uppercase">{title}</h2>
  </div>
);

// ─── CountUp ─────────────────────────────────────────────────────────────────

const CountUp = ({ end, format }: { end: number; format: (n: number) => string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const startTime = performance.now();
    const duration = 1500;
    const tick = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(eased * end);
      if (t < 1) requestAnimationFrame(tick);
      else setValue(end);
    };
    requestAnimationFrame(tick);
  }, [isInView, end]);

  return <span ref={ref}>{format(value)}</span>;
};

// ─── Navbar ──────────────────────────────────────────────────────────────────

const Navbar = ({
  onCartOpen,
  cartCount,
  isSearchOpen,
  onSearchToggle,
  searchQuery,
  onSearchChange,
}: {
  onCartOpen: () => void;
  cartCount: number;
  isSearchOpen: boolean;
  onSearchToggle: () => void;
  searchQuery: string;
  onSearchChange: (v: string) => void;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
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
              <a key={item} href="#" className="hover:text-brand-cyan transition-colors">
                [{item}]
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <AnimatePresence>
            {isSearchOpen && (
              <motion.input
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 180, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                type="text"
                placeholder="BUSCAR_UNIDAD_"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="bg-brand-black border border-brand-cyan/40 px-3 py-1 font-mono text-xs uppercase tracking-widest outline-none focus:border-brand-cyan text-white h-8"
                autoFocus
              />
            )}
          </AnimatePresence>

          <button
            className="p-2 hover:bg-brand-cyan/10 transition-colors"
            onClick={onSearchToggle}
            aria-label="Buscar productos"
          >
            <Search size={18} />
          </button>
          <button
            className="p-2 hover:bg-brand-cyan/10 transition-colors relative"
            onClick={onCartOpen}
            aria-label="Abrir carrito de compras"
          >
            <ShoppingCart size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-red text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
          <button
            className="p-2 hover:bg-brand-cyan/10 transition-colors"
            aria-label="Perfil de usuario"
          >
            <User size={18} />
          </button>
          <button
            className="lg:hidden p-2 hover:bg-brand-cyan/10 transition-colors"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label={isMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[65px] left-0 right-0 z-40 bg-brand-black/95 backdrop-blur-md border-b border-brand-cyan/20 lg:hidden"
          >
            <div className="flex flex-col px-6 py-2">
              {['CHAQUETAS', 'PANTALONES', 'ACCESORIOS', 'CATÁLOGO'].map((item) => (
                <a
                  key={item}
                  href="#"
                  onClick={() => setIsMenuOpen(false)}
                  className="font-mono text-sm tracking-widest uppercase py-4 border-b border-brand-cyan/10 last:border-b-0 hover:text-brand-cyan transition-colors flex items-center justify-between"
                >
                  [{item}]
                  <ChevronRight size={14} className="text-brand-cyan" />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ─── Hero ─────────────────────────────────────────────────────────────────────

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden pt-20"
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          src="https://i.imgur.com/xjL30lS.png"
          alt="Cyberpunk Street"
          className="w-full h-full object-cover opacity-60 scale-110"
          style={{
            filter: 'contrast(1.2) saturate(0.6) brightness(0.85)',
            y: imgY,
          }}
        />
        {/* Stronger scanlines on hero only */}
        <div className="absolute inset-0 hero-scanlines pointer-events-none z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/40 via-transparent to-brand-black" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-4"
      >
        <p className="neon-text-cyan font-mono tracking-[0.5em] uppercase mb-4 drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]">
          // DISTRITO 7 DE NIGHT CITY // COLECCIÓN 2077
        </p>
        <h1 className="font-display text-5xl sm:text-7xl md:text-9xl leading-[0.85] tracking-tight mb-8 uppercase max-w-4xl mx-auto italic drop-shadow-2xl">
          <span className="glitch-text" data-text="DRESS FOR THE">DRESS FOR THE</span>
          <br />
          <span className="text-brand-yellow drop-shadow-[0_0_20px_rgba(255,230,0,0.3)]">APOCALYPSE</span>
        </h1>

        <div className="flex flex-col items-center gap-6">
          <CyberButton className="text-xl px-12 py-4">INITIALIZE_LOADOUT</CyberButton>
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
          <div className="absolute -top-1 -left-1 w-2 h-2 bg-brand-cyan" />
          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-brand-cyan" />
          <div className="p-2 space-y-1">
            <div className="w-full h-1 bg-brand-cyan/20" />
            <div className="w-2/3 h-1 bg-brand-cyan/20" />
            <div className="w-3/4 h-1 bg-brand-cyan/20" />
            <div className="w-full h-1 bg-brand-cyan/20" />
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Ticker ───────────────────────────────────────────────────────────────────

const Ticker = () => {
  const base = Array(15).fill('NUEVO LANZAMIENTO // EQUIPO TÁCTICO // STOCK LIMITADO // ').join('');
  return (
    <div className="bg-brand-red py-2 overflow-hidden border-y border-brand-red z-20 relative">
      <motion.div
        className="font-display text-sm tracking-widest uppercase text-white whitespace-nowrap will-change-transform"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {base}{base}
      </motion.div>
    </div>
  );
};

// ─── ProductCard ──────────────────────────────────────────────────────────────

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product, size: string) => void;
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAdd, index = 0 }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const lowStock = product.stock > 0 && product.stock < 5;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative"
    >
      <div className="aspect-[4/5] overflow-hidden bg-brand-surface border border-brand-cyan/10 relative">
        {/* HUD targeting corners */}
        <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-brand-cyan z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-brand-cyan z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-brand-cyan z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-brand-cyan z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

        {/* Scan sweep */}
        <div className="scan-sweep" />

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
          style={{ filter: 'contrast(1.2) saturate(0.6) brightness(0.85)' }}
        />
        <div className="absolute top-2 left-2 bg-brand-cyan/20 px-2 py-0.5 font-mono text-[8px] text-brand-cyan backdrop-blur-sm">
          {product.sku}
        </div>
        {lowStock && (
          <div className="absolute top-2 right-2 bg-brand-red/80 px-2 py-0.5 font-mono text-[8px] text-white animate-pulse">
            UNIDADES_RESTANTES: {product.stock}
          </div>
        )}
        {/* ADD_TO_RIG: always visible on mobile, hover-only on sm+ */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black to-transparent opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
          <CyberButton
            variant="ghost"
            className="w-full text-xs py-1"
            onClick={() => onAdd(product, selectedSize)}
          >
            ADD_TO_RIG
          </CyberButton>
        </div>
      </div>

      {/* Size selector */}
      {product.sizes.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size === selectedSize ? '' : size)}
              className={`font-mono text-[9px] px-2 py-0.5 border transition-all ${
                selectedSize === size
                  ? 'bg-brand-cyan text-black border-brand-cyan'
                  : 'border-brand-cyan/20 text-white/40 hover:border-brand-cyan/60 hover:text-white/70'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      )}

      <div className="mt-2 flex justify-between items-start">
        <div>
          <h3 className="font-display text-xl uppercase tracking-tight">{product.name}</h3>
          <p className="font-mono text-[10px] text-brand-cyan uppercase tracking-widest">
            UNIT_PRICE: ${product.price.toFixed(2)}
          </p>
        </div>
        <Cpu className="text-brand-cyan opacity-20 mt-1" size={16} />
      </div>
    </motion.div>
  );
};

// ─── CartSidebar ─────────────────────────────────────────────────────────────

const CartSidebar = ({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemove,
}: {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (cartId: string, delta: number) => void;
  onRemove: (cartId: string) => void;
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
            animate={{ x: ['100%', '-2%', '1%', '0%'] }}
            transition={{ duration: 0.45, times: [0, 0.75, 0.875, 1] }}
            exit={{ x: '100%', transition: { duration: 0.2 } }}
            className="fixed right-0 top-0 bottom-0 w-full md:max-w-md bg-brand-surface z-[101] border-l border-brand-cyan/20 p-8 flex flex-col"
          >
            <div className="flex items-center justify-between mb-8 border-b border-brand-cyan/20 pb-4">
              <h2 className="font-display text-3xl uppercase tracking-tighter">
                <span className="text-brand-cyan select-none mr-2">{'>'}</span>
                RESUMEN_EQUIPAMIENTO //
              </h2>
              <button
                onClick={onClose}
                aria-label="Cerrar carrito"
                className="p-2 hover:bg-brand-cyan/10 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6 pr-2">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-white/30 font-mono text-sm uppercase tracking-widest">
                  <Terminal className="mb-4 opacity-50" size={48} />
                  EQUIPAMIENTO_VACÍO
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.cartId} className="flex gap-4 border border-brand-cyan/10 p-4 bg-brand-black/40">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover flex-none"
                      style={{ filter: 'contrast(1.2) saturate(0.6) brightness(0.85)' }}
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display text-lg uppercase leading-none mb-1">{item.name}</h4>
                      {item.size && (
                        <p className="font-mono text-[9px] text-white/40 uppercase tracking-widest mb-1">
                          TALLA: {item.size}
                        </p>
                      )}
                      <p className="font-mono text-xs text-brand-cyan mb-3">${item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-brand-cyan/20">
                          <button
                            onClick={() => onUpdateQty(item.cartId, -1)}
                            disabled={item.quantity <= 1}
                            aria-label="Disminuir cantidad"
                            className={`p-1 transition-colors ${
                              item.quantity <= 1
                                ? 'opacity-30 cursor-not-allowed'
                                : 'hover:bg-brand-cyan/10'
                            }`}
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center font-mono text-xs">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQty(item.cartId, 1)}
                            aria-label="Aumentar cantidad"
                            className="p-1 hover:bg-brand-cyan/10 transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <button
                          onClick={() => onRemove(item.cartId)}
                          className="text-[10px] font-mono text-brand-red uppercase tracking-widest hover:underline underline-offset-4"
                        >
                          REMOVER
                        </button>
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

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [cartItems, setCartItems]         = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen]       = useState(false);
  const [filter, setFilter]               = useState('TODO');
  const [isSearchOpen, setIsSearchOpen]   = useState(false);
  const [searchQuery, setSearchQuery]     = useState('');
  const [featuredSize, setFeaturedSize]   = useState('');
  const [newsletterEmail, setNewsletterEmail]   = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const addToCart = (product: Product, size: string = '') => {
    const cartId = `${product.id}_${size}`;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.cartId === cartId);
      if (existing) {
        return prev.map((item) =>
          item.cartId === cartId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1, size, cartId }];
    });
    setIsCartOpen(true);
  };

  const updateQty = (cartId: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.cartId === cartId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (cartId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const handleSearchToggle = () => {
    setIsSearchOpen((prev) => {
      if (prev) setSearchQuery('');
      return !prev;
    });
  };

  const handleNewsletter = () => {
    if (!newsletterEmail.trim()) {
      setNewsletterStatus('error');
      return;
    }
    setNewsletterStatus('success');
    setNewsletterEmail('');
    setTimeout(() => setNewsletterStatus('idle'), 6000);
  };

  const filteredProducts = PRODUCTS
    .filter((p) => filter === 'TODO' || p.category === filter)
    .filter((p) => !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen bg-brand-black relative">
      {/* Background grid */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(to right, #00F0FF 1px, transparent 1px), linear-gradient(to bottom, #00F0FF 1px, transparent 1px)',
            backgroundSize: '100px 100px',
          }}
        />
      </div>

      <Navbar
        onCartOpen={() => setIsCartOpen(true)}
        cartCount={cartItems.length}
        isSearchOpen={isSearchOpen}
        onSearchToggle={handleSearchToggle}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <Hero />
      <Ticker />

      <main className="max-w-7xl mx-auto px-6 py-24 relative z-10">

        {/* ── Inventory ── */}
        <section id="inventory">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
            <SectionTitle title="CURRENT_INVENTORY" subtitle="// STOCK_STATUS: READY" />

            <div className="flex flex-wrap gap-2 font-mono text-[10px] tracking-widest">
              {['TODO', 'CHAQUETAS', 'PANTALONES', 'CALZADO', 'ACCESORIOS'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-1.5 border transition-all ${
                    filter === cat
                      ? 'bg-brand-yellow text-black border-brand-yellow'
                      : 'border-brand-cyan/30 text-white/50 hover:border-brand-cyan'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="py-24 text-center font-mono text-sm text-white/30 uppercase tracking-widest">
              {'>'} SIN_RESULTADOS // MODIFICA_FILTROS
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} onAdd={addToCart} index={index} />
              ))}
            </div>
          )}
        </section>

        {/* ── Featured ── */}
        <section className="mt-32 border-t border-brand-cyan/10 pt-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 border border-brand-magenta/30 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative aspect-square overflow-hidden bg-brand-surface clip-path-box">
                <img
                  src={FEATURED_PRODUCT.image}
                  alt={FEATURED_PRODUCT.name}
                  className="w-full h-full object-cover"
                  style={{ filter: 'contrast(1.2) saturate(0.6) brightness(0.85)' }}
                />
                <div className="absolute top-4 left-4 bg-brand-magenta/80 px-4 py-1 font-mono text-xs uppercase italic drop-shadow-lg">
                  // FEATURED_UNIT_OF_THE_WEEK
                </div>
                {FEATURED_PRODUCT.stock < 5 && (
                  <div className="absolute bottom-4 left-4 bg-brand-red/80 px-3 py-1 font-mono text-[10px] text-white animate-pulse">
                    UNIDADES_RESTANTES: {FEATURED_PRODUCT.stock}
                  </div>
                )}
              </div>
            </div>

            <div>
              <p className="font-mono text-brand-yellow tracking-widest uppercase mb-2">
                {'>'} DATA_ENTRY: {FEATURED_PRODUCT.sku}
              </p>
              <h2 className="font-display text-6xl md:text-8xl leading-none uppercase mb-8">
                {FEATURED_PRODUCT.name}
              </h2>

              <div className="space-y-4 mb-8 font-mono text-xs uppercase tracking-widest text-white/70">
                {FEATURED_PRODUCT.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex justify-between border-b border-brand-cyan/10 pb-2"
                  >
                    <span className="text-brand-cyan">[{spec.label}]:</span>
                    <span>{spec.value}</span>
                  </div>
                ))}
              </div>

              {/* Featured size selector */}
              <div className="mb-6">
                <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-2">
                  SELECCIONAR_TALLA:
                </p>
                <div className="flex flex-wrap gap-2">
                  {FEATURED_PRODUCT.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setFeaturedSize(size === featuredSize ? '' : size)}
                      className={`font-mono text-[10px] px-4 py-1.5 border transition-all ${
                        featuredSize === size
                          ? 'bg-brand-yellow text-black border-brand-yellow'
                          : 'border-brand-cyan/30 text-white/50 hover:border-brand-cyan'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <CyberButton
                variant="alert"
                className="w-full py-6 text-2xl"
                onClick={() => addToCart(FEATURED_PRODUCT, featuredSize)}
              >
                ADQUIRIR_ACTIVO // ${FEATURED_PRODUCT.price.toFixed(2)}
              </CyberButton>
            </div>
          </div>
        </section>

        {/* ── Stats Bar ── */}
        <section className="mt-32 bg-brand-yellow py-10 px-12 grid grid-cols-1 md:grid-cols-3 gap-12 text-black clip-path-box">
          <div className="text-center md:text-left border-b md:border-b-0 md:border-r border-black/10 pb-8 md:pb-0">
            <div className="flex items-center justify-center md:justify-start gap-4">
              <span className="font-display text-5xl">
                <CountUp end={12847} format={(n) => Math.floor(n).toLocaleString('de-DE')} />
              </span>
              <div className="font-mono text-[10px] uppercase leading-tight">
                unidades<br />desplegadas
              </div>
            </div>
          </div>
          <div className="text-center md:text-left border-b md:border-b-0 md:border-r border-black/10 pb-8 md:pb-0">
            <div className="flex items-center justify-center md:justify-start gap-4">
              <span className="font-display text-5xl">
                <CountUp end={99.8} format={(n) => n.toFixed(1) + '%'} />
              </span>
              <div className="font-mono text-[10px] uppercase leading-tight">
                satisfaccion<br />operativa
              </div>
            </div>
          </div>
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-4">
              <span className="font-display text-5xl">
                <CountUp end={402} format={(n) => Math.floor(n).toString()} />
              </span>
              <div className="font-mono text-[10px] uppercase leading-tight">
                tiempo máx.<br />entrega
              </div>
            </div>
          </div>
        </section>

        {/* ── Reviews ── */}
        <section className="mt-32">
          <div className="text-center mb-16">
            <p className="neon-text-cyan font-mono text-[10px] tracking-[0.4em] uppercase mb-2">
              // REVISION_OPERADOR::
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map((review) => (
              <div
                key={review.id}
                className="bg-brand-surface/30 border border-brand-cyan/10 p-6 relative group hover:border-brand-cyan/40 transition-colors"
              >
                <div className="flex gap-1 mb-4">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-1 ${i < review.rating ? 'bg-brand-yellow' : 'bg-white/10'}`}
                      />
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

        {/* ── CTA / Newsletter ── */}
        <section className="mt-32 relative overflow-hidden bg-white/5 py-24 px-12 clip-path-box border border-white/5">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-magenta/40 via-transparent to-transparent" />
          </div>
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <h2 className="font-display text-6xl uppercase tracking-widest mb-4">ÚNETE A LA RED</h2>
            <p className="font-mono text-xs text-white/50 tracking-widest uppercase mb-12">
              // RECIBE INTEL SOBRE NUEVOS LANZAMIENTOS Y EQUIPO TÁCTICO
            </p>

            <AnimatePresence mode="wait">
              {newsletterStatus === 'success' ? (
                <motion.p
                  key="success"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="neon-text-cyan font-mono text-sm tracking-widest uppercase py-4"
                >
                  {'>'} CONEXIÓN_ESTABLECIDA // NODO_REGISTRADO
                </motion.p>
              ) : (
                <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="flex flex-col sm:flex-row gap-0">
                    <input
                      type="text"
                      placeholder="INGRESAR_DIRECCIÓN_NODO_"
                      value={newsletterEmail}
                      onChange={(e) => {
                        setNewsletterEmail(e.target.value);
                        setNewsletterStatus('idle');
                      }}
                      onKeyDown={(e) => e.key === 'Enter' && handleNewsletter()}
                      className={`flex-1 bg-brand-black/50 border ${
                        newsletterStatus === 'error' ? 'border-brand-red' : 'border-brand-cyan/30'
                      } px-6 py-4 font-mono text-sm uppercase tracking-widest outline-none focus:border-brand-cyan transition-colors`}
                    />
                    <button
                      onClick={handleNewsletter}
                      className="bg-brand-red px-8 py-4 font-mono font-bold uppercase text-sm tracking-widest hover:bg-brand-red/80 transition-colors flex items-center justify-center gap-2"
                    >
                      INITIALIZE_CONNECTION <ArrowRight size={16} />
                    </button>
                  </div>
                  {newsletterStatus === 'error' && (
                    <p className="font-mono text-brand-red text-[10px] tracking-widest uppercase mt-2 text-left">
                      {'>'} ERROR: DIRECCIÓN_DE_NODO_INVÁLIDA
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
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
            <h4 className="font-mono text-xs text-brand-cyan uppercase tracking-widest mb-6">
              ENLACES_SISTEMA
            </h4>
            <ul className="space-y-4 font-mono text-[11px] text-white/60 uppercase tracking-widest">
              <li><a href="#" className="hover:text-white transition-colors">[PROT_PRIVACIDAD]</a></li>
              <li><a href="#" className="hover:text-white transition-colors">[ESTADO_SISTEMA]</a></li>
              <li><a href="#" className="hover:text-white transition-colors">[NODOS_DATOS]</a></li>
              <li><a href="#" className="hover:text-white transition-colors">[MAPA_RED]</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs text-brand-cyan uppercase tracking-widest mb-6">
              ESTADO_RED
            </h4>
            <ul className="space-y-2 font-mono text-[10px] text-white/40 uppercase tracking-widest">
              <li>VOID_HQ:: SECTOR_04</li>
              <li>NEO_TOKYO_DISTRICT</li>
              <li>ENCRYPTED_COMMS_ONLY</li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-mono text-[10px] text-white/30 uppercase tracking-widest">
            © 2077 VOID//WEAR SYSTEM ADM. ALL RIGHTS RESERVED.
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
