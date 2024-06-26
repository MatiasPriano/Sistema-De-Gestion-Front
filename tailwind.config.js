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
				primaryHover: '#1e40af',
				secondary: '#f59e0b',
				secondaryHover: '#eab308',
				background: '#ffffff',
				backgroundContainer: '#f3f4f6',
				backgroundAccent: '#e2e8f0',
				title: '#111827',
				darkTitle: '#ffffff',
				subtitle: '#334155',
				darkSubtitle: '#e2e8f0',
				red: '#ef4444',
				redHover: '#991b1b',
				redSubtle: '#fee2e2',
				redAlternative: '#f87171',
				orange: '#f97316',
				orangeSubtle: '#ffedd5',
				orangeAlternative: '#fb923c',
				yellow: '#eab308',
				yellowSubtle: '#fef9c3',
				yellowAlternative: '#facc15',
				green: '#84cc16',
				greenSubtle: '#dcfce7',
				greenAlternative: '#a3e635',
				placeholder: '#9ca3af',
				border: '#d1d5db',
				selected: '#dbeafe'
			},
		},
	},
}
