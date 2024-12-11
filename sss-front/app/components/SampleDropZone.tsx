import { useDropzone } from 'react-dropzone-esm'
import { CirclePlus } from 'lucide-react'
import { Link } from '@remix-run/react'

export default function SampleDropZone() {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone()

    const files = acceptedFiles.map((file) => (
        <li key={file.path} className="py-1">
            {file.path} -{' '}
            <span className="font-bold text-sm">
                {Math.ceil(file.size / 1000 / 1000)} mb
            </span>
        </li>
    ))

    return (
        <section className="flex flex-col w-full">
            <div
                {...getRootProps({ className: 'dropzone' })}
                className="flex flex-col items-center border-dashed border-4 rounded-xl cursor-pointer p-16 my-4"
            >
                <input {...getInputProps()} />
                <div className="p-8">
                    <CirclePlus size={60} strokeWidth={1} />
                </div>
                <p>Drag n drop samples here, or click to select files</p>
            </div>
            <aside className="flex flex-col items-center my-4">
                <h4 className="text-sssred text-xl text-center">sample list</h4>
                <ul className="my-2">{files}</ul>
                <Link
                    to="/sample-upload/fill-sample-data"
                    className="m-6 py-2 px-10 bg-sssyellow hover:bg-yellow-400 rounded-full"
                >
                    fill sample data
                </Link>
            </aside>
        </section>
    )
}
