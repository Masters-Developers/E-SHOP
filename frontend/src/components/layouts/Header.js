import React, {Fragment} from 'react'
import "../../App.css"

const Header = () => {
  return (
    <Fragment>
    
            <nav className="navbar row fw-bold">
                <div className="col-12 col-md-3">
                    <div className="navbar-brand">
                            <img src="./images/ULTIMATELOGO.png" alt="Enterprise's Logo"/>
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


                <div className="col-12 col-md-3 mt-4 mt-md-0 text-center fw-bold">
                    <span><button className='btn fw-bold' id="login_btn"><strong>Log In</strong></button></span>
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    <i className="fa fa-shopping-cart fa-2x text-white" aria-hidden="false"></i>
                    <span className="ml-1" id="cart_count">0</span>
                </div>

            </nav>
        </Fragment>
  )
}

export default Header