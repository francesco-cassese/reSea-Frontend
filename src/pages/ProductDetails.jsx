import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useAppContext } from "../Context/AppContext";
import { priceFormatter } from "../services/reseaServices";

function ProductDetails() {

    const { slug } = useParams();
    const { addHandler } = useAppContext();

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

    const addToCartHandler = () => {
        addHandler(product);
        alert(`${product.name} è stato aggiunto al carrello!`);
    };

    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-md-6 mb-4">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="img-fluid rounded"
                    />
                </div>
                <div className="col-md-6">
                    <h1 className="fw-bold mb-3">{product.name}</h1>
                    <h3 className="text-primary mb-4">{priceFormatter(product.price)}</h3>

                    <div className="alert alert-success p-2 mb-4 d-inline-block">
                        <i className="bi bi-recycle me-2"></i>
                        Acquistando questo prodotto compensi ad eliminare <strong>{product.plastic_offset_kg} kg</strong> di plastica!
                    </div>

                    {/* 'Lead': serve a risaltare un paragrafo specifico all'interno di una pagina.*/}
                    <p className="lead mb-4">{product.description}</p>

                    <button
                        className="btn btn-dark btn-lg px-4 me-md-2"
                        onClick={addToCartHandler}>
                        Aggiungi al carrello
                    </button>
                    {/* 'outline': crea un bottone trasparente con solo il bordo colorato di rosso */}
                    <button className="btn btn-outline-danger btn-lg">
                        <i className="bi bi-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;