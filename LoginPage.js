let Loginform = document.getElementById("loginform");
let Acc_succ = document.querySelector(".successful_hide")
let Validate_err = document.querySelector(".validate_hide")
let User_Name = document.querySelector(".name_user")



let GetUsers = sessionStorage.getItem("users")
let Users = GetUsers ? JSON.parse(GetUsers) : []
Loginform.onsubmit = function(e){
  let Name = document.getElementById("name").value;
  let Password = document.getElementById("password").value;
 
 

  const Login = Users.find((user) => user.Name == Name && user.Password == Password)
  
  console.log(Login);

 if(Login)
{
  // Save currently logged-in user
  sessionStorage.setItem("currentUser", JSON.stringify(Login));

  Acc_succ.className = "successful"
  Validate_err.className = "validate_hide";

  setTimeout(() => {
    Acc_succ.className = "successful_hide"
    location.href = "Mackkas.html";
   }, 2000)
}
  else{
    Validate_err.className = "validate";

  }

  console.log(Users);

  e.preventDefault();
  Loginform.reset() 
}

console.log(Users);