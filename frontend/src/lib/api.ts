import { getToken } from "@/utils/auth";

const API_BASE_URL = '/api'; // Replace with your actual backend URL if needed

interface LoginData {
    email: string;
    password: string;
}

interface SignupData extends LoginData {
    name: string;
}

const apiClient = async (endpoint: string, options: RequestInit = {}) => {
    const token = getToken();

    const headers = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Something went wrong');
    }

    return await response.json();
};

export const login = (data: LoginData) =>
    apiClient('/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
    });

export const signup = (data: SignupData) =>
    apiClient('/auth/signup', {
        method: 'POST',
        body: JSON.stringify(data),
    });

export const uploadResume = (formData: FormData) =>
    fetch(`${API_BASE_URL}/resume/upload`, {
        method: 'POST',
        body: formData,
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    }).then((res) => res.json());

export const getLatestAnalysis = () =>
    apiClient('/resume/latest', {
        method: 'GET',
    });