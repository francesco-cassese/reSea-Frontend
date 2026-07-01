import React from "react"
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext';
import styles from "./Wishlist.module.css";
import { priceFormatter } from "../services/reseaServices";

function Wishlist() {
    const { wishlist, cart, addToWishlist, addHandler, removeHandler, updateQuantity } = useAppContext();

    return (
        <>
            {wishlist.length === 0 ? (
                <div className="d-flex flex-column align-items-center justify-content-center text-center py-5">
                    <i className="bi bi-heart text-warning" style={{ fontSize: '4rem' }}></i>
                    <h4 className="mt-3 text-dark">La tua lista dei desideri è attualmente vuota</h4>
                    <Link to="/products" className={`btn btn-primary rounded-pill mt-3 ${styles.btnAddToCartGrid} fw-bold`}>Vai allo shop</Link>
                </div>
            ) : (
                <div className="container py-5">
                    <h2 className={styles.wishlistTitle}>La tua Wishlist 💙</h2>

                    <div className={styles.wishlistGrid}>
                        {wishlist.map((item) => {
                            const countCart = cart.find(c => c.id === item.id);
                            const inCart = countCart !== undefined;

                            return (
                                <div key={item.id} className={styles.wishlistCard}>
                                    <Link to={"/products/" + item.slug}>
                                        <div className={styles.wishlistImage}>

                                            <img src={item.image} alt={item.name} />
                                            <span className={styles.wishlistBadge}>
                                                ♻ Plastica Riciclata
                                            </span>

                                        </div>
                                    </Link>
                                    <div className={styles.wishlistBody}>
                                        <h6>{item.name}</h6>
                                        <p className={styles.wishlistPrice}>
                                            {priceFormatter(item.price)}
                                        </p>
                                        <div className={styles.wishlistButtons}>

                                            {!inCart ? (
                                                <button
                                                    type="button"
                                                    className={`w-100 me-3 rounded-pill ${styles.btnAddToCartGrid} ${styles.gradientBtn}`}
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
                                                <div className={`${styles.btnAddToCartGrid} w-100 d-flex rounded-pill justify-content-between align-items-center px-3 me-3 ${styles.gradientBtn}`}>
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
                                                className={`btn rounded-pill ${styles.wishlistDelete}`}
                                                onClick={() => addToWishlist(item)}
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    )
}

export default Wishlist;