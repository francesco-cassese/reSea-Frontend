import React from "react";

function Homepage() {
    return (
        <>
            <section>
                <div className="hero-banner1 d-flex justify-content-end">
                    <div className="container d-flex flex-column align-items-end">
                        <h1 className="text-light">Ambra della Costa</h1>
                        <p className="text-center">Occhiali nati dall'oceano, pensati per ogni orizzonte.</p>
                        <button className="btn btn-primary rounded-pill">Scopri di più</button>
                    </div>
                </div>

                <div className="hero-banner2 d-flex justify-content-center align-items-end">
                    <button className="btn btn-primary rounded-pill my-4">Visualizza Accessori</button>
                </div>

                <div className="hero-banner3 justify-content-start">
                    <div className="container d-flex flex-column align-items-start">
                        <h1 className="text-dark">Poseidon Wave</h1>
                        <p className="text-center">Design sostenibile. Spirito oceanico.</p>
                        <button className="btn btn-primary rounded-pill">Scopri di più</button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Homepage;