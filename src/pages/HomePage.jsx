import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.css';

const baseURL = 'https://api.storkhome.ge';
const axiosInstance = axios.create({
  baseURL: baseURL,
});

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
            {/* Add your checkbox inputs for status */}
            <button onClick={closePopup}>Apply</button>
          </div>
        );
      case 'popup-location':
        return (
          <div className="popup-location popupbuttons">
            {/* Add your location inputs */}
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

const YourParentComponent = () => {
  const [homes, setHomes] = useState([]);

  useEffect(() => {
    fetchData(); // Initial fetch with default filters
  }, []);

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

export default YourParentComponent;
