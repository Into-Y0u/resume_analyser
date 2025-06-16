'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setToken } from '@/utils/auth';
import Link from 'next/link';
import { signup } from '@/lib/api';

export default function SignupPage() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignup = async () => {
        try {
            const data = await signup({ name, email, password });
            setToken(data.token);
            router.push('/dashboard');
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Signup failed');
            }
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow">
                <h2 className="text-2xl font-bold">Sign Up</h2>
                {error && <p className="text-red-500">{error}</p>}
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="w-full px-3 py-2 border rounded"
                />
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full px-3 py-2 border rounded"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full px-3 py-2 border rounded"
                />
                <button
                    onClick={handleSignup}
                    className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
                >
                    Sign Up
                </button>
                <p className="text-sm text-center">
                    Already have an account?{' '}
                    <Link href="/login" className="text-blue-500 underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}