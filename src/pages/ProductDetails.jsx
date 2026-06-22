import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

function ProductDetails() {

    const { slug } = useParams();

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
            <div className="container py-5 text-center">
                <div className="alert alert-danger">
                    Si è verificato un errore: {error}
                </div>
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
                    <h3 className="text-primary mb-4">€{Number(product.price).toFixed(2)}</h3>
                    {/* 'Lead': serve a risaltare un paragrafo specifico all'interno di una pagina.*/}
                    <p className="lead mb-4">{product.description}</p>

                    <button className="btn btn-dark btn-lg px-4 me-md-2">
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