import React, { useState, useEffect } from 'react';
import './Css/CategoryMenu.css';
import 'react-image-crop/dist/ReactCrop.css';
import { useValue } from '../context/ContextProvider';
import { NavLink } from 'react-router-dom';

function CategorySlug(props) {
  const [categoryItem, setCategoryItem] = useState([]);
  const { data, setAllCategories, allCategories } = props;

  useEffect(() => {
    if (data?.items.length > 0) {
      setCategoryItem(data.items);
    }
  }, [data]);
  if (categoryItem.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="row m-0 CategoryTitle">
        <div className="col-lg-3 col-3"></div>

        <div className="col-lg-6 col-6 text-center">
          <h1 style={{ textTransform: 'capitalize' }}>{data?.Category_name}</h1>
        </div>

        <div
          className="col-lg-3 col-3 d-inline"
          style={{ position: 'relative' }}
        ></div>
      </div>
      <div className="container-fluid">
        <div className="row CategoryMenu">
          {categoryItem.length > 0 &&
            categoryItem?.map((citem) => (
              <div className="col-4 Food-card">
                <div>
                  {' '}
                  <NavLink
                    className="linkToDes"
                    to={`/itemdescriptions/${citem?._id}`}
                  >
                    {' '}
                    <div className="show-image">
                      <img
                        className="show-image-img"
                        id="Item-image-slug"
                        src={citem?.image?.url}
                        alt="pasta"
                      />
                    </div>
                  </NavLink>
                  <br />
                </div>
                <h3 style={{ textTransform: 'capitalize' }}>
                  {' '}
                  <NavLink
                    className="linkToDes"
                    to={`/itemdescriptions/${citem?._id}`}
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

export default CategorySlug;
