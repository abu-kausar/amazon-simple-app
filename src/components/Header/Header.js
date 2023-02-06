import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './Header.css';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div className='header'>
            <nav>
                <h2>Amazon</h2>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/manage">Manage</Link>
                <button onClick={() => setLoggedInUser({})}>Sign Out</button>
            </nav>
        </div>
    );
};

export default Header;