import express from 'express'
import { saveProduct } from '../controller/productController.js'

const productRoute = express.Router();

productRoute.post('/',saveProduct);

export default productRoute;