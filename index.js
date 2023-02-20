let selectedRow = null;

// show alerts

function showAlert(message, className){
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container")
    const min = document.querySelector(".min");
    container.insertBefore(div, min)

    setTimeout(()=> document.querySelector(".alert").remove(), 3000);
}