import type {MetaFunction} from "react-router";


export const meta: MetaFunction = () => {
    return [
        {title: 'about page - super secret samples'},
        {
            name: 'description',
            content:
                'request samples to be created and uploaded in the samples page!',
        },
    ]
}

export default function About() {
    return (
        <div
            id="about-page"
            className="flex flex-col font-mono text-sssdarkblue bg-sssoffwhite min-h-screen align-middle items-center justify-center w-full py-10"
        >
            <h1>about</h1>
        </div>
    )
}