import React, { useState } from 'react';
import { FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { MdLanguage } from 'react-icons/md';
import { FaChevronDown } from 'react-icons/fa';
import '../../styles/nav.css';
import CartProducts from '../cart/CartProducts';
import { Link } from "react-router-dom";


interface NavItem{
    id: number;
    title: string;
    href:string;
    hasDropdown?:boolean
}

const Navbar: React.FC = () => {

    const [navItems] = useState<NavItem[]>([
        { id: 1, title: 'Home', href: '#' },
        { id: 2, title: 'Shop', href: '#', hasDropdown: true },
        { id: 3, title: 'Track order', href: '#' },
        { id: 4, title: 'Contact', href: '#' }
    ])

  const [navOpen, setNavOpen] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);


  const handleToggleNav = () => {
    setNavOpen(!navOpen);

    if (navOpen) setDropdownOpen(false);
  };
  const handleToggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleToggleCart = () =>{
    setCartOpen(!cartOpen);
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="nabvar-logo">Wave fashion <br /> </h1>
        <ul className={`nav-menu ${navOpen ? 'active' : ''}`}>
            {
            // if item is not drop down then or if yes then
            // if dropdown title is shop then or !
            navItems.map((item)=>(
                !item.hasDropdown? 
                <li key={item.id} className="nav-item"><a href="#">{item.title}</a></li> 
                : 
                <li key={item.id} className="nav-item dropdown">
                <a href="#" onClick={handleToggleDropdown}>
                  {item.title} 
                </a>

                
                <FaChevronDown size={12} />
                
                {item.title === "Shop" ? 
                <ul className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
                  <Link to = {`/allProducts`}><li><a href="#">Women</a></li> </Link>
                  <li><a href="#">New Arrival</a></li>
                  <li><a href="#">Sale</a></li>
                </ul>:null}
                </li>

            ))
        }
          <li className="nav-item language">
            <MdLanguage />
            <span>Nepali</span>
          </li>
          <li className="nav-item">
            <FaUser />
          </li>
          <li className="nav-item">
            <FaShoppingCart onClick={handleToggleCart} />
          </li>

          <div className={`cart-modal ${cartOpen ? 'open' : ''}`}>
                {/* Content of the cart modal */}
                <div className="cart-header">
                <h2>SHOPPING CART <span className="cart-count">0</span></h2>
                <FaTimes onClick={handleToggleCart} />
                </div>
                
                <p>No products in the cart.</p>
                <CartProducts />
                <button>Continue Shopping</button>
        </div>
        </ul>
        <div className={`hamburger ${navOpen ? 'open' : ''}`} onClick={() => handleToggleNav()}>
      {navOpen ? <FaTimes /> : <FaBars />}
    </div>
      </div>
    </nav>
  );
};

export default Navbar;
