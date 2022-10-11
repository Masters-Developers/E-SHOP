const items=require("../models/items")

//VIEW ITEMS'S LIST
exports.getItems=(req,res,next) =>{
    res.status(200).json({
        success:true,
        message: "In this router you can watch all the Items on our E-Shop"
    })
}

//Create new item /api/items
exports.newItem=async(req,res,next)=>{
    const item = await item.create(req.body);

    res.status(201).json({
        success:true,
        item
    })
}