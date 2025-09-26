import { Head, router } from '@inertiajs/react';
import { Wrench, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Maintenance() {
    const handleRefresh = () => {
        router.reload();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <Head title="Maintenance" />
            
            <div className="max-w-md w-full mx-auto p-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-8 text-center">
                    <div className="rounded-full bg-yellow-100 p-4 dark:bg-yellow-900/20 w-fit mx-auto mb-4">
                        <Wrench className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                        Under Maintenance
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        We're working hard to improve our services. Please check back later.
                    </p>

                    <Button onClick={handleRefresh} className="w-full">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Check Again
                    </Button>
                </div>
            </div>
        </div>
    );
}
