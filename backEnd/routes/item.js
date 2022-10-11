const express=require("express")
const router=express.Router();

const {getItems, newItem} = require("../controllers/itemsController.js") //Bring the response from Items Controller

router.route('/items').get(getItems)  //Set router for to get THE ITEMS
router.route('/items/new').post(newItem); //SET THE ROUTER FOR CREATE A NEW ITEM

module.exports=router;