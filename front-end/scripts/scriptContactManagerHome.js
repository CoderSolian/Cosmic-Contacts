let contacts = [];

function addContact(contact) {
    contacts.push(contact);
    contacts.sort((a, b) => a.name.localeCompare(b.name));
    // add the html part to update the page with the new contact div's made
}

function deleteContact(index) {
    contacts.splice(index, 1);
    contacts.sort((a, b) => a.name.localeCompare(b.name));
    // add the html part to update the page with the new contact div's deleted
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
