const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			sans: ['Poppins', ...defaultTheme.fontFamily.sans],
			mono: ["Ubuntu Mono", ...defaultTheme.fontFamily.mono]
		},
		extend: {}
	},
	plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')]
};
