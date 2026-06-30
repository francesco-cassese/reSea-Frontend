import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch.js";
import { heroSlides, HERO_INTERVAL_MS } from "../data/heroSlides.js";
import { priceFormatter } from "../services/reseaServices.js";
import styles from "./Homepage.module.css";

const heroBannerStyles = {
    "hero-banner1": styles.heroBanner1,
    "hero-banner2": styles.heroBanner2,
    "hero-banner3": styles.heroBanner3,
};

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
n
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

function Homepage() {
    const [activeSlide, setActiveSlide] = useState(0);
    const intervalRef = useRef(null); // <--- Crea il riferimento per il timer

    // Funzione per far partire o resettare il timer
    const startTimer = () => {
        // Pulisci l'eventuale timer precedente
        if (intervalRef.current) clearInterval(intervalRef.current);

        // Avvia un nuovo timer
        intervalRef.current = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % heroSlides.length);
        }, HERO_INTERVAL_MS);
    };

    // All'avvio, fai partire il timer
    useEffect(() => {
        startTimer();
        return () => clearInterval(intervalRef.current); // Pulizia alla chiusura
    }, []);

    // Gestione click manuale
    const handleDotClick = (index) => {
        setActiveSlide(index); // Cambia slide
        startTimer();          // Reset del timer!
    };

    const currentHero = heroSlides[activeSlide];

    const {
        data: bestSellers,
        loading: bestSellersLoading,
        error: bestSellersError
    } = useFetch("/products/best-sellers?limit=5");

    const {
        data: latestProducts,
        loading: latestLoading,
        error: latestError
    } = useFetch("/products?sortBy=recent&limit=5");


    return (
        <>
            <section className={`${styles.heroSlider} ${heroBannerStyles[currentHero.className]}`}>
                <div className={styles.heroOverlay}></div>
                <div className={`container ${styles.heroContent}`}>
                    <h1 className={styles.heroTitle}>{currentHero.title}</h1>
                    <p className={styles.heroText}>{currentHero.text}</p>
                    <Link to={currentHero.ctaTo} className="btn btn-pay fw-bold rounded-pill px-4">
                        {currentHero.ctaLabel}
                    </Link>

                </div>

                <div className={styles.heroDots}>
                    {heroSlides.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            className={`${styles.heroDot} ${index === activeSlide ? styles.active : ""}`}
                            onClick={() => handleDotClick(index)}
                            aria-label={"Vai al banner " + (index + 1)}
                        />
                    ))}
                </div>
            </section>

            <ProductCarouselSection
                title="I nostri bestseller"
                products={bestSellers}
                loading={bestSellersLoading}
                error={bestSellersError}
            />

            <ProductCarouselSection
                title="Nuovi arrivi"
                products={latestProducts}
                loading={latestLoading}
                error={latestError}
            />
        </>
    );
}

export default Homepage;