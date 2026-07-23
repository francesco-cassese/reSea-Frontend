import { createContext, useContext, useEffect, useState } from "react";
import { fetchApi } from "../services/api.js";

const CategoriesContext = createContext();

function CategoriesProvider({ children }) {
    const [categories, setCategories] = useState([]);
    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const [categoriesError, setCategoriesError] = useState(null);

    useEffect(() => {
        let mounted = true;

        async function loadCategories() {
            try {
                setCategoriesLoading(true);
                setCategoriesError(null);
                const result = await fetchApi("/categories");
                const categoriesData = Array.isArray(result?.data) ? result.data : [];
                if (mounted) setCategories(categoriesData);
            } catch (error) {
                if (mounted) setCategoriesError(error.message || "Errore categorie");
            } finally {
                if (mounted) setCategoriesLoading(false);
            }
        }

        loadCategories();

        return () => {
            mounted = false;
        };
    }, []);

    return (
        <CategoriesContext.Provider
            value={{ categories, categoriesLoading, categoriesError }}>
            {children}
        </CategoriesContext.Provider>
    );
}

function useCategories() {
    const context = useContext(CategoriesContext);
    if (!context) {
        throw new Error("useCategories deve essere usato dentro CategoriesProvider");
    }
    return context;
}

export { CategoriesProvider, useCategories };