import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    productname : {
        type : String,
        required : true
    },

    price : {
        type : String,
        required : true
    },

    stock : {
        type : Number,
        required : true
    }
})

const Product = mongoose.model('products',productSchema);

export default Product;