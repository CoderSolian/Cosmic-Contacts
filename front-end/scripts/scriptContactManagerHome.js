const urlBase = "http://54.82.88.73/php/";
const extension = "php";
let contacts = [];
import { userId, username } from "./code";

// Get the button that opens the modal
var addContactbtn = document.getElementById("addContactButton");
var editContactbtn = document.getElementById("contact-edit");

var span = document.getElementsByClassName("close")[0];
// // Get the modal
var addModal = document.getElementById("addContactModal");
var editModal = document.getElementById("editContactModal");

editContactbtn.onclick = function () {
  editModal.style.display = "block";
};
// When the user clicks the button, open the modal
addContactbtn.onclick = function () {
  addModal.style.display = "block";
};
var editClose = document.getElementById("editClose");
editClose.onclick = function () {
  editModal.style.display = "none";
};
span.onclick = function () {
  addModal.style.display = "none";
};

var modalContent = document.getElementByID("modalContent");

window.oncick = function (event) {
  if (event.target == modalContent) {
    addModal.style.display = "none";
  }
};

document.getElementById("contact-edit").addEventListener("click", function () {
  // Get the modal
  var editModal = document.getElementById("editContactModal");

  // Open the modal
  editModal.style.display = "block";
});

document
  .getElementById("editContactForm")
  .addEventListener("submit", function (event) {
    // Get the input fields
    var firstName = document.getElementById("modal-firstName");
    var lastName = document.getElementById("modal-lastName");
    var phone = document.getElementById("modal-phone");
    var email = document.getElementById("modal-email");

    // Validate the input fields
    if (firstName.value === "" || lastName.value === "" || phone.value === "") {
      // Prevent the form submission
      event.preventDefault();

      // Display an error message
      alert("All fields must be filled out");
    }
  });

// good so far up _________________________________&&

// Get the button that adds a new contact
var addBtn = document.getElementById("addNewContactButton");

// When the user clicks the add contact button in the modal, validate the input and add the contact
addBtn.onclick = function () {
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
};

function addContact(contact) {
  contacts.push(contact);
  contacts.sort((a, b) => a.name.localeCompare(b.name));
  // add the html part to update the page with the new contact div's made
}
function updateUIwithNewContact(contact, index) {
  // Get the existing elements
  const lastNameElement = document.getElementById(`contact-lastName-${index}`);
  const firstNameElement = document.getElementById(
    `contact-firstName-${index}`
  );
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
    .then((response) => response.json())
    .then((data) => {
      // Assuming data is an array of contact objects
      data.forEach((contact) => {
        addContact(contact);
        // Assuming you have a function to update the UI
        updateUIWithNewContact(contact);
      });
    })
    .catch((error) => console.error("Error:", error));
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
  return contacts.filter((contact) => contact.name === name);
}

function displayContacts() {
  contacts.forEach((contact) => {
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
  {
    name: "Rossella Diorio",
    email: "hello@example.com",
    phoneNumber: "123-456-7890",
  },
  {
    name: "Crazy Jane",
    email: "jane@example.com",
    phoneNumber: "234-567-8901",
  },
  // Add more contacts as needed
];

// Loop over the array of hardcoded contacts
for (let i = 0; i < hardcodedContacts.length; i++) {
  // Add the contact
  addContact(hardcodedContacts[i]);

  // Update the UI
  updateUIwithNewContact(hardcodedContacts[i], i);
}
