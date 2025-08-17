import React, { useState } from 'react'

const Header = ({ cartItems, toggleCart }) => {

  const navLinks = [
    { name: 'Collections', href: '#' },
    { name: 'Men', href: '#' },
    { name: 'Women', href: '#' },
    { name: 'About', href: '#' },
    { name: 'Contact', href: '#' }
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState('Women');

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  const handleActiveLink = (link) => {
    setActive(link);
  }

  const cartIcon = () => {
    return (
      <div className="relative group" aria-hidden="true">
        <svg
          width="22"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          className="block"
          focusable="false"
        >
          <path
            d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
            className="fill-[#69707D] group-hover:fill-black"
            fillRule="nonzero"
          />
        </svg>
        {totalQuantity > 0 && (
          <span className="cart-pill" aria-label={`${totalQuantity} items in cart`}>
            {totalQuantity}
          </span>
        )}
      </div>
    )
  }


  const renderLinks = () => {
    return navLinks.map((navLink, index) => (
      <li key={index}>
        <a 
          href={navLink.href}
          onClick={() => handleActiveLink(navLink.name)}
          className={active === navLink.name ? 'active' : ''}
        >
          {navLink.name}
        </a>
      </li>
    ));
  }

  const renderButtons = () => {
    return <>
            <button type="button" onClick={toggleCart} aria-label="Open shopping cart">
              {cartIcon()}
            </button>
            <button type="button" aria-label="User profile" >
              <img 
                src="./images/image-avatar.png" 
                alt="Avatar" 
                className="avatar-button" 
                aria-hidden="true"
              />
            </button>
          </>   
  }

  return (
    <header>
      <nav aria-label="Primary">

        {/* Mobile Nav */}
        <div className="header-mobile">
          <div>
            <button 
              type="button" 
              aria-expanded={isOpen}
              aria-controls="mobile-menu" 
              onClick={toggleMenu} 
              aria-label="Toggle mobile navigation menu"
            >
              <img src="images/icon-menu.svg" alt="Menu Icon" aria-hidden="true" />
            </button>
            <img src="images/logo.svg" alt="Sneakers Logo" />
          </div>
          <div className='space-x-2'>
            {renderButtons()}
          </div>
        </div>

        {isOpen && (
          <div className='nav-drawer' role="dialog" aria-modal="true">
            <div className='main-drawer'>
              <button type="button" onClick={toggleMenu} className="mb-10" aria-label="Close mobile navigation menu">
                <img src="images/icon-close.svg" alt="Close Icon" aria-hidden="true" />
              </button>
              <ul>
                {renderLinks()}
              </ul>
            </div>
          </div>
        )}
        

        {/* Desktop Navigation */}
        <div className="nav-desktop">
          <div className="links-group">
            <a href="#" aria-label="Go to homepage">
              <img src="images/logo.svg" alt="Sneakers Logo" />
            </a>
            <ul>
              {renderLinks()}
            </ul>
          </div>
          <div className='button-group'>
            {renderButtons()}
          </div>
        </div>

      </nav>
    </header>
  )
}

export default Header