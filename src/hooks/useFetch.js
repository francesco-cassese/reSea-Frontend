import { useEffect, useRef, useState } from "react";
import { fetchApi } from "../services/reseaServices";

function useFetch(endpoint) {
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);

    const hasLoadedOnceRef = useRef(false);

    useEffect(() => {
        const controller = new AbortController();
        let cancelled = false;

        async function fetchData() {
            if (!hasLoadedOnceRef.current) {
                setLoading(true);
            }

            setIsFetching(true);
            setError(null);

            try {
                const result = await fetchApi(endpoint, { signal: controller.signal });

                if (cancelled) return;

                setData(Array.isArray(result?.data) ? result.data : []);
                setPagination(result?.pagination || null);
            } catch (err) {
                if (cancelled) return;
                if (err?.name === "AbortError") return;

                setError(err?.message || "Errore durante il caricamento");
            } finally {
                if (cancelled) return;

                hasLoadedOnceRef.current = true;
                setLoading(false);
                setIsFetching(false);
            }
        }

        fetchData();

        return () => {
            cancelled = true;
            controller.abort();
        };
    }, [endpoint]);

    return { data, pagination, loading, isFetching, error };
}

export default useFetch;