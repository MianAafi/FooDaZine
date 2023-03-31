import '../Components/Css/RestaurantMenu.css';
import Footer from './Footer';
import { useEffect, useState } from 'react';
import CategorySlug from '../Components/CategorySlug';
import { useParams } from 'react-router-dom';
import NavbarSlug from '../Components/NavbarSlug';
import instance from '../api/instance';

function RestaurantSlug() {
  let { slug } = useParams();
  const [userDetail, setUserDetail] = useState('');
  const [uploadedImage, setUploadedImage] = useState('images/coverdemo.jpg');
  const [logoPicture, setLogoPicture] = useState('images/logodemo.png');
  const [allCategories, setAllCategories] = useState([]);

  // useEffect(() => {
  //   if (localStorage.getItem('token')) {
  //     const user = JSON.parse(localStorage.getItem('token'));

  //     setUserDetail(user);
  //     setCompanyDescription(user.companyDescription);
  //     axios
  //       .get('/category/api/category', {
  //         headers: {
  //           Authorization: `x-access-token ${user.token}`,
  //         },
  //       })
  //       .then((response) => {
  //         setAllCategories(response.data);
  //       }, []);
  //   }
  // }, []);

  useEffect(() => {
    instance.get(`/category/api/${slug}`).then((response) => {
      // console.log(response.data);

      setUserDetail(response.data.user);
      setAllCategories(response.data.allitems);
      setUploadedImage(response.data.settings.Coverimage.url);
      setLogoPicture(response.data.settings.Logoimage.url);
    });
  }, [slug]);

  // useEffect(() => {
  //   if (localStorage.getItem('token')) {
  //     const user = JSON.parse(localStorage.getItem('token'));
  //     axios
  //       .get('/setting/api/setting/logo', {
  //         headers: {
  //           Authorization: `x-access-token ${user.token}`,
  //         },
  //       })
  //       .then((response) => {
  //         const data = response.data;
  //         if (data.Coverimage) {
  //           setUploadedImage(data.Coverimage.url);
  //         }
  //         if (data.Logoimage) {
  //           setLogoPicture(data.Logoimage.url);
  //         }
  //       }, []);
  //   }
  // }, []);

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <NavbarSlug />
          <div className="col-12 CoverPicture">
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
          </div>

          <div className="row d-flex justify-content-center m-0">
            <div className="col-10 text-center restaurantMenu-description">
              <div>
                <h1>{userDetail.name}</h1>
              </div>
              <div>
                <br />
                <p>{userDetail.companyDescription}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        {allCategories.length > 0 &&
          allCategories.map((item) => {
            return (
              <CategorySlug
                key={item.id}
                data={item}
                setAllCategories={setAllCategories}
                allCategories={allCategories}
              />
            );
          })}
        <br />
        <br />
        <br />
      </div>
      <Footer />
    </div>
  );
}

export default RestaurantSlug;
