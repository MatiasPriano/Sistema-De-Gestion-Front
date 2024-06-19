/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
  	theme: {
		extend: {
			colors: {
				primary: '#172554',
				secondary: '#f59e0b',
				background: '#ffffff',
				backgroundAccent: '#e2e8f0',
				title: '#111827',
				darkTitle: '#ffffff',
				subtitle: '#334155',
				darkSubtitle: '#e2e8f0',
				primaryHover: '#1e40af',
				secondaryHover: '#fde68a',
				red: '#ef4444',
				redHover: '#991b1b',
				redSubtle: '#fee2e2',
				orange: '#f97316',
				orangeSubtle: '#ffedd5',
				yellow: '#eab308',
				yellowSubtle: '#fef9c3',
				green: '#84cc16',
				greenSubtle: '#dcfce7',
				placeholder: '#9ca3af',
				border: '#d1d5db',
				selected: '#dbeafe'
			},
		},
	},
}
