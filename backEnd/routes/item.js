const express=require("express")
const router=express.Router();

const {getItems, newItem, getItemsByID,updateItem,deleteItem} = require("../controllers/itemsController.js") //Bring the response from Items Controller

router.route('/items').get(getItems); //Set router for to get THE ITEMS
router.route('/items/new').post(newItem); //SET THE ROUTER FOR CREATE A NEW ITEM
router.route('/items/:id').get(getItemsByID);//set route for get items by id
router.route('/items/:id').put(updateItem);//set router for update a item
router.route('/items/:id').delete(deleteItem); //set router for delte a item
module.exports=router;