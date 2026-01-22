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
        // ✅ Add these two lines
        jakarta: ['var(--font-jakarta)', 'sans-serif'],
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
      },
      colors: {
        primary: {
          500: '#54B0AF',
        },
      },
    },
  },
  plugins: [],
};

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       fontFamily: {
//         sans: ['var(--font-quattrocento)', 'serif'],
//         gotham: ['Gotham', 'sans-serif'],
//         mona: ['Mona Sans', 'sans-serif'],
//         quattrocento: ['var(--font-quattrocento)', 'serif'],
//         jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
//         montserrat: ['Montserrat', 'sans-serif'],
//       },
//       colors: {
//         "primary": {
//           500: '#54B0AF',
//         },
//       },
//     },
//   },
//   plugins: [],
// }; 