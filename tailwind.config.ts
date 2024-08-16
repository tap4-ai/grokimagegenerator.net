import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontSize: {
        xxs: '0.625rem',
      },
      colors: {
        'dark-bg': '#1E1B24',
        'card-black': '#141516',
        'main-black': '#222129',
        'main-green': '#8AEFB9',
        'main-gray': '#2F2F2F',
        'dark-gray': '#232528',
        'main-purple': '#494465',
        'main-yellow': '#F9EDC2',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      backgroundImage: {
        'gradient-pricing-section': 'linear-gradient(180deg, rgba(44, 45, 54, 0.70) 75%, rgba(34, 33, 41, 0.70) 100%)',
        'gradient-price-diamond-text':
          'linear-gradient(178deg, #FFD3F5 8.39%, #ECF3FF 34.77%, #ECF3FF 54.13%, rgba(255, 211, 245, 0.00) 78.31%)',
        'gradient-price-text':
          'linear-gradient(181deg, #FFF -57.72%, #ECF3FF 30.89%, rgba(255, 211, 245, 0.00) 80.41%)',
        'gradient-faded-out': 'linear-gradient(180deg, rgba(34, 33, 41, 0.00) 0%, #222129 100%)',
        'gradient-step-section': 'linear-gradient(180deg, #141516 0%, #000 27.5%, #000 87%, #141516 100%)',
        'gradient-main': 'linear-gradient(280deg, #4EE794 -25.06%, #FFF 53.21%, #F32FF7 146.98%)',
        'gradient-form':
          'linear-gradient(270deg, rgba(20, 21, 22, 0.70)0%, rgba(0, 0, 0, 0.70)13.5%, rgba(0, 0, 0, 0.70)85%, rgba(20, 21, 22, 0.70)100%)',
      },
      maxWidth: {
        'pc-head': '1840px',
        // pc: '1322px',
        pc: '1709px',
        screen: '1322px',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        input:
          '0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)',
      },
      fontFamily: {
        din: ['var(--font-din)'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'caret-blink': {
          '0%,70%,100%': { opacity: '1' },
          '20%,50%': { opacity: '0' },
        },
        moveHorizontal: {
          '0%': {
            transform: 'translateX(-50%) translateY(-10%)',
          },
          '50%': {
            transform: 'translateX(50%) translateY(10%)',
          },
          '100%': {
            transform: 'translateX(-50%) translateY(-10%)',
          },
        },
        moveInCircle: {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '50%': {
            transform: 'rotate(180deg)',
          },
          '100%': {
            transform: 'rotate(360deg)',
          },
        },
        moveVertical: {
          '0%': {
            transform: 'translateY(-50%)',
          },
          '50%': {
            transform: 'translateY(50%)',
          },
          '100%': {
            transform: 'translateY(-50%)',
          },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-100% - var(--gap)))' },
        },
        'marquee-vertical': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(calc(-100% - var(--gap)))' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'caret-blink': 'caret-blink 1.25s ease-out infinite',
        first: 'moveVertical 30s ease infinite',
        second: 'moveInCircle 20s reverse infinite',
        third: 'moveInCircle 40s linear infinite',
        fourth: 'moveHorizontal 40s ease infinite',
        fifth: 'moveInCircle 20s ease infinite',
        marquee: 'marquee var(--duration) linear infinite',
        'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
      },
    },
  },
  // eslint-disable-next-line import/no-extraneous-dependencies, global-require
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
} satisfies Config;

export default config;
