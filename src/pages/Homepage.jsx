import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch.js";
import { heroSlides, HERO_INTERVAL_MS } from "../data/heroSlides.js";
import { priceFormatter } from "../services/reseaServices.js";

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
                <h2 className="section-title mb-3">{title}</h2>
                <p>Caricamento in corso...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className="container py-5">
                <h2 className="section-title mb-3">{title}</h2>
                <p>Errore nel caricamento dei prodotti.</p>
            </section>
        );
    }

    if (safeProducts.length === 0) {
        return (
            <section className="container py-5" >
                <h2 className="section-title mb-3">{title}</h2>
                <p>Nessun prodotto disponibile.</p>
            </section >
        );
    }

    return (
        <section className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="section-title mb-0">{title}</h2>
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

            <div className="product-carousel-viewport">
                <div
                    className="product-carousel-track"
                    style={{ transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)` }}
                >
                    {safeProducts.map((item) => (
                        <div
                            className="product-carousel-item"
                            key={item.id}
                            style={{ flex: `0 0 calc(100% / ${cardsPerView})` }}
                        >
                            <Link to={"/products/" + item.slug} className="text-decoration-none text-dark">
                                <div className="card home-card h-100">
                                    <img
                                        src={item.image}
                                        className="card-img-top"
                                        alt={item.name}
                                    />

                                    <div className="card-body">
                                        <h6 className="card-title">{item.name}</h6>
                                        <p className="card-text fw-bold mb-0">{priceFormatter(item.price)}</p>
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

    useEffect(() => {
        const timerId = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % heroSlides.length);
        }, HERO_INTERVAL_MS);

        return () => clearInterval(timerId);
    }, []);

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
            <section className={"hero-slider " + currentHero.className}>
                <div className="hero-overlay"></div>
                <div className="container hero-content">
                    <h1 className="hero-title">{currentHero.title}</h1>
                    <p className="hero-text">{currentHero.text}</p>
                    <Link to={currentHero.ctaTo} className="btn btn-primary rounded-pill px-4">
                        {currentHero.ctaLabel}
                    </Link>

                </div>

                <div className="hero-dots">
                    {heroSlides.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            className={"hero-dot " + (index === activeSlide ? "active" : "")}
                            onClick={() => setActiveSlide(index)}
                            aria-label={"Vai al banner " + (index + 1)}
                        />
                    ))}
                </div>
            </section>

            <ProductCarouselSection
                title="I piu venduti"
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