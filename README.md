<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# VOID//WEAR — Tienda Cyberpunk 2077

E-commerce de moda táctica ambientado en el universo cyberpunk. Construido con React, TypeScript, Tailwind CSS y Framer Motion.

---

## Correr el proyecto

**Requisitos:** Node.js

```bash
npm install
npm run dev
```

---

## Stack tecnológico

| Tecnología | Uso |
|---|---|
| React 18 + TypeScript | UI y tipado |
| Tailwind CSS v4 | Estilos y sistema de diseño |
| Framer Motion (`motion/react`) | Animaciones y transiciones |
| Lucide React | Íconos |
| Vite | Bundler y dev server |

---

## Estructura del proyecto

```
src/
├── App.tsx          — Componentes UI y lógica principal
├── constants.ts     — Productos, featured product y reviews
├── types.ts         — Interfaces TypeScript
├── index.css        — Sistema de diseño, keyframes y utilidades
└── main.tsx         — Entry point
```

---

## Sistema de diseño

### Paleta de colores

| Variable | Hex | Uso |
|---|---|---|
| `brand-black` | `#08090F` | Fondo principal |
| `brand-surface` | `#0F1120` | Superficies y cards |
| `brand-yellow` | `#FFE600` | CTAs primarios, stats |
| `brand-cyan` | `#00F0FF` | Bordes, neón, acentos |
| `brand-red` | `#FF003C` | Alertas, ticker, stock bajo |
| `brand-magenta` | `#FF00FF` | Featured product, acentos secundarios |
| `brand-purple` | `#9B00FF` | Efecto glitch (pseudo-elemento `::after`) |

### Tipografías

- **Display:** Bebas Neue — títulos y headings
- **Sans:** Barlow Condensed — cuerpo de texto
- **Mono:** JetBrains Mono — labels HUD, SKUs, precios

### Clip-paths

- `.clip-path-box` — esquinas angulares cortadas (12px), usado en cards y secciones
- `.clip-path-button` — corte diagonal en botones (8px)

---

## Componentes principales

### `Navbar`
Barra de navegación fija con:
- Logo VOID//WEAR con indicador de sistema online
- Links de categorías (visible en `lg+`)
- Buscador expansible con filtro en tiempo real
- Carrito con badge de cantidad
- Menú hamburger para mobile con animación `slideDown`

### `Hero`
Sección full-screen con:
- Imagen de fondo con efecto parallax (`useScroll` + `useTransform`)
- Overlay de scanlines dedicado (`opacity 0.08`)
- Título con efecto glitch CSS (pseudo-elementos `::before` cyan y `::after` purple)
- Coordenadas y datos HUD decorativos

### `Ticker`
Banner animado con loop perfecto: contenido duplicado + `x: ['0%', '-50%']` para evitar saltos visuales.

### `ProductCard`
Cards de producto con:
- HUD targeting corners (4 vértices en cyan, visibles en hover)
- Scan sweep: línea cian que barre la imagen verticalmente en hover
- Selector de tallas con estado activo
- Indicador de stock bajo (`< 5 unidades`) con `animate-pulse`
- Botón ADD_TO_RIG siempre visible en mobile, hover-only en desktop
- Entrada escalonada con `delay: index * 0.1`

### `CartSidebar`
Panel lateral del carrito con:
- Entrada con efecto glitch: `x: ['100%', '-2%', '1%', '0%']`
- Muestra talla seleccionada por ítem
- Botón `−` deshabilitado con `opacity-30` cuando cantidad = 1
- Ancho `w-full` en mobile, `max-w-md` en desktop

### `CountUp`
Contador animado con `useInView` (se dispara al entrar en viewport, una sola vez) y easing cúbico de 1.5s. Usado en la sección de estadísticas.

---

## Animaciones y efectos CSS

### Glitch (`glitch-clip-1` / `glitch-clip-2`)
Se dispara al 88–92% del ciclo (cada ~5 segundos). Usa `clip-path: inset()` y `transform: translate()` en pseudo-elementos con color diferente. Aplicar con clase `.glitch-text` y atributo `data-text="..."` en el elemento.

```html
<span class="glitch-text" data-text="TEXTO">TEXTO</span>
```

### Flicker (`flicker`)
Variaciones de opacidad irregulares que simulan neón real. Aplicado automáticamente en `.neon-text-cyan` y `.cyber-border`.

### Scan sweep (`scanSweep`)
Línea de 2px con gradiente cyan que traversa la imagen verticalmente. Se activa con `.group:hover .scan-sweep`.

### Hero scanlines (`.hero-scanlines`)
`repeating-linear-gradient` con líneas de 1px cada 4px, `opacity: 0.08`. Más intenso que el overlay global del `body::after`.

---

## Tipos

```typescript
interface Product {
  id: string;
  name: string;
  price: number;
  sku: string;
  image: string;
  category: 'CHAQUETAS' | 'PANTALONES' | 'ACCESORIOS' | 'CALZADO';
  sizes: string[];   // ["XS","S","M","L","XL"] | ["38"..."43"] | ["ÚNICO"]
  stock: number;     // < 5 activa indicador rojo parpadeante
}

interface CartItem extends Product {
  quantity: number;
  size: string;
  cartId: string;    // `${product.id}_${size}` — permite mismo producto en tallas distintas
}
```

---

## Funcionalidades e-commerce

| Feature | Estado |
|---|---|
| Filtro por categoría | ✅ |
| Búsqueda por nombre en tiempo real | ✅ |
| Selector de tallas por producto | ✅ |
| Carrito con persistencia de talla | ✅ |
| Indicador de stock bajo | ✅ |
| Newsletter con validación | ✅ |
| Menú mobile con hamburger | ✅ |
| Contador animado en estadísticas | ✅ |

---

## Cursor

Todos los elementos interactivos (`button`, `a`, `input`) usan `cursor: crosshair` definido en `index.css` para reforzar la estética HUD.
