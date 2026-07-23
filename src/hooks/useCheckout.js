import { useState } from 'react';
import { fetchApi } from '../services/api.js';

function useCheckout() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function processOrder(orderPayLoad) {
        setLoading(true);
        setError(null);

        try {
            const data = await fetchApi('/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderPayLoad)
            });

            return data;
        } catch (error) {
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    return { processOrder, loading, error };
}


export default useCheckout;

