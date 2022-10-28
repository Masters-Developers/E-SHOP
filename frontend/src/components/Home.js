
import React, { Fragment, useEffect } from  "react";
import {MetaData} from "./layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getItems } from "../actions/ItemsActions";
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';


export const Home = () => {
    const { loading, items, error} = useSelector( state => state.items)
    const alert = useAlert();
    const dispatch = useDispatch();
    useEffect(() => {
        if (error){
            return alert.error(error)
        }
        dispatch(getItems());
        alert.success("Welcome to Mouse E Shop")
    },[dispatch,error,alert])
    return (
        <Fragment>
            {loading ? <i className="fa fa-spinner fa-spin fa-3x fa-fw" aria-hidden="true"></i> :(
            <Fragment>
                    <MetaData title="MOUSE E SHOP"></MetaData>
                    <h1 id="Header_items">New items</h1>
                    <section id="items" className='container mt-5'>
                        <div className='row'>
                            {items && items.map (item => (
                                <div key={item._id} className='col-sm-12 col-md-6 col-lg-3 my-3'>
                                    
                                    <div className='card p-3 rounded'>
                                        <img className='card-img-top mx-auto' src={item.image[0].url} alt={item.image[0].public_id}></img>
                                        <div className='card-body d-flex flex-column'>
                                            <h5 id="title_item"><Link to={`/items/${item._id}`}>{item.name}</Link></h5>
                                        <div className='rating mt-auto'>
                                            <div className='rating-outer'>
                                                <div className='rating-inner' style={{width: `${(item.qualification/5)*100}%`}}></div>
                                            </div>
                                            <span id="qualifications"> {item.qualificationsNumber} Reviews</span>
                                        </div>
                                        <p className='card-text'>${item.price}</p><Link to={`/items/${item._id}`} id="view_btn" className='btn btn-block'>
                                            View Details
                                        </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
            </Fragment>
            )}
        </Fragment>
    )
}
export default Home;