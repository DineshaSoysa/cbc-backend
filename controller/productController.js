import Product from "../model/productModel.js";
import { isAdmin } from "./userController.js";

//Save new product
export function saveProduct(req, res) {
  if (!isAdmin(req)) {
    res.json({
      message: "You are not authorized to add a product",
    });

    return;
  }

  const product = new Product(req.body);

  product
    .save()
    .then(() => {
      res.json({
        message: "Product saved",
      });
    })
    .catch(() => {
      res.json({
        message: "Product not saved",
      });
    });
}

//Get the products
export async function displayProducts(req, res) {
  try {
    //Admin can see all the products but others can only see products which have stocks
    if (isAdmin(req)) {
      const productlist = await Product.find();
      res.json(productlist);
    } else {
      const productlist = await Product.find({ isAvailable: true });
      res.json(productlist);
    }
  } catch (err) {
    res.json(err);
  }
}

//Get one product
export async function displayProduct(req, res) {
  try {
    const product = await Product.findOne({ productID: req.params.productID });
    if (product == null) {
      res.json({
        message: "Product not available!",
      });

      return;
    }

    if (!isAdmin(req)) {
      if (!product.isAvailable) {
        res.json({
          message: "Product not available",
        });
        return;
      } else {
        res.json(product);
      }
    } else {
      res.json(product);
    }
  } catch (err) {
    res.json({
      message: "nothing to show",
    });
  }
}

//Delete products
export async function deleteProducts(req, res) {
  try {
    if (isAdmin) {
      await Product.deleteOne({ productID: req.params.productID });
      res.json({
        message: "product deleted",
      });
    } else {
      res.json({
        message: "Not authorized to delete products",
      });
    }
  } catch (err) {
    res.json({
      message: err,
    });
  }
}

//Update product

export async function updateProduct(req, res) {
  if (!isAdmin(req)) {
    res.json({
      message: "You are not authorized to update product!",
    });
    return;
  }
  const productID = req.params.productID;

  try {
    await Product.updateOne({ productID: productID }, req.body);
    res.json({
      message: "Product updated!",
    });
  } catch (err) {
    res,
      json({
        message: err,
      });
  }
}
