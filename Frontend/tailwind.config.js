/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    extend: {
      keyframes: {
        rotate: {
          '0%': { transform: 'perspective(1000px) rotateY(0deg)'},
          '100%': { transform: 'perspective(1000px) rotateY(360deg)'}
        }
      },
      animation: {
        rotate: 'rotate 30s linear infinite',
      },  


      colors: {
        main: '#1F509A',
        light: '#656262',
        // prime: '#1A9CA6', 
        lightSky: '#F7FBFF',
        dark: '#001E3A',
        white: '#ffffff',  // Standard white color
        black: '#000000',  // Standard black color
        yellow:'#f9e666'
      },
      fontFamily: {
        strong: ['strong_girl', '!important'],
        p1:["Poppins","sans-serif"],
        poppins: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'prime': 'linear-gradient(to right, #1F509A, #3b76d0)', 
      },
    
    },
  },
  plugins: [],
}