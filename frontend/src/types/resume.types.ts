export type ResumeAnalysis = {
    filename: string;
    score: number;
    missing_sections: string[];
    keywords_matched: string[];
};