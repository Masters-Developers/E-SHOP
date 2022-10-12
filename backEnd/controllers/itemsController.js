
const items=require("../models/items")
const fetch =(url)=>import('node-fetch').then(({default:fetch})=>fetch(url)); //Import Fetch

//VIEW ITEMS'S LIST
exports.getItems= async(req,res,next) =>{
    const itemsList = await items.find();
    res.status(200).json({
        success:true,
        amount: items.length,
        itemsList
    })
}
//VIEW PRODUCTS BY ID
exports.getItemsByID=async(req,res,next) =>{
    const itemId = await items.findById(req.params.id);

    if(!itemId){
        return res.status(404).json({
            success:false,
            message:"Item's Id not found"
        }) 
    }
    res.status(200).json({
        success:true,
        message:"below you can find the informacion wbout the item",
        itemId
    })
}
//Create new item /api/items
exports.newItem=async(req,res,next)=>{
    const item = await items.create(req.body);

    res.status(201).json({
        success:true,
        item
    })
}
//Update item
exports.updateItem=async(req,res,next)=>{
    let itemId = await items.findById(req.params.id);

    if(!itemId){
        return res.status(404).json({
            success:false,
            message:"Item's Id not found"
        }) 
    }
    const item = await items.findByIdAndUpdate(req.params.id,req.body,{
        new:true, 
        runValidators:true
    })
    res.status(200).json({
        success:true,
        message:"Succesfully updated Item",
        itemId
    })

}
//DELETE A ITEM
exports.deleteItem= async (req,res,next) =>{
    const itemId= await items.findById(req.params.id) //
    if (!itemId){ //
            return res.status(404).json({ //
            success:false,
            message: 'Item not found'
        })
    }

    await itemId.remove();//delete the process
    res.status(200).json({
        success:true,
        message:"Succesfully deleted Item"
    })
}
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
