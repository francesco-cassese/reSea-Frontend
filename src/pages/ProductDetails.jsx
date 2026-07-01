import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useAppContext } from "../context/AppContext";
import { priceFormatter } from "../services/reseaServices";
import { Link } from 'react-router-dom';
import styles from './ProductDetails.module.css';

function ProductDetails() {

    const { slug } = useParams();
    const { addHandler, addToWishlist, inWishlist } = useAppContext();

    const risultato = useFetch(`/products/${slug}`);
    const product = risultato.data;
    const loading = risultato.loading;
    const error = risultato.error;

    if (loading) {
        return (
            <div className="container py-5 text-center">
                {/* spinner-border: classe per creare una specie di barra di caricamento tonda 
                che ruota su se stessa */}
                <div className="spinner-border text-primary">
                    Caricamento in corso...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <h1>Siamo spiacenti!</h1>
                <p>Non abbiamo trovato alcun prodotto associato al nome: <strong>{slug}</strong></p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container py-5 text-center">
                <h3>Prodotto non trovato</h3>
            </div>
        );
    }

    const isWishlisted = inWishlist(product.id);

    const addToCartHandler = () => {
        addHandler(product);
        alert(`${product.name} è stato aggiunto al carrello!`);
    };

    const addToWishlistHandler = () => {
        const wasInWishlist = inWishlist(product.id);
        addToWishlist(product);
        if (wasInWishlist) {
            alert(`${product.name} rimosso dai Preferiti`);
        } else {
            alert(`${product.name} aggiunto ai Preferiti`);
        }
    };

    return (
       <div className={`${styles.productPage} min-vh-100`}>
    <div className="container py-5">

        {/* BACK LINK */}
        <Link className={`${styles.backLink} d-inline-flex align-items-center gap-2 mb-4 text-decoration-none`} to="/products">
            <i className="bi bi-arrow-left"></i>
            <span className="small fw-semibold">Torna ai prodotti</span>
        </Link>

        <div className="row g-5 align-items-stretch">

            {/* IMAGE */}
            <div className="col-md-6">
                <div className={`${styles.imageWrapper} rounded-5 overflow-hidden w-100 h-100`}>
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-100 h-100"
                        style={{ objectFit: 'cover', minHeight: '420px' }}
                    />
                </div>
            </div>

            {/* INFO */}
            <div className="col-md-6 d-flex flex-column justify-content-between gap-4">

                {/* HEADER */}
                <div>
                    <span className={`badge rounded-pill mb-3 px-3 py-2 ${styles.categoryBadge}`}>
                        <i className="bi bi-water me-1"></i> Collezione Mare
                    </span>
                    <h1 className="fw-bold mb-2" style={{ fontSize: '2.2rem', lineHeight: 1.2 }}>
                        {product.name}
                    </h1>
                    <p className="text-muted mb-0 fs-6">{product.description}</p>
                </div>

                {/* PLASTIC OFFSET */}
                <div className={`rounded-4 p-3 d-flex align-items-center gap-3 ${styles.ecoBox}`}>
                    <div className={`${styles.ecoIcon} rounded-3 d-flex align-items-center justify-content-center flex-shrink-0`}>
                        <i className="bi bi-recycle fs-4"></i>
                    </div>
                    <div>
                        <p className="mb-0 fw-semibold small">Impatto ambientale positivo</p>
                        <p className="mb-0 text-muted small">
                            Con questo acquisto compensi <strong className="text-success">{product.plastic_offset_kg} kg</strong> di plastica dall'oceano
                        </p>
                    </div>
                </div>

                {/* FEATURES */}
                <div className="d-flex flex-column gap-2">
                    <div className="d-flex align-items-center gap-2">
                        <i className="bi bi-shield-check text-success"></i>
                        <span className="small text-muted">Protezione UV 100%</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                        <i className="bi bi-award text-success"></i>
                        <span className="small text-muted">Materiali certificati sostenibili</span>
                    </div>
                </div>

                {/* DIVIDER */}
                <hr className="my-0" />

                {/* PRICE + ACTIONS */}
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                    <div>
                        <span className="text-muted small d-block mb-1">Prezzo</span>
                        <span className={`fw-bold ${styles.price}`} style={{ fontSize: '2rem' }}>
                            {priceFormatter(product.price)}
                        </span>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                        <button
                            className={`btn btn-lg rounded-pill px-4 fw-semibold ${styles.addToCartBtn}`}
                            onClick={addToCartHandler}
                        >
                            <i className="bi bi-cart-plus me-2"></i>
                            Aggiungi al carrello
                        </button>

                        <button
                            className={`btn btn-lg rounded-circle ${styles.wishlistBtn} ${isWishlisted ? styles.wishlisted : ''}`}
                            onClick={addToWishlistHandler}
                        >
                            <i className={`bi ${isWishlisted ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>
    );
}

export default ProductDetails;