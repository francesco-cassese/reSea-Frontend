import { useState, useEffect, useRef } from "react";
import { postAgentPrompt } from "../services/reseaServices";
import styles from "./AssistantWidget.module.css";

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
        <aside className={styles.assistantWidget}>
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className={styles.assistantWidgetToggle}
                aria-expanded={isOpen}
                aria-controls="assistant-widget-panel"
            >
                {buttonLabel}
            </button>

            {isOpen && (
                <section id="assistant-widget-panel" className={`${styles.assistantWidgetPanel} card mt-2`}>
                    <header className={styles.assistantWidgetHeader}>
                        <h2 className={styles.assistantWidgetTitle}>GretAI Thun</h2>
                        <p className={styles.assistantWidgetSubtitle}>Risposte rapide sul catalogo</p>
                    </header>

                    <div className={styles.assistantWidgetMessages} ref={messagesContainerRef}>
                        {messages.map((message, index) => (
                            <article key={index} className={`${styles.assistantBubble} ${message.role === "user" ? styles.assistantBubbleUser : styles.assistantBubbleAi}`}>
                                <p className={styles.assistantBubbleLabel}>{message.role === "user" ? "Tu" : "GretAI Thun"}</p>
                                {message.role === "user" ? (
                                    <p className={styles.assistantBubbleText}>{message.text}</p>
                                ) : (
                                    <div className={styles.assistantBubbleText} dangerouslySetInnerHTML={{ __html: message.html }}></div>
                                )}
                            </article>
                        ))}
                    </div>

                    <form onSubmit={handleSend} className={styles.assistantWidgetForm}>
                        <textarea
                            className={styles.assistantWidgetTextarea}
                            rows={3}
                            placeholder="Scrivi qui la tua domanda..."
                            value={prompt}
                            onChange={(event) => setPrompt(event.target.value)}
                            disabled={loading}
                        />
                        <div className={styles.assistantWidgetActions}>
                            <button type="submit" className={styles.assistantWidgetSend} disabled={loading}>
                                {loading ? "Invio..." : "Invia"}
                            </button>
                        </div>
                        {error ? <p className={styles.assistantWidgetError}>{error}</p> : null}
                    </form>
                </section>
            )}
        </aside>
    );
}

export default AssistantWidget;