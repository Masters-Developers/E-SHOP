
import './App.css';
import React, { useEffect } from 'react';
import Header from './components/layouts/Header';
import { Footer } from './components/layouts/Footer';
import { Home } from './components/Home';
import shop from "./Shop"
import ItemDetails from './components/items/ItemDetails';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewItem from './components/management/NewItem';
import DashBoard from './components/management/Dashboard';
import ItemsList from './components/management/ItemsList';
import Cart from './components/cart/Cart';
import { Login } from './components/user/Login';
import { Registration } from './components/user/Registration';
import { loadUser } from './actions/userActions';
import { Profile } from './components/user/Profile';
import ProtectedRoute from './routes/ProtectedRoute';
import { UpdateProfile} from "./components/user/UpdateProfile"
import { UpdatePassword } from './components/user/UpdatePassword';
import { ForgotPassword } from "./components/user/ForgotPassword"
import { NewPassword } from './components/user/NewPassword';
import {UpdateItem} from './components/management/UpdateItem';
import { Shipping } from './components/cart/Shipping';
import { ConfirmOrder } from './components/cart/ConfirmOrder';
import { Payment } from './components/cart/Payment';
import { Success } from './components/cart/Succes'
function App() {
  useEffect(()=>{
    shop.dispatch(loadUser());
   },[])
 
  return (
    <Router>
    <div className="App">
      <Header />
      <div className='container container-fluid'>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/Home" element={<Home />}/>
            <Route path="/items/:id" element={<ItemDetails />}/>
            <Route path="/dashboard" element={<DashBoard />}/>
            <Route path="/itemslist" element={<ItemsList />}/>
            <Route path="/newitem" element={<NewItem />}/>
            <Route path="/search/:keyword" element={<Home />}/>
            <Route path="/cart" element={<Cart />}/>
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/myprofile" element={<Profile />}/>
            <Route path="/myprofile/update" element={<UpdateProfile />}/>
            <Route path="/password/update" element={<UpdatePassword />}/>
            <Route path="/password/forgot" element={<ForgotPassword />}/>
            <Route path="/resetPassword/:token" element={<NewPassword />}/>
            <Route path="/shipping" element={<Shipping/>}/>
            <Route path="/order/confirm" element={<ConfirmOrder />}/>
            <Route path="/payment" element={<Payment />} />
            <Route path="/success"element={<Success />} />
            {/*Protected Route*/}
            <Route path="/dashboard" 
            element={<ProtectedRoute isManagement={true}><DashBoard /></ProtectedRoute>}/>
            <Route path="/updateItem/:id"
              element={<ProtectedRoute isManagement={true}><UpdateItem /></ProtectedRoute>} />
              {/*<Route path="/shipping"
              element={<ProtectedRoute><Shipping /></ProtectedRoute>} />
              <Route path="/order/confirm"
              element={<ProtectedRoute><ConfirmOrder /></ProtectedRoute>} />
              <Route path="/payment"
              element={<ProtectedRoute><Payment /></ProtectedRoute>} />
              <Route path="/success"
              element={<ProtectedRoute><Success /></ProtectedRoute>} />*/}
          </Routes>
        </div>
      <Footer />
    </div>
    </Router>
  );
}
export default App;
