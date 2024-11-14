/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/client/**/*.{js,ts,jsx,tsx}"],
	theme: {
		container: {
			center: true,
			padding: "1rem",
			screens: {
				xl: "1024px",
				"2xl": "1024px",
			},
		},
		extend: {
			colors: {
				primary: {
					light: "#67e8f9",
					DEFAULT: "#06b6d4",
					dark: "#0e7490",
				},
			},
			keyframes: {
				"text-gradient": {
					to: {
						backgroundPosition: "200% center",
					},
				},
				"bg-gradient": {
					to: {
						backgroundPosition: "200% bottom",
					},
				},
			},
			animation: {
				"text-gradient": "text-gradient 5s linear infinite",
				"bg-gradient": "bg-gradient 10s ease-out infinite",
			},
		},
	},
	plugins: [],
};
