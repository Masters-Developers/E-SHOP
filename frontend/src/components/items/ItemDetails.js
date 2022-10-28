import React, { Fragment, useEffect, useState } from 'react'
import {MetaData} from "../layouts/MetaData"
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Carousel } from 'react-bootstrap'
import { useAlert} from 'react-alert'
import {getItemDetails, fixErrors } from '../../actions/ItemsActions'


export const ItemDetails = () => {
  const {loading, item , error} = useSelector(state =>state.itemDetails)
  const {id} =useParams();
  const dispatch= useDispatch();
  const alert= useAlert();
  const [quantity, setQuantity] = useState(1)


  useEffect(() => {
   dispatch(getItemDetails(id))
   if (error){
     alert.error(error);
     dispatch(fixErrors())
   }

  }, [dispatch, alert, error, id])

  const increaseQty = () => {
     const contador = document.querySelector('.count')

     if (contador.valueAsNumber>=item.stock) return;

     const qty = contador.valueAsNumber+1;
     setQuantity(qty)
  }

  const decreaseQty = () => {
   const contador = document.querySelector('.count')

   if (contador.valueAsNumber <= 1) return;

   const qty = contador.valueAsNumber-1;
   setQuantity(qty)
}

 return (
  <Fragment>
   {loading ? <i className="fa fa-spinner fa-spin fa-3x fa-fw" aria-hidden="true"></i> :(
     <Fragment>
     <MetaData title={item.name}></MetaData>
     <div className='row d-flex justify-content-around'>
         <div className='col-12 col-lg-5 img-fluid' id="image_item">
             <Carousel pause='hover'>
               {item.image && item.image.map(img =>(
                 <Carousel.Item key={img.public_id}>
                   <img className="d-block w-100" src={"../"+img.url} alt={item.name}></img>
                 </Carousel.Item>
               ))}
             </Carousel>
         </div>

         <div className='col-12 col-lg-5 mt-5'>
             <h3>{item.name}</h3>
             <p id="item_id">item's Id {item._id}</p>
             <hr />

             <div className='rating-outer'>
               <div className="rating-inner" style={{width: `${(item.qualification/5)*100}%`}}></div>
             </div>
             <span id="No_de_reviews">  ({item.qualificationsNumber} Reviews)</span>
             <hr />
             <p id="Item's price">${item.price}</p>
             <div className="stockCounter d-inline">
               <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>
               <input type="number" className="form-control count d-inline" value={quantity} readOnly/>
               <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
             </div>
             <button type="button" id="carrito_btn" className="btn btn-primary d-inline ml-4" disabled={item.stock===0}>Add to Cart</button>
             <hr />
             <p>State: <span id="stock_state" className={item.stock>0 ? 'greenColor':'redColor'}>{item.stock>0 ? "In Stock": "Finished"}</span></p>
             <hr />
             <h4 className="mt-2">Description:</h4>
             <p>{item.description}</p>
             <hr />
             <p id="seller">Selling by : <strong>{item.seller}</strong></p>
             <button id="btn_review" type="button" className="btn btn-primary mt-4" 
             data-toggle="modal" data-target="#ratingModal">Leave your opinion</button>
             <div className="alert alert-danger mt-5" type="alert">Login for give a review</div>
         
             {/*Mensaje emergente para dejar opinion y calificacion*/}
             <div className="row mt-2 mb-5">
               <div className="rating w-50">
                 <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog"
                 aria-labelledby='ratingModalLabel' aria-hidden="true">
                   <div className="modal-dialog" role="document">
                     <div className="modal-content">
                       <div className="modal-header">
                         <h5 className="modal-title" id="ratingModalLabel">Send Review</h5>
                         <button type="button" className='close' data-dismiss="modal" aria-label='Close'>
                           <span aria-hidden="true">&times;</span>
                         </button>
                       </div>
                       <div className="modal-body">
                         <ul className="stars">
                           <li className="star"><i className="fa fa-star"></i></li>
                           <li className="star"><i className="fa fa-star"></i></li>
                           <li className="star"><i className="fa fa-star"></i></li>
                           <li className="star"><i className="fa fa-star"></i></li>
                           <li className="star"><i className="fa fa-star"></i></li>
                         </ul>

                         <textarea name="review" id="review" className="form-control mt3"></textarea>

                         <button className="btn my-3 float-right review-btn px-4 text-white" 
                         data-dismiss="modal" aria-label="Close">Send</button>
                       
                       </div>
                     </div>
                   </div>

                 </div>
               </div>
             </div>
         </div>
     </div>
 </Fragment>
   )}
  </Fragment>
   
 )
}
export default ItemDetails;