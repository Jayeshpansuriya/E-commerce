import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    brand: String,
    price:{
        type:Number,
        required: true,
    },
    description: String,
    category: String,
    countInStock:{
        type:Number,
        default:0,
    },
    image:String,
    createdBy: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
},
},{
    timestamps:true
});

const Product =  mongoose.model("Product",productSchema);
export default Product;