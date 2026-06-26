import { useState } from "react";
import { postAgentPrompt } from "../services/reseaServices";

function AssistantWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: "assistant",
            html: "<p>Ciao! Sono l'assistente di reSea. Posso supportarti sui prodotti.<p>"
        }
    ]);
    const [error, setError] = useState("");

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
                result?.data?.answerHtml || "<p>Non ho trovato una risposta utile.<p>";

            setMessages((prev) => [...prev, { role: "assistant", html: answerHtml }]);
        } catch (error) {
            setError(error?.message || "Errore durante la richiesta all'assistente.");
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="assistant-widget">
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="btn btn-primary"
            >
                {isOpen ? "Chiudi chat" : "GretAI Thun"}
            </button>

            {isOpen && (
                <div className="card mt-2 assistant-widget-panel">
                    <div className="card-body p-2">
                        <div className="assistant-widget-messages border rounded p-2 mb-2">
                            {messages.map((message, index) => (
                                <div key={index} className="mb-2">
                                    <div className="small text-muted mb-1">
                                        {message.role === "user" ? "Tu" : "GretAI Thun"}
                                    </div>

                                    {message.role === "user" ? (
                                        <div>{message.text}</div>
                                    ) : (
                                        <div dangerouslySetInnerHTML={{ __html: message.html }} />
                                    )}
                                </div>
                            ))}
                        </div>

                        <form onSubmit={handleSend}>
                            <textarea
                                className="form-control mb-2"
                                rows={3}
                                placeholder="Scrivi qui..."
                                value={prompt}
                                onChange={(event) => setPrompt(event.target.value)}
                                disabled={loading}
                            />
                            <button type="submit" className="btn btn-sm btn-primary" disabled={loading}>
                                {loading ? "Invio..." : "Invia"}
                            </button>
                        </form>

                        {error ? <div className="text-danger small mt-2">{error}</div> : null}
                    </div>
                </div>
            )}
        </div>
    );
}

export default AssistantWidget;