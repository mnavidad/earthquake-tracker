import React from 'react';
import { Provider } from 'react-redux';
import MapViewComponent from './components/MapView';
import Sidebar from './components/Sidebar';
import store from './redux/store';
import './App.css';

const App = () => {
  return (
    <Provider store={store}>
      <div className="app">
        <Sidebar />
        <MapViewComponent />
        
      </div>
    </Provider>
  );
};

export default App;

