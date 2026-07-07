/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        surface: 'var(--surface)',
        card: 'var(--card)',
        border: 'var(--border)',
        navigation: 'var(--navigation)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        danger: 'var(--danger)',
        info: 'var(--info)',
        muted: 'var(--muted)',
        disabled: 'var(--disabled)',
        hover: 'var(--hover)',
        focus: 'var(--focus)',
        selected: 'var(--selected)',
        overlay: 'var(--overlay)',
      },
      fontFamily: {
        aquire: ['Aquire', 'sans-serif'],
        sora: ['Sora', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 8px -2px rgba(38, 20, 10, 0.05), 0 4px 16px -4px rgba(38, 20, 10, 0.05)',
        'modal': '0 10px 40px -10px rgba(38, 20, 10, 0.15), 0 20px 80px -20px rgba(38, 20, 10, 0.15)',
        'floating': '0 8px 30px rgba(38, 20, 10, 0.12)',
      },
      zIndex: {
        'base': '0',
        'dropdown': '100',
        'sticky': '200',
        'overlay': '300',
        'modal': '400',
        'toast': '500',
      },
      transitionDuration: {
        'fast': '150ms',
        'normal': '250ms',
        'slow': '350ms',
      },
      transitionTimingFunction: {
        'bounce-sm': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
    },
  },
  plugins: [],
}
