import styles from '../pages/Product.module.css'

function ProductCardGrid({
    item,
    inCart,
    inWishlist,
    addHandler,
    addToWishlist,
    updateQuantity,
    removeHandler,
    countCart,
    priceFormatter
}) {
    return (
        <div className={`card ${styles.cardProduct} w-100`}>

            {/* IMAGE */}
            <img
                src={item.image}
                alt={item.name}
                className="card-img-top img-fluid w-100 object-fit-cover"
            />

            <div className="card-body p-3">

                {/* TITLE */}
                <h5 className="card-title fw-bold mb-2">
                    {item.name}
                </h5>

                {/* PRICE + WISHLIST */}
                <div className="d-flex justify-content-between align-items-center">

                    <p className={`fw-bold mb-0 ${styles.cardPrice}`}>
                        {priceFormatter(item.price)}
                    </p>
                </div>

                <div className="addbtn w-100 mt-2 d-flex flex-row">

                    {/* ADD / CART */}

                    {!inCart ? (
                        <button
                            type="button"
                            className={`w-100 me-3 ${styles.btnAddToCartGrid} ${styles.gradientBtn}`}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                addHandler(item);
                            }}
                        >
                            <i className="bi bi-cart me-2 fs-5"></i>
                            Aggiungi
                        </button>
                    ) : (
                        <div className={`${styles.btnAddToCartGrid} w-100 d-flex justify-content-between align-items-center px-3 me-3 ${styles.gradientBtn}`}>

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

                            <div className="d-flex gap-2 align-items-center">
                                <span className="fw-bold">{countCart.quantity}</span>
                                <i className="bi bi-cart-fill fs-5" />
                            </div>

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
                </div>
            </div>
        </div>
    );
}

export default ProductCardGrid;