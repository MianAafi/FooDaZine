/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
  Checkbox,
  TextField,
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Paper,
} from '@material-ui/core';
import MUIDataTable from 'mui-datatables';

// components
import PageTitle from '../../components/PageTitle';
import instance from '../../components/api/instance';
import Swal from 'sweetalert2';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const datatableData = [
  [
    'The indian Dhaba',
    'example@example.com',
    'st.no 13 new york city',
    '03000651700',
  ],
];

const initialFormState = {
  name: '',
  email: '',
  password: '',
  address1: '',
  address2: '',
  mobile: '',
  phone: '',
};

export default function Tables() {
  const [companyDetails, setCompanyDetails] = useState(null);
  const [enableSelected, setEnableSelected] = useState(false);
  const [disableSelected, setDisableSelected] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [formState, setFormState] = useState(initialFormState);
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
  const [allRestaurant, setAllRestaurant] = useState([
    { id: 1, disable: true },
  ]);

  // const [restaurantData, setRestaurantData] = useState('');
  const [restaurantData, setRestaurantData] = useState(() => {
    const storedData = localStorage.getItem('restaurantData');
    return storedData ? JSON.parse(storedData) : [];
  });
  let history = useHistory();

  const handleRowClick = (rowData) => {
    setCompanyDetails(rowData);
  };

  const handleClose = () => {
    setCompanyDetails(null);
  };

  const handleEnable = () => {
    if (window.confirm('Are you sure you want to enable this row?')) {
      console.log('Enable clicked');
      setEnableSelected(true);
      setDisableSelected(false);
    }
  };

  const handleDisable = () => {
    if (window.confirm('Are you sure you want to disable this row?')) {
      console.log('Disable clicked');
      setEnableSelected(false);
      setDisableSelected(true);
    }
  };

  const handleAddDialogOpen = () => {
    setOpenAddDialog(true);
  };

  const handleAddDialogClose = () => {
    setOpenAddDialog(false);
    setFormState(initialFormState);
  };

  const handleFormChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // console.log('Submitting form', formState);
    handleAddDialogClose();
  };

  const options = {
    // filterType: 'checkbox',
    // onRowClick: handleRowClick,
    customToolbar: () => (
      <Button
        variant="contained"
        onClick={handleAddDialogOpen}
        style={{ background: ' #EF6742', color: 'white', padding: '10px' }}
      >
        Add Restaurant
      </Button>
    ),
    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
      <>
        <Button
          variant="contained"
          onClick={
            enableSelected
              ? handleDisable
              : disableSelected
              ? undefined // do nothing if already disabled
              : handleEnable
          }
          style={{
            marginRight: '8px',
            background: enableSelected ? '#C4C4C4' : '#EF6742',
            color: 'white',
          }}
        >
          {enableSelected ? 'Disable' : 'Enable'}
        </Button>
      </>
    ),
  };

  const columns = [
    {
      name: 'Name',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'Email',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'Address 1',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'Mobile',
      options: {
        filter: true,
        sort: false,
      },
    },

    {
      name: 'Action',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          const isEnabled = true; // replace this with your code to determine if the row is enabled or not
          const handleClick = () => {
            // handle the click event for the enable/disable button
          };
          return (
            <Button
              variant="contained"
              color={isEnabled ? 'primary' : 'secondary'}
              onClick={handleClick}
            >
              {isEnabled ? 'Enabled' : 'Disabled'}
            </Button>
          );
        },
      },
    },
  ];

  useEffect(() => {
    instance
      .get('/admin/restaurant')
      .then((response) => {
        setRestaurantData(response.data);
        localStorage.setItem('restaurantData', JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
      handleAddDialogClose();

      await Swal.fire({
        title: 'Registration Successful',
        text: 'Please Login to your account',
        icon: 'success',
        confirmButtonColor: '#EF6742',
        confirmButtonText: 'OK',
      });
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

  // const disableRestaurant = async (id, disable) => {
  //   const actionText = disable ? 'Enable' : 'Disable';
  //   console.log(actionText);
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: `Do you want to ${actionText} this Restaurant?`,
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#EF6742',
  //     cancelButtonColor: 'black',
  //     confirmButtonText: 'Yes',
  //     cancelButtonText: 'Cancel',
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       try {
  //         const response = await instance.put(`/api/restaurant/disable/${id}`);
  //         const updatedUser = response.data.user;
  //         setAllRestaurant(
  //           allRestaurant.map((user) => {
  //             if (user._id === updatedUser._id) {
  //               return {
  //                 ...user,
  //                 disable: updatedUser.disable,
  //               };
  //             } else {
  //               return user;
  //             }
  //           })
  //         );
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   });
  // };

  const disableRestaurant = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to change this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF6742',
      cancelButtonColor: 'black',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await instance.put(`/api/restaurant/disable/${id}`);
          const updatedUser = response.data.user;
          setAllRestaurant(
            allRestaurant.map((user) => {
              if (user._id === updatedUser._id) {
                return {
                  ...user,
                  disable: updatedUser.disable,
                };
              } else {
                return user;
              }
            })
          );
          // Fetch restaurant data again to update the table with the latest changes
          instance
            .get('/admin/restaurant')
            .then((response) => {
              setRestaurantData(response.data);
              localStorage.setItem(
                'restaurantData',
                JSON.stringify(response.data)
              );
              const message = updatedUser.disable
                ? 'Successfully Disabled Restaurant'
                : 'Successfully Enabled Restaurant';
              Swal.fire({
                icon: 'success',
                title: 'Success',
                text: message,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <>
      <PageTitle title="Restaurants" />
      {/* <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title={'Restaurants List'}

            // data={datatableData}
            // columns={columns}
            // options={options}
          />
        </Grid>
      </Grid> */}
      <button
        style={{
          float: 'right',
          padding: '10px 15px',
          backgroundColor: '#ef6742',
          border: 'none',
          borderRadius: '5px',
          color: '#ffffff',
          marginBottom: '10px',
          marginRight: '16px',
        }}
        onClick={handleAddDialogOpen}
      >
        Add Restaurant
      </button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Restaurant Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell style={{ textAlign: 'center' }}>Visit</TableCell>
              <TableCell style={{ textAlign: 'center' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {restaurantData.map((restaurant) => (
              <TableRow key={restaurant.id}>
                <TableCell>{restaurant.name}</TableCell>
                <TableCell>{restaurant.email}</TableCell>
                <TableCell>{`${restaurant.address1}`}</TableCell>
                <TableCell>{restaurant.mobile}</TableCell>
                <TableCell style={{ textAlign: 'center' }}>
                  {' '}
                  <button
                    style={{
                      cursor: 'pointer',
                      borderRadius: '5px',
                      padding: '10px 15px',
                      fontSize: ' 14px',
                      backgroundColor: ' #ef6742',
                      border: ' none',
                      color: ' #ffffff',
                    }}
                    onClick={() => {
                      window.open(
                        // `https://foodazine.xlogicsolutions.com/${restaurant.slug}`,
                        `http://localhost:3000/${restaurant.slug}`,

                        '_blank'
                      );
                    }}
                  >
                    View
                  </button>
                </TableCell>

                <TableCell style={{ textAlign: 'center' }}>
                  <Button
                    variant="contained"
                    color={restaurant.disable ? 'muted' : 'primary'}
                    onClick={() => disableRestaurant(restaurant._id)}
                  >
                    {restaurant.disable ? 'Disabled' : 'Enabled'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        onSubmit={handleAddDialogClose}
        onClose={handleAddDialogClose}
        open={openAddDialog}
      >
        <DialogTitle>Add Resturants</DialogTitle>
        <DialogContent dividers>
          <form onSubmit={RegisterUser}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Comapny Name"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Comapny Email"
                  name="email"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  minLength="6"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address 1"
                  name="address1"
                  variant="outlined"
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                  type="text"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address 2"
                  name="address2"
                  variant="outlined"
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
                  type="text"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address 3"
                  name="address3"
                  variant="outlined"
                  value={address3}
                  onChange={(e) => setAddress3(e.target.value)}
                  type="text"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Mobile"
                  name="mobile"
                  variant="outlined"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  type="tel"
                  minLength="11"
                  pattern="[0-9]{11}"
                  title="Please enter a valid 11-digit mobile number"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  variant="outlined"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  type="tel"
                />
              </Grid>

              <Grid item xs={12}>
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
                    style={{
                      background: ' #EF6742',
                      color: 'white',
                      padding: ' 10px 20px',
                      borderRadius: '5px',
                      borderColor: '#EF6742',
                    }}
                  >
                    Register
                  </button>
                </div>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
