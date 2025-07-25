const form = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');

loginForm.addEventListener('submit',async(e)=>{
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    try {

        const response = await fetch("http://localhost:5000/api/v1/users/login",{
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({email,password}),
        });
        const data = await response.json();
        if(response.ok){
            loginMessage.style.color = 'green';
            loginMessage.textContent = "login successfully Redirecting..to home page";
            localStorage.setItem("token",data.token);

            setTimeout(()=>{
                window.location.href="../pages/dashboard.html";
            },3000);
        }else{
            loginMessage.style.color ='red';
            loginMessage.innerText  = data.messgae || "Login failed";
        }
        
    } catch (error) {
       console.error("login error:",error);
       loginMessage.style.color="red";
       loginMessage.innerText="Server error. Please try again later";
        
    }
})