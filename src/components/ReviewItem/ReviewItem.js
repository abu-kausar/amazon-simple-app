import React from 'react';
import './ReviewItem.css'

const ReviewItem = (props) => {
    console.log(props);
    const {img, name, quantity, key, price} = props.product;
    return (
        <div className='review-item'>
            <img src={img} alt="" />
            <h4>{name}</h4>
            <p>Quantity: {quantity}</p>
            <p><small>Price: ${price}</small></p>
            <br />
            <button onClick={()=> props.removeProduct(key)} className='yellow-btn'>Remove item</button>
        </div>
    );
};

export default ReviewItem;