import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useCategories } from "../context/CategoriesContext.jsx";
import ProductSidebar from "../components/ProductSidebar.jsx";
import { priceFormatter, getFilterLabel, formatCategoryName } from "../services/reseaServices";
import { useAppContext } from "../context/AppContext.jsx";

function Product() {
    const { categories, categoriesLoading, categoriesError } = useCategories();
    const safeCategories = Array.isArray(categories) ? categories : [];
    const [searchParams, setSearchParams] = useSearchParams();
    const { addHandler, cart, wishlist, addToWishlist, updateQuantity, removeHandler } = useAppContext();

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
    const [view, setView] = useState("column");

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

    const { data, loading, error, pagination } = useFetch(endpoint);
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

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [endpoint]);

    const descrizioniSostenibili = [
        "Un accessorio nato dal mare e progettato per la terra. Realizzato al 100% con plastica riciclata recuperata dagli oceani, unendo eco-responsabilità e design d'avanguardia.",
        "Ogni pezzo di questa collezione contribuisce a rimuovere i rifiuti plastici dalle nostre coste. Leggero, resistente e pensato per chi protegge il pianeta con stile.",
        "Unisciti al cambiamento con un design minimalista. Realizzato interamente dando una seconda vita ai materiali marini recuperati, garantendo massima durabilità e comfort.",
        "Anima green e linee moderne. Questo prodotto trasforma l'inquinamento oceanico in un elemento unico di alta moda, riducendo drasticamente l'impatto ambientale.",
        "Qualità eccellente e zero sprechi. Un pezzo unico nato dalle operazioni di pulizia dei nostri mari, perfetto per chi cerca un look sofisticato, etico e consapevole."
    ];

    const sidebarProps = {
        searchInput, setSearchInput, applySearch, handleSearchKeyDown,
        selectedCategory, handleCategoryChange, safeCategories,
        categoriesLoading, categoriesError, minPriceInput, setMinPriceInput,
        maxPriceInput, setMaxPriceInput, sortBy, handleSortChange,
        limit, handleLimitChange, handlePriceFilters, clearAllFilters
    };

    const filterDescription = getFilterLabel(formatCategoryName(selectedCategory), appliedSearch, minPrice, maxPrice);

    if (loading) return <p className="p-4">Caricamento dei prodotti in corso...</p>;
    if (error) return <p className="p-4 text-danger">Qualcosa è andato storto: {error}</p>;

    return (
        <div className="container py-4">
            <div className="d-flex flex-column flex-lg-row gap-4 align-items-start">
                <div className="sidebarp">
                    <button className="btn btn-primary d-lg-none mb-4 w-100" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasFilters">
                        <i className="bi bi-funnel"></i> Filtri
                    </button>
                    <div className="offcanvas offcanvas-start d-lg-none" tabIndex="-1" id="offcanvasFilters">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title">Filtri</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
                        </div>
                        <div className="offcanvas-body"><ProductSidebar {...sidebarProps} /></div>
                    </div>
                    <div className="d-none d-lg-block"><ProductSidebar {...sidebarProps} /></div>
                </div>

                <div className="flex-grow-1">
                    {products.length === 0 ? (
                        <div className="d-flex flex-column align-items-center justify-content-center py-5">
                            <i className="bi bi-sunglasses text-warning" style={{ fontSize: '4rem' }}></i>
                            <h4 className="mt-3 text-dark">Nessun prodotto trovato</h4>
                        </div>
                    ) : (
                        <>
                            <div className="d-flex text-secondary justify-content-between">
                                <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
                                    <h6 className="mb-0 text-muted">
                                        Mostrati <span className="text-dark fw-bold">{products.length}</span> di <span className="text-dark fw-bold">{total}</span>
                                        <span className="ms-1">{filterDescription}</span>
                                    </h6>
                                </div>
                                <div className="d-flex justify-content-center mb-4 flex-column">
                                    <div className="d-flex flex-column align-items-center">
                                        <button onClick={() => setView(view === 'column' ? 'row' : 'column')} className="btn btn-pay">
                                            {view === 'column' ? <i className="bi bi-list-ul"></i> : <i className="bi bi-grid-3x3-gap"></i>}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className={`d-flex flex-wrap gap-3 justify-content-center`}>
                                {products.map((item) => {
                                    const countCart = cart.find(p => p.id === item.id)
                                    const inCart = cart.some(p => p.id === item.id);
                                    const inWishlist = wishlist.some(p => p.id === item.id);
                                    return (
                                        <Link
                                            to={"/products/" + item.slug}
                                            className="text-decoration-none text-dark"
                                            style={{ width: view === 'column' ? '18rem' : '100%', display: 'inline-block' }}
                                            key={item.id}
                                        >
                                            <div className={`card card-product w-100 ${view === 'column' ? 'list-column' : 'list-row'} ${view === 'column' ? '' : 'd-flex flex-column flex-md-row align-items-center p-3 gap-3 rounded-5'}`} style={{ cursor: "pointer" }}>
                                                <img
                                                    src={item.image}
                                                    className={view === 'column' ? 'card-img-top' : 'img-fluid w-25 w-md-25 img-thumbnail border-0 bg-transparent'}
                                                    alt={item.name}
                                                    loading="lazy"
                                                    decoding="async"
                                                />
                                                <div className={`card-body ${view === 'column' ? 'p-2' : 'flex-grow-1 p-3'}`}>
                                                    <p className={`card-text text-muted small mt-2 fs-4 fw-semibold ${view === 'column' ? 'd-none' : 'd-none d-md-block'}`}>
                                                        {descrizioniSostenibili[item.id % descrizioniSostenibili.length]}
                                                    </p>
                                                    <h6 className={`card-title fw-bold mt-3 mb-2 ${view === 'column' ? '' : 'fs-3 mt-0'}`}>
                                                        {item.name}
                                                    </h6>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <p className={`card-text fw-bold mb-0 ${view === 'row' ? 'fs-3' : 'small'}`}>
                                                            {priceFormatter(item.price)}
                                                        </p>
                                                        <button
                                                            type="button"
                                                            className={`btn rounded-circle ${view === 'row' ? 'btn-lg fs-4' : ''}`}
                                                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToWishlist(item); }}
                                                        >
                                                            <i className={`bi ${inWishlist ? "bi-heart-fill" : "bi-heart"}`}></i>
                                                        </button>
                                                    </div>

                                                    <div className="addbtn w-100 mt-2" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
                                                        {!inCart ? (
                                                            <button
                                                                type="button"
                                                                className="btn btn-dark rounded-pill w-100"
                                                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); addHandler(item); }}
                                                            >
                                                                <i className="bi bi-cart me-2"></i> Aggiungi
                                                            </button>
                                                        ) : (
                                                            <div className="btn btn-dark rounded-pill w-100 d-flex justify-content-between align-items-center px-3">
                                                                <button
                                                                    className="btn btn-sm text-white p-0"
                                                                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); countCart.quantity === 1 ? removeHandler(item.id) : updateQuantity(item.id, -1); }}
                                                                >
                                                                    <i className="bi bi-dash-lg"></i>
                                                                </button>

                                                                <div className="d-flex gap-2">
                                                                    <span className="fw-bold">{countCart.quantity}  </span>
                                                                    <i className="bi bi-cart-fill"></i>
                                                                </div>
                                                                <button
                                                                    className="btn btn-sm text-white p-0"
                                                                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); updateQuantity(item.id, +1); }}
                                                                >
                                                                    <i className="bi bi-plus-lg"></i>
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>

                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>

                            <div className="d-flex flex-column align-items-center gap-2 mt-4">
                                <nav>
                                    <ul className="pagination mb-0">
                                        <li className={"page-item" + (page <= 1 ? " disabled" : "")}>
                                            <button className="page-link text-dark" onClick={() => goToPage(page - 1)} type="button">Precedente</button>
                                        </li>
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                            <li key={p} className={"page-item" + (p === page ? " active" : "")}>
                                                <button className="page-link text-dark" onClick={() => goToPage(p)} type="button">{p}</button>
                                            </li>
                                        ))}
                                        <li className={"page-item" + (page >= totalPages ? " disabled" : "")}>
                                            <button className="page-link text-dark" onClick={() => goToPage(page + 1)} type="button">Successiva</button>
                                        </li>
                                    </ul>
                                </nav>
                                <small className="text-muted">Pagina {page} di {totalPages}</small>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Product;