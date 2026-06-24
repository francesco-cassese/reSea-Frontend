import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useCategories } from "../Context/CategoriesContext";
import ProductSidebar from "../components/ProductSidebar";
import { priceFormatter } from "../services/reseaServices";

function Product() {
    const { categories, categoriesLoading, categoriesError } = useCategories();
    const safeCategories = Array.isArray(categories) ? categories : [];
    const [searchParams, setSearchParams] = useSearchParams();

    const selectedCategory = searchParams.get("category") || "all";
    const appliedSearch = searchParams.get("search") || "";
    const minPrice = searchParams.get("minPrice") || "";
    const maxPrice = searchParams.get("maxPrice") || "";
    const sortBy = searchParams.get("sortBy") || "";
    const page = Math.max(1, Number(searchParams.get("page") || 1));
    const limit = Math.max(1, Number(searchParams.get("limit") || 12));

    const [searchInput, setSearchInput] = useState(appliedSearch);
    const [minPriceInput, setMinPriceInput] = useState(minPrice);
    const [maxPriceInput, setMaxPriceInput] = useState(maxPrice);

    useEffect(() => { setSearchInput(appliedSearch); }, [appliedSearch]);
    useEffect(() => {
        setMinPriceInput(minPrice);
        setMaxPriceInput(maxPrice);
    }, [minPrice, maxPrice]);

    const endpoint = useMemo(() => {
        const params = new URLSearchParams();
        if (selectedCategory !== "all") params.set("category", selectedCategory);
        if (appliedSearch.trim()) params.set("search", appliedSearch.trim());
        if (minPrice !== "") params.set("minPrice", minPrice);
        if (maxPrice !== "") params.set("maxPrice", maxPrice);
        if (sortBy) params.set("sortBy", sortBy);
        params.set("page", String(page));
        params.set("limit", String(limit));
        return "/products?" + params.toString();
    }, [selectedCategory, appliedSearch, minPrice, maxPrice, sortBy, page, limit]);

    const { data, loading, isFetching, error, pagination } = useFetch(endpoint);
    const products = Array.isArray(data) ? data : [];
    const total = pagination?.total ?? products.length;
    const totalPages = Math.max(1, pagination?.totalPages ?? 1);

    const updateParams = (updates) => {
        const next = new URLSearchParams(searchParams);
        Object.entries(updates).forEach(([key, value]) => {
            const shouldDelete = value === undefined || value === null || value === "" || value === "all";
            if (shouldDelete) { next.delete(key); } else { next.set(key, String(value)); }
        });
        setSearchParams(next);
    };

    const applySearch = () => updateParams({ search: searchInput.trim(), page: 1 });
    const handleSearchKeyDown = (e) => { if (e.key === "Enter") applySearch(); };
    const handleCategoryChange = (e) => updateParams({ category: e.target.value, page: 1 });
    const handleSortChange = (e) => updateParams({ sortBy: e.target.value, page: 1 });
    const handleLimitChange = (e) => updateParams({ limit: e.target.value, page: 1 });
    const handlePriceFilters = () => updateParams({ minPrice: minPriceInput, maxPrice: maxPriceInput, page: 1 });
    const clearAllFilters = () => {
        setSearchInput("");
        setMinPriceInput("");
        setMaxPriceInput("");
        setSearchParams({ page: "1", limit: String(limit) });
    };
    const goToPage = (nextPage) => {
        if (nextPage < 1 || nextPage > totalPages) return;
        updateParams({ page: nextPage });
    };

    if (loading) return <p className="p-4">Caricamento dei prodotti in corso...</p>;
    if (error) return <p className="p-4 text-danger">Qualcosa è andato storto: {error}</p>;

    return (
        <div className="container py-4">
            <div className="d-flex gap-4 align-items-start">
                <div className="sidebarp">
                    {/* sidebar */}
                    <ProductSidebar
                        searchInput={searchInput}
                        setSearchInput={setSearchInput}
                        applySearch={applySearch}
                        handleSearchKeyDown={handleSearchKeyDown}
                        selectedCategory={selectedCategory}
                        handleCategoryChange={handleCategoryChange}
                        safeCategories={safeCategories}
                        categoriesLoading={categoriesLoading}
                        categoriesError={categoriesError}
                        minPriceInput={minPriceInput}
                        setMinPriceInput={setMinPriceInput}
                        maxPriceInput={maxPriceInput}
                        setMaxPriceInput={setMaxPriceInput}
                        sortBy={sortBy}
                        handleSortChange={handleSortChange}
                        limit={limit}
                        handleLimitChange={handleLimitChange}
                        handlePriceFilters={handlePriceFilters}
                        clearAllFilters={clearAllFilters}
                    />
                </div>
                {/* prodotti */}
                <div className="flex-grow-1">
                    {products.length === 0 ? (

                        <div className="d-flex flex-column align-items-center justify-content-center py-5">
                            <i className="bi bi-sunglasses text-warning" style={{ fontSize: '4rem' }}></i>
                            <h4 className="mt-3 text-dark">Nessun prodotto trovato</h4>
                        </div>

                    ) : (
                        <>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <small className="text-muted ms-auto">Totale prodotti: {total}</small>
                                {isFetching && <small className="text-muted">Aggiornamento risultati...</small>}
                            </div>

                            <div className="d-flex flex-wrap gap-3 justify-content-center">
                                {products.map((item) => (
                                    <Link
                                        to={"/products/" + item.slug}
                                        className="text-decoration-none text-dark d-inline-block"
                                        key={item.id}
                                    >
                                        <div className="card" style={{ cursor: "pointer", width: "18rem" }}>
                                            <img
                                                src={item.image}
                                                className="card-img-top"
                                                style={{ height: "250px", objectFit: "contain" }}
                                                alt={item.name}
                                                loading="lazy"
                                                decoding="async"
                                            />
                                            <div className="card-body p-2">
                                                <h6 className="card-title mb-1">{item.name}</h6>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <p className="card-text fw-bold mb-0 small">
                                                        {priceFormatter(item.price)}
                                                    </p>
                                                    <button type="button" className="btn btn-black-50 rounded-circle">
                                                        <i className="bi bi-heart-fill text-danger"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {/* paginazione */}
                            <div className="d-flex flex-column align-items-center gap-2 mt-4">
                                <nav>
                                    <ul className="pagination mb-0">
                                        <li className={"page-item" + (page <= 1 ? " disabled" : "")}>
                                            <button className="page-link" onClick={() => goToPage(page - 1)} type="button">
                                                Precedente
                                            </button>
                                        </li>
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                            <li key={p} className={"page-item" + (p === page ? " active" : "")}>
                                                <button className="page-link" onClick={() => goToPage(p)} type="button">
                                                    {p}
                                                </button>
                                            </li>
                                        ))}
                                        <li className={"page-item" + (page >= totalPages ? " disabled" : "")}>
                                            <button className="page-link" onClick={() => goToPage(page + 1)} type="button">
                                                Successiva
                                            </button>
                                        </li>
                                    </ul>
                                </nav>
                                <small className="text-muted">Pagina {page} di {totalPages}</small>
                            </div>
                        </>)}
                </div>
            </div>
        </div >
    );
}

export default Product;