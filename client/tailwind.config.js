/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cuorange: {
          500: '#f48c06',
        },
        
    },
    fontFamily: {
      'noto-serif': ['Noto Serif', 'serif'],
    },
  },
  plugins: [],
}
}

