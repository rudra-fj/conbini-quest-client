import React from 'react';

// 'item' is passed in as a "prop" from ItemList
function ItemCard({ item }) {
  return (
    <div className="item-card">
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <small>Spotted on: {new Date(item.date_spotted).toLocaleDateString()}</small>
    </div>
  );
}

export default ItemCard;