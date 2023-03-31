import React, { useState } from 'react';
import { Container } from 'react-bootstrap';

function AddMultifield() {
  const [inputList, setinputList] = useState([{ firstName: '', lastName: '' }]);

  const handleinputchange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setinputList(list);
  };

  const handleremove = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setinputList(list);
  };

  const handleaddclick = () => {
    setinputList([...inputList, { firstName: '', lastName: '' }]);
  };
  return (
    <Container className="content">
      <div className="row mt-5 d-flex">
        <div className="col-sm-12">
          {inputList.map((x, i) => {
            return (
              <div className="row mb-3 ">
                <div class="form-group col-md-4 mt-2">
                  <input type="file" id="myFile" name="filename" />
                </div>
                <div class="form-group col-md-4">
                  <input
                    type="text"
                    name="lastName"
                    class="form-control"
                    placeholder="Enter ingredient name"
                    onChange={(e) => handleinputchange(e, i)}
                  />
                </div>
                <div class="form-group col-md-2 mt-2 ">
                  {inputList.length !== 1 && (
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handleremove(i)}
                    >
                      <i class="fa fa-minus" aria-hidden="true"></i>
                    </button>
                  )}
                  {inputList.length - 1 === i && (
                    <button
                      className="btn btn-success "
                      onClick={handleaddclick}
                    >
                      <i class="fa fa-plus" aria-hidden="true"></i>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
}
export default AddMultifield;
