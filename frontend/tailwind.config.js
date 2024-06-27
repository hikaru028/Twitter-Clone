/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
import daisyUIThemes from "daisyui/src/theming/themes";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // screens: {
      //   'sm': '480px',
      //   'md': '768px',
      //   'lg': '1024px',
      //   'xl': '1400px',
      //   '2xl': '1536px',
      // },
    },
  },
  plugins: [
    daisyui,
  ],
  daisyui: {
    themes: [
			"light",
			{
				black: {
					...daisyUIThemes["black"],
					primary: "rgb(29, 155, 240)",
					secondary: "rgb(24, 24, 24)",
				},
			},
		],
  },
}