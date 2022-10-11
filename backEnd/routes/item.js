const express=require("express")
const router=express.Router();

const {getItems, newItem} = require("../controllers/itemsController.js") //Traemos la respuesta json desde el controlador

router.route('/items').get(getItems)  //Establecemos desde que ruta queremos ver el getItems
router.route('/items/new').post(newItem); //establecemos la ruta

module.exports=router;