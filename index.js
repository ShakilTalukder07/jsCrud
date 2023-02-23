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
    document.querySelector("#dateOfBirth").value = "";
    document.querySelector("#gender").value = "";
    document.querySelector("#hobby").value = "";
    document.querySelector("#countryList").value = "";
    document.querySelector("#stateList").value = "";
    document.querySelector("#cityList").value = "";
}

// select county state and city

var worldData = {
    USA: {
        California: ["Los Angeles", "San Diego", "Sacramento"],
        Texas: ["Houston", "Austin"],
        Florida: ["Miami", "Orlando", "Tampa"],
    },
    India: {
        Maharashtra: ["Mumbai", "Pune", "Nagpur"],
        TamilNadu: ["Chennai", "Madurai"],
        Karnataka: ["Bangalore", "Mangalore"],
    },
    Canada: {
        Alberta: ["Calgary", "Edmonton", "Red Deer"],
        BritishColumbia: ["Vancouver", "Kelowna"],
        Manitoba: ["Winnipeg", "Brandon"],
    },
    Germany: {
        Bavaria: ["Munich", "Nuremberg"],
        NorthRhine: ["Cologne", "Düsseldorf"],
    },
};
window.onload = function () {
    var countyList = document.getElementById("countyList"),
        stateList = document.getElementById("stateList"),
        cityList = document.getElementById("cityList");
    for (var country in worldData) {
        countyList.options[countyList.options.length] = new Option(country, country);
    }
    countyList.onchange = function () {
        stateList.length = 1;
        cityList.length = 1;
        if (this.selectedIndex < 1) return;
        for (var state in worldData[this.value]) {
            stateList.options[stateList.options.length] = new Option(state, state);
        }
    };
    countyList.onchange();
    stateList.onchange = function () {
        cityList.length = 1;
        if (this.selectedIndex < 1) return;
        var city = worldData[countyList.value][this.value];
        for (var i = 0; i < city.length; i++) {
            cityList.options[cityList.options.length] = new Option(city[i], city[i]);
        }
    };
};


// add data 

document.querySelector('#student-form').addEventListener("submit", (e) => {
    e.preventDefault()

    const firstName = document.querySelector("#firstName").value;
    const email = document.querySelector("#emailAddress").value;
    const dateOfBirth = document.querySelector("#dateOfBirth").value;
    const gender = document.querySelector("#gender").value;
    const hobby = document.querySelector("#hobby").value;
    const countryList = document.querySelector("#countyList").value;
    const stateList = document.querySelector("#stateList").value;
    const cityList = document.querySelector("#cityList").value;

    if (firstName == "" || email == "" || dateOfBirth == "" || gender == "" || hobby == "" || countryList == "" || stateList == "" || cityList == "") {
        showAlert("Please fill all the data fields")
    }
    else {
        if (selectedRow == null) {
            const list = document.querySelector("#student-list")
            const row = document.createElement("tr")

            row.innerHTML = `
            <td>${firstName}</td>
            <td>${email}</td>
            <td>${dateOfBirth}</td>
            <td>${gender}</td>
            <td>${hobby}</td>
            <td>${countryList}</td>
            <td>${stateList}</td>
            <td>${cityList}</td>
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
            selectedRow.children[2].textContent = dateOfBirth;
            selectedRow.children[3].textContent = gender;
            selectedRow.children[4].textContent = hobby;
            selectedRow.children[5].textContent = countryList;
            selectedRow.children[6].textContent = stateList;
            selectedRow.children[7].textContent = cityList;

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
        document.querySelector("#dateOfBirth").value = selectedRow.children[2].textContent;
        document.querySelector("#gender").value = selectedRow.children[3].textContent;
        document.querySelector("#hobby").value = selectedRow.children[4].textContent;
        document.querySelector("#countryList").value = selectedRow.children[5].textContent;
        document.querySelector("#stateList").value = selectedRow.children[6].textContent;
        document.querySelector("#cityList").value = selectedRow.children[7].textContent;
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