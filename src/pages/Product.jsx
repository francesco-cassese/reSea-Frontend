import { useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useCategories } from "../Context/CategoriesContext";
import { useAppContext } from "../Context/AppContext";

function Product() {
    const { categories, categoriesLoading, categoriesError } = useCategories();
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [minPriceInput, setMinPriceInput] = useState("");
    const [maxPriceInput, setMaxPriceInput] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [sortBy, setSortBy] = useState("");
    const { search, setSearch } = useAppContext();
    const params = new URLSearchParams();

    if (selectedCategory !== "all") {
        params.append("category", selectedCategory);
    }
    if (minPrice) {
        params.append("minPrice", minPrice);
    }
    if (maxPrice) {
        params.append("maxPrice", maxPrice);
    }
    if (sortBy) {
        params.append("sortBy", sortBy);
    }
    const endpoint = `/products?${params.toString()}`;

    const { data, loading, error } = useFetch(endpoint)
    if (loading) return <p>Caricamento dei prodotti in corso...</p>
    if (error) return <p>Qualcosa è andato storto...</p>

    const filteredProducts = data?.filter((item) => {
        const text = search.toLowerCase();

        return (
            item.name?.toLowerCase().includes(text) ||
            item.category?.name?.toLowerCase().includes(text)
        );
    });

    return (
        <div className="container py-3">

            {/* SEARCH */}
            <div className="mb-4">
                <input
                    className="form-control"
                    type="search"
                    placeholder="Cerca un prodotto..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* FILTRI */}
            <div className="row g-3 align-items-end mb-4">

                <div className="col-md-3">
                    <label htmlFor="categoryFilter" className="form-label">
                        Categoria
                    </label>

                    <select
                        id="categoryFilter"
                        className="form-select"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        disabled={categoriesLoading}
                    >
                        <option value="all">Tutte</option>

                        {categories.map((category) => (
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
                    <label className="form-label">
                        Prezzo min
                    </label>

                    <input
                        type="number"
                        className="form-control"
                        placeholder="0"
                        value={minPriceInput}
                        onChange={(e) => setMinPriceInput(e.target.value)}
                    />
                </div>

                <div className="col-md-2">
                    <label className="form-label">
                        Prezzo max
                    </label>

                    <input
                        type="number"
                        className="form-control"
                        placeholder="1000"
                        value={maxPriceInput}
                        onChange={(e) => setMaxPriceInput(e.target.value)}
                    />
                </div>

                <div className="col-md-2">
                    <label className="form-label">
                        Ordina per
                    </label>

                    <select
                        className="form-select"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="">Seleziona</option>
                        <option value="recent">Più recenti</option>
                        <option value="price_asc">Prezzo crescente</option>
                        <option value="price_desc">Prezzo decrescente</option>
                    </select>
                </div>

                <div className="col-md-3">
                    <button
                        className="btn btn-primary w-100"
                        onClick={() => {
                            setMinPrice(minPriceInput);
                            setMaxPrice(maxPriceInput);
                        }}
                    >
                        Applica filtri
                    </button>
                </div>

            </div>

            {/* RISULTATI RICERCA */}
            {filteredProducts.length === 0 && search.trim() !== "" && (
                <div className="mb-3">
                    <p className="fs-5 mb-0">
                        Nessun risultato per "{search}"
                    </p>
                </div>
            )}

            {/* LISTA PRODOTTI */}
            <div className="d-flex flex-wrap gap-3">

                {filteredProducts &&
                    filteredProducts.map((item) => (
                        <Link
                            to={"/products/" + item.slug}
                            className="text-decoration-none text-dark d-inline-block"
                            key={item.id}
                        >
                            <div
                                className="card"
                                style={{
                                    cursor: "pointer",
                                    width: "18rem"
                                }}
                            >
                                <img
                                    src={item.image}
                                    className="card-img-top"
                                    style={{
                                        height: "250px",
                                        objectFit: "contain"
                                    }}
                                    alt={item.name}
                                />

                                <div className="card-body p-2">
                                    <h6 className="card-title mb-1">
                                        {item.name}
                                    </h6>

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

        </div>
    );
}

export default Product