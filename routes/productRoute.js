import express from 'express'
import { deleteProducts, displayProduct, displayProducts, saveProduct } from '../controller/productController.js'

const productRoute = express.Router();

productRoute.post('/',saveProduct);
productRoute.get('/',displayProducts);
productRoute.get('/:productID',displayProduct)
productRoute.delete('/:productID',deleteProducts)

export default productRoute;