import React, { useState } from 'react';
import instance from '../components/api/instance';

// Define the initial state and reducer for the user
const initialState = {
  isAuthenticated: !!localStorage.getItem('admin'), // Check if admin key exists in localStorage
};

function userReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, isAuthenticated: true };
    case 'SIGN_OUT_SUCCESS':
      return { ...state, isAuthenticated: false };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

// Create a context for the user state and dispatch
const UserStateContext = React.createContext();
const UserDispatchContext = React.createContext();

// Wrap the app with a provider for the user context
function UserProvider({ children }) {
  const [state, dispatch] = React.useReducer(userReducer, initialState);

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

// Custom hooks to use the user state and dispatch
function useUserState() {
  const context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error('useUserState must be used within a UserProvider');
  }
  return context;
}

function useUserDispatch() {
  const context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error('useUserDispatch must be used within a UserProvider');
  }
  return context;
}

// Function to log in the user
function loginUser(dispatch, email, password, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);

  const formData = new FormData();
  formData.append('email', email);
  formData.append('password', password);

  // Send login request to the server
  instance
    .post('/admin/login', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      const data = response.data;
      console.log(data);

      if (data.status === 'ok') {
        // Save user data in localStorage
        localStorage.setItem('admin', 'true');
        localStorage.setItem('token', JSON.stringify(data.user));

        // Update user state to authenticated and redirect to dashboard
        dispatch({ type: 'LOGIN_SUCCESS' });
        history.push('/admin/dashboard');
      } else {
        // Show error message
        setError(true);
        setIsLoading(false);
      }
    })
    .catch((error) => {
      // Show error message
      setError(true);
      setIsLoading(false);
    });
}

// Function to log out the user
function signOut(dispatch, history) {
  // Remove user data from localStorage and update user state
  localStorage.removeItem('admin');
  localStorage.removeItem('token');
  dispatch({ type: 'SIGN_OUT_SUCCESS' });

  // Redirect to login page
  history.push('/login');
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut };

// import React from 'react';
// import {} from 'axios';
// import instance from '../components/api/instance';

// const UserStateContext = React.createContext();
// const UserDispatchContext = React.createContext();

// const initialState = {
//   isAuthenticated: !!localStorage.getItem('admin'), // Check if admin key exists in localStorage
// };
// function userReducer(state, action) {
//   switch (action.type) {
//     case 'LOGIN_SUCCESS':
//       return { ...state, isAuthenticated: true };
//     case 'SIGN_OUT_SUCCESS':
//       return { ...state, isAuthenticated: false };
//     default: {
//       throw new Error(`Unhandled action type: ${action.type}`);
//     }
//   }
// }

// function UserProvider({ children }) {
//   const [state, dispatch] = React.useReducer(userReducer, {
//     isAuthenticated: !!localStorage.getItem('id_token'),
//   });

//   return (
//     <UserStateContext.Provider value={state}>
//       <UserDispatchContext.Provider value={dispatch}>
//         {children}
//       </UserDispatchContext.Provider>
//     </UserStateContext.Provider>
//   );
// }

// function useUserState() {
//   var context = React.useContext(UserStateContext);
//   if (context === undefined) {
//     throw new Error('useUserState must be used within a UserProvider');
//   }
//   return context;
// }

// function useUserDispatch() {
//   var context = React.useContext(UserDispatchContext);
//   if (context === undefined) {
//     throw new Error('useUserDispatch must be used within a UserProvider');
//   }
//   return context;
// }

// export { UserProvider, useUserState, useUserDispatch, loginUser, signOut };

// // function loginUser(dispatch, login, password, history, setIsLoading, setError) {
// //   setError(false);
// //   setIsLoading(true);

// //   if (!!login && !!password) {
// //     setTimeout(() => {
// //       localStorage.setItem('id_token', 1);
// //       setError(null);
// //       setIsLoading(false);
// //       dispatch({ type: 'LOGIN_SUCCESS' });

// //       history.push('/app/dashboard');
// //     }, 2000);
// //   } else {
// //     dispatch({ type: 'LOGIN_FAILURE' });
// //     setError(true);
// //     setIsLoading(false);
// //   }
// // }
// function loginUser(dispatch, email, password, history, setIsLoading, setError) {
//   setError(false);
//   setIsLoading(true);

//   const formData = new FormData();
//   formData.append('email', email);
//   formData.append('password', password);

//   if (!!email && !!password) {
//     instance
//       .post('/admin/login', formData, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       })
//       .then((response) => {
//         const data = response.data;
//         console.log(data);

//         if (data.status === 'ok') {
//           localStorage.setItem('admin', 'true');
//           localStorage.setItem('token', JSON.stringify(data.user));
//           // setError(null);
//           // setIsLoading(false);
//           dispatch({ type: 'LOGIN_SUCCESS' });
//           history.push('/app/dashboard');
//         } else {
//         }
//       })
//       .catch((error) => {});
//   } else {
//     dispatch({ type: 'LOGIN_FAILURE' });
//     setError(true);
//     setIsLoading(false);
//   }
// }

// function signOut(dispatch, history) {
//   localStorage.removeItem('id_token');
//   dispatch({ type: 'SIGN_OUT_SUCCESS' });

//   history.push('/login');
// }
