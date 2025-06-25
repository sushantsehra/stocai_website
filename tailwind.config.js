/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-quattrocento)', 'serif'],
        gotham: ['Gotham', 'sans-serif'],
        mona: ['Mona Sans', 'sans-serif'],
        quattrocento: ['var(--font-quattrocento)', 'serif'],
      },
      colors: {
        "primary": {
          500: '#54B0AF',
        },
      },
    },
  },
  plugins: [],
}; 