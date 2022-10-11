const producto=require("../models/items")

//Ver la lista de productos
exports.getItems=(req,res,next) =>{
    res.status(200).json({
        success:true,
        message: "In this router you can watch all the Items on our E-Shop"
    })
}

//Crear nuevo producto /api/productos
exports.newItem=async(req,res,next)=>{
    const product= await item.create(req.body);

    res.status(201).json({
        success:true,
        product
    })
}