import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Product = (props) => {
    const { product, handleAddProduct } = props;
    const {img, name, seller, price, stock, key} = product;
    return (
        <div className='product'>
            <div>
                <img src={img} alt=""/>
            </div>
            <div className='product-name'>
                <h4><Link to={"/product/"+key}>{name}</Link></h4> 
                <br/>
                <p><small>Seller: {seller}</small></p>
                <p><strong>${price}</strong></p>
                <p><small>Only {stock} items left. Grab fast.</small></p>
                { props.showButton && <button 
                    className='yellow-btn' 
                    onClick={()=>handleAddProduct(product)}>
                        <FontAwesomeIcon icon={faCartShopping} /> Add to Cart
                </button>}
            </div>       
        </div>
    );
};

export default Product;