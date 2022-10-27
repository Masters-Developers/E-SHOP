
const itemss=require("../models/items");
const ErrorHandler = require("../utilities/errorHandler");
const catchAsyncErrors = require ("../middleWare/catchAsyncErrors")
const fetch =(url)=>import('node-fetch').then(({default:fetch})=>fetch(url)); //Import Fetch
//VIEW ITEMS'S LIST
exports.getItems= catchAsyncErrors( async(req,res,next) =>{
    const items = await itemss.find();
    if(!items){
        return next(new ErrorHandler ("Items not found", 404))
    }
    res.status(200).json({
        success:true,
        amount: items.length,
        items
    })
})
//VIEW PRODUCTS BY ID
exports.getItemsByID= catchAsyncErrors( async(req,res,next) =>{
    const item = await itemss.findById(req.params.id);

    if(!item){
        return next(new ErrorHandler ("Item not found", 404))
    }
    res.status(200).json({
        success:true,
        message:"below you can find the details about this item: ",
        item
    })
})
//Create new item /api/items
exports.newItem= catchAsyncErrors( async(req,res,next)=>{
    const item = await itemss.create(req.body);
    res.status(201).json({
        success:true,
        item
    })
})
//Update item
exports.updateItem=catchAsyncErrors( async(req,res,next)=>{
    let item = await itemss.findById(req.params.id);

    if(!item){
        return next(new ErrorHandler ("Item's Id not found", 404))
    }
    item = await itemss.findByIdAndUpdate(req.params.id,req.body,{
        new:true, 
        runValidators:true
    })
    res.status(200).json({
        success:true,
        message:"Succesfully updated Item",
        item
    })
})
//DELETE A ITEM
exports.deleteItem=catchAsyncErrors( async (req,res,next) =>{
    const item= await itemss.findById(req.params.id) //
    if(!item){
        return next(new ErrorHandler ("Item not found", 404))
    }

    await item.remove();//delete the process
    res.status(200).json({
        success:true,
        message:"Succesfully deleted Item"
    })
})
//view all items
function viewItems(){
    fetch('http://localhost:4000/api/items')
    .then(res=>res.json())
    .then(res=>console.log(res))
    .catch(err=>console.error(err))
}

//viewItems(); CALL THE METHOD TO WATCH THE ITEMS

//view by id
function viewItemsById(id){
    fetch('http://localhost:4000/api/items/'+id)
    .then(res=>res.json())
    .then(res=>console.log(res))
    .catch(err=>console.error(err))
}

//vireItemsById('id'); test the method with an id
