let Loginform = document.getElementById("loginform");
let Acc_succ = document.querySelector(".successful_hide")
let Validate_err = document.querySelector(".validate_hide")

Loginform.onsubmit = async function(e){
  e.preventDefault();
  
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
 
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const result = await response.json();

    if (response.ok) {
      // Save currently logged-in user info in sessionStorage for frontend display
      sessionStorage.setItem("currentUser", JSON.stringify({ Name: result.user.username }));

      Acc_succ.className = "successful"
      Validate_err.className = "validate_hide";

      setTimeout(() => {
        Acc_succ.className = "successful_hide"
        window.location.href = "/mackkas";
      }, 2000);
    } else {
      Validate_err.textContent = result.message || "Login failed";
      Validate_err.className = "validate";
    }
  } catch (error) {
    console.error("Login error:", error);
    Validate_err.textContent = "An error occurred. Please try again.";
    Validate_err.className = "validate";
  }
}
