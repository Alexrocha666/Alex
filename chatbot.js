async function sendMessage() {
    const userInput = document.getElementById("userInput").value;
    if (!userInput) return;

    // Adiciona a mensagem do usuário no chat
    appendMessage(userInput, "user");
    document.getElementById("userInput").value = "";

    // Chave da API (substitua pela sua chave)
    const apiKey = "HF_API_KEY"; // Substitua pela sua chave de API

    try {
        const response = await fetch('https://api-inference.huggingface.co/models/gpt2', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ inputs: userInput })
        });

        if (response.ok) {
            const data = await response.json();
            const botReply = data[0]?.generated_text || "Desculpe, não entendi a resposta."; 
            appendMessage(botReply, "bot");
        } else {
            console.error('Erro na requisição:', response.status);
            appendMessage('Desculpe, ocorreu um erro ao processar sua mensagem.', 'bot');
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        appendMessage('Desculpe, ocorreu um erro inesperado.', 'bot');
    }
}

function appendMessage(message, sender) {
    const chatBox = document.getElementById("chatBox");
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender);
    messageElement.innerText = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Rola para a última mensagem
}
