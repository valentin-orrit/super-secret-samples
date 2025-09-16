import type { MetaFunction } from "react-router"
import { Link } from "react-router"


export const meta: MetaFunction = () => {
    return [
        { title: 'about page - super secret samples' },
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
            <div className="flex flex-col font-mono text-sssdarkblue bg-sssoffwhite min-h-screen w-full py-10">
                <div className="max-w-4xl mx-auto px-2 sm:px-6">
                    <h2 className="text-3xl font-bold text-sssblue mb-2 text-center">about
                    </h2>
                    <br/>

                    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8 space-y-8">
                        <section>
                            <h2 className="text-xl font-semibold text-sssblue mb-3">what is the purpose of <span
                                className="font-bold text-sssdarkblue">super secret <span
                                className="text-sssred">samples</span></span>?</h2>
                            <p className="mb-3">
                                This website is designed for professional electronic music producers who want unique and hand-made samples.
                                Unlike mainstream samples libraries and websites, super secret samples provide well crafted samples to a
                                small number of selected producers. So when you download a sample here, you know you are one of the only
                                people to have it.
                            </p>
                            <br/>
                            <p className="mb-3">
                                Since all the samples are made by one producer at the moment, the genres and instruments are limited, but
                                when browsing the samples, you&#39;ll notice they have a unique flavor to them, and that&#39;s the whole
                                point!
                            </p>
                            <br/>
                            <p className="mb-3">
                                If you want private samples for yourself to use only, you can fill the <Link to="/sample-request"
                                                                                                             className="text-sssblue hover:underline">request
                                form</Link>. This is a paid service, so I will contact you with the pricing and process via email as soon as
                                possible.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-sssblue mb-3">who are we?</h2>
                            <p className="mb-3">
                                As of now, the super secret samples is a one-man team. I am Valentin and I have been producing electronic
                                music for almost 20 years now. I made several projects as a producer & DJ, my main one for some time have
                                been <Link
                                to="https://www.discogs.com/artist/6124008-Chevals"
                                className="text-sssblue hover:underline">Chevals</Link>. I now work with artists as a consultant to help
                                them take their craft to the next level. I mostly help them regarding composition, production & mix.
                            </p>
                            <br/>
                            <p className="mb-3">If you
                                enjoy <span
                                    className="font-bold text-sssdarkblue">super secret <span
                                    className="text-sssred">samples</span></span> and want a second look and/or some help on your own music,
                                don&#39;t hesitate to send me a message via the <Link to="/sample-request"
                                                                                      className="text-sssblue hover:underline">request
                                    form</Link>.
                            </p>

                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}