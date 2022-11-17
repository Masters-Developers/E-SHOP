import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../layouts/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingInfo } from '../../actions/cartActions';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from './CheckOutSteps';

export const Shipping = () => {
    let Country = require('./Colombia.json');
    const navigate= useNavigate()
    const { shippingInfo } = useSelector(state => state.cart)
    const [adress, setAdress] = useState(shippingInfo.adress)
    const [city, setCity] = useState(shippingInfo.city)
    const [phone, setPhone] = useState(shippingInfo.phone)
    const [department, setDepartment] = useState(shippingInfo.department)
    const [cities, setCities]= useState([])
    useEffect(()=>{
      Country.forEach((depar)=>{
        if (depar.department===department){
            setCities(depar.cities)
        }
      })
    })
    const dispatch= useDispatch();
    const submitHandler= (e)=>{
        e.preventDefault()
        dispatch(saveShippingInfo({adress, city, phone, department}))
        navigate("/order/confirm")
    }
    return (
        <Fragment>

            <MetaData title={'Send Information'} />
            <CheckoutSteps shipping />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onClick={submitHandler}>
                        <h1 className="mb-4">Send Information</h1>
                        <div className="form-group">
                            <label htmlFor="address_field">Adress</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                                value={adress}
                                onChange={(e) => setAdress(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone_field">Phone</label>
                            <input
                                type="phone"
                                id="phone_field"
                                className="form-control"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="country_field">Department</label>
                            <select
                                id="country_field"
                                className="form-control"
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                                required
                            >

                                {Country.map(dep => (
                                    <option key={dep.department} value={dep.department}>
                                        {dep.department}
                                    </option>
                                ))}

                            </select>


                            <div className="form-group">
                                <label htmlFor="city_field">City</label>
                                <select
                                    id="city_field"
                                    className="form-control"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    required
                                >
                                    {cities.map(city => (
                                        <option key={city} value={city}>
                                            {city}
                                        </option>
                                    ))}
                                   

                                </select>
                            </div>
                        </div>

                        <button
                            id="shipping_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            Continue
                        </button>
                    </form>
                </div>
            </div>

        </Fragment>
    )
}

