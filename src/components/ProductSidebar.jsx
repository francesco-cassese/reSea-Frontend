import styles from './ProductSidebar.module.css';

function ProductSidebar({
    searchInput,
    setSearchInput,
    applySearch,
    handleSearchKeyDown,
    selectedCategory,
    handleCategoryChange,
    safeCategories,
    categoriesLoading,
    categoriesError,
    minPriceInput,
    setMinPriceInput,
    maxPriceInput,
    setMaxPriceInput,
    sortBy,
    handleSortChange,
    limit,
    handleLimitChange,
    handlePriceFilters,
    clearAllFilters,
}) {
    return (
        <div className={`d-flex flex-column gap-4 p-3 rounded-3 bg-light ${styles.sidebarFilter}`}>

            {/* Search */}
            <div>
                <h6 className="fw-bold mb-2">Cerca</h6>
                <div className="input-group">
                    <input
                        className="form-control form-control-sm"
                        type="search"
                        placeholder="Nome prodotto..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        onKeyDown={handleSearchKeyDown}
                    />
                    <button className={`btn btn-sm ${styles.btnSearch}`} onClick={applySearch} type="button">
                        <i className="bi bi-search fs-5"></i>
                    </button>
                </div>
            </div>

            <hr className="my-0" />

            {/* Categoria */}
            <div>
                <h6 className="fw-bold mb-2">Categoria</h6>
                <select
                    className="form-select form-select-sm"
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
                    <small className="text-danger mt-1 d-block">Errore nel caricamento categorie</small>
                )}
            </div>

            <hr className="my-0" />

            {/* Prezzo */}
            <div>
                <h6 className="fw-bold mb-2">Prezzo</h6>
                <div className="d-flex flex-column gap-2">
                    <input
                        type="number"
                        className="form-control form-control-sm"
                        placeholder="Min €"
                        value={minPriceInput}
                        onChange={(e) => setMinPriceInput(e.target.value)}
                    />
                    <input
                        type="number"
                        className="form-control form-control-sm"
                        placeholder="Max €"
                        value={maxPriceInput}
                        onChange={(e) => setMaxPriceInput(e.target.value)}
                    />
                    <button className="btn btn-sm w-100 btn-pay fw-bold" onClick={handlePriceFilters} type="button">
                        Applica
                    </button>
                </div>
            </div>

            <hr className="my-0" />

            {/* Ordina */}
            <div>
                <h6 className="fw-bold mb-2">Ordina per</h6>
                <select className="form-select form-select-sm" value={sortBy} onChange={handleSortChange}>
                    <option value="">Seleziona</option>
                    <option value="recent">Più recenti</option>
                    <option value="name_asc">Nome A-Z</option>
                    <option value="name_desc">Nome Z-A</option>
                    <option value="price_asc">Prezzo crescente</option>
                    <option value="price_desc">Prezzo decrescente</option>
                </select>
            </div>

            <hr className="my-0" />

            {/* Per pagina */}
            <div>
                <h6 className="fw-bold mb-2">Per pagina</h6>
                <select className="form-select form-select-sm" value={limit} onChange={handleLimitChange}>
                    <option value="6">6</option>
                    <option value="12">12</option>
                    <option value="24">24</option>
                    <option value="48">48</option>
                </select>
            </div>

            <hr className="my-0" />

            {/* Reset */}
            <button className="btn btn-outline-secondary btn-sm w-100 btn-pay fw-bold" onClick={clearAllFilters} type="button">
                Reset filtri
            </button>

        </div>
    );
}

export default ProductSidebar;