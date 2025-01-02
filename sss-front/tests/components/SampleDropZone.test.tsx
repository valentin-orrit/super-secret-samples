import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SampleDropZone from '../../app/components/SampleDropZone'
import { renderWithRouter } from '../lib/RenderWithRouter'

// Files to drop
const audioFile1 = new File(['audio content'], 'test1.wav', {
    type: 'audio/wav',
})
const audioFile2 = new File(['audio content'], 'test2.wav', {
    type: 'audio/wav',
})
const textFile1 = new File(['text content'], 'test1.txt', {
    type: 'text/plain',
})

describe('SampleDropZone', () => {
    it('should render the dropzone and displays the drag-and-drop message', () => {
        renderWithRouter(<SampleDropZone />)
        expect(
            screen.getByText(
                /Drag n drop samples here, or click to select files/i
            )
        ).toBeInTheDocument()
        expect(
            screen.getByText(/Only WAV files are accepted/i)
        ).toBeInTheDocument()
    })

    it('should add and display files when valid files are dropped', async () => {
        renderWithRouter(<SampleDropZone />)

        const input = screen.getByAltText(/samples-input/i)
        await userEvent.upload(input, [audioFile1, audioFile2])

        expect(await screen.findByText(/sample list/i)).toBeInTheDocument()
        expect(await screen.findByText(/test1.wav/i)).toBeInTheDocument()
        expect(await screen.findByText(/test2.wav/i)).toBeInTheDocument()
        expect(
            screen.getByRole('link', { name: /fill sample data/i })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('link', { name: /fill sample data/i })
        ).toHaveAttribute('href', '/sample-upload/fill-sample-data')
    })

    it('should display files when dropped', async () => {
        renderWithRouter(<SampleDropZone />)

        const input = screen.getByAltText(/samples-input/i)
        await userEvent.upload(input, [audioFile1, audioFile2])
    })

    it('should open a dialog when invalid files are dropped', async () => {
        renderWithRouter(<SampleDropZone />)

        const input = screen.getByAltText(/samples-input/i)
        await userEvent.upload(input, [textFile1])

        expect(
            await screen.findByText(/Only WAV files are accepted/i)
        ).toBeInTheDocument()
        expect(screen.queryByText(/test1.txt/i)).not.toBeInTheDocument()
    })
})
