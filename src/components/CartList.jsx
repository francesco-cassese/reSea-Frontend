import { useAppContext } from '../context/AppContext.jsx';
import { priceFormatter } from '../services/reseaServices.js';
import styles from './CartList.module.css';

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
                <div className={`d-flex flex-wrap p-3 rounded-4 shadow-sm ${styles.cartCard} mb-3`}>
                    {/* image */}
                    <div className={`${styles.cartImg} flex-shrink-0 rounded-3 bg-light`} style={{ backgroundImage: `url(${item.image})` }} />

                    {/* info */}
                    <div className={`flex-grow-1  ${styles.infoCol}`}>
                        <h5 className={`fw-bold mb-1 ${styles.productName}`}>{item.name}</h5>
                        <div className="d-flex flex-column gap-1 mb-3">
                            <div className={`d-flex align-items-center ${styles.hideOnSmall} gap-2`}>
                                <i className="bi bi-shield-check text-secondary"></i>
                                <span className="small text-secondary">Protezione UV 100%</span>
                            </div>
                            <div className={`d-flex align-items-center ${styles.hideOnSmall} gap-2`}>
                                <i className="bi bi-recycle text-success"></i>
                                <span className="small text-success">Materiali sostenibili</span>
                            </div>
                        </div>

                        <div className="d-flex align-items-center gap-1">
                            <button
                                className={`btn btn-link p-0 text-decoration-none ${styles.likeBtn}`}
                                onClick={() => addToWishlist(item)}
                            >
                                <i className={`bi ${wishlist.some(w => w.id === item.id) ? 'bi-heart-fill text-danger' : 'bi-heart'} text-muted`}></i>
                                <span className="small text-muted text-decoration-underline ms-1">
                                    {wishlist.some(w => w.id === item.id) ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* actions */}
                    <div className={`flex-fill d-flex flex-column align-items-center justify-content-center gap-2 ${styles.actionsCol}`}>

                        {/* + e - in alto, più larghi */}
                        <div className="d-flex align-items-center gap-2 px-3 py-2 rounded-pill bg-light w-100 justify-content-center">
                            <button
                                className={`btn btn-sm rounded-circle ${styles.cartQtyBtn}`}
                                onClick={() => item.quantity === 1 ? removeHandler(item.id) : updateQuantity(item.id, -1)}
                            >
                                {item.quantity === 1 ? <i className="bi bi-trash text-secondary"></i> : `−`}
                            </button>
                            <span className="fw-semibold">{item.quantity}</span>
                            <button
                                className={`btn btn-sm rounded-circle ${styles.cartQtyBtn}`}
                                onClick={() => updateQuantity(item.id, 1)}
                            >
                                +
                            </button>
                        </div>

                        {/* rimuovi centrato */}
                        <button
                            className={`btn btn-outline-secondary rounded-3 px-3 py-1 w-auto ${styles.removeBtn}`}
                            onClick={() => removeHandler(item.id)}
                        >
                            Rimuovi
                        </button>

                        {/* prezzo */}
                        <span className="fw-bold fs-5 text-dark">
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