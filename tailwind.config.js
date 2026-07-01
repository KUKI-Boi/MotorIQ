/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F6F0E5',
        surface: '#FFFDF9',
        card: '#FFFDFC',
        border: '#EAE1D3',
        navigation: '#EAE1D3', // Keep for backward compatibility with AppShell
        'text-primary': '#26140A',
        'text-secondary': '#6F5A4A',
        primary: '#26140A', // Changed primary to the dark industrial brown/black per constitution
        secondary: '#6F5A4A',
        accent: '#EE6C44',
        success: '#2E7D32',
        warning: '#E8A317',
        danger: '#D32F2F',
        info: '#3A7BD5',
        muted: '#A89F95',
        disabled: '#D4CFC7',
        hover: 'rgba(38, 20, 10, 0.05)',
        focus: '#EE6C44',
        selected: 'rgba(238, 108, 68, 0.1)',
        overlay: 'rgba(38, 20, 10, 0.4)',
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
