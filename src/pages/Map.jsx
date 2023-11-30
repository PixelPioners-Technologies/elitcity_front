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

  const [selectedParentDistrict, setSelectedParentDistrict] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const [districtOptions, setDistrictOptions] = useState([]);



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
      const response = await axios.get('http://127.0.0.1:8000/city/');
      setCityList(response.data)
      
    } catch (error) {
      console.error(error);
    }
  };
  fetchCities();
}, []);



  const handleMarkerClick = location =>{
    setSelectedLocation(location);
    setMapCenter({  lat:location.latitude , lng: location.longitude  });
    setZoomLevel(25)

    
  }


   const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    setSelectedParentDistrict(''); // Reset parent district selection
    setDistrictOptions([]); // Reset district options

    // If a city was selected, prepare the parent district options
    if (city) {
      const foundCity = cityList.find(c => c.city === city);
      setDistrictOptions(foundCity ? foundCity.pharent_districts : []);
    }
  };


  const handleParentDistrictChange = (e) => {
    const pDistrict = e.target.value;
    setSelectedParentDistrict(pDistrict); // Update the selected parent district
  
    // Find the selected city
    const foundCity = cityList.find(c => c.city === selectedCity);
    if (!foundCity) return; // If the city isn't found, exit the function
  
    // Find the parent district within the selected city
    const foundParentDistrict = foundCity.pharent_districts.find(pd => pd.pharentDistrict === pDistrict);
  
    // Update the district options based on the selected parent district
    setDistrictOptions(foundParentDistrict ? foundParentDistrict.districts : []);
  };




  return (
    <div className='main_map' >
         <div className='filter_cont'>
      {/* City Dropdown */}
       <select onChange={handleCityChange} value={selectedCity}>
        <option value=''>Select a city</option>
        {cityList.map((cityItem, index) => (
          <option key={index} value={cityItem.city}>{cityItem.city}</option>
        ))}
      </select>

      {/* Parent District Dropdown */}
      {selectedCity && (
  <select onChange={handleParentDistrictChange} value={selectedParentDistrict}>
    <option value=''>Select a parent district</option>
    {cityList.find(city => city.city === selectedCity)?.pharent_districts.map((pd, index) => (
      <option key={index} value={pd.pharentDistrict}>{pd.pharentDistrict}</option>
    ))}
  </select>
)}

      {/* District Dropdown */}
      {selectedParentDistrict && (
        <select onChange={(e) => setSelectedDistrict(e.target.value)} value={selectedDistrict}>
          <option value=''>Select a district</option>
          {districtOptions.map((d, index) => (
            <option key={index} value={d.district}>{d.district}</option>
          ))}
        </select>
      )}
        </div>
        <div className='for_border' ></div>
        <div className='map_cont'  >
            <LoadScript googleMapsApiKey="AIzaSyDxK-BSMfOM2fRtkTUMpRn5arTyUTR03r0" >
            <GoogleMap
              mapContainerStyle={{ width: '1000px', height: '100vh' }}
              center={mapCenter}
              zoom={zoomLevel}
            >
              {
                locations
                  .filter(location => !selectedCity || location.address.city.toLowerCase() === selectedCity.toLowerCase())
                  .filter(location => !selectedParentDistrict || location.address.pharentDistrict.toLowerCase() === selectedParentDistrict.toLowerCase())
                  .filter(location => !selectedDistrict || location.address.district.toLowerCase() === selectedDistrict.toLowerCase())
                  .map(location => (
                    <Marker 
                      key={location.id}
                      position={{lat: location.latitude, lng : location.longitude}}
                      onClick={() => {handleMarkerClick(location)}}
                      />
                  ))
              }
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




