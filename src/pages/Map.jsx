import React, { useState, useEffect , useRef } from 'react';
import axios from 'axios';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import Modal from './M0dal';
import './Map.css'



const initialCenter = {
  lat: 41.7151,
  lng: 44.8271
};

export default function Map() {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState(initialCenter);
  const [zoomLevel, setZoomLevel] = useState(10);
  const [cityList, setCityList] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [markedParentDistricts, setMarkedParentDistricts] = useState(new Set());
  


  // fetch whole complex for location latitude and longitude
  useEffect(() => {
    const axiosLocations = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/complex/');
        const data = response.data.results;
        const locationsWithCoords = data.map(item => ({
          ...item,
          latitude: item.address.latitude,
          longitude: item.address.longitude,
        }));
        setLocations(locationsWithCoords);
      } catch (error) {
        console.error(error);
      }
    };
    axiosLocations();
  }, []);



// fetch only cities , pharentDistricts and districts 
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/city/');
        setCityList(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCities();
  }, []);




  const handleMarkerClick = location => {
    setSelectedLocation(location);
    setMapCenter({ lat: location.latitude, lng: location.longitude });
    setZoomLevel(25);
  };

  const handleCityClick = city => {
    setSelectedCity(city);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // setMarkedParentDistricts(new Set());  ეს რო ჩართულია , ლოკაციის ძიების ფანჯრის დახურვისას ფილტრაცია აღარ მუშაობს
  };




  const toggleParentDistrict = (parentDistrict) => {
    setMarkedParentDistricts(prev => {
      const newMarked = new Set(prev);
      if (newMarked.has(parentDistrict)) {
        newMarked.delete(parentDistrict);
      } else {
        newMarked.add(parentDistrict);
      }
      return newMarked;
    });
  };



  const filteredLocations = locations.filter(location => {
    if (!selectedCity) return true; // If no city is selected, show all locations
    if (location.address.city.toLowerCase() !== selectedCity.toLowerCase()) return false;
    // If no parent district is marked, show all locations within the city
    if (markedParentDistricts.size === 0) return true;
    return markedParentDistricts.has(location.address.pharentDistrict.toLowerCase());
  });

  // ლოგიკა რუკის დაზუმვისთვის ლოკაციიის მონიშვნისას
  const mapRef = useRef();

   // Function to update the map's bounds based on the filtered locations
   const fitBounds = (map, locations) => {
    const bounds = new window.google.maps.LatLngBounds();
    locations.forEach(location => {
      bounds.extend(new window.google.maps.LatLng(location.latitude, location.longitude));
    });
    map.fitBounds(bounds);
  };

  useEffect(() => {
    if (!mapRef.current || !selectedCity || markedParentDistricts.size === 0) return;
    
    // Assuming mapRef.current is the current Google Map instance
    const mapInstance = mapRef.current.state.map;

    // Call fitBounds to adjust the map view
    fitBounds(mapInstance, filteredLocations);

    // Optionally set a max zoom level
    const listener = google.maps.event.addListenerOnce(mapInstance, 'bounds_changed', () => {
      if (mapInstance.getZoom() > 15) {
        mapInstance.setZoom(15); // Set max zoom level here
      }
    });

    // Clean up the listener after it's been set
    return () => google.maps.event.removeListener(listener);
  }, [selectedCity, markedParentDistricts, filteredLocations]); // Depend on these states





  return (
    <div className='main_map'>
      <div className='filter_cont'>
        {/* City buttons to open the modal */}
        {cityList.map((cityItem, index) => (
          <button key={index} onClick={() => handleCityClick(cityItem.city)}  className='button-19' >
            {cityItem.city}
          </button>
        ))}

        {/* The modal for displaying parent districts */}
        <Modal isOpen={isModalOpen} close={closeModal}>
          <h2>Select Parent Districts</h2>
          {cityList.find(city => city.city === selectedCity)?.pharent_districts.map((pd, index) => (
            <div key={index}>
              <label>
                <input
                  type="checkbox"
                  onChange={() => toggleParentDistrict(pd.pharentDistrict.toLowerCase())}
                  checked={markedParentDistricts.has(pd.pharentDistrict.toLowerCase())}
                />
                {pd.pharentDistrict}
              </label>
            </div>
          ))}
          <button onClick={closeModal}>Close</button>
        </Modal>


      </div>
      <div className='for_border' ></div>
      <div className='map_cont'>
        <LoadScript googleMapsApiKey="AIzaSyDxK-BSMfOM2fRtkTUMpRn5arTyUTR03r0">
          <GoogleMap
            mapContainerStyle={{ width: '1000px', height: '100vh' }}
            center={mapCenter}
            zoom={zoomLevel}
            ref={mapRef}
          >
            {filteredLocations.map(location => (
              <Marker
                key={location.id}
                position={{ lat: location.latitude, lng: location.longitude }}
                onClick={() => handleMarkerClick(location)}
              />
            ))}

            {selectedLocation && (
              <InfoWindow
                position={{ lat: selectedLocation.latitude, lng: selectedLocation.longitude }}
                onCloseClick={() => setSelectedLocation(null)}
              >
                <div>
                  <h2>{selectedLocation.name}</h2>
                  {/* ...other info window contents... */}
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
}



