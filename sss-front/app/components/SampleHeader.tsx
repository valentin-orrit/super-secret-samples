interface SampleHeaderProps {
    title: string
}

export default function SampleHeader({ title }: SampleHeaderProps) {
    return (
        <header className="w-full flex flex-col align-middle justify-center p-6">
            <div className="flex flex-row items-end justify-start gap-4">
                <h1 className="text-3xl text-center font-bold">{title}</h1>
                <p className="text-sssblue text-sm pb-[3px]">35 credits</p>
            </div>
        </header>
    )
}
