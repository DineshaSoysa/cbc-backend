import Product from "../model/productModel.js";

export function saveProduct(req,res){

    

    if(req.user == null){
        console.log('1')
        res.json({
            message : 'Please login first'
        })
        return
    }

    if(req.user.role != 'admin'){
        console.log('2')

        res.json({
            message : 'you are not authorized'
        })
        return
    }

    const product = new Product({
        productname : req.body.productname,
        price : req.body.price,
        stock : req.body.stock
    })

    product.save().then(

        ()=>{
            console.log('3')

            res.json({
                message : 'Product saved'
            })
        }
    ).catch(
        ()=>{
            console.log('4')

            res.json({
                message : 'Product not saved'
            })
        }
    )
}