import React, { useState, useEffect , useRef } from 'react';
import axios from 'axios';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import Modal from './Modal';
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
  const [modalContent, setModalContent] = useState('cities');
  const [markedDistricts, setMarkedDistricts] = useState(new Set());

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
        const response = await axios.get('http://127.0.0.1:8000/location/');
        setCityList(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCities();
  }, []);




  const handleMarkerClick = location => {
  // Check if the location has valid coordinates before setting the map center
  if (location.latitude && location.longitude) {
    setSelectedLocation(location);
    setMapCenter({ lat: location.latitude, lng: location.longitude });
    setZoomLevel(15); // Adjust the zoom level as needed
  } else {    // Handle the case where coordinates are not available

    console.error("Invalid coordinates for location:", location);
  }
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


  const toggleDistrict = (district, parentDistrict) => {
    setMarkedDistricts((prev) => {
      const newMarked = new Set(prev);
      if (newMarked.has(district)) {
        newMarked.delete(district);
  
        // Optional: Unmark the parent district if no other districts are marked
        const parentDistricts = cityList.find((c) => c.city === selectedCity)?.pharent_districts;
        const parent = parentDistricts?.find((pd) => pd.pharentDistrict.toLowerCase() === parentDistrict.toLowerCase());
        const allUnmarked = parent?.districts.every((d) => !newMarked.has(d.district.toLowerCase()));
  
        if (allUnmarked) {
          setMarkedParentDistricts((prevParent) => {
            const newMarkedParent = new Set(prevParent);
            newMarkedParent.delete(parentDistrict.toLowerCase());
            return newMarkedParent;
          });
        }
      } else {
        newMarked.add(district);
  
        // Automatically mark the parent district when any child district is marked
        setMarkedParentDistricts((prevParent) => {
          const newMarkedParent = new Set(prevParent);
          newMarkedParent.add(parentDistrict.toLowerCase());
          return newMarkedParent;
        });
      }
      return newMarked;
    });
  };
  


  const filteredLocations = locations.filter(location => {
    const cityMatch = !selectedCity || location.address.city.toLowerCase() === selectedCity.toLowerCase();
    const parentDistrictMatch = markedParentDistricts.size === 0 || markedParentDistricts.has(location.address.pharentDistrict.toLowerCase());
    const districtMatch = markedDistricts.size === 0 || markedDistricts.has(location.address.district.toLowerCase());
    return cityMatch && parentDistrictMatch && districtMatch;
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
  }, [selectedCity, markedParentDistricts, filteredLocations, markedDistricts]); // Depend on these states



  // ----------------------------axios for django filters -------------------------------------------------






  // ------------------------------------------------------------------------------------------------------

  const handleShowCityModal = () => {
    setModalContent('cities');
    setIsModalOpen(true);
  };

  const handleCityClick = (city) => {
    setModalContent('parentDistricts');
    setSelectedCity(city);
    setIsModalOpen(true);
  };


  const renderModalContent = () => {
    switch (modalContent) {
      case 'cities':
        return cityList.map((cityItem, index) => (
          <button key={index} onClick={() => handleCityClick(cityItem.city)} className='button-19'>
            {cityItem.city}
          </button>
        ));
  
      case 'parentDistricts':
        const cityData = cityList.find(c => c.city === selectedCity);
        return (
          <div className="parent-districts-container">
            {cityData?.pharent_districts.map((pd, pdIndex) => (
              <div key={pdIndex} className="parent-district">
                <label className="checkbox-button-label">
                  <input
                    id={`pd-checkbox-${pdIndex}`}
                    type="checkbox"
                    className="checkbox-button"
                    onChange={() => toggleParentDistrict(pd.pharentDistrict.toLowerCase())}
                    checked={markedParentDistricts.has(pd.pharentDistrict.toLowerCase())}
                  />
                  {pd.pharentDistrict}
                </label>
                <div className="districts-container">
                {pd.districts.map((d, dIndex) => (
                  <label key={dIndex} className="checkbox-button-label">
                    <input
                      id={`district-checkbox-${pdIndex}-${dIndex}`}
                      type="checkbox"
                      className="checkbox-button"
                      onChange={() => toggleDistrict(d.district.toLowerCase(), pd.pharentDistrict.toLowerCase())}
                      checked={markedDistricts.has(d.district.toLowerCase())}
                    />
                    {d.district}
                  </label>
                ))}
                </div>
              </div>
            ))}
          </div>
        );
  
      default:
        return null;
    }
  };
  
  return (
    <div className='main_map'>
      <div className='filter_cont'>
        <button onClick={handleShowCityModal} className='show_button'  >Select City</button>

        <Modal isOpen={isModalOpen} close={closeModal}>
          {renderModalContent()}
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



