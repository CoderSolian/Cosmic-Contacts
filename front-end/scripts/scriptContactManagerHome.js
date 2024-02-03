const urlBase = "http://54.82.88.73/php/";
const extension = "php";
let contacts = [];

// Get the user's ID from the local storage
let userId = localStorage.getItem('userId');

// Setting the welcome message
let intro = document.getElementById("intro");
intro.textContent = 'Welcome, ' + username + '!';


// Get the buttons
let addContactbtn = document.getElementById("addContactButton");
let editContactbtn = document.getElementById("contact-editBtn");
let deleteContactbtn = document.getElementById("contact-deleteBtn");
let logoutUserbtn = document.getElementById("btn-logout");

// Get the modal
let modal = document.getElementById("contactModal");

// When the user clicks the edit or add button, open the modal
function contactButtonClick(intbtnPressed) {
    let span = document.getElementsByClassName("close")[0];
    
    modal.style.display = "block";

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.oncick = function(event) {
        if (event.target == modalContent) {
            addModal.style.display = "none";
        }
    }

    // add contact
    if (intbtnPressed === 1) {
        document.getElementById('modal-title').textContent = 'Add Contact';
        document.getElementById('addNewContactButton').textContent = 'Add New Contact';
        var name = document.getElementById('add-name');
        var phone = document.getElementById('edit-phone');
        var email = document.getElementById('edit-email');
    }

    // edit contact
    if (intbtnPressed === 2) {
        document.getElementById('modal-title').textContent = 'Edit Contact';
        document.getElementById('addNewContactButton').textContent = 'Save Changes';
        var name = document.getElementById('add-name').value = "random person";
        var phone = document.getElementById('add-phone').value = "123-456-7890";
        var email = document.getElementById('add-email'). value = "email@www.com";
    }

    console.log('Edit or Add button clicked');
}

// Add event listeners to the add and edit buttons
addContactbtn.addEventListener('click', function() { contactButtonClick(1); });
editContactbtn.addEventListener('click', function() { contactButtonClick(2); });






deleteContactbtn.onclick = function() {
    confirm('Delete button clicked');
};



// good so far up _________________________________&&


// Get the button that adds a new contact created or edited
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
    // addContact({ firstName: firstName, lastName: lastName, email: email, phoneNumber: phone });
    // updateUIwithNewContact({ firstName: firstName, lastName: lastName, email: email, phoneNumber: phone }, contacts.length - 1);
    // modal.style.display = "none";

    let tmp = {
        firstName: firstname,
        lastName: lastname,
        phoneNumber: phonenumber,
        emailAddress: emailaddress,
        userId: userId,
      };
    
      let jsonPayload = JSON.stringify(tmp);
    
      let url = urlBase + "/AddContacts." + extension;
    
      let xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
      try {
        xhr.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            console.log("Contact has been added");
            // Clear input fields in form
            document.getElementById("addMe").reset();
            // reload contacts table and switch view to show
            loadContacts();
            showTable();
          }
        };
        xhr.send(jsonPayload);
      } catch (err) {
        console.log(err.message);
      }
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
