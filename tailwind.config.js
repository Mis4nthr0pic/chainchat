/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        stellar: {
          primary: "#6366f1",
          secondary: "#8b5cf6",
          accent: "#f59e0b",
          warm: "#f97316",
          pink: "#ec4899",
          gradient: {
            start: "#3b82f6",
            middle: "#8b5cf6",
            end: "#f59e0b",
          },
          dark: {
            900: "#0f0f23",
            800: "#1e1b4b",
            700: "#312e81",
            600: "#4338ca",
          },
        },
        success: {
          light: "#52e5a5",
          DEFAULT: "#10b981",
          dark: "#0b815a",
        },
        warning: {
          light: "#fcd34d",
          DEFAULT: "#f59e0b",
          dark: "#b45309",
        },
        error: {
          light: "#f87171",
          DEFAULT: "#ef4444",
          dark: "#b91c1c",
        },
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
          950: "#0a0e17",
        },
      },
      fontFamily: {
        sans: ["Inter var", "Inter", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [],
};
