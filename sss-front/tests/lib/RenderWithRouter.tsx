import { render } from '@testing-library/react'
import { BrowserRouter, MemoryRouter } from 'react-router';

// Wrapper component with BrowserRouter
export const renderWithRouter = (ui: React.ReactElement) => {
    return render(ui, { wrapper: BrowserRouter })
}

// Wrapper component with MemoryRouter
export const renderWithMemoryRouter = (
    ui: React.ReactElement,
    route: string
) => {
    return render(ui, {
        wrapper: ({ children }) => (
            <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
        ),
    })
}
