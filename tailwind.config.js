/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          // LIGHT MODE: White & Deep Green (Clean, Corporate)
          primary: '#ffffff',      // Pure White Background
          secondary: '#E8F5E9',    // Soft cool-green tint for sections/alternating rows
          accent: '#16A34A',       // Deep Corporate Green for CTAs and highlights
          highlight: '#15803D',    // Darker green for hover states/buttons
          text: '#052e16',         // Near-black deep forest green for body text

          // DARK MODE: Black & Green Combination (unchanged)
          darkBg: '#000000',       // Deep Black Background
          darkCard: '#0A0A0A',     // Slightly lighter black for cards/elevated elements
          darkText: '#F0FFF4',     // Mint White for dark mode text
          darkAccent: '#59FF73',   // Spring Green for icons/glows
        }
      },
      boxShadow: {
        '3d': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05), 0px 4px 0px 0px #15803D',
        '3d-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0px 6px 0px 0px #16A34A',
        'glow': '0 0 20px -5px rgba(22, 163, 74, 0.3)',
      },
      keyframes: {
        'line-left': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'line-right': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-green': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        }
      },
      animation: {
        'line-left': 'line-left 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'line-right': 'line-right 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'shimmer': 'shimmer 2s infinite linear',
        'infinite-scroll': 'infinite-scroll 30s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-green': 'pulse-green 2s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          // LIGHT MODE: White & Deep Green (Clean, Corporate)
          primary: '#ffffff',      // Pure White Background
          secondary: '#E8F5E9',    // Soft cool-green tint for sections/alternating rows
          accent: '#16A34A',       // Deep Corporate Green for CTAs and highlights
          highlight: '#15803D',    // Darker green for hover states/buttons
          text: '#052e16',         // Near-black deep forest green for body text

          // DARK MODE: Black & Green Combination (unchanged)
          darkBg: '#000000',       // Deep Black Background
          darkCard: '#0A0A0A',     // Slightly lighter black for cards/elevated elements
          darkText: '#F0FFF4',     // Mint White for dark mode text
          darkAccent: '#59FF73',   // Spring Green for icons/glows
        }
      },
      boxShadow: {
        '3d': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05), 0px 4px 0px 0px #15803D',
        '3d-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0px 6px 0px 0px #16A34A',
        'glow': '0 0 20px -5px rgba(22, 163, 74, 0.3)',
      },
      keyframes: {
        'line-left': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'line-right': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-green': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        }
      },
      animation: {
        'line-left': 'line-left 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'line-right': 'line-right 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'shimmer': 'shimmer 2s infinite linear',
        'infinite-scroll': 'infinite-scroll 30s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-green': 'pulse-green 2s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}