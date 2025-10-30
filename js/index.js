// ---------- HTML elements ----------
var signUpName = document.querySelector("#signUpName");
var signUpEmail = document.querySelector("#signUpEmail");
var signUpPassword = document.querySelector("#signUpPassword");
var signUpBtn = document.querySelector("#signUpBtn");
var registerForm = document.querySelector("#registerForm");
var showLogin = document.querySelector("#showLogin");
var homePage = document.querySelector("#homePage");

// login elements
var signInEmail = document.querySelector("#signInEmail");
var signInPassword = document.querySelector("#signInPassword");
var logInBtn = document.querySelector("#logInBtn");
var showRegister = document.querySelector("#showRegister");
var loginForm = document.querySelector("#loginForm");

// ---------- regex & storage helpers ----------
var nameRegex = /^[a-z0-9_-]{3,15}$/i;
var emailRegex = /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/;
var passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

function getUsers() {
  return JSON.parse(localStorage.getItem("users") || "[]");
}
function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}
function setCurrentUser(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}
function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser") || "null");
}
function clearCurrentUser() {
  localStorage.removeItem("currentUser");
}

// ---------- validation functions ----------
function validateName() {
  var value = signUpName.value.trim();
  if (nameRegex.test(value)) {
    signUpName.nextElementSibling.classList.add("d-none");
    signUpName.classList.remove("is-invalid");
    signUpName.classList.add("is-valid");
    return true;
  } else {
    signUpName.nextElementSibling.classList.remove("d-none");
    signUpName.classList.remove("is-valid");
    signUpName.classList.add("is-invalid");
    return false;
  }
}
function validateEmail() {
  var value = signUpEmail.value.trim();
  if (emailRegex.test(value)) {
    signUpEmail.nextElementSibling.classList.add("d-none");
    signUpEmail.classList.remove("is-invalid");
    signUpEmail.classList.add("is-valid");
    return true;
  } else {
    signUpEmail.nextElementSibling.classList.remove("d-none");
    signUpEmail.classList.remove("is-valid");
    signUpEmail.classList.add("is-invalid");
    return false;
  }
}
function validatePassword() {
  var value = signUpPassword.value.trim();
  if (passwordRegex.test(value)) {
    signUpPassword.nextElementSibling.classList.add("d-none");
    signUpPassword.classList.remove("is-invalid");
    signUpPassword.classList.add("is-valid");
    return true;
  } else {
    signUpPassword.nextElementSibling.classList.remove("d-none");
    signUpPassword.classList.remove("is-valid");
    signUpPassword.classList.add("is-invalid");
    return false;
  }
}

// attach validators while typing
if (signUpEmail) signUpEmail.addEventListener("input", validateEmail);
if (signUpPassword) signUpPassword.addEventListener("input", validatePassword);
if (signUpName) signUpName.addEventListener("input", validateName);

// ---------- signUp ----------
function signUp(e) {
  if (e) e.preventDefault();

  var nameVal = signUpName.value.trim();
  var emailVal = signUpEmail.value.trim();
  var passVal = signUpPassword.value.trim();

  var isValid = validateName() && validateEmail() && validatePassword();

  var users = getUsers();

  if (users.some((u) => u.email.toLowerCase() === emailVal.toLowerCase())) {
    signUpEmail.nextElementSibling.textContent = "Email already used";
    signUpEmail.nextElementSibling.classList.remove("d-none");
    signUpEmail.classList.remove("is-valid");
    signUpEmail.classList.add("is-invalid");
    return;
  }

  if (isValid) {
    var user = { name: nameVal, email: emailVal, password: passVal };
    users.push(user);
    saveUsers(users);

    // clear & switch to login
    signUpName.value = "";
    signUpEmail.value = "";
    signUpPassword.value = "";
    registerForm.classList.add("d-none");
    loginForm.classList.remove("d-none");
  } else {
    // sweetalert optional
    if (window.Swal) {
      Swal.fire({ icon: "warning", title: "All inputs are required" });
    } else {
      alert("Please fill all fields correctly.");
    }
  }
}
if (signUpBtn) signUpBtn.addEventListener("click", signUp);

// ---------- switch forms ----------
if (showLogin)
  showLogin.addEventListener("click", function (e) {
    e.preventDefault();
    registerForm.classList.add("d-none");
    loginForm.classList.remove("d-none");
  });
if (showRegister)
  showRegister.addEventListener("click", function (e) {
    e.preventDefault();
    loginForm.classList.add("d-none");
    registerForm.classList.remove("d-none");
  });

// ---------- logIn ----------
function logIn(e) {
  if (e) e.preventDefault();

  var emailSignIn = signInEmail.value.trim();
  var passwordSignIn = signInPassword.value.trim();
  var errorSignIn = document.querySelector("#signInError");

  // hide previous errors
  if (errorSignIn) errorSignIn.classList.add("d-none");
  signInEmail.nextElementSibling.classList.add("d-none");
  signInPassword.nextElementSibling.classList.add("d-none");
  signInEmail.classList.remove("is-invalid", "is-valid");
  signInPassword.classList.remove("is-invalid", "is-valid");

  if (!emailSignIn || !passwordSignIn) {
    if (errorSignIn) errorSignIn.classList.remove("d-none");
    if (!emailSignIn) {
      signInEmail.classList.add("is-invalid");
    }
    if (!passwordSignIn) {
      signInPassword.classList.add("is-invalid");
    }
    return;
  }

  var users = getUsers();
  var user = users.find(
    (u) => u.email.toLowerCase() === emailSignIn.toLowerCase()
  );

  if (!user) {
    signInEmail.nextElementSibling.textContent =
      "*Email not found — please register first";
    signInEmail.nextElementSibling.classList.remove("d-none");
    signInEmail.classList.add("is-invalid");
    return;
  } else {
    signInEmail.classList.add("is-valid");
  }

  if (user.password !== passwordSignIn) {
    signInPassword.nextElementSibling.textContent =
      "*Incorrect password — try again";
    signInPassword.nextElementSibling.classList.remove("d-none");
    signInPassword.classList.add("is-invalid");
    return;
  }

  // login success
  setCurrentUser(user);
  displayHome(user.name || user.email);
}
if (logInBtn) logInBtn.addEventListener("click", logIn);

// hide form-level error when typing in sign-in fields
if (signInEmail)
  signInEmail.addEventListener("input", () => {
    document.querySelector("#signInError")?.classList.add("d-none");
    signInEmail.nextElementSibling.classList.add("d-none");
  });
if (signInPassword)
  signInPassword.addEventListener("input", () => {
    document.querySelector("#signInError")?.classList.add("d-none");
    signInPassword.nextElementSibling.classList.add("d-none");
  });

// ---------- display home ----------
function displayHome(userName) {
  homePage.innerHTML = `
  <nav class="d-flex justify-content-between align-items-center position-relative z-100">
       <h2 class="text-primary fs-48">Smart Login System</h2>
           <button id="logoutBtn" class="btn btn-primary mt-3">Logout</button>
  </nav>
  <div class="home-text d-flex text-center justify-content-center align-items-center position-relative z-100 mx-auto">
      <h3 >Welcome, ${userName}!</h3>
  </div>
  `;
  document.querySelector("#logoutBtn").addEventListener("click",function(){
    clearCurrentUser();
    location.reload();
  });
}

// auto-login if exists
var currentUser = getCurrentUser();
if (currentUser) {
  displayHome(currentUser.name || currentUser.email);
}
