import { useAppContext } from '../context/AppContext.jsx';
import { priceFormatter } from '../services/reseaServices.js';

function CartList() {

    const { cart, removeHandler, updateQuantity, addToWishlist, wishlist } = useAppContext();
    let cartToShow;

    if (cart.length === 0) {
        // Se il carrello è vuoto
        cartToShow = <p>Attualmente il tuo carrello è vuoto.</p>;
    } else {
        // Se il carrello è pieno
        cartToShow = cart.map((item) => (
            <div key={item.id}>
                <div className="d-flex align-items-start flex-wrap p-3 rounded-4 shadow-sm cart-card mb-3">
                    {/* image */}
                    <div className="cart-img flex-shrink-0 rounded-3 bg-light" style={{ backgroundImage: `url(${item.image})`, backgroundSize: 'cover' }} />

                    {/* info */}
                    <div className="flex-grow-1">
                        <h5 className="fw-bold mb-1">{item.name}</h5>
                        <div className="d-flex flex-column gap-1 mb-3">
                            <div className="d-flex align-items-center hide-on-small gap-2">
                                <i className="bi bi-shield-check text-secondary"></i>
                                <span className="small text-secondary">Protezione UV 100%</span>
                            </div>
                            <div className="d-flex align-items-center hide-on-small gap-2">
                                <i className="bi bi-recycle text-secondary"></i>
                                <span className="small text-secondary">Materiali sostenibili</span>
                            </div>
                        </div>

                        <div className="d-flex align-items-center gap-1">
                            <button
                                className="btn btn-link p-0 text-decoration-none"
                                onClick={() => addToWishlist(item)}
                                style={{ cursor: "pointer" }}
                            >
                                <i className={`bi ${wishlist.some(w => w.id === item.id) ? 'bi-heart-fill text-danger' : 'bi-heart'} text-muted`}></i>
                                <span className="small text-muted text-decoration-underline ms-1">
                                    {wishlist.some(w => w.id === item.id) ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* divider */}
                    <div className="vr mx-1 d-none d-md-block" />

                    {/* actions */}
                    <div className="flex-fill d-flex flex-column align-items-center gap-1 cart-card" style={{ minWidth: "140px" }}>
                        <div className="d-flex align-items-center justify-content-center gap-2">
                            <div className="d-flex align-items-center gap-2 px-2 py-1 rounded-pill bg-light">
                                <button
                                    className="btn btn-sm rounded-circle cart-qty-btn"
                                    onClick={() => updateQuantity(item.id, -1)}
                                >
                                    −
                                </button>
                                <span className="fw-semibold small">{item.quantity}</span>
                                <button
                                    className="btn btn-sm rounded-circle cart-qty-btn"
                                    onClick={() => updateQuantity(item.id, 1)}
                                >
                                    +
                                </button>
                            </div>
                            <button
                                className="btn btn-light rounded-3 p-2"
                                onClick={() => removeHandler(item.id)}
                            >
                                <i className="bi bi-trash text-secondary"></i>
                            </button>
                        </div>

                        <span className="fw-bold fs-5 text-primary">
                            {priceFormatter(item.price * item.quantity)}
                        </span>
                    </div>
                </div>
            </div>
        ));

    }

    return (
        <>
            {cartToShow}
        </>
    );
}

export default CartList;