/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F9FAFB", // Very light gray/off-white
        surface: "#FFFFFF",    // Pure white for bento boxes
        surfaceHover: "#F3F4F6", // Gray 100
        border: "#E5E7EB",     // Light gray for borders (Gray 200)
        borderHover: "#D1D5DB", // Gray 300
        cyanHighlight: '#0891B2', // Cyan 600 - darker for readability on light bg
        textMain: "#111827",   // Gray 900 - Dark text
        textMuted: "#6B7280",  // Gray 500 - Secondary text
        textHeader: "#000000", // Pure black for strong headers
        primary: "#2563EB",    // Blue 600
        accent: "#7C3AED",     // Violet 600
        danger: "#DC2626",     // Red 600
        success: "#059669",    // Emerald 600
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      borderRadius: {
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
        '3xl': '32px',
      },
      boxShadow: {
        // Soft, elegant shadows for Light Mode Bento Grid
        'glow-primary': '0 4px 20px -5px rgba(37, 99, 235, 0.2)',
        'glow-cyan': '0 4px 20px -5px rgba(8, 145, 178, 0.2)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.05)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
        'bento': '0px 2px 4px rgba(0, 0, 0, 0.02), 0px 4px 12px rgba(0, 0, 0, 0.04)',
        'bento-hover': '0px 4px 8px rgba(0, 0, 0, 0.04), 0px 8px 24px rgba(0, 0, 0, 0.08)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.6) 100%)',
        'shimmer': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
        'grid-pattern': 'radial-gradient(rgba(0, 0, 0, 0.08) 1px, transparent 1px)',
      },
      animation: {
        'shimmer': 'shimmer 2.5s infinite linear',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
        'text-reveal': 'text-reveal 1.5s cubic-bezier(0.77, 0, 0.175, 1) 0.5s both',
      },
      keyframes: {
        // ... (Keep existing keyframes)
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        'border-beam': {
          '100%': { 'offset-distance': '100%' },
        },
        'text-reveal': {
          '0%': { opacity: '0', transform: 'translateY(100%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
