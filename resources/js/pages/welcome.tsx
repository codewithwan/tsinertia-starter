import { Head } from '@inertiajs/react';
import { LandingLayout } from '@/components/landing/ai-style';

export default function Welcome() {
    return (
        <>
            <Head title="Free PaaS for Developers - Deploy Your Apps">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=inter:400,500,600,700,800,900" rel="stylesheet" />
                <meta name="description" content="Free Platform as a Service for developers. Deploy, scale, and manage your applications with our free platform. No credit card required." />
            </Head>

            <LandingLayout />
        </>
    );
}
