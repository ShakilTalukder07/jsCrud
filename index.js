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

    // ===================================================

    document.querySelector("#dateOfBirth").value = "";
    document.querySelector("#gender").value = "";
    document.querySelector("#hobby").value = "";
}

// add data 

document.querySelector('#student-form').addEventListener("submit", (e) => {
    e.preventDefault()

    const firstName = document.querySelector("#firstName").value;
    const email = document.querySelector("#emailAddress").value;
    const country = document.querySelector("#country").value;

    // ==============================================================

    const dateOfBirth = document.querySelector("#dateOfBirth").value;
    const gender = document.querySelector("#gender").value;
    const hobby = document.querySelector("#hobby").value;

    if (firstName == "" || email == "" || country == "" || dateOfBirth == "" || gender == "" || hobby == "") {
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
            <td>${dateOfBirth}</td>
            <td>${gender}</td>
            <td>${hobby}</td>
            <td>
            <a href="#" class="btn- btn-warning btn-sm edit">Edit</a>
            <a href="#" class="btn- btn-danger btn-sm delete">Delete</a>
            </td>
            `;
            list.appendChild(row);
            selectedRow == null;
            showAlert("Student add", "Success")
        }
        else {
            selectedRow.children[0].textContent = firstName;
            selectedRow.children[1].textContent = email;
            selectedRow.children[2].textContent = country;

            // ==============================================

            selectedRow.children[3].textContent = dateOfBirth;
            selectedRow.children[4].textContent = gender;
            selectedRow.children[5].textContent = hobby;
            selectedRow = null;
            showAlert("Student Info Edited", "info");
        }
        clearFields();
    }
});

// Edit data 

document.querySelector("#student-list").addEventListener("click", (e) => {
    target = e.target;
    if (target.classList.contains("edit")) {
        selectedRow = target.parentElement.parentElement;
        document.querySelector("#firstName").value = selectedRow.children[0].textContent;
        document.querySelector("#emailAddress").value = selectedRow.children[1].textContent;
        document.querySelector("#country").value = selectedRow.children[2].textContent;

        // =====================================================================

        document.querySelector("#dateOfBirth").value = selectedRow.children[3].textContent;
        document.querySelector("#gender").value = selectedRow.children[4].textContent;
        document.querySelector("#hobby").value = selectedRow.children[5].textContent;
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