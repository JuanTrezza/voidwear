export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-black':   '#08090F',
        'brand-surface': '#0F1120',
        'brand-yellow':  '#FFE600',
        'brand-cyan':    '#00F0FF',
        'brand-red':     '#FF003C',
        'brand-magenta': '#FF00FF',
        'brand-purple':  '#9B00FF',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        sans:    ['"Barlow Condensed"', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.05em',
        widest:  '0.2em',
      },
    },
  },
  plugins: [],
}
