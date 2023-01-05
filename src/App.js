import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Review from './components/Review/Review';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';

function App() {
  return (
    <div>
      <Header></Header>
      <Router>
        <Switch>
          <Route exact path="/shop" element={<Shop/>}>
            <Shop></Shop>
          </Route>
          <Route exact path="/review" element={<Review/>}>
            <Review></Review>
          </Route>
          <Route exact path="/manage">
            <h2>Coming soon..</h2>
          </Route>
          <Route exact path="/">
            <Shop></Shop>
          </Route>
          <Route exact path="/product/:productKey">
            <ProductDetail></ProductDetail>
          </Route>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
