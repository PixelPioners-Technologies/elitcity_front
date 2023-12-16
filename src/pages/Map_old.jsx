import React, { useState, useEffect , useRef } from 'react';
import axios from 'axios';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import Modal from './Modal';
import './Map.css'
import { useNavigate } from 'react-router-dom';


const initialCenter = {
  lat: 41.7151,
  lng: 44.8271
};

export default function Map() {
  const [locations, setLocations] = useState([]);
  const [mapCenter, setMapCenter] = useState(initialCenter);
  const [zoomLevel, setZoomLevel] = useState(10);
  const [cityList, setCityList] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [markedParentDistricts, setMarkedParentDistricts] = useState(new Set());
  const [modalContent, setModalContent] = useState('cities');
  const [markedDistricts, setMarkedDistricts] = useState(new Set());
  const [hoveredLocation, setHoveredLocation] = useState(null);
  const [keepInfoWindowOpen, setKeepInfoWindowOpen] = useState(false);
  // this is for filtering by full price
  const [minFullPrice, setMinFullPrice] = useState('');
  const [maxFullPrice, setMaxFullPrice] = useState('');
  // this is for filtering per square meter
  const [minPricePerSquareMeter, setMinPricePerSquareMeter ] = useState('');
  const [maxPricePerSquareMeter, setMaxPricePerSquareMeter ] = useState('');
  // this is for filtering finished complexes
  const [isfinished , setIsFinished] = useState('')
  // this is for filtering space 
  const [minArea , setMinArea ] = useState('')
  const [maxArea , setMaxArea ] = useState('')
  //this is for filtering apartment's number of rooms 
  const [selectedRooms, setSelectedRooms] = useState([]);


  // fetch whole complex for location latitude and longitude
  useEffect(() => {
    const axiosLocations = async () => {
      try {
        const params = new URLSearchParams();

        if (minPricePerSquareMeter) params.append('min_price_per_sq_meter', minPricePerSquareMeter);
        if (maxPricePerSquareMeter) params.append('max_price_per_sq_meter', maxPricePerSquareMeter);
        if (minFullPrice) params.append('min_full_price', minFullPrice);
        if (maxFullPrice) params.append('max_full_price', maxFullPrice);
        if (isfinished !== null && isfinished !== undefined) params.append('finished', isfinished);
        if (minArea) params.append('min_area', minArea);
        if (maxArea) params.append('max_area', maxArea);

        selectedRooms.forEach(room => {
          if (room) params.append('number_of_rooms', room);
        });

        const response = await axios.get('http://127.0.0.1:8000/complex/' , {
          params: params
          })
        const data = response.data.results;
        const locationsWithCoords = data.map(item => ({
          ...item,
          latitude: item.address.latitude,
          longitude: item.address.longitude,
        }));
        
        setLocations(locationsWithCoords);
        console.log(params)
      } catch (error) {
        console.error(error);
      }
    };
    axiosLocations();
  }, [mapCenter, selectedCity, minFullPrice , maxFullPrice , minPricePerSquareMeter , maxPricePerSquareMeter , isfinished , minArea , maxArea, selectedRooms]);

// ----------------------------------------- buld url in brouser's url---------------------------------------------------

// Inside your component
const navigate = useNavigate();

const updateURLWithFilters = () => {
  const queryParams = new URLSearchParams();

  if (minPricePerSquareMeter) queryParams.set('min_price_per_sq_meter', minPricePerSquareMeter);
  if (maxPricePerSquareMeter) queryParams.set('max_price_per_sq_meter', maxPricePerSquareMeter);
  if (minFullPrice) queryParams.set('min_full_price', minFullPrice);
  if (maxFullPrice) queryParams.set('max_full_price', maxFullPrice);
  if (isfinished !== null && isfinished !== undefined) queryParams.set('finished', isfinished);
  if (minArea) queryParams.set('min_area', minArea);
  if (maxArea) queryParams.set('max_area', maxArea);

  // For React Router v6, you would use navigate like this:
        navigate(`?${queryParams.toString()}`, { replace: true });
};

// ...

useEffect(() => {
  updateURLWithFilters();
}, [minFullPrice, maxFullPrice, minPricePerSquareMeter ,maxPricePerSquareMeter, isfinished , minArea , maxArea]);


// ---------------------------------------------------------------------------------------------------------



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


  const closeModal = () => {
    setIsModalOpen(false);
    // setMarkedParentDistricts(new Set());  ეს რო ჩართულია , ლოკაციის ძიების ფანჯრის დახურვისას ფილტრაცია აღარ მუშაობს
  };


// ---------------------------------logic for marking pharentdistrict if all it"s dostricts are marked -----------------------------
  const toggleParentDistrict = (parentDistrict) => {
    setMarkedParentDistricts(prevParent => {
      const newMarkedParent = new Set(prevParent);
      let childDistricts = [];
      // Find the child districts of the selected parent district
      const parentDistrictData = cityList.find(c => c.city === selectedCity)?.pharent_districts.find(pd => pd.pharentDistrict.toLowerCase() === parentDistrict.toLowerCase());
      if (parentDistrictData) {
        childDistricts = parentDistrictData.districts.map(d => d.district.toLowerCase());
      }
      if (newMarkedParent.has(parentDistrict)) {
        newMarkedParent.delete(parentDistrict);
        // Remove all child districts from markedDistricts
        setMarkedDistricts(prevDistricts => new Set([...prevDistricts].filter(district => !childDistricts.includes(district))));
      } else {
        newMarkedParent.add(parentDistrict);
        // Add all child districts to markedDistricts
        setMarkedDistricts(prevDistricts => new Set([...prevDistricts, ...childDistricts]));
      }
      return newMarkedParent;
    });
  };
  
  const toggleDistrict = (district, parentDistrict) => {
    setMarkedDistricts(prev => {
      const newMarked = new Set(prev);
  
      if (newMarked.has(district)) {
        newMarked.delete(district);
      } else {
        newMarked.add(district);
      }
      // Automatically update parent district's marked status based on child districts
      const parentDistricts = cityList.find(c => c.city === selectedCity)?.pharent_districts;
      const parent = parentDistricts?.find(pd => pd.pharentDistrict.toLowerCase() === parentDistrict.toLowerCase());
      const allMarked = parent?.districts.every(d => newMarked.has(d.district.toLowerCase()));
  
      setMarkedParentDistricts(prevParent => {
        const newMarkedParent = new Set(prevParent);
        if (allMarked) {
          newMarkedParent.add(parentDistrict.toLowerCase());
        } else {
          newMarkedParent.delete(parentDistrict.toLowerCase());
        }
        return newMarkedParent;
      });
  
      return newMarked;
    });
  };
  
  const filteredLocations = locations.filter(location => {
    const cityMatch = !selectedCity || location.address.city.toLowerCase() === selectedCity.toLowerCase();
    const parentDistrictMatch = markedParentDistricts.size === 0 || markedParentDistricts.has(location.address.pharentDistrict.toLowerCase());
    const districtMatch = markedDistricts.size === 0 || markedDistricts.has(location.address.district.toLowerCase());
    return cityMatch && parentDistrictMatch && districtMatch;
  });
  // --------------------------------------------------------------------------------------------------------------------------------

  //--------------------------------------------- ლოგიკა რუკის დაზუმვისთვის ლოკაციიის მონიშვნისას--------------------------
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

// ----------------------------------------------------------------------------------------------------------------------------------------

  const handleShowCityModal = () => {
    setModalContent('cities');
    setIsModalOpen(true);
  };

  const handleCityClick = (city) => {
    setModalContent('parentDistricts');
    setSelectedCity(city);
    setIsModalOpen(true);
  };

// ------------------------------------------modal for opening cities , pharent districts and districts----------------------------------------
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
                    className="checkbox-button-pharentdistrict"
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
                      className="checkbox-button-district"
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
  // ------------------------------------------------------------------------------------------------------------------------------
  // --------------------------------- reset market cityes, pharent district  and districts -------------------------------

  const unmarkAll = () => {
    // Reset the state variables for marked cities, parent districts, and districts
    setSelectedCity('');
    setMarkedParentDistricts(new Set());
    setMarkedDistricts(new Set());
    
    // Optionally, if you want to reset the map view as well
    setMapCenter(initialCenter);
    setZoomLevel(10); // Set to your initial zoom level
    
    // Close the modal if you want
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (mapRef.current) {
      const mapInstance = mapRef.current.state.map;
      mapInstance.setCenter(mapCenter);
      mapInstance.setZoom(zoomLevel);
    }
  }, [mapCenter, zoomLevel]);
// ------------------------------------------------------------------------------------------------------------------------

// ----------------------------------------open infowindow on hover--------------------------------------------------------
const handleMarkerMouseOver = (location) => {
  setHoveredLocation(location);
  setKeepInfoWindowOpen(true);
};

const handleMarkerMouseOut = () => {
    if (!keepInfoWindowOpen) {
      setHoveredLocation(null);
    }
};

const handleInfoWindowMouseOver = () => {
  setKeepInfoWindowOpen(true);
};

const handleInfoWindowMouseOut = () => {
  setKeepInfoWindowOpen(false);
  setHoveredLocation(null);
};
// ---------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------function for reseting filters -------------------------------------------------------
  const handleResetAllFilters = () => {
    setMinFullPrice('')
    setMaxFullPrice('')
    setMinPricePerSquareMeter('')
    setMaxPricePerSquareMeter('')
    setIsFinished('')
    setMinArea('')
    setMaxArea('')
    setSelectedRooms([])
  }
// ---------------------------------------------------------------------------------------------------------------------------
//------------------------------------logic fot selecting and filtering apartment's number of rooms -------------------------------
const toggleRoomSelection = (room) => {
  setSelectedRooms((prevSelectedRooms) => {
    if (prevSelectedRooms.includes(room)) {
      return prevSelectedRooms.filter((r) => r !== room); // Unselect
    } else {
      return [...prevSelectedRooms, room]; // Select
    }
  });
};


// ---------------------------------------------------------------------------------------------------------------------------

  


  return (
    <div className='main_map'>
      <div className='filter_cont'>
        <button onClick={handleShowCityModal} className='show_button'  >Select City ...</button>
        <button onClick={unmarkAll} className='reset_button'>Reset Selected Cities</button>
        <Modal isOpen={isModalOpen} close={closeModal}>
          {renderModalContent()}
        </Modal>
        <div className='filters' >
          {/* Room selection buttons */}
          <div className="room-selection">
            {['all', '1', '2', '3', '4', '5+'].map((room) => (
              <button
                key={room}
                className={`room-button ${selectedRooms.includes(room) ? 'selected' : ''}`}
                onClick={() => toggleRoomSelection(room)}
                
              >
                {room}
              </button>
            ))}
          </div>
       

          {/* input for min and max area */}
          <div>
            <input 
                type="number" 
                placeholder="Min Area" 
                value={minArea} 
                onChange={(e) => setMinArea(e.target.value)} 
                />

            <input 
                type="number" 
                placeholder="Max Area" 
                value={maxArea} 
                onChange={(e) => setMaxArea(e.target.value)} 
                />

          </div>
          {/* inputs for filter  by full price */}
          <div>
            <input 
              type="number" 
              placeholder="Min Full Price" 
              value={minFullPrice} 
              onChange={(e) => setMinFullPrice(e.target.value)} 
              />
            <input 
              type="number" 
              placeholder="Max Full Price" 
              value={maxFullPrice} 
              onChange={(e) => setMaxFullPrice(e.target.value)} 
              />
          </div>
          <div>
            {/* inputs for filter by price per square meter */}
            <input 
              type="number" 
              placeholder="Min price per square meter" 
              value={minPricePerSquareMeter} 
              onChange={(e) => setMinPricePerSquareMeter(e.target.value)} 
            />
             <input 
              type="number" 
              placeholder="Max price per square meter" 
              value={maxPricePerSquareMeter} 
              onChange={(e) => setMaxPricePerSquareMeter(e.target.value)} 
            />
          </div>
          <div>
            {/* select for filter by finished or not */}
            <select  className='select_filter'   value={isfinished}  onChange={(e) => setIsFinished(e.target.value)  }   >
              <option value=''  >All</option>
              <option value='true'  >Finished</option>
              <option value='false'  >Not Finished</option>
            </select>
          </div>
          {/* button for reseting filters */}
          <button  className='reset_all_fiolters_button'  onClick={handleResetAllFilters}  >Reset All Filters </button>
        </div>
      </div>

      <div className='for_border' ></div>
      <div className='map_cont'>
        <LoadScript googleMapsApiKey="AIzaSyDxK-BSMfOM2fRtkTUMpRn5arTyUTR03r0">
          <GoogleMap
            mapContainerStyle={{ width: '1000px', height: '100vh' }}
            center={mapCenter}
            zoom={zoomLevel}
            ref={mapRef}
            options={{
              gestureHandling: "greedy", // This enables zooming without the Control key
          }}
          >
            {filteredLocations.map(location => (
              <Marker
                key={location.id}
                position={{ lat: location.latitude, lng: location.longitude }}
                onMouseOver={ () => handleMarkerMouseOver(location)}
                onMouseOut={handleMarkerMouseOut}
              />
            ))}

              {hoveredLocation && (
                <InfoWindow
                position={{ lat: hoveredLocation.latitude, lng: hoveredLocation.longitude }}
                onCloseClick={() => setHoveredLocation(null)}
                onMouseOver={handleInfoWindowMouseOver}
                onMouseOut={handleInfoWindowMouseOut}
                >
                  <div>
                    <h2>{hoveredLocation.name}</h2>
                    <img className='image_cont'  src={hoveredLocation.images} alt='location'/>
                    {/* ...other info window contents should go here*/}
                  </div>
                </InfoWindow>
              )}
         
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
}



