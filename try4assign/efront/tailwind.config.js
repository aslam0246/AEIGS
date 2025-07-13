export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#60A5FA',
          DEFAULT: '#3B82F6',
          dark: '#2563EB',
        },
        secondary: {
          light: '#10B981',
          DEFAULT: '#059669',
          dark: '#047857',
        },
      },
    },
  },
  plugins: [],
}