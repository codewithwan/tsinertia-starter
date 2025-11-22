import { Head } from '@inertiajs/react';
import { LandingLayout } from '@/components/landing/ai-style';

export default function Welcome() {
    return (
        <>
            <Head title="idcloudlabs - Cloud Platform for Developers">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=inter:400,500,600,700,800,900" rel="stylesheet" />
                <meta name="description" content="idcloudlabs - Cloud platform for developers. Reverse tunnel, static hosting, custom domain with automatic SSL. Coming soon." />
            </Head>

            <LandingLayout />
        </>
    );
}
