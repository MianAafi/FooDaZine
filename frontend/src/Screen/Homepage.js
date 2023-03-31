import React from 'react';
import '../Components/Css/Homepage.css';
import Navbar from '../Components/Navbar.js';
import LoginYourAccount from '../Components/LoginYourAccount.js';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
function Homepage() {
  const navigate = useNavigate();
  function register() {
    navigate('/register');
  }

  return (
    <div>
      <Navbar />
      <div className="row Header">
        <div className="col-md-5 col-sm-10">
          <h1 className="Heading">
            Let's Create your own <br />
            stunning <span className="header-h1">Restaurant Menu</span>
          </h1>
          <h2 className="Header2">
            Let's Register now it's <span className="header-h1">Free</span>
          </h2>
          <p className="Header-p">
            Lorem Ipsum is simply dummy text of the printing and <br />
            typesetting industry. Lorem Ipsum has been the industry’s
            <br />
            standard dummy text ever since the 1500s.
          </p>
          <button onClick={register} className="Header-btn">
            Register now
          </button>
        </div>

        <div className="col-md-5 col-sm-10 Header-img">
          <img src=".\images\slider-img.png" alt="slider-img"></img>
        </div>
      </div>
      <div className="row AboutOurServices">
        <div className="col-lg-4  col-md-5  ">
          <h1 className="AboutService">About our Services</h1>
          <div className="divider"></div>

          <p className="Paragraph">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry’s standard dummy text
            ever since the 1500s.Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has been the
            industry’s standard dummy text ever since the 1500s.
            <br />
            <br />
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry’s standard dummy text
            ever since the 1500s.Lorem Ipsum is simply dummy text of the
            printing and typesetting.
          </p>

          <span class="button-text">Learn more</span>
        </div>

        <div className="col-lg-4 col-md-5 col-sm-12 Header-img" id="Header-img">
          <img src=".\images\illustration-1.png" alt="slider-img"></img>
        </div>
      </div>
      <div className="row RegisterScanQr">
        <div className="col-lg-5 col-md-5  RegisterQr-img">
          <img src=".\images\illustration-2.png" alt="slider-img"></img>
        </div>

        <div className="col-lg-4  col-md-5 ">
          <h1 className="RegisterScanQr-h1">Register &amp; Scan qr</h1>
          <div className="divider"></div>

          <p className="ParagraphRegister">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry’s standard dummy text
            ever since the 1500s.Lorem Ipsum is simply dummy text of the
            printing and typesetting industry.
            <br />
            <br /> Lorem Ipsum has been the industry’s standard dummy text ever
            since the 1500s. Lorem Ipsum is simply dummy text of the printing
            and typesetting industry.
          </p>
          <span class="button-text">Learn more</span>
        </div>
      </div>
      <div className="row CreateMenu">
        <div className="col-lg-4  col-md-5 ">
          <h1 className="CreateYourMenu-h1">Create your menu</h1>
          <div className="divider"></div>
          <p className="CreateYourMenu-p">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry’s standard dummy text
            ever since the 1500s.Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has been the
            industry’s standard dummy text ever since the 1500s.
            <br /> <br />
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>

          <span class="button-text">Learn more</span>
        </div>

        <div className="col-lg-5 col-md-5 Header-img" id="Header-img">
          <img src=".\images\Group-132.png" alt="slider-img"></img>
        </div>
      </div>
      <LoginYourAccount /> <Footer />
    </div>
  );
}

export default Homepage;
