export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        greenPrimary: "var(--green-primary)",
        greenDark: "var(--green-dark)",
        greenLight: "var(--green-light)",
        bg: "var(--bg-color)",
        text: "var(--text-color)",
        pinkAccent: "var(--accent-pink)",
        pinkAccentDark: "var(--accent-pink-dark)",
      },
      backgroundImage: {
        "sidebar-gradient":
          "linear-gradient(180deg, var(--green-dark) 0%, var(--green-primary) 100%)",
      },
    },
  },
  plugins: [],
};
