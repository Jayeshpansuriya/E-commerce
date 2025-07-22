import Product from "../models/productModel.js";
//? get all product
export const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(200).json(products);
};
//? get single product by id 
export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "product not found" });
  res.json(product);
};

//? create new product(admin only)

export const createProduct = async (req, res) => {
  try {
    const newProduct = new Product({
      ...req.body,
      createdBy: req.user._id, 
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
