import React, { Fragment, useState} from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../layouts/MetaData'


const Cart = () => {
    const [quantity, setQuantity] = useState(1)

    const increaseQty = () => {
        const contador = document.querySelector('.count')
        const qty = contador.valueAsNumber+1;
        setQuantity(qty)
     }
  
     const decreaseQty = () => {
      const contador = document.querySelector('.count')
  
      const qty = contador.valueAsNumber-1;
      setQuantity(qty)
   }

    //Json de ejemplo
   let cartItems=[
        {
            "_id": "63581a34ff5a476990e3d1be",
            "name": "Tofu",
            "price": 5000,
            "image": "./images/items/tofu.jpg",
            "stock": 40,
        },
        {
            "_id": "63581abdff5a476990e3d1c1",
            "name": "Vegan Choco Cake",
            "price": 7000,
            "image": "./images/items/ChokoCake.jpg",
            "stock": 120,
        },
        {
            "_id": "635a7666eb666306e96617b8",
            "name": "MSI LAPTOP",
            "price": 7000000,
            "image": "./images/items/msi.png",
            "stock": 20,
        },
        {
            "_id": "635ad7d279a49f39c3998836",
            "name": "Samsung QLED 46 inch",
            "price": 3800000,
            "image":  "./images/items/samsung.webp",
            "stock": 13,
        }
    ]

cartItems = Array.from(cartItems);

    return (
        <Fragment>
            <MetaData title={'Your Cart'} />
            

            {cartItems.length === 0 ? <h2 className="mt-5">Your cart is empty</h2> : (
                <Fragment>
                    
                    <h2 className="mt-5">Your Cart: <b>{cartItems.length} items</b></h2>

                    <div className="row d-flex justify-content-between">
                        <div className="col-12 col-lg-8">

                        {cartItems && cartItems.map (item => (
                                <Fragment>
                                    <hr />

                                    <div className="cart-item" key={item.name}>
                                        <div className="row">
                                            <div className="col-4 col-lg-3">
                                                <img src={item.image} alt={item.name} height="90" width="115" />
                                            </div>

                                            <div className="col-5 col-lg-3">
                                                <Link to={`/producto/${item._id}`}>{item.name}</Link>
                                            </div>


                                            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                <p id="card_item_price">${item.price}</p>
                                            </div>

                                            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                <div className="stockCounter d-inline">
                                                    <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>

                                                    <input type="number" className="form-control count d-inline" value={quantity} readOnly />

                                                    <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
                                                </div>
                                            </div>

                                            <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                                <i id="delete_cart_item" className="fa fa-trash btn btn-danger" ></i>
                                            </div>

                                        </div>
                                    </div>
                                    <hr />
                                </Fragment>
                            
                        ))}
                        </div>

                        <div className="col-12 col-lg-3 my-4">
                            <div id="order_summary">
                                <h4>Total Purchase</h4>
                                <hr />
                                <p>Subtotal:  <span className="order-summary-values">$350.000</span></p>
                                <p>Est. total: <span className="order-summary-values">$380.000</span></p>

                                <hr />
                                <button id="checkout_btn" className="btn btn-primary btn-block">Buy</button>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Cart