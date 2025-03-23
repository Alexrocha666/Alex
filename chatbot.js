async function sendMessage() {
    const userInput = document.getElementById("userInput").value;
    if (!userInput) return;  // Impede o envio se a mensagem estiver vazia

    // Adiciona a mensagem do usuário no chat
    appendMessage(userInput, "user");

    // Limpa o campo de entrada
    document.getElementById("userInput").value = "";

    // Chave da API (substitua pela sua chave do DeepAI)
    const apiKey = "HF_API_KEY"; // Substitua pela sua chave de API

    try {
        // Envia a mensagem para a API do DeepAI
        const response = await fetch('https://api.deepai.org/api/text-generator', {
            method: 'POST',
            headers: {
                'Api-Key': apiKey,  // Cabeçalho correto para a API do DeepAI
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: userInput })  // Passando o texto que o usuário enviou
        });

        // Verifica se a resposta foi bem-sucedida
        if (response.ok) {
            const data = await response.json();
            const botReply = data.output || "Desculpe, não consegui gerar uma resposta."; // Verifica o campo 'output' na resposta
            appendMessage(botReply, "bot");  // Exibe a resposta do bot no chat
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
