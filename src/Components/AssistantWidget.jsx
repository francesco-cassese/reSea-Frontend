import { useState, useEffect, useRef } from "react";
import { postAgentPrompt } from "../services/reseaServices";

function AssistantWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: "assistant",
            html: "<p>Ciao! Sono GretAI Thun. Posso supportarti sui prodotti.</p>"
        }
    ]);
    const [error, setError] = useState("");
    const messagesContainerRef = useRef(null);

    const scrollToBottom = () => {
        const el = messagesContainerRef.current;
        if(!el) return;
        el.scrollTop = el.scrollHeight;
    };

    const buttonLabel = loading
        ? "Sto cercando..."
        : isOpen
            ? "chiudi chat"
            : "GretAI Thun";

    useEffect(() => {
        if(!isOpen) return;
        const rafID = requestAnimationFrame(scrollToBottom);
        const t = setTimeout(scrollToBottom, 120);
        return () => {
            cancelAnimationFrame(rafID);
            clearTimeout(t);
        }
    },[messages, isOpen, loading]);

    async function handleSend(event) {
        event.preventDefault();
        const cleanPrompt = prompt.trim();

        if (!cleanPrompt) {
            setError("Scrivi un messaggio da inviare prima");
            return;
        }

        setError("");
        setLoading(true);
        setPrompt("");

        setMessages((prev) => [...prev, { role: "user", text: cleanPrompt }]);

        try {
            const result = await postAgentPrompt(cleanPrompt);
            const answerHtml =
                result?.data?.answerHtml || "<p>Non ho trovato una risposta utile.</p>";

            setMessages((prev) => [...prev, { role: "assistant", html: answerHtml }]);
        } catch (error) {
            setError(error?.message || "Errore durante la richiesta all'assistente.");
        } finally {
            setLoading(false);
        }
    }
    return (
        <aside className="assistant-widget">
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="assistant-widget-toggle"
                aria-expanded={isOpen}
                aria-controls="assistant-widget-panel"
            >
                {buttonLabel}
            </button>

            {isOpen && (
                <section id="assistant-widget-panel" className="assistant-widget-panel card mt-2">
                    <header className="assistant-widget-header">
                        <h2 className="assistant-widget-title">GretAI Thun</h2>
                        <p className="assistant-widget-subtitle">Risposte rapide sul catalogo</p>
                    </header>

                    <div className="assistant-widget-messages" ref={messagesContainerRef}>
                        {messages.map((message, index) => (
                            <article key={index} className={"assistant-bubble " + (message.role === "user" ? "assistant-bubble-user" : "assistant-bubble-ai")}>
                                <p className="assistant-bubble-label">{message.role === "user" ? "Tu" : "GretAI Thun"}</p>
                                {message.role === "user" ? (
                                    <p className="assistant-bubble-text">{message.text}</p>
                                ) : (
                                    <div className="assistant-bubble-text" dangerouslySetInnerHTML={{ __html: message.html }}></div>
                                )}
                            </article>
                        ))}
                    </div>

                    <form onSubmit={handleSend} className="assistant-widget-form">
                        <textarea
                            className="assistant-widget-textarea"
                            rows={3}
                            placeholder="Scrivi qui la tua domanda..."
                            value={prompt}
                            onChange={(event) => setPrompt(event.target.value)}
                            disabled={loading}
                        />
                        <div className="assistant-widget-actions">
                            <button type="submit" className="assistant-widget-send" disabled={loading}>
                                {loading ? "Invio..." : "Invia"}
                            </button>
                        </div>
                        {error ? <p className="assistant-widget-error">{error}</p> : null}
                    </form>
                </section>
            )}
        </aside>
    );
}

export default AssistantWidget;