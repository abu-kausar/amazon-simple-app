import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCartShopping } from '@fortawesome/free-solid-svg-icons'

const Product = (props) => {
    const {img, name, seller, price, stock} = props.product;
    return (
        <div className='product'>
            <div>
                <img src={img} alt=""/>
            </div>
            <div className='product-name'>
                <h4>{name}</h4> 
                <br />
                <p><small>Seller: {seller}</small></p>
                <p><strong>${price}</strong></p>
                <p><small>Only {stock} items left. Grab fast.</small></p>
                <button className='yellow-btn' onClick={()=>props.handleAddProduct(props.product)}><FontAwesomeIcon icon={faCartShopping} /> Add to Cart</button>
            </div>       
        </div>
    );
};

export default Product;