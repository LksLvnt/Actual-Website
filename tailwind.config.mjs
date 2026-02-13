/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0a',
        'bg-alt': '#111111',
        primary: '#ff006e',
        secondary: '#8338ec',
        accent: '#00f5ff',
        warning: '#ffbe0b',
        text: '#f0f0f0',
        'text-muted': '#b0b0b0',
      },
      fontFamily: {
        graffiti: ['"Permanent Marker"', 'cursive'],
        display: ['"Bebas Neue"', 'sans-serif'],
        chunky: ['"Rubik Mono One"', 'sans-serif'],
        racing: ['"Racing Sans One"', 'sans-serif'],
      },
      keyframes: {
        neonGlow: {
          '0%, 100%': { textShadow: '0 0 5px #00f5ff, 0 0 10px #00f5ff' },
          '50%': { textShadow: '0 0 10px #00f5ff, 0 0 20px #00f5ff, 0 0 30px #00f5ff' },
        },
        blink: {
          '50%': { opacity: '0' },
        },
        konamiRainbow: {
          '0%': { filter: 'hue-rotate(0deg)' },
          '100%': { filter: 'hue-rotate(360deg)' },
        },
        konamiSpin: {
          '0%': { transform: 'perspective(500px) rotateY(0deg)' },
          '100%': { transform: 'perspective(500px) rotateY(360deg)' },
        },
      },
      animation: {
        'neon-glow': 'neonGlow 2s ease-in-out infinite',
        blink: 'blink 0.7s step-end infinite',
        'konami-rainbow': 'konamiRainbow 0.5s linear infinite',
        'konami-spin': 'konamiSpin 1s ease-in-out',
      },
    },
  },
  plugins: [],
};
