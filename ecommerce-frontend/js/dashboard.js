
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
        console.error("Error fetching products:", err);

    }
}

//? show products in html
function showProducts(product) {
    productList.innerHTML = "";
    product.forEach((product) => {
        const div = document.createElement("div");
        div.classList.add("product-card");

        div.innerHTML = `
        <img src="${product.image}" width="100%"/>
        <h3>${product.name}</h3>
        <p>Price: $${product.price}</p>
        <div class="actions">
        <button onclick="deleteProduct('${product._id}')">Delete</button>
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
        console.error(err);
        message.textContent = "server error";
    }
});

//? Delete Product 
async function deleteProduct(productId) {
    try {
        const res = await fetch(`${BASE_URL}/${productId}`, {
            method: "DELETE",
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
        console.error("Delete error:", err);
        message.textContent = "Server error.";

    }
}

fetchProducts();

