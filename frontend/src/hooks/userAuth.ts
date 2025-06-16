import { useEffect, useState } from 'react';
import { isAuthenticated } from '../utils/auth';

const useAuth = () => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const isAuth = isAuthenticated();
            setAuthenticated(isAuth);
            setLoading(false);
        };

        checkAuth();
    }, []);

    return { authenticated, loading };
};


export default useAuth;