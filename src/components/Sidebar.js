/* mport React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAlertLevel } from '../redux/earthquakeSlice';
//import './Sidebar.css'; // Ensure this file contains the required CSS

const Sidebar = () => {
  const dispatch = useDispatch();
  const { alertLevel } = useSelector((state) => state.earthquake);

  const handleAlertChange = (level) => {
    dispatch(setAlertLevel(level));
  };

  return (
    <div className={`sidebar ${alertLevel}`}>
      <h3>Earthquakes since 1905</h3>
      <div>
        <p>View earthquakes with:</p>
        <div className="radio-group">
          <label className="radio-option red">
            <input
              type="radio"
              name="alertLevel"
              value="red"
              checked={alertLevel === 'red'}
              onChange={() => handleAlertChange('red')}
            />
            Red alert level
          </label>
          <label className="radio-option orange">
            <input
              type="radio"
              name="alertLevel"
              value="orange"
              checked={alertLevel === 'orange'}
              onChange={() => handleAlertChange('orange')}
            />
            Orange alert level
          </label>
          <label className="radio-option yellow">
            <input
              type="radio"
              name="alertLevel"
              value="yellow"
              checked={alertLevel === 'yellow'}
              onChange={() => handleAlertChange('yellow')}
            />
            Yellow alert level
          </label>
          <label className="radio-option green">
            <input
              type="radio"
              name="alertLevel"
              value="green"
              checked={alertLevel === 'green'}
              onChange={() => handleAlertChange('green')}
            />
            Green alert level
          </label>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAlertLevel } from '../redux/earthquakeSlice';
import EarthquakeList from './EarthquakeList'; // Import EarthquakeList component
//import './Sidebar.css';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { alertLevel } = useSelector((state) => state.earthquake);

  const handleAlertChange = (level) => {
    dispatch(setAlertLevel(level));
  };

  return (
    <div className={`sidebar ${alertLevel}`}>
      <h3>Earthquakes since 1905</h3>
      <div>
        <p>View earthquakes with:</p>
        <div className="radio-group">
          <label className="radio-option red">
            <input
              type="radio"
              name="alertLevel"
              value="red"
              checked={alertLevel === 'red'}
              onChange={() => handleAlertChange('red')}
            />
            Red alert level
          </label>
          <label className="radio-option orange">
            <input
              type="radio"
              name="alertLevel"
              value="orange"
              checked={alertLevel === 'orange'}
              onChange={() => handleAlertChange('orange')}
            />
            Orange alert level
          </label>
          <label className="radio-option yellow">
            <input
              type="radio"
              name="alertLevel"
              value="yellow"
              checked={alertLevel === 'yellow'}
              onChange={() => handleAlertChange('yellow')}
            />
            Yellow alert level
          </label>
          <label className="radio-option green">
            <input
              type="radio"
              name="alertLevel"
              value="green"
              checked={alertLevel === 'green'}
              onChange={() => handleAlertChange('green')}
            />
            Green alert level
          </label>
        </div>
      </div>
      {/* Includes EarthquakeList as a child */}
      <EarthquakeList />
    </div>
  );
};

export default Sidebar;


