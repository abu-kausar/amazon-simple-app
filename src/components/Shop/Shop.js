import React, { useState } from 'react';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import './Shop.css';
import '../Cart/Cart'
import Cart from '../Cart/Cart';
import { addToDatabaseCart } from '../../utilities/fakedb.js';

const Shop = () => {
    const firstSlot = fakeData.slice(0,10);
    const [products, setProducts] = useState(firstSlot);
    const [cart, setCart] = useState([]);

    const handleAddProduct = (product) =>{
        const newCart = [...cart, product];
        setCart(newCart);

        const sameProduct = newCart.filter(pd=>pd.key ===product.key)
        const count = sameProduct.length;
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
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;