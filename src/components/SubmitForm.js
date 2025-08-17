import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SubmitForm() {
  const [stores, setStores] = useState([]);
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedStore, setSelectedStore] = useState('');
  const [message, setMessage] = useState('');

  // Fetch stores for the dropdown
  useEffect(() => {
    axios.get('https://conbini-quest.onrender.com/api/stores')
      .then(response => {
        setStores(response.data);
        if (response.data.length > 0) {
          setSelectedStore(response.data[0].id); // Default to the first store
        }
      })
      .catch(error => console.error('Error fetching stores:', error));
  }, []);

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
      await axios.post('https://conbini-quest.onrender.com/api/items', newItem)
      setMessage('Item submitted successfully!');
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