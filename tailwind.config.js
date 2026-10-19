export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif']
      },
      colors: {
        ink: '#05060a'
      },
      animation: {
        aurora: 'aurora 22s ease-in-out infinite',
        'pulse-slow': 'pulseSlow 4s ease-in-out infinite'
      },
      keyframes: {
        aurora: {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '33%': { transform: 'translate3d(40px,-30px,0) scale(1.08)' },
          '66%': { transform: 'translate3d(-30px,20px,0) scale(0.96)' }
        },
        pulseSlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.55' }
        }
      }
    }
  },
  plugins: []
}