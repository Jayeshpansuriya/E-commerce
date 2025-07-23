import Product from "../models/productModel.js";
//? get all product
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("createdBy", "name email role");
      res.json(products);


  } catch (error) {
    console.error("Error fetching products:", error);
      res.status(200).json({message: "Server error while fetching products"});
  }
 

};
//? get single product by id 
export const getProductById = async (req, res) => {
 try{
  const product = await Product.findById(req.params.id).populate("createdBy","name email");
  if(!product){
    return res.status(404).json({message: "Product not Found"});
  }
  res.json(product);
 }catch(error){
  console.error("Error fetching product:", error);
  res.status(500).json({message: "Server error while fetching product "});
 }
};

//? create new product(admin only)

export const createProduct = async (req, res) => {
  try {
    const newProduct = new Product({
      ...req.body,
      createdBy: req.user._id, //? based on the user id only admin can add the product 
    });
    const savedProduct = await newProduct.save();
    console.log("✅ Product created by admin:", req.user._id);
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error("❌ Error creating product:", err.message);
    res.status(500).json({ message: "Server error while creating product" });
  }
};




export const updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);

}

//? Delet product(admin only)
export const deleteProduct = async (req, res) => {
  const deleted = await Product.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Product not found" });
  res.json({ message: "Product deleted successfully" });
};
