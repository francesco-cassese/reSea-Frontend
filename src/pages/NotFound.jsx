import { Link } from "react-router-dom";

function NotFound() {
    return (
        <>
            <div className="container text-center py-5">
                <h1 className="display-1 fw-bold">404</h1>

                <h2 className="mb-4">Questa pagina è andata alla deriva 🌊</h2>

                <p className="lead mx-auto" >
                    Non siamo riusciti a trovare la pagina che stai cercando.
                    Forse è stata trascinata dalla corrente.
                </p>

                <p className="fs-5 mb-5">
                    Nel frattempo, continua il viaggio con i nostri occhiali
                    realizzati da materiali recuperati dal mare e scopri come
                    trasformiamo i rifiuti marini in prodotti sostenibili.
                </p>

                <div className="d-flex justify-content-center gap-3 flex-wrap">
                    <Link to="/products" className="btn btn-info btn-lg">
                        Scopri la Collezione
                    </Link>

                    <Link to="/homepage" className="btn btn-outline-secondary btn-lg">
                        Torna alla Home
                    </Link>
                </div>

                <div className="mt-5">
                    <p className="text-muted">
                        ♻️ Ogni acquisto contribuisce a ridurre i rifiuti negli oceani.
                    </p>
                </div>
            </div>

        </>
    )
}

export default NotFound;