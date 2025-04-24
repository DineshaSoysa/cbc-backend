import mongoose from "mongoose";

const productSchema = mongoose.Schema({
     productID : {
        type : String,
        required : true,
        unique : true
     },
     name : {
        type : String,
        required : true
     },
     altname : [{
        type : String
     }],
     description : {
        type : String,
        required : true
     },
     images : [{
        type : String
     }],
     price : {
        type : Number,
        required : true
     },
     stock : {
        type : Number,
        required : true
     },
     isAvailable : {
        type : Boolean,
        required : true,
        default : true
     }

})

const Product = mongoose.model('products',productSchema);

export default Product;