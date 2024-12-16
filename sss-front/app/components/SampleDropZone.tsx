import { Link } from '@remix-run/react'
import { FileWithPath, useDropzone } from 'react-dropzone-esm'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from './ui/dialog'
import { CirclePlus, Trash2, FileAudio2 } from 'lucide-react'
import { useState, useEffect, useCallback } from 'react'

export default function SampleDropZone() {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [storedSamples, setStoredSamples] = useState<FileWithPath[]>([])

    // react-dropzone
    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
        setStoredSamples((prevSamples) => {
            const newSamples = acceptedFiles.filter(
                (newFile) =>
                    !prevSamples.some(
                        (existingSample) =>
                            existingSample.path === newFile.path &&
                            existingSample.size === newFile.size
                    )
            )
            return [...prevSamples, ...newSamples]
        })
    }, [])

    const { fileRejections, getRootProps, getInputProps } = useDropzone({
        accept: {
            'audio/wav': [],
        },
        onDropRejected: () => {
            setDialogOpen(true)
        },
        onDrop,
    })

    // Remove file handler
    const removeFile = useCallback((sampleToRemove: FileWithPath) => {
        setStoredSamples((samples) =>
            samples.filter((sample) => sample !== sampleToRemove)
        )
    }, [])

    // Close dialog when fileRejections is empty
    useEffect(() => {
        fileRejections.length === 0 && setDialogOpen(false)
    }, [fileRejections])

    const files = storedSamples.map((sample: FileWithPath) => (
        <li
            key={sample.path}
            className="py-1 border-solid border-b border-sssmutegray flex place-content-between items-center"
        >
            <span>
                <FileAudio2 size={30} strokeWidth={1} />
            </span>
            <span className="flex-grow px-4">{sample.path}</span>
            <span className="font-bold text-sm px-4">
                {Math.ceil(sample.size / 1000 / 1000)} mb
            </span>
            <button
                onClick={() => removeFile(sample)}
                className="focus:outline-none hover:opacity-75"
                aria-label="Remove file"
            >
                <Trash2 size={30} strokeWidth={1} className="stroke-sssred" />
            </button>
        </li>
    ))

    return (
        <section className="min-w-1/2 flex flex-col bg-white my-8 p-14 rounded-2xl shadow-lg">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="text-sssred">
                    <DialogTitle>Invalid File Type</DialogTitle>
                    <DialogDescription>
                        Only WAV files are accepted. Please try again.
                    </DialogDescription>
                </DialogContent>
            </Dialog>
            <div
                {...getRootProps({ className: 'dropzone' })}
                className="flex flex-col items-center border-dashed border-4 border-sssmutegray rounded-xl cursor-pointer p-16 my-4"
            >
                <input {...getInputProps()} />
                <div className="p-8">
                    <CirclePlus size={60} strokeWidth={1} />
                </div>
                <p>Drag n drop samples here, or click to select files</p>
                <p className="text-xs italic text-sssred">
                    Only WAV files are accepted
                </p>
            </div>
            <aside className="flex flex-col items-center my-4">
                {files.length > 0 && (
                    <>
                        <h4 className="text-sssred text-xl text-center">
                            sample list
                        </h4>
                        <ul className="my-2 w-full max-w-2xl">{files}</ul>
                        <Link
                            to="/sample-upload/fill-sample-data"
                            state={{ samples: storedSamples }}
                            className="m-6 py-2 px-10 bg-sssyellow hover:bg-yellow-400 rounded-full"
                        >
                            fill sample data
                        </Link>
                    </>
                )}
            </aside>
        </section>
    )
}
