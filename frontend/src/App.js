
import './App.css';
import React from 'react';
import Header from './components/layouts/Header';
import { Footer } from './components/layouts/Footer';
import { Home } from './components/Home';
import ItemDetails from './components/items/ItemDetails';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
      <Header />
      <div className='container container-fluid'>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/Home" element={<Home />}/>
            <Route path="/items/:id" element={<ItemDetails />}/>
          </Routes>
        </div>
      <Footer />
    </div>
    </Router>
  );
}
export default App;
