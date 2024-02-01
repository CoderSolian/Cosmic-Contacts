let contacts = [];

// window.onload = function() {
//     var btn = document.getElementById("addContactButton");
//     var modal = document.getElementById("addContactModal");

//     btn.onclick = function() {
//         modal.style.display = "block";
//     }

//     // Rest of your code...
// }

// Get the button that opens the modal
var addContactbtn = document.getElementById("addContactButton");
var span = document.getElementsByClassName("close")[0];
// // Get the modal
var modal = document.getElementById("addContactModal");

// When the user clicks the button, open the modal 
addContactbtn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onlcick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Get the button that adds a new contact
var addBtn = document.getElementById("addNewContactButton");

// When the user clicks the add contact button in the modal, validate the input and add the contact
addBtn.onclick = function() {
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;

    // Validate the input
    if (!firstName || !lastName || !email || !phone) {
        alert("All fields are required.");
        return;
    }

    // If the input is valid, add the contact
    addContact({ firstName: firstName, lastName: lastName, email: email, phoneNumber: phone });
    updateUIwithNewContact({ firstName: firstName, lastName: lastName, email: email, phoneNumber: phone }, contacts.length - 1);
    modal.style.display = "none";
}

function addContact(contact) {
    contacts.push(contact);
    contacts.sort((a, b) => a.name.localeCompare(b.name));
    // add the html part to update the page with the new contact div's made

    
}
function updateUIwithNewContact(contact, index) {
    // Get the existing elements
    const lastNameElement = document.getElementById(`contact-lastName-${index}`);
    const firstNameElement = document.getElementById(`contact-firstName-${index}`);
    const phoneElement = document.getElementById(`contact-phone-${index}`);
    const emailElement = document.getElementById(`contact-email-${index}`);
    // Update the content of the elements
    if (firstNameElement) {
        firstNameElement.textContent = contact.firstName;
    }

    if (lastNameElement) {
        nameElement.textContent = contact.name;
    }
    
    if (phoneElement) {
        phoneElement.textContent = contact.phoneNumber;
    }

    if (emailElement) {
        emailElement.textContent = contact.email;
    }
}


function fetchAndAddContact(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Assuming data is an array of contact objects
            data.forEach(contact => {
                addContact(contact);
                // Assuming you have a function to update the UI
                updateUIWithNewContact(contact);
            });
        })
        .catch(error => console.error('Error:', error));
}

function deleteContact(index) {
    // Remove the contact from the array
    contacts.splice(index, 1);

    // Sort the contacts
    contacts.sort((a, b) => a.name.localeCompare(b.name));

    // Remove the corresponding HTML element
    const contactElement = document.getElementById(`contact-${index}`);
    if (contactElement) {
        contactElement.parentNode.removeChild(contactElement);
    }

    // Update the IDs of the remaining contact elements
    for (let i = index; i < contacts.length; i++) {
        const contactElement = document.getElementById(`contact-${i + 1}`);
        if (contactElement) {
            contactElement.id = `contact-${i}`;
        }
    }
}

function searchContact(name) {
    return contacts.filter(contact => contact.name === name);
}

function displayContacts() {
    contacts.forEach(contact => {
        console.log(contact);
    });

function logout() {
    // delete the token from the local storage
    // redirect to login page
}
}


// Path: front-end/scripts/scriptContactManagerLogin.js

// Array of hardcoded contacts
let hardcodedContacts = [
    { name: 'Rossella Diorio', email: 'hello@example.com', phoneNumber: '123-456-7890' },
    { name: 'Crazy Jane', email: 'jane@example.com', phoneNumber: '234-567-8901' },
    // Add more contacts as needed
];

// Loop over the array of hardcoded contacts
for (let i = 0; i < hardcodedContacts.length; i++) {
    // Add the contact
    addContact(hardcodedContacts[i]);

    // Update the UI
    updateUIwithNewContact(hardcodedContacts[i], i);
}
