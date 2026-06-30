import styles from '../pages/Product.module.css'

function ProductCardRow({
    item,
    inCart,
    inWishlist,
    addHandler,
    addToWishlist,
    updateQuantity,
    removeHandler,
    countCart,
    priceFormatter,
    descrizioniSostenibili
}) {
    return (
        <div className={`card w-100 d-flex flex-column flex-md-row align-items-stretch p-3 gap-3 rounded-5 ${styles.cardProduct}`}>

    {/* IMAGE - 1/4 della card */}
    <div
        className="overflow-hidden flex-shrink-0 rounded-4"
        style={{ width: '25%', minWidth: '120px', position: 'relative', minHeight: '150px' }}
    >
        <img
            src={item.image}
            alt={item.name}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
    </div>

    {/* INFO - occupa lo spazio centrale */}
    <div className="flex-grow-1 d-flex flex-column justify-content-center">
        <h4 className="card-title fw-bold mt-0 mb-2 fs-3">
            {item.name}
        </h4>
        <p className="text-muted small mt-2 fs-6 fw-semibold mb-0">
            {descrizioniSostenibili[item.id % descrizioniSostenibili.length]}
        </p>
    </div>

    {/* DIVIDER verticale */}
    <div className="vr d-none d-md-block" />

    {/* ACTIONS - ultimo quarto */}
    <div className="d-flex flex-column align-items-center justify-content-center gap-3" style={{ width: '25%', minWidth: '120px' }}>

        <p className={`fw-bold mb-0 ${styles.cardPrice} fs-3`}>
            {priceFormatter(item.price)}
        </p>

        <div className="d-flex justify-content-center align-items-center gap-2">

            {/* WISHLIST */}
            <button
                type="button"
                className={`btn rounded-circle ${styles.gradientBtn}`}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addToWishlist(item);
                }}
            >
                <i className={`bi ${inWishlist ? "bi-heart-fill" : "bi-heart"}`} />
            </button>

            {/* CART */}
            {!inCart ? (
                <button
                    type="button"
                    className={`btn rounded-pill ${styles.gradientBtn}`}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addHandler(item);
                    }}
                >
                    <i className="bi bi-cart fs-5" />
                </button>
            ) : (
                <div className={`btn btn-dark rounded-pill d-flex justify-content-between align-items-center px-3 ${styles.gradientBtn}`}>
                    <button
                        className="btn btn-sm text-white p-0"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            countCart.quantity === 1
                                ? removeHandler(item.id)
                                : updateQuantity(item.id, -1);
                        }}
                    >
                        <i className="bi bi-dash-lg" />
                    </button>

                    <span className="fw-bold mx-2">
                        {countCart.quantity}
                    </span>

                    <button
                        className="btn btn-sm text-white p-0"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            updateQuantity(item.id, +1);
                        }}
                    >
                        <i className="bi bi-plus-lg" />
                    </button>
                </div>
            )}

        </div>
    </div>
</div>
    );
}

export default ProductCardRow;