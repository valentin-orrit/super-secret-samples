import type { Config } from 'tailwindcss'

export default {
    content: ['./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: [
                    'Inter',
                    'ui-sans-serif',
                    'system-ui',
                    'sans-serif',
                    'Apple Color Emoji',
                    'Segoe UI Emoji',
                    'Segoe UI Symbol',
                    'Noto Color Emoji',
                ],
                mono: ['JetBrainsMono'],
            },
            colors: {
                sssoffwhite: '#fff9f1',
                sssdarkblue: '#264653',
                sssblue: '#2a9d8f',
                sssyellow: '#fee058',
                sssorange: '#f5A261',
                sssred: '#e86f51',
            },
        },
    },
    plugins: [],
} satisfies Config
