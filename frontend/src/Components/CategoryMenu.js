import React, { useState, useEffect } from 'react';
import './Css/CategoryMenu.css';
import 'react-image-crop/dist/ReactCrop.css';
import CategoryPopup from './CategoryPopup';
import FoodPopup from './FoodPopup';
import Swal from 'sweetalert2';
import { useValue } from '../context/ContextProvider';
import { Link, NavLink, UNSAFE_DataRouterContext } from 'react-router-dom';
import FoodUpdate from './FoodUpdate';
import instance from '../api/instance';

function CategoryMenu(props) {
  const [categoryItem, setCategoryItem] = useState([]);
  const [catid, setCatId] = useState(null);
  const [openUpdateM, setOpenUpdateM] = useState(false);
  const [Cate_name, setCategory_name] = useState('');
  const [isEditable, setIsEditable] = useState(false);
  const [restaurantCategory, setRestaurantCategory] = useState([
    { id: 1, disable: true },
  ]);

  const { data, setAllCategories, allCategories } = props;

  const {
    state: { categoryName, categoryId },
    dispatch,
  } = useValue();

  useEffect(() => {
    if (data?.items.length > 0) {
      setCategoryItem(data.items);
    }
  }, [data]);

  const handleCategoryName = (cateName, Category_id) => {
    const CategoryData = { cateName, Category_id };
    dispatch({ type: 'UPDATE_CATEGORY', payload: CategoryData });
  };
  const updateItems = (response) => {
    setCategoryItem([...categoryItem, response]);
  };

  const getEditData = (e) => {
    setOpenUpdateM(true);
    const item = JSON.parse(e.target.dataset.itemid);
    dispatch({ type: 'EDIT_ITEMS', payload: item });
  };

  function deleteItem(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF6742',
      cancelButtonColor: 'black',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        instance.delete(`/items/api/items/${id}`).then((response) => {
          let newItem = response.data.msg;
          const newArrayCategory = allCategories.map((item) => {
            if (item._id === newItem.category_id) {
              const newItems = item.items.filter((item1) => item1._id !== id);
              const latestObject = {
                Category_name: item.Category_name,
                _id: item._id,
                items: [...newItems],
              };
              return latestObject;
            } else {
              return item;
            }
          });
          setAllCategories(newArrayCategory);
        });
      }
    });
  }
  // function mouseover() {
  //   document.getElementById('CatDrop').style.color = 'white';
  // }

  async function deleteCategory(categoryId) {
    if (localStorage.getItem('token')) {
      const user = JSON.parse(localStorage.getItem('token'));

      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#EF6742',
        cancelButtonColor: 'black',
        confirmButtonText: 'Yes, delete it!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await instance.delete(`/category/api/category/${categoryId}`, {
              headers: {
                Authorization: `x-access-token ${user.token}`,
              },
            });
            setAllCategories(
              allCategories.filter((category) => category._id !== categoryId)
            );
          } catch (error) {
            console.error(`Failed to delete category`, error);
          }
        }
      });
    }
  }
  const toggleEditable = (value, cate_id) => {
    setCatId(cate_id);
    setCategory_name(value);
    setIsEditable((prevIsEditable) => !prevIsEditable);
  };

  const handleSave = () => {
    const formdata = new FormData();
    const user = JSON.parse(localStorage.getItem('token'));
    formdata.append('Category_name', Cate_name);
    instance
      .put(`/category/api/category/${catid}`, formdata, {
        headers: {
          Authorization: `x-access-token ${user.token}`,
        },
      })
      .then((response) => {
        setIsEditable(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  const handleKeyDownCat = (e) => {
    if (e.keyCode === 27) {
      toggleEditable();
    }
  };

  const toggleEnabled = async (id) => {
    const item = restaurantCategory.find((item) => item.id === id);
    console.log(item);

    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to Change this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF6742',
      cancelButtonColor: 'black',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await instance.put(
            `/category/api/category/disable/${id}`,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
          const data = response.data;
          console.log(data);

          setAllCategories(
            allCategories.map((item) => {
              if (item._id === data.category._id) {
                return {
                  Category_name: item.Category_name,
                  _id: item._id,
                  disable: data.category.disable,
                  items: [],
                };
              } else {
                return item;
              }
            })
          );
        } catch (error) {
          console.error(error);
        }
      }
    });
  };
  return (
    <div>
      <div className="row m-0 CategoryTitle">
        <div className="col-lg-3 col-3"></div>

        <div className="col-lg-6 col-6 text-center">
          {/* <h1 style={{ textTransform: 'capitalize' }}>{data?.Category_name}</h1> */}

          {!isEditable && (
            <h1 style={{ textTransform: 'capitalize' }}>
              {Cate_name ? Cate_name : data?.Category_name}
              {data?.disable ? ' (Disabled)' : ''}
            </h1>
          )}
          {isEditable && (
            <input
              className="categoryNameUpdate-input"
              value={Cate_name}
              onChange={(e) => setCategory_name(e.target.value)}
              onBlur={handleSave}
              onKeyDown={handleKeyDownCat}
            ></input>
          )}

          {isEditable && (
            <button className="categorySave-btn" onClick={handleSave}>
              Save
            </button>
          )}
        </div>

        <div
          className="col-lg-3 col-3 d-inline"
          style={{ position: 'relative' }}
        >
          <button
            type="button"
            class="btn-add  btn-lg"
            data-toggle="modal"
            data-target="#myModal"
            onClick={() => handleCategoryName(data?.Category_name, data?._id)}
          >
            + Add new
          </button>
          <li className="nav-item dropdown1">
            <div className="dropdown">
              <div
                className="dropdown-toggle dropdown-btn"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                <i
                  style={{ color: '#707070', cursor: 'pointer' }}
                  className="fa-solid fa-ellipsis-vertical fa-2xl"
                ></i>
              </div>
              <div className="dropdown-menu CatDropMenu" id="CatDropMenu">
                <Link
                  className="dropdown-item"
                  id="CatDrop"
                  style={{ color: 'black' }}
                  onClick={() => toggleEditable(data?.Category_name, data?._id)}
                >
                  Edit
                </Link>

                <Link
                  className="dropdown-item"
                  id="CatDrop"
                  style={{ color: 'black' }}
                  onClick={() => toggleEnabled(data._id)}
                >
                  {data?.disable ? 'Enable' : 'Disable'}
                </Link>

                <Link
                  onClick={() => deleteCategory(data._id)}
                  className="dropdown-item"
                  // onmouseover="mouse_over()"
                  id="CatDrop"
                  style={{ color: 'black' }}
                >
                  Delete
                </Link>
              </div>
            </div>
          </li>
        </div>
      </div>
      <FoodPopup
        setAllCategories={setAllCategories}
        allCategories={allCategories}
      />
      <div className="container-fluid">
        <div className="row CategoryMenu">
          {categoryItem.length > 0 &&
            categoryItem?.map((citem) => (
              <div className="col-4 Food-card">
                <div className="show-image">
                  <img src={citem?.image?.url} alt="pasta"></img>
                  <br />
                  <button
                    className="trash"
                    onClick={() => deleteItem(citem?._id)}
                    type="button"
                  >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </button>
                  {openUpdateM && (
                    <FoodUpdate
                      setAllCategories={setAllCategories}
                      allCategories={allCategories}
                    />
                  )}
                  <i
                    data-toggle="modal"
                    data-target="#myModal2"
                    className="fa-solid fa-pen"
                    data-itemID={JSON.stringify(citem)}
                    onClick={(e) => getEditData(e)}
                  ></i>
                </div>
                <h3 style={{ textTransform: 'capitalize' }}>
                  {' '}
                  <NavLink
                    className="linkToDes"
                    to={`/description/${citem?._id}`}
                  >
                    {citem?.Name}{' '}
                  </NavLink>
                </h3>
                <p>${citem?.price}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryMenu;
