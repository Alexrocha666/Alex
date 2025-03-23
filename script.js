async function sendMessage() {
    const userInput = document.getElementById("userInput").value.trim();
    if (!userInput) return;

    appendMessage(userInput, "user");
    document.getElementById("userInput").value = "";

    const apiKey = "API_KEY"; // 🔴 Substitua pelo seu Token Hugging Face
    const apiUrl = "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill";

    appendMessage("⏳ Processando...", "bot");

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ inputs: userInput })
        });

        if (response.ok) {
            const data = await response.json();
            const botReply = data.generated_text || "Não consegui gerar uma resposta.";
            clearLastMessage("bot");
            appendMessage(botReply, "bot");
        } else {
            console.error("Erro na API:", response.status);
            clearLastMessage("bot");
            appendMessage("❌ Erro ao processar a mensagem.", "bot");
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        clearLastMessage("bot");
        appendMessage("⚠️ Erro inesperado. Tente novamente.", "bot");
    }
}
