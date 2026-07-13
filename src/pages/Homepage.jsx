import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch.js";
import { heroSlides, HERO_INTERVAL_MS } from "../data/heroSlides.js";
import ProductCarouselSection from "../components/ProductCarouselSection.jsx";
import styles from "./Homepage.module.css";

const heroBannerStyles = {
    "hero-banner1": styles.heroBanner1,
    "hero-banner2": styles.heroBanner2,
    "hero-banner3": styles.heroBanner3,
};

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