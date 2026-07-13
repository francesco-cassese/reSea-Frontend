import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { priceFormatter } from "../services/formatters.js";
import styles from "./ProductCarouselSection.module.css";

function ProductCarouselSection({ title, products, loading, error }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardsPerView, setCardsPerView] = useState(3);

    useEffect(() => {
        function updateCardsPerView() {
            const width = window.innerWidth;
            if (width < 576) {
                setCardsPerView(1);
            } else if (width < 992) {
                setCardsPerView(2);
            } else {
                setCardsPerView(3);
            }
        }

        updateCardsPerView();
        window.addEventListener("resize", updateCardsPerView);
        return () => window.removeEventListener("resize", updateCardsPerView);
    }, []);


    const safeProducts = Array.isArray(products) ? products : [];
    const maxIndex = Math.max(0, safeProducts.length - cardsPerView);

    useEffect(() => {
        if (currentIndex > maxIndex) {
            setCurrentIndex(maxIndex);
        }
    }, [currentIndex, maxIndex]);

    if (loading) {
        return (
            <section className="container py-5">
                <h2 className={`${styles.sectionTitle} mb-3`}>{title}</h2>
                <p>Caricamento in corso...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className="container py-5">
                <h2 className={`${styles.sectionTitle} mb-3`}>{title}</h2>
                <p>Errore nel caricamento dei prodotti.</p>
            </section>
        );
    }

    if (safeProducts.length === 0) {
        return (
            <section className="container py-5" >
                <h2 className={`${styles.sectionTitle} mb-3`}>{title}</h2>
                <p>Nessun prodotto disponibile.</p>
            </section >
        );
    }

    return (
        <section className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className={`${styles.sectionTitle} mb-0`}>{title}</h2>

                <div className="d-flex gap-2">
                    <button
                        type="button"
                        className="btn btn-outline-dark btn-sm"
                        onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                        disabled={currentIndex === 0}
                    >
                        <i className="bi bi-chevron-left"></i>
                    </button>
                    <button
                        type="button"
                        className="btn btn-outline-dark btn-sm"
                        onClick={() => setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))}
                        disabled={currentIndex === maxIndex}
                    >
                        <i className="bi bi-chevron-right"></i>
                    </button>
                </div>
            </div>

            <div className={styles.productCarouselViewport}>
                <div
                    className={styles.productCarouselTrack}
                    style={{ transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)` }}
                >
                    {safeProducts.map((item) => (
                        <div
                            className={styles.productCarouselItem}
                            key={item.id}
                            style={{ flex: `0 0 calc(100% / ${cardsPerView})` }}
                        >
                            <Link to={"/products/" + item.slug} className="text-decoration-none text-dark">
                                <div className={`card ${styles.homeCard} h-100`}>
                                    <img
                                        src={item.image}
                                        className="card-img-top"
                                        alt={item.name}
                                    />

                                    <div className="card-body">
                                        <h6 className={`card-title ${styles.homeCardTitle}`}>{item.name}</h6>
                                        <p className={`card-text fw-bold mb-0 ${styles.homeCardPrice}`}>{priceFormatter(item.price)}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ProductCarouselSection;
