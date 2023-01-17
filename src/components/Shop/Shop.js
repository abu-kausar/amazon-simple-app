import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import './Shop.css';
import '../Cart/Cart'
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/fakedb.js';

const Shop = () => {
    const firstSlot = fakeData.slice(0,10);
    const [products, setProducts] = useState(firstSlot);
    const [cart, setCart] = useState([]);

    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKeys =  Object.keys(savedCart);
        const existingCart = productKeys.map(existingPrductKey=>{
            const product = fakeData.find(pd=> pd.key === existingPrductKey);
            product.quantity = savedCart[existingPrductKey];
            return product;
        })
        setCart(existingCart);
    },[]);

    const handleAddProduct = (product) =>{
        const sameProduct = cart.find(pd=>pd.key ===product.key);
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity+1;
            sameProduct.quantity = count;
            const otherProduct = cart.filter(pd=>pd.key !== product.key);
            newCart = [...otherProduct, sameProduct];
        }else{
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);

        addToDatabaseCart(product.key, count);
    }

    return (
        <div className='shop-container'>
            <div className="product-container">
                {
                    products.map(pd => <Product key={pd.key} showButton={true} handleAddProduct={handleAddProduct} product={pd}></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review">
                        <button className='yellow-btn'>Review your cart</button>
                    </Link>  
                </Cart>
            </div>
        </div>
    );
};

export default Shop;