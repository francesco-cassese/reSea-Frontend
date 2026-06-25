import React from "react"
import { Link } from 'react-router-dom'
import { useAppContext } from '../Context/AppContext';

function Wishlist() {
    const { wishlist, addToWishlist, addHandler } = useAppContext();

    return (
        <>
            <h2 className="mb-4 text-center">La tua Lista dei Desideri</h2>
            {wishlist.length === 0 ? (
                <div className="d-flex flex-column align-items-center justify-content-center py-5">
                    <i className="bi bi-heart text-warning" style={{ fontSize: '4rem' }}></i>
                    <h4 className="mt-3 text-dark">La tua lista dei desideri è attualmente vuota</h4>
                    <Link to="/products" className="btn btn-primary mt-3">Vai allo shop</Link>
                </div>
            ) : (
                <div className="container">
                    <div className="d-flex flex-wrap gap-3 justify-content-center">
                        {wishlist.map((item) => (
                            <div key={item.id} className="card shadow-sm position-relative" style={{ width: "160px" }}>
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="card-img-top"
                                    style={{ height: "160px", objectFit: "cover" }}
                                />
                                <div className="card-body p-2 text-center">
                                    <p className="card-text small fw-semibold mb-0">{item.name}</p>
                                    <div className="d-flex justify-content-center">
                                        <p className="small fw-bold text-primary">
                                            € {item.price.toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                                <div className="d-flex gap-1 px-2 pb-2">
                                    <button
                                        className="btn btn-sm btn-outline-primary flex-fill"
                                        onClick={() => addHandler(item)}
                                    >
                                        <i className="bi bi-cart-plus"></i>
                                    </button>
                                    <button
                                        className="btn btn-sm btn-outline-danger flex-fill"
                                        onClick={() => addToWishlist(item)}
                                    >
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}

export default Wishlist;