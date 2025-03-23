async function sendMessage() {
    const userInput = document.getElementById("userInput").value.trim();
    if (!userInput) return;

    appendMessage(userInput, "user");
    document.getElementById("userInput").value = "";

    const apiKey = "b33e0efd-0cbc-4ecc-9452-86ced31c526f"; // Substitua pela sua chave da API DeepAI

    appendMessage("⏳ Processando...", "bot"); // Mostra que a IA está pensando

    try {
        const response = await fetch('https://api.deepai.org/api/text-generator', {
            method: 'POST',
            headers: {
                'Api-Key': apiKey,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: userInput })
        });

        if (response.ok) {
            const data = await response.json();
            const botReply = data.output || "Não consegui gerar uma resposta.";
            clearLastMessage("bot"); // Remove "⏳ Processando..."
            appendMessage(botReply, "bot");
        } else {
            console.error('Erro na requisição:', response.status);
            clearLastMessage("bot");
            appendMessage('Erro ao processar a mensagem.', 'bot');
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        clearLastMessage("bot");
        appendMessage('Erro inesperado.', 'bot');
    }
}

function appendMessage(message, sender) {
    const chatBox = document.getElementById("chatBox");
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender);
    messageElement.innerHTML = `<p>${message}</p>`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function clearLastMessage(sender) {
    const chatBox = document.getElementById("chatBox");
    const messages = chatBox.getElementsByClassName(sender);
    if (messages.length > 0) {
        chatBox.removeChild(messages[messages.length - 1]);
    }
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}
