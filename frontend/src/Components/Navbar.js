import React, { useState } from 'react';
import './Css/Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuLinkClick = () => {
    setMenuOpen(false);
  };

  function handleLinkClick() {
    window.scrollTo(0, document.body.scrollHeight);
  }
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark ">
        <div class="container-fluid ">
          <form class="d-flex   ">
            <Link className="Logo" to="/">
              <img
                src="https://res.cloudinary.com/dffcfqugk/image/upload/v1674643346/logo_acnpid.png"
                alt="Logo"
              ></img>
            </Link>
          </form>
          <div class="iner_menu11 fgf">
            <Link class="nav-link active" aria-current="page" to="/register">
              Register
            </Link>
            <span> / </span>
            <Link
              class="nav-link active me-5"
              onClick={handleLinkClick}
              aria-current="page"
              to="/"
            >
              Log in
            </Link>
          </div>
          <button
            class="navbar-toggler"
            type="button"
            onClick={handleMenuToggle}
          >
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>

      <div
        class={`collapse navbar-collapse me-auto mb-xl-0 menu_bt ${
          menuOpen ? 'show' : ''
        }`}
        id="navbarTogglerDemo03"
      >
        <div class="overlay_bg" onClick={handleMenuToggle}></div>
        <ul class="navbar-nav me-auto mb-xl-0">
          <li class="nav-item"></li>
        </ul>
        <div class="iner_menu fgf text-center ">
          <div class="crose " onClick={handleMenuToggle}>
            <span className="mb-4"> X </span>
          </div>
          <Link
            class="nav-link active text-dark"
            aria-current="page"
            to="register"
            onClick={handleMenuLinkClick}
          >
            Register
          </Link>
          <span className="text-dark"> / </span>
          <Link
            class="nav-link active text-dark"
            aria-current="page"
            to="/"
            onClick={() => {
              handleMenuLinkClick();
              handleLinkClick();
            }}
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
