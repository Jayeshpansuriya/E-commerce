
const token = localStorage.getItem("token");
if (!token) {
    alert("Please login first");
    window.location.href = "../pages/login.html";
}

const productList = document.getElementById("productList");
const addProductForm = document.getElementById("addProductForm");
const message = document.getElementById("message");

const BASE_URL = "http://localhost:5000/api/products";


//? get all Product
async function fetchProducts() {
    try {
        const res = await fetch(BASE_URL);
        const data = await res.json();
        showProducts(data);
    } catch (error) {
        console.error("Error fetching products:", error);

    }
}

//? show products in html
function showProducts(product) {
    productList.innerHTML = "";
    product.forEach((product) => {
        const div = document.createElement("div");
        div.classList.add("product-card");

        div.innerHTML = `
            <img src="${product.image}" class="editable-image" width="100%"/>
            <h3 contenteditable="true" class="editable-name">${product.name}</h3>
            <p contenteditable="true" class="editable-price">Price: $${product.price}</p>
            <div class="actions">
                <button class="delete-btn" onclick="deleteProduct('${product._id}')">🗑 Delete</button>
                <button class="edit-btn" onclick="editProduct('${product._id}', this)">✏ Edit</button>
            </div>
        `;
        productList.appendChild(div);
    });
}



//? 3.Handle Add Product
addProductForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const image = document.getElementById("image").value;
    // const category = document.getElementById("category").value;
    // const description = document.getElementById("description").value;

    const token = localStorage.getItem("token");

    try {
        const res = await fetch(BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ name, price, image }),
        });
        const data = await res.json();

        if (res.ok) {
            message.textContent = "Product added successfully!";
            fetchProducts();
            addProductForm.reset();

        } else {
            message.textContent = data.message || "Failed to add product.";
        }

    } catch (error) {
        console.error(error);
        message.textContent = "server error";
    }
});

//? Delete Product 
async function deleteProduct(productId) {
    try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${BASE_URL}/${productId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        });
        const data = await res.json();
        if (res.ok) {
            message.textContent = "Product delete successfully";
            fetchProducts();
        }
        else {
            message.textContent = data.message || "Failed to delete.";
        }

    } catch (error) {
        console.error("Delete error:", error);
        message.textContent = "Server error.";

    }
}

async function editProduct(productId, btn) {
    const card = btn.closest(".product-card");
    const name = card.querySelector(".editable-name").innerText.trim();
    const priceText = card.querySelector(".editable-price").innerText.replace("Price: $", "").trim();
    const price = parseFloat(priceText);
    const image = card.querySelector(".editable-image").getAttribute("src");

    try {
        const res = await fetch(`${BASE_URL}/${productId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ name, price, image }),
        });

        const data = await res.json();
        if (res.ok) {
            message.textContent = "Product updated successfully!";
            fetchProducts();
        } else {
            message.textContent = data.message || "Failed to update.";
        }
    } catch (error) {
        console.error("Update error:", error);
        message.textContent = "Server error during update.";
    }
}


fetchProducts();

let editingProductId = null;
function openEditModal(product){
    editingProductId = product._id;

    document.getElementById('editName').value=product.name;
    document.getElementById('editDescription').value=product.description;
    document.getElementById('editPrice').value=product.price;
    document.getElementById('editImage').value=product.image;
    document.getElementById('editstock').value=product.stock;
    document.getElementById('editCategory').value=product.category;
    document.getElementById('editModal').style.display='block';


}

function closeEditModal(){
    document.getElementById('editModal').style.display='none';

    editingProductId=null;
}

async function submitEdit(){
    const updateProduct={
        name :document.getElementById('editName').value,
        description: document.getElementById('editDescription').value;
        price:document.getElementById('editPrice').value,
        image:document.getElementById('editImage').value,
        stock: document.getelemtById('editStock').value,
        category:document.getElementById('editCategory').value,
    };
    try {
        const res= await fetch(`http://localhost:5000/api/products/${editingProductId}`,{
            method:"PUT",
            headers:{
                "content-Type":"application/json"
            },
            body: JSON.stringify(updateProduct),
        });
        const data = await res.json();
        if(res.ok){
            alert("Product updated sucessfully");
            closeEditModal();
            location.reload();
        }else{
            alert(data.message||"Failed to update product.");
        }
        
    } catch (error) {
        console.error("Edit error:",error);
        
    }
}

