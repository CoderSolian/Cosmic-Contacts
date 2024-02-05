// Get the register form
let registerForm = document.getElementsByClassName("login-container");

// for loop adds event listener to all elements inside the login-container class
for (var i = 0; i < registerForm.length; i++) {
  console.log(registerForm[i]);
  registerForm[i].addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      console.log("Enter pressed in registration form");
      doSignup();
    }
  });
}
