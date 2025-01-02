import '@testing-library/jest-dom/vitest'

// Ignore React-Router warning
const originalWarn = console.warn

beforeAll(() => {
    console.warn = (...args) => {
        if (
            typeof args[0] === 'string' &&
            (args[0].includes('React Router Future Flag Warning') ||
                args[0].includes(
                    'React Router will begin wrapping state updates'
                ) ||
                args[0].includes(
                    'Relative route resolution within Splat routes is changing'
                ))
        ) {
            return
        }
        originalWarn(...args)
    }
})

afterAll(() => {
    console.warn = originalWarn
})
