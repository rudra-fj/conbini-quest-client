// src/App.js
import React from 'react';
import './App.css';
import SubmitForm from './components/SubmitForm';
import Map from './components/Map';

// --- THE FIX IS HERE ---
// Add these three missing import lines
import Header from './components/Header';
import ItemList from './components/ItemList';
import Footer from './components/Footer'; // <-- THIS IS THE GOOD LINE
// --------------------

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <SubmitForm />
        <Map />
        <ItemList />
      </main>
      <Footer />
    </div>
  );
}

export default App;