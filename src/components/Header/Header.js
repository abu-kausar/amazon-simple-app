import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <div className='header'>
            <nav>
                <h2>Amazon</h2>
                <a href="/shop">Shop</a>
                <a href="/review">Order Review</a>
                <a href="/manage">Manage</a>
            </nav>
        </div>
    );
};

export default Header;