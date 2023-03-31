import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import instance from '../api/instance';
import './Css/LoginYourAccount.css';

function LoginYourAccount() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loginSuccessful, setLoginSuccessful] = useState(false);
  const navigate = useNavigate();

  // async function LoginUser(event) {
  //   event.preventDefault();

  //   const response = await instance.fetch('/api/login', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       name,
  //       email,
  //       password,
  //     }),
  //   });
  //    const data = await response.json();
  //   if (data.user) {
  //     localStorage.setItem('token', JSON.stringify(data.user));

  //     if (data.status === 'ok') {
  //       setLoginSuccessful(true);
  //       // window.location.href = '/menu';
  //       navigate('/menu');
  //     }
  //   } else {
  //     setError(true);
  //   }
  // }

  async function LoginUser(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    instance
      .post('/api/login', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.user) {
          if (data.user.disable) {
            Swal.fire({
              icon: 'error',
              title: 'Account disabled',
              text: 'Your account is disabled. Please contact the help center.',
            }).then(() => {
              localStorage.clear('token');
            });
          } else {
            localStorage.setItem('token', JSON.stringify(data.user));
            if (data.status === 'ok') {
              setLoginSuccessful(true);
              navigate('/menu');
              window.scrollTo(0, 0);
            }
          }
        } else {
          setError(true);
        }
      });
  }

  // async function LoginUser(event) {
  //   event.preventDefault();

  //   const formData = new FormData();

  //   formData.append('email', email);
  //   formData.append('password', password);

  //   instance
  //     .post('/api/login', formData, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     })
  //     .then((response) => {
  //       const data = response.data;
  //       if (data.user) {
  //         localStorage.setItem('token', JSON.stringify(data.user));

  //         if (data.status === 'ok') {
  //           setLoginSuccessful(true);
  //           navigate('/menu');
  //           window.scrollTo(0, 0);
  //         }
  //       } else {
  //         setError(true);
  //       }
  //     });
  // }

  return (
    <div className="Container-fluid">
      <div className="row Signup">
        <div className="col-lg-6 col-md-8 col-sm-10 col-10  ">
          <h1 className="CreateAccount-h1">Sign into your account</h1>

          <br />
          <form onSubmit={LoginUser}>
            {error && (
              <div class="alert alert-danger" role="alert">
                Your username or password not matched.
              </div>
            )}

            <br />
            <div class="form-group">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                class="form-control"
                id="email"
                required
                placeholder="Company Email"
              />
            </div>
            <br />
            <div class="form-group">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                class="form-control"
                id="pwd"
                required
                placeholder="Password"
              />
            </div>
            <br />

            {/* <div class="form-group">
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type={ShowPassword ? 'text' : 'password'}
                class="form-control"
                id="pwd"
                required
                placeholder="Confirm Password"
              />
            </div> */}
            <br />
            {loginSuccessful && (
              <div class="alert alert-success" role="alert">
                Registration Successful
              </div>
            )}
            <button className="Register-btn" value="Login" type="submit">
              Sign in
            </button>
            <br />
            <br />
            {/* or */}
          </form>
          <br />
          {/* <div className="login-via-Acc">
            <button className="twitter">
              <i class="fa fa-twitter " aria-hidden="true"></i> Twitter{' '}
            </button>{' '}
            <button className="facebook">
              <i class="fa fa-facebook" aria-hidden="true"></i> facebook{' '}
            </button>{' '}
            <button className="google">
              <img src=".\images\google.png" alt="google icon"></img> google{' '}
            </button>
          </div> */}
          <br />
          <br />
        </div>
      </div>
    </div>
  );
}

export default LoginYourAccount;
