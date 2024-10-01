import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import MapViewComponent from './components/MapView';
import Sidebar from './components/Sidebar';
import store from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap
import './App.css';

// Modal Component using Bootstrap
function Modal({ children, show, handleClose }) {
  return ReactDOM.createPortal(
    <div className={`modal fade ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">GeoJSONLayer Earthquake track application</h5>
            <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {children}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}

const App = () => {
  // State to control the visibility of the modal
  const [modalShow, setModalShow] = useState(false);

  // Automatically show the modal when the component mounts
  useEffect(() => {
    setModalShow(true);  // Show modal on load
  }, []);

  // Close modal handler
  const handleModalClose = () => {
    setModalShow(false);
  };

  return (
    <Provider store={store}>
      <div className="app">
        {/* Bootstrap Modal */}
        <Modal show={modalShow} handleClose={handleModalClose}>
          <p>This sample shows how to add an instance of GeoJSONLayer 
             from the USGS earthquakes catalog and fetch a new set of data after the layer is loaded.
             This is a redux, bootstrap version of the Esri earthquake-track web application</p>
        </Modal>

        {/* Other components (MapViewComponent and Sidebar) */}
        <Sidebar />
        <MapViewComponent />
      </div>
    </Provider>
  );
};

export default App;


