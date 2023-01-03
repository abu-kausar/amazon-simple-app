import React, { useState } from 'react';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import './Shop.css';
import '../Cart/Cart'
import Cart from '../Cart/Cart';

const Shop = () => {
    const firstSlot = fakeData.slice(0,10);
    const [products, setProducts] = useState(firstSlot);
    const [cart, setCart] = useState([]);

    const handleAddProduct = (product) =>{
        const newCart = [...cart, product];
        setCart(newCart);
    }

    console.log(fakeData);
    return (
        <div className='shop-container'>
            <div className="product-container">
                {
                    products.map(pd => <Product 
                        handleAddProduct={handleAddProduct} 
                        product={pd}>
                        </Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;