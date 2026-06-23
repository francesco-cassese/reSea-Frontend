import { useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useCategories } from "../Context/CategoriesContext";
import { useAppContext } from "../Context/AppContext";

function Product() {
    const { categories, categoriesLoading, categoriesError } = useCategories();
    const [selectedCategory, setSelectedCategory] = useState("all");
    const { search, setSearch } = useAppContext();
    const endpoint =
        selectedCategory === "all"
            ? "/products"
            : "/products?category=" + encodeURIComponent(selectedCategory);

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
    console.log(data?.[0]);
    return (
        <div className="container py-3">
            <div className="mb-3 d-flex align-items-center gap-2">
                <label htmlFor="categoryFilter" className="form-label mb-0">
                    Categoria
                </label>
                <select
                    id="categoryFilter"
                    className="form-select w-auto"
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
                    <small className="text-danger">Errore nel caricamento categorie</small>
                )}

                {/* SEARCH BAR - agganciare navSearch e handleNavbarSearch quando pronto */}
                <div className="nav-item d-flex gap-2 mx-2">
                    <input
                        className="form-control form-control-sm border-0 text-dark rounded-pill"
                        type="search"
                        placeholder="Cerca..."
                        style={{ width: '200px' }}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    // onChange={e => setNavSearch(e.target.value)}
                    // onKeyDown={e => e.key === 'Enter' && handleNavbarSearch()}
                    />
                    <button
                        className="nav-btn btn-sm btn-light text-dark fw-bold"
                    // onClick={handleNavbarSearch}
                    >
                        Cerca
                    </button>
                </div>
            </div>


            <div className="d-flex flex-wrap gap-3">
                {filteredProducts &&
                    filteredProducts.map((item) => (
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
                                />
                                <div className="card-body p-2">
                                    <h6 className="card-title mb-1">{item.name}</h6>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <p className="card-text fw-bold mb-0 small">
                                            €{Number(item.price).toFixed(2)}
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
        </div>
    );
}

export default Product