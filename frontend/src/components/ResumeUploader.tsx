'use client';

import { useState } from 'react';

interface Props {
    onUpload: (file: File) => void;
    disabled?: boolean;
}

export default function ResumeUploader({ onUpload, disabled }: Props) {
    const [fileName, setFileName] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
            onUpload(file);
        }
    };

    return (
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
                Upload Resume (PDF or DOCX)
            </label>
            <input
                type="file"
                accept=".pdf,.docx"
                onChange={handleChange}
                disabled={!!disabled}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {fileName && <p className="mt-2 text-sm text-gray-600">Selected: {fileName}</p>}
        </div>
    );
}