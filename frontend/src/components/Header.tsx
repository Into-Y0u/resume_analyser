'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { removeToken } from '@/utils/auth';

export default function Header() {
    const router = useRouter();

    const handleLogout = () => {
        removeToken();
        router.push('/login');
    };

    return (
        <header className="bg-blue-600 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">Resume Analyzer</h1>
                <nav>
                    <Link href="/dashboard" className="mx-2 hover:underline">
                        Dashboard
                    </Link>
                    <button onClick={handleLogout} className="mx-2 hover:underline">
                        Logout
                    </button>
                </nav>
            </div>
        </header>
    );
}