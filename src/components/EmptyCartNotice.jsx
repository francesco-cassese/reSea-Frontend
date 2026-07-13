import { Link } from "react-router-dom";

function EmptyCartNotice() {
    return (
        <div className="container py-5">
            <div className="mb-3">
                <Link to="/cart" className="text-decoration-none d-flex align-items-center fw-bold">
                    <i className="bi bi-arrow-left me-2"></i> Torna al carrello
                </Link>
            </div>
            <div className='text-center'>
                <h1>Non è stato possibile mostrare il riepilogo</h1>
                <p>Il tuo carrello è vuoto!</p>
            </div>
        </div>
    );
}

export default EmptyCartNotice;
