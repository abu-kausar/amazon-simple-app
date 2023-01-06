import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Review from './components/Review/Review';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Manage from './components/Manage/Manage';

function App() {
  return (
    <div>
      <Header></Header>
      <Router>
        <Routes>
          <Route exact path="/shop" element ={<Shop/>}/>
          <Route exact path="/review" element={<Review/>}/>
          <Route exact path="/manage" element={<Manage/>}/>
          <Route exact path="/" element={<Shop/>}/>
          <Route exact path="/product/:key" element={<ProductDetail/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
