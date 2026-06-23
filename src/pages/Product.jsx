import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useCategories } from "../Context/CategoriesContext";

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

    useEffect(() => {
        setSearchInput(appliedSearch);
    }, [appliedSearch]);

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
            const shouldDelete =
                value === undefined ||
                value === null ||
                value === "" ||
                value === "all";

            if (shouldDelete) {
                next.delete(key);
            } else {
                next.set(key, String(value));
            }
        });

        setSearchParams(next);
    };

    const applySearch = () => {
        updateParams({
            search: searchInput.trim(),
            page: 1
        });
    };

    const handleSearchKeyDown = (event) => {
        if (event.key === "Enter") {
            applySearch();
        }
    };

    const handleCategoryChange = (event) => {
        updateParams({
            category: event.target.value,
            page: 1
        });
    };

    const handleSortChange = (event) => {
        updateParams({
            sortBy: event.target.value,
            page: 1
        });
    };

    const handleLimitChange = (event) => {
        updateParams({
            limit: event.target.value,
            page: 1
        });
    };

    const handlePriceFilters = () => {
        updateParams({
            minPrice: minPriceInput,
            maxPrice: maxPriceInput,
            page: 1
        });
    };

    const clearAllFilters = () => {
        setSearchInput("");
        setMinPriceInput("");
        setMaxPriceInput("");

        setSearchParams({
            page: "1",
            limit: String(limit)
        });
    };

    const goToPage = (nextPage) => {
        if (nextPage < 1 || nextPage > totalPages) return;
        updateParams({ page: nextPage });
    };

    if (loading) {
        return <p>Caricamento dei prodotti in corso...</p>;
    }

    if (error) {
        return <p>Qualcosa è andato storto: {error}</p>;
    }

    return (
        <div className="container py-3">
            <div className="mb-4">
                <div className="input-group">
                    <input
                        className="form-control"
                        type="search"
                        placeholder="Cerca per nome prodotto o categoria..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        onKeyDown={handleSearchKeyDown}
                    />
                    <button
                        className="btn btn-primary"
                        type="button"
                        onClick={applySearch}
                    >
                        Cerca
                    </button>
                </div>
            </div>

            <div className="row g-3 align-items-end mb-4">
                <div className="col-md-3">
                    <label htmlFor="categoryFilter" className="form-label">
                        Categoria
                    </label>
                    <select
                        id="categoryFilter"
                        className="form-select"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        disabled={categoriesLoading}
                    >
                        <option value="all">Tutte</option>
                        {safeCategories.map((category) => (
                            <option key={category.id} value={category.slug}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    {categoriesError && (
                        <small className="text-danger">
                            Errore nel caricamento categorie
                        </small>
                    )}
                </div>

                <div className="col-md-2">
                    <label className="form-label">Prezzo min</label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="0"
                        value={minPriceInput}
                        onChange={(e) => setMinPriceInput(e.target.value)}
                    />
                </div>

                <div className="col-md-2">
                    <label className="form-label">Prezzo max</label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="1000"
                        value={maxPriceInput}
                        onChange={(e) => setMaxPriceInput(e.target.value)}
                    />
                </div>

                <div className="col-md-2">
                    <label className="form-label">Ordina per</label>
                    <select
                        className="form-select"
                        value={sortBy}
                        onChange={handleSortChange}
                    >
                        <option value="">Seleziona</option>
                        <option value="recent">Più recenti</option>
                        <option value="name_asc">Nome A-Z</option>
                        <option value="name_desc">Nome Z-A</option>
                        <option value="price_asc">Prezzo crescente</option>
                        <option value="price_desc">Prezzo decrescente</option>
                    </select>
                </div>

                <div className="col-md-1">
                    <label className="form-label">Per pagina</label>
                    <select
                        className="form-select"
                        value={limit}
                        onChange={handleLimitChange}
                    >
                        <option value="6">6</option>
                        <option value="12">12</option>
                        <option value="24">24</option>
                        <option value="48">48</option>
                    </select>
                </div>

                <div className="col-md-2 d-grid gap-2">
                    <button
                        className="btn btn-primary"
                        onClick={handlePriceFilters}
                        type="button"
                    >
                        Applica filtri
                    </button>
                    <button
                        className="btn btn-outline-secondary"
                        onClick={clearAllFilters}
                        type="button"
                    >
                        Reset
                    </button>
                </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3">
                <small className="text-muted">Totale prodotti: {total}</small>
                {isFetching && <small className="text-muted">Aggiornamento risultati...</small>}
            </div>

            {products.length === 0 && (
                <div className="mb-3">
                    <p className="fs-5 mb-0">Nessun prodotto trovato.</p>
                </div>
            )}

            <div className="d-flex flex-wrap gap-3">
                {products.map((item) => (
                    <Link
                        to={"/products/" + item.slug}
                        className="text-decoration-none text-dark d-inline-block"
                        key={item.id}
                    >
                        <div
                            className="card"
                            style={{ cursor: "pointer", width: "18rem" }}
                        >
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
                                        €{Number(item.price).toFixed(2)}
                                    </p>

                                    <button
                                        type="button"
                                        className="btn btn-black-50 rounded-circle"
                                    >
                                        <i className="bi bi-heart-fill text-danger"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="d-flex justify-content-between align-items-center mt-4">
                <small className="text-muted">
                    Pagina {page} di {totalPages}
                </small>

                <nav aria-label="Paginazione prodotti">
                    <ul className="pagination mb-0">
                        <li className={"page-item" + (page <= 1 ? " disabled" : "")}>
                            <button
                                className="page-link"
                                onClick={() => goToPage(page - 1)}
                                disabled={page <= 1}
                                type="button"
                            >
                                Precedente
                            </button>
                        </li>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                            <li
                                key={p}
                                className={"page-item" + (p === page ? " active" : "")}
                            >
                                <button
                                    className="page-link"
                                    onClick={() => goToPage(p)}
                                    type="button"
                                >
                                    {p}
                                </button>
                            </li>
                        ))}

                        <li className={"page-item" + (page >= totalPages ? " disabled" : "")}>
                            <button
                                className="page-link"
                                onClick={() => goToPage(page + 1)}
                                disabled={page >= totalPages}
                                type="button"
                            >
                                Successiva
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Product;