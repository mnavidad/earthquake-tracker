import React, { useEffect, useRef } from 'react';
import WebMap from '@arcgis/core/WebMap';
import MapView from '@arcgis/core/views/MapView';
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer';
import TileLayer from '@arcgis/core/layers/TileLayer';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import GroupLayer from '@arcgis/core/layers/GroupLayer';
import Expand from '@arcgis/core/widgets/Expand';
import Legend from '@arcgis/core/widgets/Legend';
import { useSelector, useDispatch } from 'react-redux';
import { setEarthquakes } from '../redux/earthquakeSlice';

const MapViewComponent = () => {
  const viewDivRef = useRef(null);
  const { alertLevel } = useSelector((state) => state.earthquake);
  const dispatch = useDispatch();

  useEffect(() => {
    const createQuakeSymbol = (color) => ({
      type: 'simple-marker',
      color: null,
      outline: {
        color: color,
        width: '2px',
      },
    });

    // GeoJSON Layer for Earthquake Data
    const layer = new GeoJSONLayer({
      url: 'https://earthquake.usgs.gov/fdsnws/event/1/query',
      copyright: 'USGS - Japan earthquakes since 1905',
      customParameters: {
        format: 'geojson',
        starttime: '1905-01-01',
        endtime: new Date().toISOString().split('T')[0],
        minlatitude: 24,
        maxlatitude: 46,
        minlongitude: 123,
        maxlongitude: 145,
        orderby: 'magnitude',
        minmagnitude: 1,
        alertlevel: alertLevel,
      },
      definitionExpression: "place LIKE '%Japan'",
      effect: 'bloom(2 1px 0)',
      title: 'USGS Earthquakes',
      renderer: {
        type: 'unique-value',
        field: 'alert',
        uniqueValueInfos: [
          { value: 'red', symbol: createQuakeSymbol('red') },
          { value: 'orange', symbol: createQuakeSymbol('orange') },
          { value: 'yellow', symbol: createQuakeSymbol('yellow') },
          { value: 'green', symbol: createQuakeSymbol('#136d15') },
        ],
        visualVariables: [
          {
            type: 'size',
            field: 'mag',
            stops: [
              { value: 4.5, size: '1px' },
              { value: 6, size: '20px' },
              { value: 8, size: '60px' },
            ],
          },
        ],
      },
      popupTemplate: {
        title: 'Earthquake Info',
        content:
          'Magnitude <b>{mag}</b> {type} hit {place} on <b>{time}</b> <br/><br/> <a href={url}>More info</a>',
        fieldInfos: [
          {
            fieldName: 'time',
            format: { dateFormat: 'short-date-short-time' },
          },
        ],
      },
    });

    // WebMap with custom basemap and layers
    const map = new WebMap({
      basemap: {
        baseLayers: [
          new TileLayer({
            url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',
            effect: 'blur(8px) brightness(1.2) grayscale(0.8)',
          }),
          new GroupLayer({
            effect: 'brightness(150%)',
            layers: [
              new TileLayer({
                url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',
              }),
              new FeatureLayer({
                url: 'https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/World_Countries_(Generalized)/FeatureServer',
                definitionExpression: "ISO='JP'",
                renderer: {
                  type: 'simple',
                  symbol: {
                    type: 'simple-fill',
                    color: 'white',
                  },
                },
                effect: 'bloom(4 0 0)',
                blendMode: 'destination-in',
              }),
            ],
          }),
        ],
      },
      layers: [layer],
    });
    
      // Ensure legend is enabled for all operational layers
      map.layers.forEach(layer => {
        layer.legendEnabled = true;
      });
    // MapView initialization
    const view = new MapView({
      container: viewDivRef.current,
      map: map,
      center: [137.632, 35.294],
      zoom: 4,
      constraints: {
        minScale: 18489297.737236,
      },
      padding: {
        right: 370,
      },
    });

    // Load layer and update quake list
    layer.load().then(() => {
      updateQuakeList();
    });

    // Function to update the earthquake list in Redux store
    const updateQuakeList = async () => {
      const query = layer.createQuery().set({
        outFields: ['mag', 'title', 'time', layer.objectIdField],
        returnGeometry: true,
      });

      const { features } = await layer.queryFeatures(query);
      dispatch(setEarthquakes(features.map((f) => f.attributes)));

      // Update the results panel UI
      const resultsHeading = document.getElementById('resultsHeading');
      if (resultsHeading) {
        resultsHeading.innerHTML = `<b>${features.length}</b> ${alertLevel} alert level earthquakes.`;
      }
    };

    
    view.when(() => {
        const legendExpand = new Expand({
          view: view,
          content: new Legend({ view: view }),
          expanded: false,
          expandIconClass: "esri-icon-legend",
          expandTooltip: "Legend"
        });
      
        view.ui.add(legendExpand, "top-left");
      });

   // view.ui.add(legendExpand, 'top-left');

    return () => {
      if (view) {
        view.destroy();
      }
    };
  }, [alertLevel, dispatch]);

  return <div ref={viewDivRef} style={{ height: '100vh', width: '100%' }} />;
};

export default MapViewComponent;
