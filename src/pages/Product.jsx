import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useCategories } from "../Context/CategoriesContext";
import ProductSidebar from "../components/ProductSidebar";
import { priceFormatter } from "../services/reseaServices";
import { useAppContext } from "../Context/AppContext";

function Product() {
    const { categories, categoriesLoading, categoriesError } = useCategories();
    const safeCategories = Array.isArray(categories) ? categories : [];
    const [searchParams, setSearchParams] = useSearchParams();
    const { addHandler, cart, wishlist, addToWishlist } = useAppContext();

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

    const sidebarProps = {
        searchInput, setSearchInput, applySearch, handleSearchKeyDown,
        selectedCategory, handleCategoryChange, safeCategories,
        categoriesLoading, categoriesError, minPriceInput, setMinPriceInput,
        maxPriceInput, setMaxPriceInput, sortBy, handleSortChange,
        limit, handleLimitChange, handlePriceFilters, clearAllFilters
    };

    return (
        <div className="container py-4">
            <div className="d-flex flex-column flex-lg-row gap-4 align-items-start">
                <div className="sidebarp">
                    {/* BOTTONE MOBILE*/}
                    <button
                        className="btn btn-primary d-lg-none mb-4 w-100"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasFilters"
                    >
                        <i className="bi bi-funnel"></i> Filtra e Ordina
                    </button>

                    {/*OFF-CANVAS MOBILE*/}
                    <div className="offcanvas offcanvas-start d-lg-none" tabIndex="-1" id="offcanvasFilters">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title">Filtri</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ProductSidebar {...sidebarProps} />
                        </div>
                    </div>

                    {/* SIDEBAR FISSA (Solo Desktop*/}
                    <div className="d-none d-lg-block">
                        <ProductSidebar {...sidebarProps} />
                    </div>
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
                            <div className="d-flex text-secondary justify-content-end">
                                <p>Prodotti trovati: {products.length}</p>
                            </div>
                            <div className="d-flex flex-wrap gap-3 justify-content-center">
                                {products.map((item) => {
                                    const inCart = cart.some(p => p.id === item.id);
                                    const inWishlist = wishlist.some(p => p.id === item.id);
                                    return (

                                        <Link
                                            to={"/products/" + item.slug}
                                            className="text-decoration-none text-dark d-inline-block"
                                            key={item.id}
                                        >
                                            <div className="card card-product" style={{ cursor: "pointer", width: "18rem" }}>
                                                <img
                                                    src={item.image}
                                                    className="card-img-top"
                                                    alt={item.name}
                                                    loading="lazy"
                                                    decoding="async"
                                                />
                                                <div className="card-body p-2">
                                                    <h6 className="card-title fw-bold mt-3 mb-2">{item.name}</h6>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <p className="card-text fw-bold mb-0 small">
                                                            €{Number(item.price).toFixed(2)}
                                                        </p>
                                                        <div>

                                                            <button
                                                                type="button"
                                                                className="btn rounded-circle"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    e.stopPropagation();
                                                                    addToWishlist(item);
                                                                }}>
                                                                <i className={`bi ${inWishlist ? "bi-heart-fill" : "bi-heart"}`}></i>
                                                            </button>

                                                            <button
                                                                type="button"
                                                                className="btn rounded-circle"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    e.stopPropagation();
                                                                    addHandler(item);
                                                                }}
                                                            >
                                                                <i className={`bi ${inCart ? "bi-cart-fill" : "bi-cart"}`}></i>
                                                            </button>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>

                            {/* paginazione */}
                            <div className="d-flex flex-column align-items-center gap-2 mt-4">
                                <nav>
                                    <ul className="pagination mb-0">
                                        <li className={"page-item" + (page <= 1 ? " disabled" : "")}>
                                            <button className="page-link text-dark" onClick={() => goToPage(page - 1)} type="button">
                                                Precedente
                                            </button>
                                        </li>
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                            <li key={p} className={"page-item" + (p === page ? " active" : "")}>
                                                <button className="page-link text-dark" onClick={() => goToPage(p)} type="button">
                                                    {p}
                                                </button>
                                            </li>
                                        ))}
                                        <li className={"page-item" + (page >= totalPages ? " disabled" : "")}>
                                            <button className="page-link text-dark" onClick={() => goToPage(page + 1)} type="button">
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
        </div>
    );
}

export default Product;