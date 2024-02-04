const urlBase = "http://54.82.88.73/php/";
const extension = "php";

let userId = 0;
let firstName = "";
let lastName = "";
const ids = [];

function logUserId() {
  console.log("the user id is " + userId);
}
function doLogin() {
  console.log("doLogin() called");
  userId = 0;
  firstName = "";
  lastName = "";

  let login = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  // var hash = md5(password);
  if (!validLoginForm(login, password)) {
    document.getElementById("loginResult").innerHTML =
      "<span style='color: #FF2F2F;'>Invalid credentials</span>";
    return;
  }
  document.getElementById("loginResult").innerHTML = "";

  let tmp = {
    login: login,
    password: password,
  };

  let jsonPayload = JSON.stringify(tmp);
  let url = urlBase + "login." + extension;

  let xhr = new XMLHttpRequest();
  console.log(jsonPayload, url);
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let jsonObject = JSON.parse(xhr.responseText);
        userId = jsonObject.id;
        console.log("userIdjson: " + userId);
        if (userId < 1) {
          document.getElementById("loginResult").innerHTML =
            "User/Password combination incorrect";
          return;
        }
        firstName = jsonObject.firstName;
        lastName = jsonObject.lastName;
        console.log("Welcome, " + userId + "!");

        saveData();
        window.location.href = "contactManagerHome.html";
      }
    };

    xhr.send(jsonPayload);
  } catch (err) {
    document.getElementById("loginResult").innerHTML = err.message;
  }
}

function doSignup() {
  console.log("doSignup() called");
  firstName = document.getElementById("firstName").value;
  lastName = document.getElementById("lastName").value;

  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  // if there are invalid credentials in any of the fields, display "Invalid credentials"
  if (!validSignUpForm(firstName, lastName, username, password)) {
    document.getElementById("signupResult").style.display = "block";
    document.getElementById("signupResult").innerHTML =
      "<span style='color: #FF2F2F;'>Invalid credentials</span>";
    return;
  }

  // var hash = md5(password);

  // document.getElementById("signupResult").innerHTML = "";

  let tmp = {
    FirstName: firstName,
    LastName: lastName,
    Login: username,
    Password: password,
  };

  let jsonPayload = JSON.stringify(tmp);

  let url = urlBase + "register." + extension;

  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try {
    xhr.onreadystatechange = function () {
      if (this.readyState != 4) {
        return;
      }

      if (this.status == 500) {
        document.getElementById("signupResult").innerHTML =
          "Internal server error occurred";
        return;
      }

      if (this.status == 400) {
        document.getElementById("signupResult").innerHTML =
          "Provided data is invalid";
        return;
      }

      if (this.status == 200) {
        let jsonObject = JSON.parse(xhr.responseText);
        userId = jsonObject.id;
        // document.getElementById("signupResult").innerHTML =
        //   "<span style='color: #6EFF2F;'>User registered successfully</span>";
        // document.getElementById("signupResult").innerHTML =
        //   "User registered successfully";
        firstName = jsonObject.firstName;
        lastName = jsonObject.lastName;
        saveData();
      }
    };

    xhr.send(jsonPayload);
    document.getElementById("signupResult").innerHTML =
      "<span style='color: #6EFF2F;'>User registered successfully</span>";
  } catch (err) {
    document.getElementById("signupResult").innerHTML = err.message;
  }
}

function saveData() {
  let user = {
    firstName: firstName,
    lastName: lastName,
    userId: userId,
  };
  localStorage.setItem("user", JSON.stringify(user));
}

function loadData() {
  let user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    firstName = user.firstName;
    lastName = user.lastName;
    userId = user.userId;
  }
}

// saveCookie()
// function saveCookie() {
//   let minutes = 20;
//   let date = new Date();
//   date.setTime(date.getTime() + minutes * 60 * 1000);

//   document.cookie =
//     "firstName=" +
//     firstName +
//     ",lastName=" +
//     lastName +
//     ",userId=" +
//     userId +
//     ";expires=" +
//     date.toGMTString();

//   console.log(
//     `document.cookie = "firstName=${firstName},lastName=${lastName},userId=${userId};expires=${date.toGMTString()}";`
//   );
// }

// ------ readCookie() ------------------------
// function readCookie() {
//   userId = -1;
//   let data = document.cookie;
//   console.log("data: " + data);
//   let splits = data.split(",");

//   for (var i = 0; i < splits.length; i++) {
//     let thisOne = splits[i].trim();
//     let tokens = thisOne.split("=");
//     console.log(tokens[0]);

//     if (tokens[0] == "firstName") {
//       firstName = tokens[1];
//     } else if (tokens[0] == "lastName") {
//       lastName = tokens[1];
//     } else if (tokens[0] == "userId") {
//       userId = parseInt(tokens[1].trim());
//     }
//   }

//   if (userId < 0) {
//     // window.location.href = "login.html";
//   } else {
//     document.getElementById("intro").innerHTML =
//       "Welcome, " + firstName + " " + lastName + "!";
//   }
// }

// function readCookie() {
//   let cookies = document.cookie.split(";").map((cookie) => cookie.trim());

//   let firstName = "";
//   let lastName = "";
//   let userId = -1;

//   console.log(firstName, lastName, userId);
//   for (let cookie of cookies) {
//     let [key, value] = cookie.split("=");
//     switch (key.trim()) {
//       case "firstName":
//         firstName = value;
//         break;
//       case "lastName":
//         lastName = value;
//         break;
//       case "userId":
//         userId = parseInt(value, 10);
//         break;
//     }
//   }

//   if (userId < 0) {
//     // Redirect to login page if userId is not set
//     window.location.href = "login.html";
//   } else {
//     // Display welcome message if userId is set
//     document.getElementById("intro").innerHTML =
//       "Welcome, ${firstName} ${lastName}!";
//   }
// }

// function doLogout() {
//   userId = 0;
//   firstName = "";
//   lastName = "";

//   document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
//   window.location.href = "index.html";
// }

function showTable() {
  var x = document.getElementById("contactModal");
  var contacts = document.getElementById("tbody");
  if (contacts.style.display === "none") {
    contacts.style.display = "block";
    x.style.display = "none";
  } else {
    contacts.style.display = "none";
    x.style.display = "block";
  }
}

function addContact() {
  let name = document.getElementById("add-name").value;
  let phonenumber = document.getElementById("add-phone").value;
  let emailaddress = document.getElementById("add-email").value;

  let tmp = {
    NAME: name,
    PHONE: phonenumber,
    EMAIL: emailaddress,
    USERID: userId,
  };

  console.log(tmp);

  let jsonPayload = JSON.stringify(tmp);

  let url = urlBase + "contacts." + extension;

  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log("Contact has been added");
        // Clear input fields in form
        document.getElementById("add-name").value = "";
        document.getElementById("add-phone").value = "";
        document.getElementById("add-email").value = "";
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

function loadContacts() {
  let tmp = {
    search: userId,
  };

  let jsonPayload = JSON.stringify(tmp);

  let url = urlBase + "get_contacts." + extension;
  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let jsonObject = JSON.parse(xhr.responseText);
        if (jsonObject.error) {
          console.log(jsonObject.error);
          return;
        }
        let text = "<table class= 'contacts-container' border='1'>";
        text +=
          "<thead> <tr> <th>Name</th> <th>Email</th> <th>Phone</th> <th>Actions</th> </tr> </thead>";
        for (let i = 0; i < jsonObject.results.length; i++) {
          ids[i] = jsonObject.results[i].ID;
          text += "<tr id='row" + i + "'>";
          text +=
            "<td id='name" +
            i +
            "'><span>" +
            jsonObject.results[i].Name +
            "</span></td>";
          text +=
            "<td id='email" +
            i +
            "'><span>" +
            jsonObject.results[i].Email +
            "</span></td>";
          text +=
            "<td id='phone" +
            i +
            "'><span>" +
            jsonObject.results[i].Phone +
            "</span></td>";
          text +=
            "<td>" +
            "<button type='button' id='edit_button" +
            i +
            "' class='edit-btn' onclick='edit_row(" +
            i +
            ")'>" +
            "Edit" +
            "</button>" +
            "<button type='button' id='save_button" +
            i +
            "' value='Save' class='save-btn' onclick='save_row(" +
            i +
            ")' style='display: none;'>" +
            "Save" +
            "</button>" +
            "<button type='button' onclick='delete_row(" +
            i +
            ")' class='delete-btn'>" +
            "Delete " +
            "</button>" +
            "</td>";
          text += "<tr/>";
        }
        text += "<tr id='tr-filler'></tr>";
        text += "</table>";
        document.getElementById("tbody").innerHTML = text;
      }
    };
    xhr.send(jsonPayload);
  } catch (err) {
    console.log(err.message);
  }
}

function edit_row(id) {
  document.getElementById("edit_button" + id).style.display = "none";
  document.getElementById("save_button" + id).style.display = "inline-block";

  var name = document.getElementById("name" + id);
  var email = document.getElementById("email" + id);
  var phone = document.getElementById("phone" + id);

  var name_data = name.innerText;
  var email_data = email.innerText;
  var phone_data = phone.innerText;

  name.innerHTML =
    "<input type='text' id='name_text" +
    id +
    "' value='" +
    name_data +
    "' style='color: black'>";
  email.innerHTML =
    "<input type='text' id='email_text" +
    id +
    "' value='" +
    email_data +
    "' style='color: black'>";
  phone.innerHTML =
    "<input type='text' id='phone_text" +
    id +
    "' value='" +
    phone_data +
    "' style='color: black'>";
}

function save_row(no) {
  var name_val = document.getElementById("name_text" + no).value;
  var email_val = document.getElementById("email_text" + no).value;
  var phone_val = document.getElementById("phone_text" + no).value;
  var id_val = ids[no];

  document.getElementById("name" + no).innerHTML = name_val;
  document.getElementById("email" + no).innerHTML = email_val;
  document.getElementById("phone" + no).innerHTML = phone_val;

  document.getElementById("edit_button" + no).style.display = "inline-block";
  document.getElementById("save_button" + no).style.display = "none";

  console.log("name_val: " + name_val);
  console.log("userId: " + userId);
  console.log("contactId: " + id_val);
  let tmp = {
    ID: id_val,
    NAME: name_val,
    PHONE: phone_val,
    EMAIL: email_val,
    USERID: userId,
  };

  let jsonPayload = JSON.stringify(tmp);
  console.log(jsonPayload);
  let url = urlBase + "update_contact." + extension;

  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log("Contact has been updated");
        loadContacts();
      }
    };
    xhr.send(jsonPayload);
  } catch (err) {
    console.log(err.message);
  }
}

function delete_row(no) {
  var namef_val = document.getElementById("name" + no).innerText;

  let check = confirm("Confirm deletion of contact: " + namef_val);
  if (check === true) {
    document.getElementById("row" + no + "").outerHTML = "";
    let tmp = {
      ID: ids[no],
    };

    let jsonPayload = JSON.stringify(tmp);

    let url = urlBase + "delete_contact." + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("DELETE", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
      xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          console.log("Contact has been deleted");
          loadContacts();
        }
      };
      xhr.send(jsonPayload);
    } catch (err) {
      console.log(err.message);
    }
  }
}

function searchContacts() {
  const content = document.getElementById("searchinput");
  const selections = content.value.toUpperCase().split(" ");
  // const table = document.getElementsByClassName("contacts-container");
  const tr = document.getElementsByTagName("tr"); // Table Row

  for (let i = 0; i < tr.length; i++) {
    const td_name = tr[i].getElementsByTagName("td")[0]; // Table Data: First Name

    if (td_name) {
      const txtValue_name = td_name.textContent || td_name.innerText;
      tr[i].style.display = "none";

      for (selection of selections) {
        if (txtValue_name.toUpperCase().indexOf(selection) > -1) {
          tr[i].style.display = "";
        }
      }
    }
  }
}

function clickLogin() {
  var log = document.getElementById("login");
  var reg = document.getElementById("signup");
  var but = document.getElementById("btn");

  log.style.left = "-400px";
  reg.style.left = "0px";
  but.style.left = "130px";
}

function clickRegister() {
  var log = document.getElementById("login");
  var reg = document.getElementById("signup");
  var but = document.getElementById("btn");

  reg.style.left = "-400px";
  log.style.left = "0px";
  but.style.left = "0px";
}

function validLoginForm(logName, logPass) {
  var logNameErr = (logPassErr = true);

  if (logName == "") {
    console.log("USERNAME IS BLANK");
  } else {
    var regex = /(?=.*[a-zA-Z])[a-zA-Z0-9-_]{3,18}$/;

    if (regex.test(logName) == false) {
      console.log("USERNAME IS NOT VALID");
    } else {
      console.log("USERNAME IS VALID");
      logNameErr = false;
    }
  }

  if (logPass == "") {
    console.log("PASSWORD IS BLANK");
    logPassErr = true;
  } else {
    var regex = /(?=.*\d)(?=.*[A-Za-z])(?=.*[!@#$%^&*]).{8,32}/;

    if (regex.test(logPass) == false) {
      console.log("PASSWORD IS NOT VALID");
    } else {
      console.log("PASSWORD IS VALID");
      logPassErr = false;
    }
  }

  if ((logNameErr || logPassErr) == true) {
    return false;
  }
  return true;
}

function validSignUpForm(fName, lName, user, pass) {
  var fNameErr = (lNameErr = userErr = passErr = true);

  if (fName == "") {
    console.log("FIRST NAME IS BLANK");
  } else {
    console.log("first name IS VALID");
    fNameErr = false;
  }

  if (lName == "") {
    console.log("LAST NAME IS BLANK");
  } else {
    console.log("LAST name IS VALID");
    lNameErr = false;
  }

  if (user == "") {
    console.log("USERNAME IS BLANK");
  } else {
    var regex = /(?=.*[a-zA-Z])([a-zA-Z0-9-_]).{3,18}$/;

    if (regex.test(user) == false) {
      console.log("USERNAME IS NOT VALID");
    } else {
      console.log("USERNAME IS VALID");
      userErr = false;
    }
  }

  if (pass == "") {
    console.log("PASSWORD IS BLANK");
  } else {
    var regex = /(?=.*\d)(?=.*[A-Za-z])(?=.*[!@#$%^&*]).{8,32}/;

    if (regex.test(pass) == false) {
      console.log("PASSWORD IS NOT VALID");
    } else {
      console.log("PASSWORD IS VALID");
      passErr = false;
    }
  }

  if ((fNameErr || lNameErr || userErr || passErr) == true) {
    return false;
  }

  return true;
}

function validAddContact(firstName, lastName, phone, email) {
  var fNameErr = (lNameErr = phoneErr = emailErr = true);

  if (firstName == "") {
    console.log("FIRST NAME IS BLANK");
  } else {
    console.log("first name IS VALID");
    fNameErr = false;
  }

  if (lastName == "") {
    console.log("LAST NAME IS BLANK");
  } else {
    console.log("LAST name IS VALID");
    lNameErr = false;
  }

  if (phone == "") {
    console.log("PHONE IS BLANK");
  } else {
    var regex = /^[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/;

    if (regex.test(phone) == false) {
      console.log("PHONE IS NOT VALID");
    } else {
      console.log("PHONE IS VALID");
      phoneErr = false;
    }
  }

  if (email == "") {
    console.log("EMAIL IS BLANK");
  } else {
    var regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

    if (regex.test(email) == false) {
      console.log("EMAIL IS NOT VALID");
    } else {
      console.log("EMAIL IS VALID");
      emailErr = false;
    }
  }

  if ((phoneErr || emailErr || fNameErr || lNameErr) == true) {
    return false;
  }

  return true;
}

// Get buttons

let addContactbtn = document.getElementById("addContactButton");
let editContactbtn = document.getElementById("contact-editBtn");
let deleteContactbtn = document.getElementById("contact-deleteBtn");
let logoutUserbtn = document.getElementById("btn-logout");

// Get the modal
let modal = document.getElementById("contactModal");

// When the user clicks the edit or add button, open the modal
function contactButtonClick(intbtnPressed) {
  showTable();
  let span = document.getElementsByClassName("close")[0];

  modal.style.display = "block";

  span.onclick = function () {
    modal.style.display = "none";
    showTable();
  };

  window.onclick = function (event) {
    if (event.target == modalContent) {
      addModal.style.display = "none";
    }
  };

  // add contact
  if (intbtnPressed === 1) {
    document.getElementById("modal-title").textContent = "Add Contact";
    document.getElementById("addNewContactButton").textContent =
      "Add New Contact";
    addNewContactBtn = document.getElementById("addNewContactButton");
    addNewContactBtn.onclick = addContact;
  }

  // edit contact
  if (intbtnPressed === 2) {
    document.getElementById("modal-title").textContent = "Edit Contact";
    document.getElementById("addNewContactButton").textContent = "Save Changes";
    var name = (document.getElementById("add-name").value = "random person");
    var phone = (document.getElementById("add-phone").value = "123-456-7890");
    var email = (document.getElementById("add-email").value = "email@www.com");
  }

  console.log("Edit or Add button clicked");
}

// Add event listeners to the add and edit buttons
addContactbtn.addEventListener("click", function () {
  contactButtonClick(1);
});
editContactbtn.addEventListener("click", function () {
  contactButtonClick(2);
});

deleteContactbtn.onclick = function () {
  confirm("Delete button clicked");
};

// Setting the welcome message

function loadIntro() {
  let intro = document.getElementById("intro-message");
  intro.innerHTML =
    "Welcome, <u id='intro-messagename'> " +
    firstName +
    " " +
    lastName.substring(0, 1) +
    "</u>.";
}
