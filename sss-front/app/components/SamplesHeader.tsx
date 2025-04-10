export default function SamplesHeader() {
    return (
        <div
            className={
                'grid grid-flow-col grid-cols-8 border-b border-gray-200 w-full px-4 py-1 my-1 cursor-pointer items-center rounded-2xl'
            }
        >
            <div>instrument</div>
            <div>loop</div>
            <div className="text-start flex flex-col col-span-3 justify-evenly">
                <div>name</div>
            </div>
            <div>time</div>
            <div>key</div>
            <div>bpm</div>
        </div>
    )
}
