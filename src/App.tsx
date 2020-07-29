import React from 'react';
import './App.css';
import MainLayout from './layout/MainLayout';
import { Provider } from 'react-redux';
import Store from './data/store';

function App() {
  return (
    <Provider store={Store}>
      <div className="container">
        <MainLayout />
      </div>
    </Provider>
  );
}

export default App;
