import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MyComponent = () => {
  const [restaurants, setRestaurants] = useState([
    { id: 1, name: 'Restaurant 1', enabled: true },
  ]);

  const toggleEnabled = (id) => {
    const item = restaurants.find((item) => item.id === id);
    const confirmed = window.confirm(
      `Do you want to ${item.enabled ? 'disable' : 'enable'} this item?`
    );
    if (confirmed) {
      setRestaurants(
        restaurants.map((item) => {
          if (item.id === id) {
            return { ...item, enabled: !item.enabled };
          } else {
            return item;
          }
        })
      );
    }
  };

  return (
    <div>
      {/* <ul> */}
      {restaurants.map((item) => (
        // <li key={item.id}>
        <Link
          // className={`btn ${item.enabled ? 'btn-success' : 'btn-danger'}`}
          onClick={() => toggleEnabled(item.id)}
        >
          {item.enabled ? 'Enabled' : 'Disabled'}
        </Link>
        // </li>
      ))}
      {/* </ul> */}
    </div>
  );
};

export default MyComponent;
