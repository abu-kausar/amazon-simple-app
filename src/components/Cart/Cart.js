import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    // const totalProductPrice = cart.reduce((totalProductPrice, pd) => totalProductPrice+pd.price, 0);

    let totalProductPrice = 0;
    for(let i=0; i<cart.length;i++){
        const pd = cart[i];
        totalProductPrice += pd.price * pd.quantity;
    }

    let shippingCost = 0;
    if(totalProductPrice>100){
        shippingCost = 0;
    }else if(totalProductPrice>50){
        shippingCost = 4.99;
    }else if(totalProductPrice>0){
        shippingCost = 9.99;
    }

    const vat  = totalProductPrice / 10;
    const grandTotal = (totalProductPrice + shippingCost + Number(vat)).toFixed(2);

    const formatNumber = num =>{
        const precision = num.toFixed(2);
        return Number(precision);
    }

    return (
        <div>
            <h4>Order Summary</h4>
            <p>Items ordered: {cart.length}</p>
            <p>Price: ${formatNumber(totalProductPrice)}</p>
            <p>Vat: ${vat}</p>
            <p>Shipping Cost: ${shippingCost}</p>
            <p>Total: ${grandTotal}</p>   
            {
                props.children
            }   
        </div>
    );
};

export default Cart;