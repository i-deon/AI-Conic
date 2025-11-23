/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // [변경] Celestial Atlas 컬러 팔레트
        'atlas-bg': '#0B1026',      // 아주 깊은 밤하늘색 (Deep Navy)
        'atlas-blue': '#1E3A8A',    // 바다/우주색 (Indigo-900)
        'atlas-gold': '#F59E0B',    // 별, 나침반의 금색 (Amber-500)
        'atlas-soft': '#94A3B8',    // 지도 종이/은색 느낌 (Slate-400)
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite', // 천천히 도는 나침반용
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}