import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetail = () => {
    const {key} = useParams();
    const product = fakeData.find(pd=>pd.key === key);
    // const {name, img, price, stock, seller} = product;
    console.log(product);
    return (
        <div>
            <Product showButton={false} product={product}></Product>
            {/* <img src= {img} alt="" />
            <h4>{name}</h4>
            <h4>Price: ${price}</h4>
            <p>Items left: {stock}</p>
            <p>Seller: <strong>{seller}</strong></p> */}
        </div>
    );
};

export default ProductDetail;