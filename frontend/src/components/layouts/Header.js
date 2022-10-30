import React, {Fragment} from 'react'
import "../../App.css"
import { Link } from "react-router-dom"

const Header = () => {
  return (
    <Fragment>
    
            <nav className="navbar row ">
                <div className="col-12 col-md-3">
                    <div className="navbar-brand">
                            <img src="./images/mouse.png" alt="Enterprise's Logo"/>
                    </div>
                </div>

                <div className='col-12 col-md-6 mt-2 mt-md-0'>
                    <div className="input-group">
                        <input
                            type="text"
                            id="search_field"
                            className="form-control"
                            placeholder='What kind of product are you looking for?'></input>
                        <div className="input-group-append">
                            <button id="search-btn" className="btn">
                                <i className="fa fa-search fa-2x text-white" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </div>


                <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                    <div className="ml-4 dropdown d-inline">
                        <Link to="#!" className="btn dropdown-toggle text-white mr-4" type="button"
                            id="dropDownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span>Control Panel</span></Link>
                        <div className='dropdown-menu' aria-labelledby='dropDownMenu'>
                            <Link className="dropdown-item" to="/dashboard">Manage items</Link>
                            <Link className="dropdown-item" to="/">Orders</Link>
                            <Link className="dropdown-item" to="/">My Account</Link>
                            <Link className="dropdown-item" to="/">Log Out</Link>
                        </div>
                    </div>

                    <Link to="/cart"><i className="fa fa-shopping-cart fa-2x text-white" aria-hidden="false"></i>
                        <span className="ml-1" id="cart_count"></span></Link>
                </div>

            </nav>
        </Fragment>
  )
}

export default Header