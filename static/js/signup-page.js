const Signup_Form = document.getElementById("signupform");
const Success_Toast = document.getElementById("successToast");
const Error_Toast = document.getElementById("errorToast");
const Err_Msg = document.getElementById("errMsg");

Signup_Form.onsubmit = async function(e) {
    e.preventDefault();
    
    // Reset toasts
    Success_Toast.className = "successful_hide";
    Error_Toast.className = "validate_hide";
    
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    
    // Quick frontend validation
    if (password !== confirmPassword) {
        Err_Msg.textContent = "Passwords do not match";
        Error_Toast.className = "validate";
        return;
    }

    if (password.length < 6) {
        Err_Msg.textContent = "Min 6 characters required";
        Error_Toast.className = "validate";
        return;
    }
    
    const submitBtn = document.getElementById("signup_btn");
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = "Processing...";
    submitBtn.disabled = true;

    try {
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, username, password })
        });

        const result = await response.json();

        if (response.ok) {
            Success_Toast.className = "successful";
            setTimeout(() => {
                window.location.href = "/login";
            }, 1500);
        } else {
            Err_Msg.textContent = result.message || "Signup failed";
            Error_Toast.className = "validate";
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        }
    } catch (error) {
        console.error("Signup error:", error);
        Err_Msg.textContent = "System Error. Try later.";
        Error_Toast.className = "validate";
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
    }
};
