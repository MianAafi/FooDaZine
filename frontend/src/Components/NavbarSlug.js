import React from 'react';
import '../Components/Css/NavbarMyAccount.css';
import { Link } from 'react-router-dom';

function NavbarMyAccount(props) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
        <div className="container-fluid ">
          <form className="d-flex">
            <Link className="Logo" to="/">
              <img
                src="https://res.cloudinary.com/dffcfqugk/image/upload/v1674643346/logo_acnpid.png"
                alt="Logo"
              ></img>
            </Link>
          </form>
        </div>
      </nav>
    </div>
  );
}

export default NavbarMyAccount;
