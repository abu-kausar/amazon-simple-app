import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const handlePlaceHolder = () => {
        setCart([]);
        setOrderPlaced(true);
        processOrder();
    }

    const removeProduct = (key) => {
        const newCart = cart.filter(pd=> pd.key !== key);
        setCart(newCart);
        removeFromDatabaseCart(key);
    }
    useEffect(()=> {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        const cartPrducts = productKeys.map(key => {
            const product = fakeData.find(pd=>pd.key===key);
            product.quantity = savedCart[key];
            return product;
        });

        setCart(cartPrducts);
    }, []);

    return (
        <div className='shop-container'>
            <div className="product-container">
                {
                cart.map(pd=><ReviewItem key={pd.key} removeProduct={removeProduct} product={pd}></ReviewItem>)
                }
                {
                    orderPlaced && <h1>Thanks for placing order.</h1>
                }
            </div>
            <div className='cart-container'>
                <Cart cart={cart}>
                    <button onClick={handlePlaceHolder} className='yellow-btn'>Place Order</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;