import React, { useEffect, useState } from 'react';
import './Css/FoodDescription.css';
import Footer from '../Screen/Footer';
import { Link, useParams } from 'react-router-dom';
import Modal from '../Components/test/Modal';
import '../Components/test/Test.css';
import NavbarSlug from './NavbarSlug';
import instance from '../api/instance';
function DescriptionSlug() {
  const [clickedImg, setClickedImg] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [items, setItems] = useState({});
  const { id } = useParams();
  useEffect(() => {
    instance
      .get(`/items/api/items/${id}`)
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleClick = (image, index) => {
    console.log(image);
    setCurrentIndex(index);
    setClickedImg(image[0].url);
  };

  const handelRotationRight = () => {
    console.log('right cick');
    const totalLength = items?.gallery.length;
    if (currentIndex + 1 >= totalLength) {
      setCurrentIndex(0);
      const newUrl = items?.gallery[0];
      setClickedImg(newUrl[0].url);
      return;
    }
    const newIndex = currentIndex + 1;
    console.log(items?.gallery);
    const newUrl = items?.gallery.find((image, index) => {
      return index === newIndex;
    });
    console.log(newUrl);
    // const newItem = newUrl[0];
    setClickedImg(newUrl[0].url);
    setCurrentIndex(newIndex);
  };

  const handelRotationLeft = () => {
    const totalLength = items?.gallery.length;
    if (currentIndex === 0) {
      console.log('reach maximum');
      setCurrentIndex(totalLength - 1);
      const newUrl = items?.gallery[totalLength - 1][0].url;
      setClickedImg(newUrl);
      return;
    }
    const newIndex = currentIndex - 1;
    const newUrl = items?.gallery.find((image, index) => {
      return index === newIndex;
    });
    console.log(newUrl);
    // const newItem = newUrl[0].url;
    setClickedImg(newUrl[0].url);
    setCurrentIndex(newIndex);
  };

  const handleMenuClick = (event) => {
    event.preventDefault();
    window.history.back();
  };

  const galleryImages = items?.gallery || [];
  const headingStyle = galleryImages.length > 0 ? {} : { display: 'none' };
  return (
    <div>
      <NavbarSlug />
      <div className="container-fluid m-0 p-0">
        <div className="row product-description m-0">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb" style={{ marginLeft: '10px' }}>
              <li className="breadcrumb-item ml-2">
                <a href="#" onClick={handleMenuClick}>
                  Menu Page
                </a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Description
              </li>
            </ol>
          </nav>
          <div className="col-sm-6 col-xs-12 image">
            <img alt="ingredients" src={items?.image?.url}></img>
          </div>
          <div className=" col-sm-6 col-12 Description">
            <h1 className="Food-name" style={{ textTransform: 'capitalize' }}>
              {items?.Name}
            </h1>
            <h3 className="Price">${items?.price}</h3>
            <div className="ingredients">
              <h1>Ingredients</h1>
              <span
                style={{
                  whiteSpace: 'pre-line',
                  color: '#ef6742',
                  textTransform: 'capitalize',
                }}
              >
                {items?.ingredients}
              </span>
            </div>
            <h5 className="Share-Product">
              Share Product via
              <a className="icon-t" href="www.twitter.com">
                <i class="fa-brands fa-twitter fa-xl"></i>
              </a>
              <a className="icon-p mr-0" href="www.pinterest.com">
                <i class="fa-brands fa-pinterest fa-xl " />
              </a>
              <a className="icon" href="www.facebook.com">
                <i class="fa-brands fa-facebook fa-xl  " />
              </a>
            </h5>
          </div>
        </div>
      </div>
      <div className="Container-fluid ">
        <div className="row m-0">
          <div className="col-12 description-detail">
            <ul class="nav nav-tabs" role="tablist">
              <li class="nav-item">
                <a
                  class="nav-link active"
                  id="review-description"
                  data-bs-toggle="tab"
                  href="#description"
                >
                  Description
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  id="review-description"
                  data-bs-toggle="tab"
                  href="#review"
                >
                  Reviews
                </a>
              </li>
            </ul>
            <div class="tab-content ">
              <div id="description" class="tab-pane active">
                <br />
                {items.hasOwnProperty('description') && (
                  <p className="Detail" style={{ textTransform: 'capitalize' }}>
                    {items?.description}
                  </p>
                )}
              </div>
              <div id="review" class=" tab-pane fade">
                <br />
                <p>Reviews(10)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Container-fluid Gallery">
        <div className="row Gallery-row ">
          <div className="col-12 ">
            <h1 className="Gallery-h" style={headingStyle}>
              Gallery images
            </h1>
          </div>
        </div>

        <div className="row GalleryImages">
          {items.hasOwnProperty('gallery') &&
            items?.gallery.length > 0 &&
            items?.gallery.map((image, index) => {
              return (
                <div
                  className="col-lg-2 col-md-2 col-sm-2 col-4 imagesOfGallery"
                  key={index}
                >
                  <div className="Galleryimages-size">
                    <img
                      src={image[0].url}
                      onClick={() => handleClick(image, index)}
                      className="img-fluid Gallery-img"
                      alt=""
                    />
                  </div>
                </div>
              );
            })}
        </div>

        <div className="col-lg-2 col-md-2 col-sm-2 col-4 wrapper ">
          <div>
            {clickedImg && (
              <Modal
                clickedImg={clickedImg}
                handelRotationRight={handelRotationRight}
                setClickedImg={setClickedImg}
                handelRotationLeft={handelRotationLeft}
              />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default DescriptionSlug;
