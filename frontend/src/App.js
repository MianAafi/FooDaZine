import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.js';
import Homepage from './Screen/Homepage';
import RestaurantMenu from './Screen/RestaurantMenu';
import Register from './Screen/Register';
import FoodDescription from './Screen/FoodDescription';
import LoginYourAccount from './Components/LoginYourAccount';
import RestaurantSlug from './Screen/RestaurantSlug';
import DescriptionSlug from './Components/DescriptionSlug';

function App() {
  return (
    <>
      <BrowserRouter>
        <div>
          {/* <header>
            <Link to="/">FooDaZine</Link>
          </header> */}
          <main>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/" element={<LoginYourAccount />} />
              <Route path="/register" element={<Register />} />
              <Route path="/menu" element={<RestaurantMenu />} />
              <Route path="/description/:id" element={<FoodDescription />} />
              <Route path="/:slug" element={<RestaurantSlug />} />

              <Route
                path="/itemdescriptions/:id"
                element={<DescriptionSlug />}
              />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
