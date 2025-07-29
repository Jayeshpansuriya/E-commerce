import Product from "../models/productModel.js";
// //? get all product
// export const getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.find().populate("createdBy", "name email role");
//       res.json(products);


//   } catch (error) {
//     console.error("Error fetching products:", error);
//       res.status(200).json({message: "Server error while fetching products"});
//   }


// };
// //? get single product by id 
// export const getProductById = async (req, res) => {
//  try{
//   const product = await Product.findById(req.params.id).populate("createdBy","name email");
//   if(!product){
//     return res.status(404).json({message: "Product not Found"});
//   }
//   res.json(product);
//  }catch(error){
//   console.error("Error fetching product:", error);
//   res.status(500).json({message: "Server error while fetching product "});
//  }
// };

// //? create new product(admin only)

// export const createProduct = async (req, res) => {
//   try {
//     const newProduct = new Product({
//       ...req.body,
//       createdBy: req.user._id, //? based on the user id only admin can add the product 
//     });
//     const savedProduct = await newProduct.save();
//     console.log("✅ Product created by admin:", req.user._id);
//     res.status(201).json(savedProduct);
//   } catch (err) {
//     console.error("❌ Error creating product:", err.message);
//     res.status(500).json({ message: "Server error while creating product" });
//   }
// };




// export const updateProduct = async (req, res) => {
//   const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
//     new: true
//   });
//   if (!product) return res.status(404).json({ message: "Product not found" });
//   res.json(product);

// }

// //? Delet product(admin only)
// export const deleteProduct = async (req, res) => {
//   const deleted = await Product.findByIdAndDelete(req.params.id);
//   if (!deleted) return res.status(404).json({ message: "Product not found" });
//   res.json({ message: "Product deleted successfully" });
// };


// //? delete / api/products/:id

// export const deleteProductById = async(req,res)=>{
//   try {
//     const product = await Product.findByIdAndDelete(req.params.id);

//     if(!product){
//       return res.status(404).json({message:"product not found"});
//     }
//     res.json({message:"Product deleted successfully"});

//   } catch (error) {
//     console.error("Error deleting product:",error);
//     res.status(500).json({message: "Server error while deleting product "});

//   }
// };

// export const updateProductById = async (req,res)=>{
//   try {
//     const productId = req.params.id;
//     const updateData = req.body;
//     const updateProduct = await Product.findByIdAndUpdate(
//       productId,
//       updateData,
//       {new: true , runValidators:true}
//     );
//     if(!updateProduct){
//       return res.status(404).json({message: "product not found"});
//     }

//   } catch (error) {
//     console.log("Error updating product:",error);
//     res.status(500).json({mssage: " Server error while updating product "});

//   }
// };

//? create product 
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, image, stock, category } = req.body;

    const product = new Product({
      name,
      description,
      price,
      image,
      stock,
      category,
    });
    const savedProduct = await product.save();
    console.log("✅ Product saved:", savedProduct);

    res.status(201).json({
      message: "Product created successfully",
      product: savedProduct,
    });



  } catch (error) {
    console.error("Create Product Error:,error.message");
    res.status(500).json({ message: "Failed to create product" });

  }
};

//?get all prouct 
export const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);

  } catch (error) {
    console.error("Get Products Error:", error.message);
    res.status(500).json({ message: "Failed to get products" });

  }
};

//? get single product 
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);

  } catch (error) {
    console.error("Get Product Error:", error.message);
    res.status(500).json({ message: "Failed to get product" });

  }
};

//? update product (admin only)

export const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({
      message: "Product updated successfully ",
      product: updated,
    });

  } catch (error) {
    console.error("Update Product Error:", error.message);
    res.status(500).json({ message: "Failed to update product" });
  }
};

//? delete product (admin only)
export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Delete Product Error:", error.message);
    res.status(500).json({ message: "Failed to delete prodct" });

  }
};