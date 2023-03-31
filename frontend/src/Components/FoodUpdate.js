import React, { useState, useEffect } from 'react';
import './Css/CategoryMenu.css';
import 'react-image-crop/dist/ReactCrop.css';
import { useValue } from '../context/ContextProvider';
import instance from '../api/instance';

function FoodUpdate({ setAllCategories, allCategories }) {
  const {
    state: { categoryName, editItem },
    dispatch,
  } = useValue();

  const [text, setText] = useState('');
  const [itemId, setItemId] = useState(null);
  const [Name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [description, setDescription] = useState('');
  const [displayImage, setDisplayImage] = useState(image.url);
  const [inputTag, setInputTag] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryImagesUrl, setGalleryImagesURL] = useState([]);
  const [categoryId, setcategoryId] = useState();

  useEffect(() => {
    if (!editItem) return;
    setItemId(editItem?._id);
    setName(editItem?.Name);
    setPrice(editItem?.price);
    setText(editItem?.ingredients);
    setDescription(editItem?.description);
    setDisplayImage(editItem?.image);
    setGalleryImages(editItem?.gallery);
    setGalleryImagesURL(editItem?.gallery);
    setcategoryId(editItem?.category_id);
  }, [editItem]);

  const handleImage = (e) => {
    const image = e.target.files[0];
    setImage(e.target.files[0]);
    var reader = new FileReader();
    reader.onload = function () {
      if (localStorage.getItem('token')) {
        const formdata = new FormData();

        formdata.append('image', image);
        const user = JSON.parse(localStorage.getItem('token'));
        instance
          .post('/items/api/image', formdata, {
            headers: {
              Authorization: `x-access-token ${user.token}`,
            },
          })
          .then((response) => {
            setDisplayImage(response.data);
          });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  // console.log(editItem);

  async function findUpdateItems(event) {
    console.log(galleryImages.length);
    console.log(displayImage);
    if (localStorage.getItem('token')) {
      const formdata = new FormData();
      formdata.append('Name', Name);
      formdata.append('price', price);
      formdata.append('image', displayImage.url);
      formdata.append('image_id', displayImage.public_id);
      formdata.append('ingredients', text);
      formdata.append('description', description);
      formdata.append('category_id', categoryId);
      formdata.append('gallery', JSON.stringify(galleryImages));
      const user = JSON.parse(localStorage.getItem('token'));
      instance
        .put(`/items/api/items/${itemId}`, formdata, {
          headers: {
            Authorization: `x-access-token ${user.token}`,
          },
        })
        .then((response) => {
          let updateItem = response.data;
          const newArrayCategory = allCategories.map((item) => {
            if (item._id === updateItem.category_id) {
              const fooditems = [...item.items];
              const latestIteminex = fooditems.findIndex(
                (menuitem) => menuitem._id === updateItem._id
              );
              fooditems[latestIteminex] = updateItem;
              const latestObject = {
                Category_name: item.Category_name,
                items: [...fooditems],
                _id: item._id,
              };
              return latestObject;
            } else {
              return item;
            }
          });
          console.log(newArrayCategory);
          setAllCategories([...newArrayCategory]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  const onHandleChange = (e) => {
    setText(e.target.value);
    setIngredients(e.target.value);
  };

  const deleteFirstElement = (array) => {
    if (array[0] === '●') {
      array.shift();
    }
    return array.join(' ');
  };

  const checkEnter = (e) => {
    if (e.key === 'Enter') {
      let stext = text.split('\n');
      if (stext.length === 1) {
        setText('● ' + text);
      } else {
        let newtext = stext[0];
        stext.forEach((element, index) => {
          if (index !== 0 && index <= 5) {
            const newele = element.split(' ');
            const addelem =
              newele.length > 1 ? deleteFirstElement(newele) : newele[0];
            newtext = newtext + '\n' + '● ' + addelem;
          }
        });
        if (stext.length > 5) {
          const confirmed = window.confirm(
            'You can only add a maximum of 6 items. Do you want to keep the existing items?'
          );
          if (confirmed) {
            setText(newtext);
          } else {
            setText(stext.slice(0, 6).join('\n'));
          }
        } else {
          setText(newtext);
        }
      }
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.dataTransfer.files[0];
    reader.onloadend = () => {
      if (galleryImages.length < 6) {
        setGalleryImages([...galleryImages, reader.result]);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = (event) => {
    event.preventDefault();
    const fileInfo = event.target.files[0];

    if (localStorage.getItem('token')) {
      const formdata = new FormData();
      formdata.append('image', fileInfo);
      const user = JSON.parse(localStorage.getItem('token'));
      instance
        .post('/items/api/image', formdata, {
          headers: {
            Authorization: `x-access-token ${user.token}`,
          },
        })
        .then((response) => {
          console.log('response', response.data);
          const file = [[response.data]];
          setGalleryImages([...galleryImages, ...file]);
        });
    }
  };

  return (
    <div>
      <div>
        <div className="modal fade" id="myModal2" role="dialog">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  id="close-btn"
                  data-dismiss="modal"
                >
                  &times;
                </button>
                <h4
                  className="modal-title"
                  style={{ textTransform: 'capitalize' }}
                >
                  {categoryName && categoryName}
                </h4>
              </div>
              <form>
                <div className="modal-body">
                  <div className="detailHeading">
                    <h1>Update your item details</h1>
                    <div className="featured-img">
                      {displayImage && (
                        <img src={displayImage.url} alt="Item Image" />
                      )}
                    </div>
                  </div>
                  <br />
                  <label className="form-label" for="custom File"></label>

                  <input
                    onChange={handleImage}
                    type="file"
                    className="form-control"
                    id="customFile"
                  />
                  <br />
                  <div className=" input-food">
                    <input
                      value={Name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      className=" py-2 food-detail2 "
                      placeholder="Item Name"
                      required
                    ></input>
                    <br />
                    <br />
                    <input
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      type="number"
                      className=" py-2  food-detail3"
                      placeholder="Price"
                      required
                    ></input>
                  </div>
                  <br />
                  <textarea
                    id="textarea_id"
                    onChange={onHandleChange}
                    onKeyDown={checkEnter}
                    value={text}
                    rows="4"
                    cols="50"
                    type="string"
                    className="py-2 food-description"
                    placeholder="Ingredients"
                    required
                  ></textarea>
                  <textarea
                    rows="4"
                    cols="50"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    type="string"
                    className="py-2 food-description"
                    placeholder="Description"
                    required
                  ></textarea>

                  <div className=" galleyInputImage ">
                    {galleryImages.length > 0 &&
                      galleryImages.map((image) => (
                        <div
                          className="col-lg-2 col-md-4 inputGalleryImg"
                          key={image}
                        >
                          <i
                            id="gImgCross"
                            className="fa fa-times"
                            aria-hidden="true"
                            onClick={() => {
                              setGalleryImages(
                                galleryImages.filter((img) => img !== image)
                              );
                            }}
                          />
                          <img
                            src={image[0]?.url}
                            alt="uploaded"
                            className="FoodPopup-GalleryImg"
                          />
                        </div>
                      ))}
                    {galleryImages.length < 6 ? (
                      <div
                        className="newGalleryImageAdd"
                        onClick={() => {
                          const fileInput = document.createElement('input');
                          fileInput.type = 'file';
                          fileInput.accept = 'image/*';
                          fileInput.style.display = 'none';
                          fileInput.onchange = handleUpload;
                          document.body.appendChild(fileInput);
                          fileInput.click();
                          document.body.removeChild(fileInput);
                        }}
                        onDrop={handleDrop}
                        onDragOver={(event) => event.preventDefault()}
                      >
                        <div>
                          <label
                            style={{
                              position: 'absolute',
                              transform: 'translate(-50%, -50%)',
                              marginLeft: '33px',
                              marginTop: '35px',
                            }}
                          >
                            <i className="fa-solid fa-camera fa-2xl" />
                          </label>
                          <p style={{ fontSize: '10px', marginTop: '50px' }}>
                            + Gallery Image
                          </p>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="btn-save-cancel">
                  <button
                    type="submit"
                    className="btn btn-save mx-1"
                    data-dismiss="modal"
                    onClick={findUpdateItems}
                  >
                    Update
                  </button>
                  <button
                    type="submit"
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
    </div>
  );
}

export default FoodUpdate;
