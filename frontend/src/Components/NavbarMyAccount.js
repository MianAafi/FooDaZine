import React from 'react';
import '../Components/Css/NavbarMyAccount.css';
import { Link, useNavigate } from 'react-router-dom';

function NavbarMyAccount(props) {
  // const auth = localStorage.getItem('user');

  const navigate = useNavigate();

  const logout = () => {
    const allData = localStorage.getItem('token');
    let tokenData = allData ? JSON.parse(allData) : null;
    if (tokenData) {
      const name = tokenData.name.trim();
      const slug = name.toLowerCase().replace(/\s+/g, '-');
      tokenData.slug = slug; // update the slug value in the tokenData object
      localStorage.setItem('token', JSON.stringify(tokenData)); // save the updated tokenData in local storage
      const url = `/${slug}`;
      console.log('Redirecting to:', url);
      navigate(url);
    } else {
      console.log('No token found in local storage.');
      navigate('/');
    }
    localStorage.clear();
  };

  // const logout = () => {
  //   const allData = localStorage.getItem('token');
  //   const slug = allData ? JSON.parse(allData).slug : null; // extract the slug value from allData
  //   if (slug) {
  //     const url = `/${slug}`;
  //     console.log('Redirecting to:', url);
  //     navigate(url);
  //   } else {
  //     console.log('No slug found in local storage.');
  //     navigate('/');
  //   }
  //   localStorage.clear();
  // };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
        <div className="container-fluid ">
          <form className="d-flex   ">
            <Link className="Logo" to="/">
              <img
                src="https://res.cloudinary.com/dffcfqugk/image/upload/v1674643346/logo_acnpid.png"
                alt="Logo"
              ></img>
            </Link>
          </form>
          <li className="nav-item dropdown">
            <div className="dropdown">
              <div
                className="dropdown-toggle dropdown-btn"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fa-solid fa-user fa-lg" /> My account
              </div>
              <div className="dropdown-menu bg-dark">
                {/* <Link className="dropdown-item myAccNav" to="/menu">
                  Menu
                </Link> */}
                {/* <Link className="dropdown-item myAccNav" href="/profile/update">
                  Account Update
                </Link> */}
                <button className="dropdown-item myAccNav" onClick={logout}>
                  Sign out
                </button>
              </div>
            </div>
          </li>
        </div>
      </nav>
    </div>
  );
}

export default NavbarMyAccount;
