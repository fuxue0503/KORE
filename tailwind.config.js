/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#060918", // Deep blue/black
        surface: "#0B1120",    // Slightly lighter blue
        surfaceHover: "#151F38", // Hover state
        border: "#1E2A4F",     // Subtle blue border
        borderHover: "#2D3E73", // Hover border
        cyanHighlight: '#00f5ff',
        textMain: "#E2E8F0",   // Slate 200
        textMuted: "#94A3B8",  // Slate 400
        textHeader: "#F8FAFC", // Slate 50
        primary: "#3A82F6",    // Tech Blue
        accent: "#8B5CF6",     // Purple
        danger: "#EF4444",     // Red
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
        '3xl': '32px',
      },
      boxShadow: {
        'glow-primary': '0 0 20px -5px rgba(58, 130, 246, 0.4)',
        'glow-accent': '0 0 20px -5px rgba(139, 92, 246, 0.4)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      }
    },
  },
  plugins: [],
}
