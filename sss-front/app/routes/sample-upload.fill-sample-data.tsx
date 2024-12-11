import type { MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => {
    return [
        { title: 'upload samples - super secret samples' },
        {
            name: 'description',
            content:
                'upload samples to be reviewed and displayed in the samples page!',
        },
    ]
}

export default function FillSampleData() {
    return (
        <div className="flex">
            <div className="text-2xl">fill samples data</div>
        </div>
    )
}
