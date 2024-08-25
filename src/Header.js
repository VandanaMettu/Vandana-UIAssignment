import React from 'react';
import './Header.css'

/**
 * @component {Header} - which displays the Header
 * @returns returns the JSX code whichh has Header details
 */
const Header= ()=>{
    return (
        <header className="header">
            <div className='container'>
            <h1>Retail App</h1>
        </div>
        </header>
        
    );
}

export default Header;