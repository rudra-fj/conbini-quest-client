import React, { useState } from 'react';
import axios from 'axios';

function SubmitForm() {
  // Define the same list of stores for the dropdown
  const stores = [
    { id: 1, name: 'FamilyMart Shinjuku', address: '1-1-5 Nishi-Shinjuku, Shinjuku-ku, Tokyo' },
    { id: 2, name: 'Lawson Shibuya', address: '2-24-12 Shibuya, Shibuya-ku, Tokyo' },
    { id: 3, name: '7-Eleven Akihabara', address: '1-15-9 Sotokanda, Chiyoda-ku, Tokyo' }
  ];

  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedStore, setSelectedStore] = useState('1'); // Default to the first store's ID
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!itemName || !selectedStore) {
      setMessage('Item name and store are required!');
      return;
    }

    const newItem = {
      name: itemName,
      description: description,
      store_id: selectedStore,
    };

    try {
      // This still talks to the live server
      await axios.post('https://conbini-quest-server.onrender.com/api/items', newItem);
      setMessage('Item submitted successfully! Refresh the page to see your find.');
      // Clear the form
      setItemName('');
      setDescription('');
    } catch (error) {
      setMessage('Failed to submit item. Please try again.');
      console.error('Error submitting item:', error);
    }
  };

  return (
    <div className="submit-form">
      <h2>Submit a New Find</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          required
        />
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          value={selectedStore}
          onChange={(e) => setSelectedStore(e.target.value)}
          required
        >
          {stores.map(store => (
            <option key={store.id} value={store.id}>{store.name} - {store.address}</option>
          ))}
        </select>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default SubmitForm;