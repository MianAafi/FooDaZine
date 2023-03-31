import React, { useState } from 'react';
import instance from '../api/instance';
import './Css/CategoryPopup.css';

function CategoryPopup({ CategoryUpdate, setAllCategories, allCategories }) {
  const [Category_name, setCategory_name] = useState('');

  async function addCategory(event) {
    event.preventDefault();

    console.log(Category_name);

    if (localStorage.getItem('token')) {
      const user = JSON.parse(localStorage.getItem('token'));

      instance
        .post(
          '/category/api/category',
          {
            Category_name,
          },
          {
            headers: {
              Authorization: `x-access-token ${user.token}`,
            },
          }
        )
        .then((response) => {
          const responseData = response.data;
          let pusitem = {
            Category_name: responseData.Category_name,
            _id: responseData._id,
            items: [],
          };
          setAllCategories([...allCategories, pusitem]);
          // console.log('Category added ');
        });
    }
  }

  return (
    <div>
      <div className="modal fade" id="myModal1" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <form>
              <div className="modal-header">
                <button
                  type="button"
                  className="close "
                  id="close-btn"
                  data-dismiss="modal"
                >
                  &times;
                </button>
                <h4 className="modal-title">New Category</h4>
              </div>
              <div className="modal-body">
                <input
                  value={Category_name}
                  onChange={(e) => setCategory_name(e.target.value)}
                  type="text"
                  placeholder="Enter Category title"
                  className="category-input"
                ></input>
              </div>
              <div className="modal-footer">
                <button
                  onClick={addCategory}
                  type="submit"
                  className="btn btn-save "
                  data-dismiss="modal"
                >
                  Save
                </button>
                <button
                  type="cancel"
                  className="btn btn-default"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryPopup;
