import express from 'express'
import { deleteProducts, displayProduct, displayProducts, saveProduct, updateProduct } from '../controller/productController.js'

const productRoute = express.Router();

productRoute.post('/',saveProduct);
productRoute.get('/',displayProducts);
productRoute.get('/:productID',displayProduct)
productRoute.delete('/:productID',deleteProducts)
productRoute.put('/:productID',updateProduct)

export default productRoute;