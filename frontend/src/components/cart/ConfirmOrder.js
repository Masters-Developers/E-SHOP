import React, { Fragment } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate , Link} from 'react-router-dom'
import MetaData from '../layouts/MetaData'
import CheckoutSteps from './CheckOutSteps';

export const ConfirmOrder = () => {
    const navigate=useNavigate();
    const { cartItems, shippingInfo} = useSelector(state => state.cart)
    const { user } = useSelector (state => state.auth)

    //calculemos los valores
    const priceItems= cartItems.reduce((acc, item) => acc+item.price * item.quantity, 0)
    const priceSend= priceItems> 125000 ? 0: 12000
    const priceTax = Number((0.19 * priceItems).toFixed(2))
    const priceTotal =(priceItems + priceSend + priceTax).toFixed(2)

    const processToPayment=()=>{
        const data={
            priceItems: priceItems.toFixed(2),
            priceSend,
            priceTax,
            priceTotal
        }

        sessionStorage.setItem('orderInfo', JSON.stringify(data))
        navigate("/payment")
    }
  return (
    <Fragment>

            <MetaData title={'Confirm Order'} />

            <CheckoutSteps shipping confirmOrder />

            <div className="row d-flex justify-content-between">
                <div className="col-12 col-lg-8 mt-5 order-confirm">

                    <h4 className="mb-3">Send Information</h4>
                    <p><b>Name:</b> {user && user.name}</p>
                    <p><b>Phone:</b> {shippingInfo.phone}</p>
                    <p className="mb-4"><b>Adress:</b> {`${shippingInfo.adress}, ${shippingInfo.city} ${shippingInfo.department}`}</p>

                    <hr />
                    <h4 className="mt-4">Items in your Cart:</h4>

                    {cartItems.map(item => (
                        <Fragment>
                            <hr />
                            <div className="cart-item my-1" key={item.itemc}>
                                <div className="row">
                                    <div className="col-4 col-lg-2">
                                        <img src={item.image} alt={item.name} height="45" width="65" />
                                    </div>

                                    <div className="col-5 col-lg-6">
                                        <Link to={`/item/${item.item}`}>{item.name}</Link>
                                    </div>


                                    <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                                        <p>{item.quantity} x ${item.price} = <b>${(item.quantity * item.price).toFixed(2)}</b></p>
                                    </div>

                                </div>
                            </div>
                            <hr />
                        </Fragment>
                    ))}
                </div>

                <div className="col-12 col-lg-3 my-4">
                    <div id="order_summary">
                        <h4>Purchase Summary</h4>
                        <hr />
                        <p>Subtotal:  <span className="order-summary-values">${priceItems}</span></p>
                        <p>Shipping Cost: <span className="order-summary-values">${priceSend}</span></p>
                        <p>Taxes:  <span className="order-summary-values">${priceTax}</span></p>

                        <hr />

                        <p>Total: <span className="order-summary-values">${priceTotal}</span></p>

                        <hr />
                        <button id="checkout_btn" className="btn btn-primary btn-block" onClick={processToPayment}>Continue with Payment</button>
                    </div>
                </div>


            </div>

        </Fragment>
  )
}