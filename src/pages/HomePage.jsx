// ------------  Import Statements ------------------
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.css';

//---------- Constants and Axios Configuration -------
const baseURL = 'https://api.storkhome.ge';
const axiosInstance = axios.create({
  baseURL: baseURL,
});

// ----------- Async Function to Fetch Complex Unit Data --------
//---This function makes an asynchronous HTTP GET request to the /complex/ endpoint with specified search parameters.
//--- It returns the response data or throws an error if the request fails.------------
const getComplexUniData = async (searchParams) => {
  try {
    const response = await axiosInstance.get('/complex/', {
      params: searchParams,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};


// ---------------- FilterOptions Component --------------------
// ----- This component manages filter options and handles user interactions to apply filters.
//--- It includes functions for opening/closing filter popups,
//--- handling input changes,
//--- and fetching data based on the selected filters
const FilterOptions = ({ onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState(null);
  const [searchParams, setSearchParams] = useState({});

  const openPopup = (filter) => {
    setActiveFilter(filter);
  };

  const closePopup = () => {
    setActiveFilter(null);
    // Fetch data based on the selected filters
    fetchData();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchParams((prevSearchParams) => ({
      ...prevSearchParams,
      [name]: value,
    }));
  };

  const fetchData = async () => {
    try {
      const data = await getComplexUniData(searchParams);
      console.log('Fetched data:', data);
      // Handle the fetched data as needed
      onFilterChange(data);
    } catch (error) {
      // Handle error
    }
  };


  // -------------- Render Popup Content Based on Active Filter ---
  // --- This function dynamically renders different popups based on the active filter.
  // --- Each popup contains input fields or checkboxes for specific filter criteria
  const renderPopup = () => {
    switch (activeFilter) {
      case 'popupp-space':
        return (
          <div className="popupp-space popupbuttons">
            <label>From: <input type="text" name="from" onChange={handleInputChange} /></label>
            <label>To: <input type="text" name="to" onChange={handleInputChange} /></label>
            <button onClick={closePopup}>Apply</button>
          </div>
        );
      case 'popup-price':
        return (
          <div className="popup-price popupbuttons">
            <div>
              <label>Full price From: <input type="text" name="fullPriceFrom" onChange={handleInputChange} /></label>
              <label>To: <input type="text" name="fullPriceTo" onChange={handleInputChange} /></label>
            </div>
            <div>
              <label>Price per square meter From: <input type="text" name="pricePerSqMeterFrom" onChange={handleInputChange} /></label>
              <label>To: <input type="text" name="pricePerSqMeterTo" onChange={handleInputChange} /></label>
            </div>
            <button onClick={closePopup}>Apply</button>
          </div>
        );
      case 'popup-status':
        return (
          <div className="popup-status popupbuttons">
            <div id="statusPopup" class="popup">
              <label><input type="checkbox"/> Passed</label>
              <label><input type="checkbox"/> Under construction</label>
              <label><input type="checkbox"/> 2023</label>
              <label><input type="checkbox"/> 2024</label>
              <label><input type="checkbox"/> 2025</label>
              <label><input type="checkbox"/> 2026</label>
              <label><input type="checkbox"/> 2027</label>
              <label><input type="checkbox"/> 2027+</label>
            </div>
            <button onClick={closePopup}>Apply</button>
          </div>
        );
      case 'popup-location':
        return (
          <div className="popup-location popupbuttons">
            <select>
              <option value="city1">City 1</option>
              <option value="city2">City 2</option>
            </select>
            <button onClick={closePopup}>Apply</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className='popupbuttons'>
      <button onClick={() => openPopup('popupp-space')}>Space</button>
      <button onClick={() => openPopup('popup-price')}>Price</button>
      <button onClick={() => openPopup('popup-status')}>Status</button>
      <button onClick={() => openPopup('popup-location')}>Location</button>
      
      {renderPopup()}
    </div>
  );
};


// -------------------  HomePage ----------------------------
// --- This component serves as the parent component.
// --- It maintains the state for the list of homes and renders the FilterOptions component.
// --- It also fetches initial data on component mount and updates the list of homes when filters are applied
const HomePage = () => {
  const [homes, setHomes] = useState([]);

  // ------- Initial Data Fetch and Data Update on Filter Change ----
  // ---- The useEffect hook is used to fetch initial data when the component mounts.
  useEffect(() => {
    fetchData(); // Initial fetch with default filters
  }, []);


  // ----- The fetchData function is responsible for making an API request to get complex unit data.
  // -----It updates the state with the received data or handles errors
  const fetchData = async () => {
    try {
      const data = await getComplexUniData({});
      setHomes(data.results);
    } catch (error) {
      // Handle error
    }
  };

  const handleFilterChange = (data) => {
    setHomes(data);
  };


  // ------ Rendering Filtered Homes ---------
  // -- Homes are rendered based on the filtered data.
  // -- The map function is used to iterate over the array of homes and render each home
  return (
    <div>
      <FilterOptions onFilterChange={handleFilterChange} />
      {/* Render homes based on the filtered data */}
      {Array.isArray(homes) && homes.map((home) => (
        <div key={home.id}>
          {/* Render home details */}
        </div>
      ))}
    </div>
  );
};

export default HomePage;
