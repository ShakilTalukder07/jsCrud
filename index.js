// alert()

let selectedRow = null;

// show alerts

function showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container")
    const main = document.querySelector(".main");
    container.insertBefore(div, main)

    setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

// clear all field 
function clearFields() {
    document.querySelector("#firstName").value = "";
    document.querySelector("#emailAddress").value = "";
    document.querySelector("#country").value = "";
}

// add data 

document.querySelector('#student-form').addEventListener("submit", (e) => {
    e.preventDefault()

    const firstName = document.querySelector("#firstName").value;
    const email = document.querySelector("#emailAddress").value;
    const country = document.querySelector("#country").value;

    if (firstName == "" || email == "" || country == "") {
        showAlert("Please fill all the data fields")
    }
    else {
        if (selectedRow == null) {
            const list = document.querySelector("#student-list")
            const row = document.createElement("tr")

            row.innerHTML = `
            <td>${firstName}</td>
            <td>${email}</td>
            <td>${country}</td>
            <td>
            <a href="#" class="btn- btn-warning btn-sm edit">Edit</a>
            <a href="#" class="btn- btn-danger btn-sm delete">Delete</a>
            </td>
            `;
            list.appendChild(row);
            selectedRow == null;
            showAlert ("Student add", "Success")
        }
        else{
            selectedRow.children[0].textContent = firstName;
            selectedRow.children[1].textContent = email;
            selectedRow.children[2].textContent = country;
            selectedRow = null;
            showAlert("Student Info Edited", "info");
        }
        clearFields();
    }
});

// Edit data 

document.querySelector("#student-list").addEventListener("click", (e) =>{
    target = e.target;
    if(target.classList.contains("edit")){
        selectedRow = target.parentElement.parentElement;
        document.querySelector("#firstName").value = selectedRow.children[0].textContent;
        document.querySelector("#emailAddress").value = selectedRow.children[1].textContent;
        document.querySelector("#country").value = selectedRow.children[2].textContent;
    }
});

// Delete Data

document.querySelector("#student-list").addEventListener("click", (e) => {
    target = e.target;
    if (target.classList.contains("delete")) {
        target.parentElement.parentElement.remove();
        showAlert("Student Data Deleted", "danger");
    }
});