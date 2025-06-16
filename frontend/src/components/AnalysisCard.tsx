'use client';

import { ResumeAnalysis } from '@/types/resume.types';

interface Props {
    analysis: ResumeAnalysis;
}

export default function AnalysisCard({ analysis }: Props) {
    return (
        <div className="bg-white p-4 rounded shadow-md">
            <h3 className="text-lg font-semibold">{analysis.filename}</h3>
            <p>Score: {analysis.score}/100</p>
            <p>Keywords Matched: {analysis.keywords_matched.join(', ')}</p>
            <p className="text-red-500">Missing Sections: {analysis.missing_sections.join(', ')}</p>
        </div>
    );
}