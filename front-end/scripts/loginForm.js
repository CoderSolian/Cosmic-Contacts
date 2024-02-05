// Get the login form
let loginForm = document.getElementsByClassName("login-container");

// for loop adds event listener to all elements inside the login-container class
for (var i = 0; i < loginForm.length; i++) {
  console.log(loginForm[i]);
  loginForm[i].addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      console.log("Enter pressed in login form");
      doLogin();
    }
  });
}
