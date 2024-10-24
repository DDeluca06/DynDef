// Validation Logic
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let usernameError = document.getElementById("usernameError");
    let passwordError = document.getElementById("passwordError");
  
    // Reset error messages
    usernameError.textContent = "";
    passwordError.textContent = "";
  
    // Username validation
    if (username.trim() === "") {
      usernameError.textContent = "Username is required.";
    } else if (username.length < 4) {
      usernameError.textContent = "Username must be at least 4 characters long.";
    }
   
  
    // Password validation (now with regex!)
    let passwordRegex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (password === "") {
      passwordError.textContent = "Password is required";
    } else if (password.toLowerCase() === "password") {
      passwordError.textContent = "Come on, dude.";
    } else if (!passwordRegex.test(password)) {
      passwordError.textContent =
        "Password must be 8 characters long, include at least one uppercase, lowercase, number and special character.";
    }
  
    // If there are no errors, proceed with form submission
    if (usernameError.textContent === "" && passwordError.textContent === "") {
      console.log("Form is valid, proceed with submission");
      console.log("Username:", username);
      console.log("Password:", password);
  
      // Only show the confirmation if the form is valid
      let userConfirmed = confirm("Login successful!");
      if (userConfirmed) {
        window.location.href = "main.html";
      }
    }
  });
