import tailwindcssAnimate from "tailwindcss-animate";
import { Config } from 'tailwindcss';  

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0BBB8A',
        secondary: '#FFA500',
        accent: '#F88787',
        danger: '#D43B3B',
        warning: '#F5C449',
        bgdark: '#02042C',
        textprimary: '#034B72',
        yellowlish: '#FFD300',
        // sidebar: {
        //   DEFAULT: 'hsl(var(--sidebar-background))',
        //   foreground: 'hsl(var(--sidebar-foreground))',
        //   primary: 'hsl(var(--sidebar-primary))',
        //   'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
        //   accent: 'hsl(var(--sidebar-accent))',
        //   'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
        //   border: 'hsl(var(--sidebar-border))',
        //   ring: 'hsl(var(--sidebar-ring))',
        // },
      },
      // Ensure borderRadius extension works if you want to use CSS vars
    //   borderRadius: {
    //     lg: 'var(--radius)',
    //     md: 'calc(var(--radius) - 2px)',
    //     sm: 'calc(var(--radius) - 4px)',
    //   },
    },
  },
  plugins: [tailwindcssAnimate],
  darkMode: 'class', // or 'media' depending on your preference
};

export default config;
