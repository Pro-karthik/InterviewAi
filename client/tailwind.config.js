/** @type {import('tailwindcss').Config} */
  module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./app/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: "#4D2C5E",
            light: "#6B3F85",
            dark: "#4D2C5E",
          },

          accent: {
            DEFAULT: "#F97316",
            light: "#FF7426",
            dark: "#EA580C",
          },

          background: {
            DEFAULT: "#F6F0FA",
            muted: "#FDF8EE",
          },

          card: {
            DEFAULT: "#5B3472",
            light: "#6A3F86",
          },

          text: {
            primary: "#1F2937",
            secondary: "#8A8A8A",
            white: "#FFFFFF",
          }
        },

        fontFamily: {
          sans: ["Inter", "sans-serif"],
      
          body: ["Roboto", "sans-serif"],
        },

        boxShadow: {
          soft: "0 10px 30px rgba(77, 44, 94, 0.15)",
          card: "0 6px 20px rgba(0,0,0,0.08)",
        },

        borderRadius: {
          xl2: "1.25rem",
        },

        backgroundImage: {
          heroGradient:
            "linear-gradient(135deg, #4D2C5E 0%, #6B3F85 100%)",
        },
      },
    },
    plugins: [],
  };
  