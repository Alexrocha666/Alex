async function sendMessage() {
    const userInput = document.getElementById("userInput").value;
    if (!userInput.trim()) return;

    // Adiciona a mensagem do usuário no chat
    appendMessage(userInput, "user");

    // Limpa o campo de entrada
    document.getElementById("userInput").value = "";

    // Chave da API (substitua pela sua chave)
    const apiKey = "HF_API_KEY"; // Substitua pela sua chave do DeepAI

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
            appendMessage(botReply, "bot");
        } else {
            console.error('Erro na requisição:', response.status);
            appendMessage('Erro ao processar a mensagem.', 'bot');
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        appendMessage('Erro inesperado.', 'bot');
    }
}

function appendMessage(message, sender) {
    const chatBox = document.getElementById("chatBox");
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender);
    messageElement.innerText = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}
