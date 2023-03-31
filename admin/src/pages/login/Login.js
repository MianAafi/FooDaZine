import React, { useState } from 'react';
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Fade,
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';

// styles
import useStyles from './styles';

// context
import { useUserDispatch, loginUser } from '../../context/UserContext';
import Swal from 'sweetalert2';
import instance from '../../components/api/instance';

function Login(props) {
  const classes = useStyles();

  const userDispatch = useUserDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTabId, setActiveTabId] = useState(0);
  const [nameValue, setNameValue] = useState('');
  const [loginValue, setLoginValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccessful, setLoginSuccessful] = useState('');

  async function RegisterAdmin(event) {
    event.preventDefault();

    try {
      const response = await instance.post('/admin/register', {
        name,
        email,
        password,
      });

      setLoginSuccessful(true);

      await Swal.fire({
        title: 'Registration Successful',
        text: 'Please Login to your account',
        icon: 'success',
        confirmButtonColor: '#EF6742',
        confirmButtonText: 'Ok',
      });
    } catch (error) {
      if (error.response && error.response.status === 409) {
        await Swal.fire({
          title: 'Duplicate Email and/or Name',
          text: 'A user with this email and/or name already exists. Please use a different email and/or name.',
          icon: 'error',
          confirmButtonColor: '#EF6742',
          confirmButtonText: 'Ok',
        });
      } else {
        await Swal.fire({
          title: 'Registration Failed',
          text: 'An error occurred while processing your registration. Please try again later.',
          icon: 'error',
          confirmButtonColor: '#EF6742',
          confirmButtonText: 'Ok',
        });
        console.error(error);
      }
    }
  }

  return (
    <Grid container className={classes.container}>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <Tabs
            value={activeTabId}
            onChange={(e, id) => setActiveTabId(id)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Login" classes={{ root: classes.tab }} />
            <Tab label="New User" classes={{ root: classes.tab }} />
          </Tabs>
          {activeTabId === 0 && (
            <React.Fragment>
              <Typography variant="h2" className={classes.greeting}>
                Admin Login
              </Typography>

              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Your email and password do not match. Please try again.
                </Typography>
              </Fade>
              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={loginValue}
                onChange={(e) => setLoginValue(e.target.value)}
                margin="normal"
                placeholder="Email Adress"
                type="email"
                fullWidth
              />
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
                margin="normal"
                placeholder="Password"
                type="password"
                fullWidth
              />
              <div className={classes.formButtons}>
                {isLoading ? (
                  <CircularProgress size={26} className={classes.loginLoader} />
                ) : (
                  <Button
                    disabled={
                      loginValue.length === 0 || passwordValue.length === 0
                    }
                    onClick={() =>
                      loginUser(
                        userDispatch,
                        loginValue,
                        passwordValue,
                        props.history,
                        setIsLoading,
                        setError
                      )
                    }
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Login
                  </Button>
                )}
              </div>
            </React.Fragment>
          )}
          {activeTabId === 1 && (
            <React.Fragment>
              <Typography variant="h2" className={classes.subGreeting}>
                Create your account
              </Typography>

              <TextField
                id="name"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={name}
                onChange={(e) => setName(e.target.value)}
                margin="normal"
                placeholder="Full Name"
                type="text"
                fullWidth
              />
              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                placeholder="Email Adress"
                type="email"
                fullWidth
              />
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                placeholder="Password"
                type="password"
                fullWidth
              />
              <div className={classes.creatingButtonContainer}>
                {isLoading ? (
                  <CircularProgress size={26} />
                ) : (
                  <Button
                    onClick={RegisterAdmin}
                    size="large"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.createAccountButton}
                  >
                    Create your account
                  </Button>
                )}
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </Grid>
  );
}

export default withRouter(Login);

// import React, { useState } from 'react';
// import {
//   Grid,
//   CircularProgress,
//   Typography,
//   Button,
//   Tabs,
//   TextField,
//   Fade,
// } from '@material-ui/core';
// import { withRouter } from 'react-router-dom';

// // styles
// import useStyles from './styles';

// // context
// import { useUserDispatch, loginUser } from '../../context/UserContext';

// // import { useNavigate } from 'react-router-dom';

// function Login(props) {
//   const classes = useStyles();

//   // global
//   const userDispatch = useUserDispatch();

//   // local
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [activeTabId, setActiveTabId] = useState(0);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   return (
//     <Grid container className={classes.container}>
//       <div className={classes.formContainer}>
//         <div className={classes.form} style={{ textAlign: 'center' }}>
//           <Tabs
//             value={activeTabId}
//             onChange={(e, id) => setActiveTabId(id)}
//             indicatorColor="primary"
//             textColor="primary"
//             centered
//           ></Tabs>
//           <h1 style={{ textAlign: 'center' }}>Admin Login</h1>
//           {activeTabId === 0 && (
//             <React.Fragment>
//               <Fade in={error}>
//                 <Typography color="secondary" className={classes.errorMessage}>
//                   Your email and password do not match. Please try again.
//                 </Typography>
//               </Fade>
//               <TextField
//                 id="email"
//                 InputProps={{
//                   classes: {
//                     underline: classes.textFieldUnderline,
//                     input: classes.textField,
//                   },
//                 }}
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 margin="normal"
//                 placeholder=" Email Address"
//                 type="email"
//                 required
//               />
//               <TextField
//                 id="password"
//                 InputProps={{
//                   classes: {
//                     underline: classes.textFieldUnderline,
//                     input: classes.textField,
//                   },
//                 }}
//                 value={password}
//                 style={{ textAlign: 'center' }}
//                 onChange={(e) => setPassword(e.target.value)}
//                 margin="normal"
//                 placeholder=" Password"
//                 type="password"
//                 required
//               />
//               <div className={classes.formButtons}>
//                 {isLoading ? (
//                   <CircularProgress size={26} className={classes.loginLoader} />
//                 ) : (
//                   <Button
//                     value="Login"
//                     onClick={() =>
//                       loginUser(
//                         userDispatch,
//                         email,
//                         password,
//                         props.history,
//                         setIsLoading,
//                         setError
//                       )
//                     }
//                     style={{
//                       backgroundColor: '#ef6742',
//                       color: 'white',
//                       padding: '7px 20px ',
//                       marginLeft: '20%',
//                     }}
//                   >
//                     Login
//                   </Button>
//                 )}
//               </div>
//             </React.Fragment>
//           )}
//         </div>
//       </div>
//     </Grid>
//   );
// }

// export default withRouter(Login);
