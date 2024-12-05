import tailwindcssAnimate from "tailwindcss-animate";

const config: {
  plugins: { handler: () => void }[];
  theme: {
    extend: {
      colors: {
        secondary: string;
        textprimary: string;
        warning: string;
        yellowlish: string;
        danger: string;
        accent: string;
        bgdark: string;
        primary: string;
      };
    };
  };
  content: string[];
} = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0BBB8A",
        secondary: "#FFA500",
        accent: "#F88787",
        danger: "#D43B3B",
        warning: "#F5C449",
        bgdark: "#02042C",
        textprimary: "#034B72",
        yellowlish: "#FFD300",
        // sidebar: {
        // 	DEFAULT: 'hsl(var(--sidebar-background))',
        // 	foreground: 'hsl(var(--sidebar-foreground))',
        // 	primary: 'hsl(var(--sidebar-primary))',
        // 	'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
        // 	accent: 'hsl(var(--sidebar-accent))',
        // 	'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
        // 	border: 'hsl(var(--sidebar-border))',
        // 	ring: 'hsl(var(--sidebar-ring))'
        // }
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
export default config;
