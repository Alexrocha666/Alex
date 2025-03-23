async function sendMessage() {
    let userInput = document.getElementById("user-input").value;
    if (!userInput) return;

    let chatBox = document.getElementById("chat-box");
    chatBox.innerHTML += `<div><b>Você:</b> ${userInput}</div>`;

    document.getElementById("user-input").value = "";

    let response = await fetch(`https://api.monkedev.com/fun/chat?msg=${encodeURIComponent(userInput)}`);
    let data = await response.json();

    chatBox.innerHTML += `<div><b>Bot:</b> ${data.response}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
}
