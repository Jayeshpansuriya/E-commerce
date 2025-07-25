async function registerUser(){
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password =document.getElementById("password").value.trim();
    const messageBox = document.getElementById("message");

    if(!name || !email || !password){
        messageBox.innerText ="All fields are required";
        return ;
    }

    try {
            const response = await fetch("http://localhost:5000/api/users/register",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({name,email,password})
            });

            const data = await response.json();
            if(response.ok){
                messageBox.style.color="green";
                messageBox.innerText="registration successfully";

                const popup = document.getElementById("popup");
                popup.style.display="block";
                setTimeout(()=>{
                  popup.style.display="none";
                    window.location.href="../public/index.html";
                },3000);

            }else{
                messageBox.style.color="red";
                messageBox.innerText=data.message|| "registration failed";
            }
        
    } catch (error) {
        messageBox.style.color ="red";
        messageBox.innerText="Serve error!";
        console.log("Error:", error);
        

    }

}

console.log("auth.js loaded");
window.registerUser = registerUser;
document.getElementById("registerBtn").addEventListener("click", registerUser);
