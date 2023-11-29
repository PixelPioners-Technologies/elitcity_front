// import React from 'react'
import './Map.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';


const initialCenter = {
  lat: 42.3154, // Latitude for the center of Georgia
  lng: 43.3569  // Longitude for the center of Georgia
};




export default function Map() {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState(initialCenter);
  const [zoomLevel, setZoomLevel] = useState(10);
  const [cityList, setCityList] = useState([]);
  const [selectedCity , setSelectedCity] = useState()


  useEffect(() =>{
    const axiosLocations = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/complex/')
        const data = response.data.results
        const locationsWithCoords = data.map(item => {
          return {
            ...item,
            latitude: item.address.latitude,
            longitude: item.address.longitude,
            // city: item.address.city, 
            // id : item.address.id
          };
        });
        setLocations(locationsWithCoords);
        console.log(locations)
        // setImage(results.images)
      } catch (error) {
        console.error(error)
      }
    };
    axiosLocations();

  },[]);


  // ფუნქციჯა ცალკე ენპოინტზე რომელსაც მოაქვს მხოლოდ ქალაქები 
  useEffect(() => {
  const fetchCities = async () => {
    try {
      const cityResult = await axios.get('http://127.0.0.1:8000/city/');
      const cityData = cityResult.data;
      console.log('gateste qalaqebi',cityData )
      setCityList(cityData.map(cityItem => {
        const city = cityItem.city;
        return typeof city === 'string' ? city : '';
      }));
      console.log("aq unda iyos lati da longi" ,locations)
    } catch (error) {
      console.error(error);
    }
  };
  fetchCities();
}, []);



  const handleMarkerClick = location =>{
    setSelectedLocation(location);
    setMapCenter({ lat:location.latitude , lng: location.longitude  });
    
    setZoomLevel(25)
    
  }


  return (
    <div className='main_map' >
        <div className='filter_cont' >
            <select onChange={(e) =>  setSelectedCity(e.target.value) }   >
              <option value='' > select a sity </option>
              {cityList.map((city, index) => (
                  <option key={index} value={city.toLowerCase()}> {city} </option>
              ))}
           </select>

           {/* სხვა ფილტრები შეიძლება ჩაიწეროს აქ*/}
        </div>
        <div className='for_border' ></div>
        <div className='map_cont'  >
            <LoadScript googleMapsApiKey="AIzaSyDxK-BSMfOM2fRtkTUMpRn5arTyUTR03r0" >
            <GoogleMap
              mapContainerStyle={{ width: '1000px', height: '100vh' }}
              center={mapCenter}
              zoom={zoomLevel}
            >
              {locations.filter(location =>{
                return !selectedCity  || location.address.city.toLowerCase() === selectedCity.toLowerCase();
              }).map(location => (
                <Marker 
                  key={location.id}
                  position={{lat: location.latitude, lng : location.longitude}}
                  onClick={() => {handleMarkerClick(location)}}
                />
              ))
              }
                {/* {selectedLocation && (
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
            )} */}
            </GoogleMap>
          </LoadScript>
      </div>
    </div>
  )
}
