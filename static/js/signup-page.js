let Form = document.getElementById("form");
let Name_Input = document.getElementById("username");
let Password_Input = document.getElementById("password")
let Email = document.getElementById("email");
let NameError = document.querySelector(".hide");
let EmailError = document.querySelector(".email_hide");
let PasswordError = document.querySelector(".password_hide")
let Acc_succ = document.querySelector(".successful_hide")
let Validate_err = document.querySelector(".validate_hide")

let isNameError = false;
let isEmailError = false;
let isPasswordError = false;

const reg_name = /^[a-zA-Z]{3,10}$/
const reg_email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const reg_password = /^[a-zA-Z0-9!@#$%^&*_]{6,16}$/

function NameMatch(){
  let NameValue = Name_Input.value.trim()
  if(reg_name.test(NameValue)){
    Name_Input.style.borderColor = "transparent"
    isNameError = true;
    NameError.className = "hide"
  }
  else{
    NameError.className = "name"
    Name_Input.style.borderColor = "red"
    isNameError = false;
  }
}

function EmailMatch(){
  let EmailValue = Email.value.trim()
  if(reg_email.test(EmailValue)){
    EmailError.className = "email_hide"
    Email.style.borderColor = "transparent"
    isEmailError = true;
  }
  else{
    EmailError.className = "email"
    Email.style.borderColor = "red"
    isEmailError = false;
  }
}

function PasswordMatch(){
  let PasswordValue = Password_Input.value.trim();
  if(reg_password.test(PasswordValue)){
    PasswordError.className = "password_hide"
    Password_Input.style.borderColor = "transparent"
    isPasswordError = true;
  }
  else{
    PasswordError.className = "password"
    Password_Input.style.borderColor = "red"
    isPasswordError = false;
  }
}

Name_Input.addEventListener("keyup", NameMatch);
Email.addEventListener("keyup", EmailMatch);
Password_Input.addEventListener("keyup", PasswordMatch);

Form.onsubmit = async function(e){
  e.preventDefault();
  
  if(isNameError && isEmailError && isPasswordError){
    const userData = {
      username: Name_Input.value,
      email: Email.value,
      password: Password_Input.value
    };

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });

      const result = await response.json();

      if (response.ok) {
        Acc_succ.className = "successful"
        Validate_err.className = "validate_hide";
        setTimeout(() => {
          Acc_succ.className = "successful_hide"
          window.location.href = "/login";
        }, 2000);
      } else {
        Validate_err.textContent = result.message || "Signup failed";
        Validate_err.className = "validate";
      }
    } catch (error) {
      console.error("Signup error:", error);
      Validate_err.textContent = "An error occurred. Please try again.";
      Validate_err.className = "validate";
    }
  } else {
    Validate_err.className = "validate";
  }
}








