import CategoryMenu from '../Components/CategoryMenu';
import '../Components/Css/RestaurantMenu.css';
import Footer from './Footer';
import NavbarMyAccount from '../Components/NavbarMyAccount';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryPopup from '../Components/CategoryPopup';
import { useValue } from '../context/ContextProvider';
import QRCode from 'react-qr-code';
import html2canvas from 'html2canvas';

import { v4 as uuidv4 } from 'uuid';
import instance from '../api/instance';
function RestaurantMenu() {
  const [userDetail, setUserDetail] = useState('');
  const [name, setName] = useState('');
  const [companyDescription, setCompanyDescription] = useState(
    'Write something about your Restaurant'
  );
  const [uploadedImage, setUploadedImage] = useState('images/coverdemo.jpg');
  const [logoPicture, setLogoPicture] = useState('images/logodemo.png');
  const [isEditable, setIsEditable] = useState(false);
  const [isEditable2, setIsEditable2] = useState(false);

  const navigate = useNavigate();
  const {
    state: { allitems },
    dispatch,
  } = useValue();
  const [allCategories, setAllCategories] = useState([]);

  const updateCategories = (response) => {
    let pusitem = {
      Category_name: response.Category_name,
      _id: response._id,
      items: [],
    };
    setAllCategories([...allCategories, pusitem]);
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const user = JSON.parse(localStorage.getItem('token'));

      setUserDetail(user);
      setCompanyDescription(user.companyDescription);
      setName(user.name);
      instance
        .get('/category/api/category', {
          headers: {
            Authorization: `x-access-token ${user.token}`,
          },
        })
        .then((response) => {
          setAllCategories(response.data);
          // dispatch({ type: 'ALL_ITEMS', payload: response.data });
        }, []);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const user = JSON.parse(localStorage.getItem('token'));

      instance
        .get('/setting/api/setting/logo', {
          headers: {
            Authorization: `x-access-token ${user.token}`,
          },
        })
        .then((response) => {
          const data = response.data;
          if (data.Coverimage) {
            setUploadedImage(data.Coverimage.url);
          }

          if (data.Logoimage) {
            setLogoPicture(data.Logoimage.url);
          }

          // dispatch({ type: 'ALL_ITEMS', payload: response.data });
        }, []);
    }
  }, []);

  const CategoryUpdate = (response) => {
    let pusitem = {
      Category_name: response.Category_name,
      _id: response._id,
      items: [],
    };
    dispatch({
      type: 'ALL_ITEMS',
      payload: [...allitems, pusitem],
    });
  };

  const handleImageUpload = (e) => {
    const uploadfile = e.target.files[0];
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const file = e.target.result;
        setUploadedImage(e.target.result);
        if (localStorage.getItem('token')) {
          const user = JSON.parse(localStorage.getItem('token'));
          const formData = new FormData();
          formData.append('image', uploadfile);
          instance
            .post('/setting/api/setting', formData, {
              headers: {
                Authorization: `x-access-token ${user.token}`,
              },
            })
            .then((response) => {
              // console.log(response.data);
            });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUpload = (e) => {
    const uploadfile = e.target.files[0];
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPicture(e.target.result);
        if (localStorage.getItem('token')) {
          const user = JSON.parse(localStorage.getItem('token'));
          const formData = new FormData();
          formData.append('image', uploadfile);
          instance
            .post('/setting/api/setting/logo', formData, {
              headers: {
                Authorization: `x-access-token ${user.token}`,
              },
            })
            .then((response) => {
              // console.log(response.data);
            });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleEditable2 = () => {
    setIsEditable2((prevIsEditable) => !prevIsEditable);
  };
  const handleSave2 = () => {
    setIsEditable2(false);
    const formdata = new FormData();
    const user = JSON.parse(localStorage.getItem('token'));
    formdata.append('name', name);
    instance
      .put('/setting/api/name', formdata, {
        headers: {
          Authorization: `x-access-token ${user.token}`,
        },
      })
      .then((response) => {
        user.name = name;
        // console.log(name);
        localStorage.setItem('token', JSON.stringify(user));
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const toggleEditable = () => {
    setIsEditable((prevIsEditable) => !prevIsEditable);
  };

  const handleSave = () => {
    setIsEditable(false);
    const formdata = new FormData();
    const user = JSON.parse(localStorage.getItem('token'));
    formdata.append('description', companyDescription);
    instance
      .post('/setting/api/description', formdata, {
        headers: {
          Authorization: `x-access-token ${user.token}`,
        },
      })
      .then((response) => {
        user.companyDescription = companyDescription;
        localStorage.setItem('token', JSON.stringify(user));
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  const qrCodeRef = useRef(null);

  const downloadQRCode = () => {
    html2canvas(qrCodeRef.current).then(function (canvas) {
      const link = document.createElement('a');
      link.download = 'qr-code.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  // const allData = localStorage.getItem('token');
  // const slug = allData ? JSON.parse(allData).slug : null;

  const allData = localStorage.getItem('token');
  let tokenData = allData ? JSON.parse(allData) : null;
  if (tokenData && tokenData.name && typeof tokenData.name === 'string') {
    const name = tokenData.name.trim();
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    tokenData.slug = slug;
    localStorage.setItem('token', JSON.stringify(tokenData));
  }
  const slugData = localStorage.getItem('token');
  const slug = slugData ? JSON.parse(slugData).slug : null;
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <NavbarMyAccount />
          <div className="col-12 CoverPicture">
            {/* <button className="text-center ">Upload</button> */}
            {/* <div style={{ width: '200px' }}> */}
            <label
              style={{
                display: 'table',
                position: 'absolute',
                zIndex: '1000',
              }}
            >
              <i className="fa-solid fa-camera fa-lg"></i>
              <span style={{ marginLeft: '6px' }}>Upload Cover Photo</span>
              <input
                style={{ display: 'none' }}
                onChange={handleImageUpload}
                type="file"
                size="70"
              />
            </label>

            <img
              src={uploadedImage}
              alt={'banner'}
              style={{
                position: 'absolute',
              }}
            />
          </div>

          <div className="Restaurant-logo text-center mb-0 ">
            <img src={logoPicture} alt="logo"></img>
            <label
              style={{
                position: 'absolute',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <i className="fa-solid fa-camera fa-xs" />
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                style={{
                  display: 'none',
                }}
              />
            </label>
          </div>

          <div className="row d-flex justify-content-center m-0">
            <div className="col-10 text-center restaurantMenu-description">
              <div>
                <i
                  className="fas fa-edit"
                  style={{
                    color: '#ef6742',
                    marginBottom: '10px',
                    cursor: 'pointer',
                  }}
                  onClick={toggleEditable2}
                ></i>
                <br />
                {!isEditable2 && <h1 className="CompanyName">{name}</h1>}
                {isEditable2 && (
                  <textarea
                    style={{
                      width: '50%',
                      height: 'auto',
                      paddingLeft: '10px',
                    }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={handleSave2}
                  ></textarea>
                )}
                <br />
                {isEditable2 && (
                  <button
                    style={{
                      background: '#ef6742',
                      border: '1px solid #ef6742',
                      color: '#ffffff',
                      fontSize: '14px',
                      padding: '8px 21px',
                      borderRadius: '6px',
                    }}
                    onClick={handleSave2}
                  >
                    Save
                  </button>
                )}
              </div>
              {/* <div>
                <i
                  style={{
                    color: '#ef6742',
                    marginBottom: '10px',
                    cursor: 'pointer',
                  }}
                  className="fas fa-edit"
                />
                <h1>{userDetail.name}</h1>
              </div> */}
              <div>
                <i
                  className="fas fa-edit"
                  style={{
                    color: '#ef6742',
                    display: 'flex',
                    justifyContent: 'end',
                    marginBottom: '10px',
                    cursor: 'pointer',
                  }}
                  onClick={toggleEditable}
                ></i>
                {!isEditable && (
                  <p className="CompanyDescription">{companyDescription}</p>
                )}
                {isEditable && (
                  <textarea
                    style={{ width: '100%', height: '120px' }}
                    value={companyDescription}
                    onChange={(e) => setCompanyDescription(e.target.value)}
                    onBlur={handleSave}
                    // onKeyDown={handleKeyDown}
                  ></textarea>
                )}
                {isEditable && (
                  <button
                    style={{
                      background: '#ef6742',
                      border: '1px solid #ef6742',
                      color: '#ffffff',
                      fontSize: '14px',
                      padding: '8px 21px',
                      borderRadius: '6px',
                    }}
                    onClick={handleSave}
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        {allCategories.length > 0 &&
          allCategories.map((item) => {
            return (
              <CategoryMenu
                key={item.id}
                data={item}
                setAllCategories={setAllCategories}
                allCategories={allCategories}
              />
            );
          })}
        <br />
        <div className="d-flex justify-content-center">
          <button
            type="button"
            data-toggle="modal"
            data-target="#myModal1"
            className="AddCategory"
          >
            + Add new Category
          </button>
        </div>

        <CategoryPopup
          CategoryUpdate={CategoryUpdate}
          setAllCategories={setAllCategories}
          allCategories={allCategories}
        />
        <br />
        <br />
      </div>
      <div className="Container-fluid">
        <div className="row QrNav">
          <div className="col-8 QrButton">
            <h1>
              Click here to download your <br /> Menu Page QR
            </h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and
              <br /> typesetting industry.
            </p>
            <button onClick={downloadQRCode}>Download</button>
          </div>

          <div
            className="col-sm-4 col-4"
            ref={qrCodeRef}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {slug && (
              <QRCode
                className="QRCode"
                value={`${window.location.origin}/${slug}`}
              />
            )}
          </div>
        </div>
      </div>
      <div style={{ marginTop: '50px' }}>
        <Footer />
      </div>
    </div>
  );
}

export default RestaurantMenu;
