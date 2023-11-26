// import React from 'react'
import './Map.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';


const initialCenter = {
  lat: 41.7151,  // Latitude for Tbilisi
  lng: 44.8271   // Longitude for Tbilisi
};



export default function Map() {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState(initialCenter);
  const [zoomLevel, setZoomLevel] = useState(10);
  const [images, setImage] = useState();


  useEffect(() =>{
    const axiosLocations = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/complex/')
        const data = response.data
        const results = data.results
        console.log(results);
        setLocations(results)
        setImage(results.images)
      } catch (error) {
        console.error(error)
      }
    };
    axiosLocations();

  },[]);

  const handleMarkerClick = location =>{
    setSelectedLocation(location);
    setMapCenter({ lat:location.latitude , lng: location.longitude  });
    setZoomLevel(15)
  }


  return (
    <div className='main_map' >
        <div className='filter_cont' >
           map filters should go here
        </div>

        <div className='map_cont'  >
            <LoadScript googleMapsApiKey="AIzaSyDxK-BSMfOM2fRtkTUMpRn5arTyUTR03r0" >
            <GoogleMap
              mapContainerStyle={{ width: '1000px', height: '100vh' }}
              center={mapCenter}
              zoom={zoomLevel}
            >
              {locations.map(location => (
                <Marker
                  key={location.id}
                  position={{ lat: location.latitude, lng: location.longitude }}
                  onClick={() => handleMarkerClick(location)}
                />
                ))}

                {selectedLocation && (
              <InfoWindow
                position={{
                  lat: selectedLocation.latitude,
                  lng: selectedLocation.longitude
                }}
                onCloseClick={() => setSelectedLocation(null)}
              >
                <div>
                  <h2>{selectedLocation.name}</h2>
                  <div className='image_cont'>
                    {selectedLocation.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Image ${index}`}
                        style={{ width: '200px', height: '100px' }}
                      />
                    ))}
                  </div>
                </div>
              </InfoWindow>
            )}
            </GoogleMap>
          </LoadScript>
      </div>
    </div>
  )
}
