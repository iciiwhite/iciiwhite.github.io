export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif']
      },
      colors: {
        ink: '#0a0a0a'
      },
      transitionTimingFunction: {
        silk: 'cubic-bezier(0.16, 1, 0.3, 1)'
      }
    }
  },
  plugins: []
}