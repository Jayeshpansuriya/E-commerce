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
    productList.forEach((product) => {
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

    try {
        const res = await fetch(BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, price, image }),
        });

        if(res.ok){
            message.textContent="Product added successfully!";
            fetchProducts();
            addProductForm.reset();

        }else{
            message.textContent = data.message|| "Failed to add product.";
        }

    } catch (error) {
        console.error(err);
        message.textContent = "server error";
    }
})

//? Delete Product 
async function deleteProduct(productId){
    try {
        const res = await fetch(`${BASE_URL}/${productId}`,{
            method:"DELETE",
        });
        const datat = await res.json();
        if(res.ok){
            message.textContent="Product delete successfully";
            fetchProducts();
        }
        else{
            message.textContent = data.message || "Failed to delete.";
        }
        
    } catch (error) {
        console.error("Delete error:", err);
        message.textContent="Server error.";
        
    }
}

fetchProducts();