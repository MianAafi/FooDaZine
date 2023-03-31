import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import '../Components/Css/Register.css';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import instance from '../api/instance';

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [address3, setAddress3] = useState('');
  const [mobile, setMobile] = useState('');
  const [telephone, setTelephone] = useState('');
  const [error, setError] = useState(false);
  const [loginSuccessful, setLoginSuccessful] = useState(false);
  const [slug, setSlug] = useState('');

  // async function RegisterUser(event) {
  //   event.preventDefault();
  //   const result = await Swal.fire({
  //     title: 'Registeration Successful',
  //     text: 'Please Login your account',
  //     icon: 'success',
  //     showCancelButton: true,
  //     confirmButtonColor: '#EF6742',
  //     cancelButtonColor: 'black',
  //     confirmButtonText: 'Yes, sure!',
  //   });
  //   if (result.isConfirmed) {
  //     axios
  //       .post('/api/register', {
  //         name,
  //         email,
  //         password,
  //         address1,
  //         address2,
  //         address3,
  //         mobile,
  //         telephone,
  //       })
  //       .then((response) => {
  //         setLoginSuccessful(true);
  //         navigate('/');
  //         const slug = name;
  //         '#name'.val('');
  //       })
  //       .catch(function (error) {
  //         console.error(error);
  //       });
  //   }
  // }

  async function RegisterUser(event) {
    event.preventDefault();

    try {
      const response = await instance.post('/api/register', {
        name,
        email,
        password,
        address1,
        address2,
        address3,
        mobile,
        telephone,
      });

      setLoginSuccessful(true);
      // console.log('successful');
      // console.log(response);
      const slug = name;

      const result = await Swal.fire({
        title: 'Registration Successful',
        text: 'Please Login to your account',
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#EF6742',
        cancelButtonColor: 'black',
        confirmButtonText: 'Yes, sure!',
      });

      if (result.isConfirmed) {
        navigate('/');
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        Swal.fire({
          title: 'Duplicate Email and/or Name',
          text: 'A user with this email and/or name already exists. Please use a different email and/or name.',
          icon: 'error',
          confirmButtonColor: '#EF6742',
        });
      } else {
        console.error(error);
      }
    }
  }

  // async function RegisterUser(event) {
  //   event.preventDefault();

  //   axios
  //     .post('/api/register', {
  //       name,
  //       email,
  //       password,
  //       address1,
  //       address2,
  //       address3,
  //       mobile,
  //       telephone,
  //     })
  //     .then((response) => {
  //       setLoginSuccessful(true);
  //       navigate('/');
  //       const slug = name;
  //       '#name'.val('');
  //     })
  //     .catch(function (error) {
  //       console.error(error);
  //     });
  // }

  // useEffect(() => {
  //   axios.get(`/category/api/${slug}`).then((response) => {});
  // });

  return (
    <div>
      <Navbar />
      <div class="container rounded bg-white ">
        <div class="row UpdateProfile-row">
          <div
            class="col-lg-7 col-md-9 col-sm-11
        border-right "
          >
            <div class="p-3 py-5">
              <div class="text-center mb-1">
                <h4 class="Update-Profile ">
                  Register your Restaurant profile
                </h4>
              </div>
              <form onSubmit={RegisterUser}>
                <div class="ProfileInput ">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    class="form-control"
                    id="name"
                    placeholder="Company name"
                    required
                  />
                </div>
                <div class="ProfileInput ">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    class="form-control"
                    placeholder="Company email"
                    required
                  />
                </div>
                <div class="ProfileInput ">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    class="form-control"
                    placeholder="Password"
                    minLength="6"
                    required
                  />
                </div>
                <div class="ProfileInput ">
                  <input
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                    type="text"
                    class="form-control"
                    placeholder="Address 1"
                    required
                  />
                </div>
                <div class="ProfileInput ">
                  <input
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                    type="text"
                    class="form-control"
                    placeholder="Address 2"
                  />
                </div>
                <div class="ProfileInput ">
                  <input
                    value={address3}
                    onChange={(e) => setAddress3(e.target.value)}
                    type="text"
                    class="form-control"
                    placeholder="Address 3"
                  />
                </div>
                <div class="ProfileInput ">
                  <input
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    type="tel"
                    class="form-control2"
                    placeholder="Mobile no."
                    minLength="11"
                    pattern="[0-9]{11}"
                    title="Please enter a valid 11-digit mobile number"
                    required
                  />
                  <input
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                    type="tel"
                    class="form-control3"
                    placeholder="Phone no."
                  />
                </div>
                <br />
                {loginSuccessful && (
                  <div class="alert alert-success" role="alert">
                    Registration Successful
                  </div>
                )}
                <br />
                <div class=" text-center">
                  <button
                    class=" profile-button"
                    value="Register"
                    type="submit"
                    onChange={RegisterUser}
                  >
                    Register
                  </button>
                </div>
                {/* <div className="text-center">or</div> */}
              </form>

              {/* <div className="login-via-Acc d-flex justify-content-center">
                <button className="twitter1">
                  <i class="fa fa-twitter " aria-hidden="true"></i> Twitter{' '}
                </button>{' '}
                <button className="facebook1 mx-2">
                  <i class="fa fa-facebook" aria-hidden="true"></i> facebook{' '}
                </button>{' '}
                <button className="google1">
                  <img src=".\images\google.png" alt="google icon"></img> google{' '}
                </button>
              </div> */}
            </div>
          </div>
        </div>
        <br />
        <br />
      </div>
      <Footer />
    </div>
  );
}

export default Register;
