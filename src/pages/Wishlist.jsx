import React from "react"
import { useAppContext } from '../Context/AppContext';

function Wishlist(){
    const { wishlist } = useAppContext();

    return(
        <>
        {wishlist.length === 0 ? (
                <div className="d-flex flex-column align-items-center justify-content-center py-5">
                    <i className="bi bi-heart text-warning" style={{ fontSize: '4rem' }}></i>
                    <h4 className="mt-3 text-dark">La tua lista dei desideri è attualmente vuota</h4>
                </div>
            ) : (
        <div className="container">
            <div className="d-flex flex-wrap gap-3 justify-content-center">
        {wishlist.map((item) => (
            <div key={item.id} className="card shadow-sm" style={{ width: "160px" }}>
                <img
                    src={item.image}
                    alt={item.name}
                    className="card-img-top"
                    style={{ height: "160px", objectFit: "cover" }}
                />
                <div className="card-body p-2 text-center">
                    <p className="card-text small fw-semibold mb-0">{item.name}</p>
                </div>
            </div>
        ))}
    </div>
        </div>
            )}
        </>
    )
}

export default Wishlist