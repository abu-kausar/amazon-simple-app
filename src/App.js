import React, { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Review from './components/Review/Review';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Manage from './components/Manage/Manage';
import Shipment from './components/Shipment/Shipment';
import Login from './components/Login/Login';
import { createContext } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <h2>{loggedInUser.email}</h2>
      <Header></Header>
      <Router>
        <Routes>
          <Route exact path="/" element={<Shop/>}/>
          <Route exact path="/shop" element ={<Shop/>}/>
          <Route exact path="/review" element={<Review/>}/>
          <Route exact path="/manage" element={<PrivateRoute/>}>
            <Route exact path="/manage" element={<Manage/>}/>
          </Route>
          <Route exact path="/shipment" element={<PrivateRoute/>}>
            <Route exact path="/shipment" element={<Shipment/>}/>
          </Route>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/product/:key" element={<ProductDetail/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
