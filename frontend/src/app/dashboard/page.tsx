'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// Update the import path if the file is located elsewhere, for example:
// import { useAuth } from '../../hooks/useAuth';
// Or, if the file does not exist, create 'src/hooks/useAuth.ts' with the useAuth hook implementation.
import { uploadResume, getLatestAnalysis } from '@/lib/api';
import { ResumeAnalysis } from '@/types/resume.types';
import ResumeUploader from '@/components/ResumeUploader';
import AnalysisCard from '@/components/AnalysisCard';
import useAuth from '@/hooks/userAuth';

export default function DashboardPage() {
    const router = useRouter();
    const { authenticated, loading } = useAuth();
    const [latestAnalysis, setLatestAnalysis] = useState<ResumeAnalysis | null>(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (!authenticated && !loading) {
            router.push('/login');
        }
    }, [authenticated, loading, router]);

    useEffect(() => {
        const fetchLatest = async () => {
            try {
                const data = await getLatestAnalysis();
                setLatestAnalysis(data);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (err) {
                console.error('Failed to fetch latest analysis');
            }
        };

        if (authenticated) {
            fetchLatest();
        }
    }, [authenticated]);

    const handleUpload = async (file: File) => {
        const formData = new FormData();
        formData.append('resume', file);

        setUploading(true);
        try {
            const result = await uploadResume(formData);
            setLatestAnalysis(result);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            alert('Upload failed');
        } finally {
            setUploading(false);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="min-h-screen p-6 bg-gray-100">
            <h1 className="text-2xl font-bold mb-6">Resume Analyzer</h1>

            <div className="mb-6">
                <ResumeUploader onUpload={handleUpload} disabled={uploading} />
            </div>

            {latestAnalysis && <AnalysisCard analysis={latestAnalysis} />}
        </div>
    );
}