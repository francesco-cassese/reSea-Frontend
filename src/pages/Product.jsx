import React from "react"
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

function Product() {

    const { data, loading, error } = useFetch('/products')

    if (loading) return <p>Caricamento dei prodotti in corso...</p>
    if (error) return <p>Qualcosa è andato storto...</p>

    return (
        <>
            <div className="container py-3">
                {data && data.map((item) => (
                    < Link to={`/products/${item.slug}`} className="text-decoration-none text-dark d-inline-block" key={item.id}>
                        <div className="card" style={{ cursor: "pointer", width: "18rem" }}>
                            <img src={item.image} className="card-img-top" style={{ height: "250px", objectFit: "contain" }} />
                            <div className="card-body p-2">
                                <h6 className="card-title mb-1">{item.name}</h6>

                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="card-text fw-bold mb-0 small">€{item.price.toFixed(2)}</p>

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
            </div >
        </>
    )
}

export default Product