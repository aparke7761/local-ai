async function send() {
    const input = document.getElementById("message");
    const chat = document.getElementById("chat");
    const message = input.ariaValueMax;

    chat.innerHTML += `<p><b>You:</b> ${message}</p>`;
    const res = await fetch("/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({message})
    });
    const data = await res.json();
    chat.innerHTML += `<p><b>AI:</b> ${data.reply}</p>`;
    input.value = "";
}