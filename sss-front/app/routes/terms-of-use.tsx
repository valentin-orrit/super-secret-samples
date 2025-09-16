import type { MetaFunction } from "react-router"

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

export default function termsOfUse() {
    const lastUpdated = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })

    return (
        <div className="flex flex-col font-mono text-sssdarkblue bg-sssoffwhite min-h-screen w-full py-10">
            <div className="max-w-4xl mx-auto px-2 sm:px-6">
                <h2 className="text-3xl font-bold text-sssblue mb-2 text-center">Terms of Use</h2>
                <p className="text-sm text-sssaccentgray mb-8 text-center">Last updated: {lastUpdated}</p>

                <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8 space-y-8">
                    {/* Section 1 */}
                    <section>
                        <h2 className="text-xl font-semibold text-sssblue mb-3">1. Acceptance of Terms</h2>
                        <p className="mb-3">
                            By accessing super secret samples (&#39;the Website&#39;), you agree to be bound by these Terms of Use.
                            If you do not agree to these terms, please do not access or use the Website.
                        </p>
                        <p>
                            The Website is operated by an individual based in Nantes, Loire-Atlantique, France
                            (&#39;we&#39;, &#39;us&#39;, &#39;our&#39;).
                        </p>
                    </section>

                    {/* Section 2 */}
                    <section>
                        <h2 className="text-xl font-semibold text-sssblue mb-3">2. Access to the Service</h2>

                        <h3 className="text-lg font-semibold text-sssorange mb-2">2.1 Password Protection</h3>
                        <p className="mb-2">
                            Access to the Website requires a password. This password is provided on a selective basis to authorized users.
                            You agree:
                        </p>
                        <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
                            <li>Not to share, distribute, or publicize the access password</li>
                            <li>To keep the password confidential</li>
                            <li>That we may change or revoke access at any time without notice</li>
                            <li>That access is a privilege, not a right</li>
                        </ul>

                        <h3 className="text-lg font-semibold text-sssorange mb-2">2.2 Permitted Use</h3>
                        <p className="mb-2">The Website allows you to:</p>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>Browse our collection of audio samples</li>
                            <li>Listen to sample previews</li>
                            <li>Download samples for your use according to the license terms below</li>
                            <li>Submit requests for custom sample creation via our contact forms</li>
                        </ul>
                    </section>

                    {/* Section 3 */}
                    <section>
                        <h2 className="text-xl font-semibold text-sssblue mb-3">3. Sample License - Royalty-Free Usage Rights</h2>

                        <h3 className="text-lg font-semibold text-sssorange mb-2">3.1 License Grant</h3>
                        <p className="mb-2">
                            All samples available for download on the Website are provided under a royalty-free license.
                            By downloading any sample, you are granted a non-exclusive, worldwide, perpetual license to:
                        </p>
                        <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
                            <li>Use the samples in musical productions, both commercial and non-commercial</li>
                            <li>Modify, edit, and process the samples as needed for your creative works</li>
                            <li>Use the samples in multiple projects without additional fees</li>
                            <li>Publish and distribute works containing the samples</li>
                        </ul>

                        <h3 className="text-lg font-semibold text-sssorange mb-2">3.2 License Restrictions</h3>
                        <div className="bg-sssred/10 border-2 border-sssred rounded-lg p-4 mb-4">
                            <p className="font-semibold mb-2">You MAY NOT:</p>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                                <li><strong>Resell, redistribute, or share the original sample files</strong> in any form</li>
                                <li>Upload samples to sample libraries, preset packs, or similar distribution platforms</li>
                                <li>Claim ownership or copyright of the original samples</li>
                                <li>Use the samples in isolation as sound effects for redistribution</li>
                                <li>Include the samples in any product that allows end users to extract the original samples</li>
                                <li>Share the samples with anyone who does not have authorized access to the Website</li>
                            </ul>
                        </div>

                        <h3 className="text-lg font-semibold text-sssorange mb-2">3.3 No Attribution Required</h3>
                        <p>While not required, credit to &#39;super secret samples&#39; is always appreciated.</p>
                    </section>

                    {/* Section 4 */}
                    <section>
                        <h2 className="text-xl font-semibold text-sssblue mb-3">4. Intellectual Property</h2>

                        <h3 className="text-lg font-semibold text-sssorange mb-2">4.1 Ownership</h3>
                        <p className="mb-4">
                            All samples, sounds, and content on the Website remain our intellectual property.
                            The license granted above does not transfer ownership of the samples to you.
                        </p>

                        <h3 className="text-lg font-semibold text-sssorange mb-2">4.2 Your Productions</h3>
                        <p className="mb-4">
                            You retain full rights to any musical works you create using our samples,
                            subject to the license restrictions above.
                        </p>

                        <h3 className="text-lg font-semibold text-sssorange mb-2">4.3 Quality Guarantee</h3>
                        <div className="bg-sssyellow/20 border-2 border-sssyellow rounded-lg p-4">
                            <p className="font-semibold">
                                All samples are professionally produced without the use of artificial intelligence
                                at any stage of creation. We guarantee the human craftsmanship of our entire library.
                            </p>
                        </div>
                    </section>

                    {/* Section 5 */}
                    <section>
                        <h2 className="text-xl font-semibold text-sssblue mb-3">5. Custom Sample Requests</h2>

                        <h3 className="text-lg font-semibold text-sssorange mb-2">5.1 Request Service</h3>
                        <p className="mb-2">The Website provides forms to request custom exclusive samples. This service:</p>
                        <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
                            <li>Is handled entirely off-site via email communication</li>
                            <li>May involve commercial transactions managed outside the Website</li>
                            <li>Creates separate agreements between parties for each custom request</li>
                            <li>Is not guaranteed to result in sample creation</li>
                        </ul>

                        <h3 className="text-lg font-semibold text-sssorange mb-2">5.2 Email Communication</h3>
                        <p>
                            By submitting a request form, you consent to receive emails regarding your request
                            at the address provided.
                        </p>
                    </section>

                    {/* Section 6 */}
                    <section>
                        <h2 className="text-xl font-semibold text-sssblue mb-3">6. Prohibited Activities</h2>
                        <p className="mb-2">You agree NOT to:</p>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>Attempt to access the Website without valid authorization</li>
                            <li>Use automated systems or bots to download samples</li>
                            <li>Reverse engineer the Website or bypass security measures</li>
                            <li>Violate any applicable laws while using the Website</li>
                            <li>Misrepresent your identity or authorization to access the Website</li>
                            <li>Engage in any activity that could harm the Websites operation</li>
                        </ul>
                    </section>

                    {/* Section 7 */}
                    <section>
                        <h2 className="text-xl font-semibold text-sssblue mb-3">7. Disclaimer of Warranties</h2>

                        <h3 className="text-lg font-semibold text-sssorange mb-2">7.1 &#39;As Is&#39; Service</h3>
                        <p className="mb-2">
                            The Website and all samples are provided &#39;as is&#39; without warranties of any kind,
                            either express or implied, including but not limited to:
                        </p>
                        <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
                            <li>Fitness for a particular purpose</li>
                            <li>Non-infringement</li>
                            <li>Compatibility with your software or hardware</li>
                            <li>Uninterrupted or error-free operation</li>
                        </ul>

                        <h3 className="text-lg font-semibold text-sssorange mb-2">7.2 No Guarantee</h3>
                        <p>
                            While we strive for quality, we do not guarantee that samples will meet your
                            specific requirements or expectations.
                        </p>
                    </section>

                    {/* Section 8 */}
                    <section>
                        <h2 className="text-xl font-semibold text-sssblue mb-3">8. Limitation of Liability</h2>
                        <p className="mb-2">
                            To the maximum extent permitted by law, we shall not be liable for any:
                        </p>
                        <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
                            <li>Indirect, incidental, special, or consequential damages</li>
                            <li>Loss of profits, revenue, or data</li>
                            <li>Damages arising from your use or inability to use the samples</li>
                            <li>Claims by third parties related to your use of the samples</li>
                        </ul>
                        <p>
                            Our total liability shall not exceed the amount you paid for access to the Website
                            (which is zero for free access).
                        </p>
                    </section>

                    {/* Section 9 */}
                    <section>
                        <h2 className="text-xl font-semibold text-sssblue mb-3">9. Indemnification</h2>
                        <p className="mb-2">
                            You agree to indemnify and hold us harmless from any claims, losses, damages,
                            and expenses (including legal fees) arising from:
                        </p>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>Your violation of these Terms of Use</li>
                            <li>Your use of the samples</li>
                            <li>Your violation of any rights of another party</li>
                            <li>Your breach of the license restrictions</li>
                        </ul>
                    </section>

                    {/* Section 10 */}
                    <section>
                        <h2 className="text-xl font-semibold text-sssblue mb-3">10. Privacy and Data Protection</h2>
                        <p>
                            Your use of the Website is also governed by our Privacy Policy. We collect minimal data
                            and comply with GDPR requirements. For details, please see our Privacy Policy.
                        </p>
                    </section>

                    {/* Section 11 */}
                    <section>
                        <h2 className="text-xl font-semibold text-sssblue mb-3">11. Modifications</h2>

                        <h3 className="text-lg font-semibold text-sssorange mb-2">11.1 Terms Updates</h3>
                        <p className="mb-4">
                            We reserve the right to modify these Terms of Use at any time. Changes will be posted
                            on this page with an updated revision date.
                        </p>

                        <h3 className="text-lg font-semibold text-sssorange mb-2">11.2 Service Changes</h3>
                        <p>
                            We may modify, suspend, or discontinue the Website or any part of it without notice or liability.
                        </p>
                    </section>

                    {/* Section 12 */}
                    <section>
                        <h2 className="text-xl font-semibold text-sssblue mb-3">12. Termination</h2>
                        <p className="mb-2">
                            We reserve the right to terminate or suspend access to the Website immediately,
                            without prior notice, for any reason, including:
                        </p>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>Breach of these Terms of Use</li>
                            <li>Unauthorized sharing of access credentials</li>
                            <li>Any conduct we deem inappropriate or harmful</li>
                        </ul>
                    </section>

                    {/* Section 13 */}
                    <section>
                        <h2 className="text-xl font-semibold text-sssblue mb-3">13. Governing Law and Jurisdiction</h2>
                        <p className="mb-3">
                            These Terms of Use are governed by French law. Any disputes arising from these terms
                            or your use of the Website shall be subject to the exclusive jurisdiction of the courts
                            of Nantes, France.
                        </p>
                        <p className="mb-2">For any legal matters, French law applies, specifically:</p>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>Code de la consommation (Consumer Code)</li>
                            <li>Code de la propriété intellectuelle (Intellectual Property Code)</li>
                            <li>Loi pour la Confiance dans l&#39;Économie Numérique (LCEN)</li>
                        </ul>
                    </section>

                    {/* Section 14 */}
                    <section>
                        <h2 className="text-xl font-semibold text-sssblue mb-3">14. Severability</h2>
                        <p>
                            If any provision of these Terms of Use is found to be unenforceable or invalid,
                            that provision shall be limited or eliminated to the minimum extent necessary,
                            and the remaining provisions shall remain in full effect.
                        </p>
                    </section>

                    {/* Section 15 */}
                    <section>
                        <h2 className="text-xl font-semibold text-sssblue mb-3">15. Entire Agreement</h2>
                        <p>
                            These Terms of Use, together with our Privacy Policy and Legal Mentions, constitute
                            the entire agreement between you and us regarding the use of the Website.
                        </p>
                    </section>

                    {/* Section 16 */}
                    <section>
                        <h2 className="text-xl font-semibold text-sssblue mb-3">16. Contact Information</h2>
                        <p className="mb-3">For any questions about these Terms of Use, please contact us at:</p>
                        <div className="bg-gray-50 rounded-lg p-4">
                            <p className="mb-1">
                                <strong>Email:</strong>{' '}
                                <a href="mailto:contact@supersecretsamples.com" className="text-sssblue hover:underline">
                                    contact@supersecretsamples.com
                                </a>
                            </p>
                            <p>
                                <strong>Location:</strong> Nantes, Loire-Atlantique, France
                            </p>
                        </div>
                    </section>

                    {/* Agreement Notice */}
                    <div className="border-t-2 border-sssmutegray pt-6">
                        <p className="text-sm text-center text-sssaccentgray italic">
                            By accessing super secret samples, you acknowledge that you have read, understood,
                            and agree to be bound by these Terms of Use.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}