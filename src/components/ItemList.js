import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemCard from './ItemCard';

function ItemList() {
  // 'items' is the variable that will hold our data.
  // 'setItems' is the function we use to update it.
  const [items, setItems] = useState([]);

  // This useEffect hook runs once when the component loads.
  useEffect(() => {
    // We ask our backend server for the list of items.
    axios.get('https://conbini-quest.onrender.com')
      .then(response => {
        // If successful, we update our 'items' variable with the data.
        setItems(response.data);
      })
      .catch(error => {
        // If there's an error, we log it to the console.
        console.error('There was an error fetching the items!', error);
      });
  }, []); // The empty array [] means this effect runs only once.

  return (
    <div className="item-list">
      <h2>Latest Finds</h2>
      {items.length === 0 ? (
        <p>No items found yet... Go find some!</p>
      ) : (
        items.map(item => (
          <ItemCard key={item.id} item={item} />
        ))
      )}
    </div>
  );
}

export default ItemList;