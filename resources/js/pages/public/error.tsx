import { Head, Link } from '@inertiajs/react';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorProps {
    status: number;
}

export default function Error({ status }: ErrorProps) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <Head title={`Error ${status}`} />

            <div className="max-w-md w-full mx-auto p-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-8 text-center">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                        Error {status}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Something went wrong. Please try again later.
                    </p>

                    <Button asChild className="w-full">
                        <Link href="/">
                            <Home className="mr-2 h-4 w-4" />
                            Back to Home
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
