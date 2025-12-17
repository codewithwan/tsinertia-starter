import { Head } from '@inertiajs/react';
import { LandingLayout } from '@/components/landing/ai-style';

export default function Welcome() {
    return (
        <>
            <Head title="TSInertia Starter - Modern Full-Stack Starter Kit">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=inter:400,500,600,700,800,900" rel="stylesheet" />
                <meta name="description" content="A modern, production-ready starter kit for building full-stack web applications using TypeScript, Laravel, Inertia.js, and React. Complete with authentication, admin panel, and beautiful UI components." />
            </Head>

            <LandingLayout />
        </>
    );
}
