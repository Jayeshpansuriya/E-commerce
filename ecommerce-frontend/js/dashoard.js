const token = localStorage.getItem("token");

if(!token){
    alert("please login first");
    window.location.href="../pages/dashboard.html";
}

async function fetchUserDetails(){
    try {
        const res=await fetch("http://localhost:5000/api/users",{
            method: "GET",
            headers:{
                "Authorization":`Bearer ${token}`
            }
        });

        const data = await res.json();
        if(res.ok){
            document.getElementById("userEmail").textContent=`logged in as: ${data.email}`
        }else{
            alert("Invalid token , plese login again.");
            localStorage.removeItem("token");
            window.location.href="../pages/login.html";
        }
        
    } catch (error) {
        console.error("Error fetching user details:",err);
        alert("Somthing went wrong");
        
    }
}

fetchUserDetails();

document.getElementById("logoutBtn").addEventListener("click",()=>{
    localStorage.removeItem("token");
    window.location.href="../pages/login.html";
})