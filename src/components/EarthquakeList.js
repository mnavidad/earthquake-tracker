import React from 'react';
import { useSelector } from 'react-redux';

const EarthquakeList = () => {
  const { earthquakes } = useSelector((state) => state.earthquake);

  return (
    <div className="earthquake-list">
      <h4>Earthquake List</h4>
      {earthquakes.map((quake, index) => (
        <div key={index}>
          <p>{quake.title}</p>
          <p>Magnitude: {quake.mag}</p>
        </div>
      ))}
    </div>
  );
};

export default EarthquakeList;
