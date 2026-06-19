import { useState, useEffect } from 'react';
import { fetchApi } from '../services/reseaServices';

function useFetch(endpoint) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const result = await apiFetch(endpoint);
                setData(result);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [endpoint]);

    return { data, loading, error };
}

export default useFetch;