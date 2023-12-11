import React, { useState, useEffect } from 'react';
import heartIcon from '../assets/heartIcon.svg'
import heartIconEmpty from '../assets/heart-empty-white.svg'
import './HomePage.css'

// import { getComplexUniData } from './api';
import axios from 'axios';

const baseURL = 'https://api.storkhome.ge';
const axiosInstance = axios.create({
  baseURL: baseURL,
});



const getComplexUniData = async (searchParams) => {
  try {
    const response = await axiosInstance.get('/complex/uni/', { params: searchParams });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export { axiosInstance, getComplexUniData };



const HomePage = ({ onSearch, favoriteHandler, favorites }) => {
  const [homes, setHomes] = useState([]); // Assuming homes is a state variable
  // const [favorites, setFavorites] = useState([]); // Define favorites state
  const [searchParams, setSearchParams] = useState({
    internal_complex_name: '',
    price_per_sq_meter: '',
    finish_year: '',
    finish_month: '',
    finished: '',
    visibility: '',
    vipComplex: '',
    floor_number: '',
    space: '',
    number_of_apartments: '',
    number_of_houses: '',
    number_of_floors: '',
    complex_level: '',
    phone_number: '',
    plot_area: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prevParams) => ({ ...prevParams, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Call the API function with the search parameters
      const data = await getComplexUniData(searchParams);
      
      // Set the search results in the state
      setHomes(data.results);
      
      // Pass the search results to the parent component
      onSearch(data);
    } catch (error) {
      // Handle errors
      console.error('Error searching data:', error);
    }
  };

    // Assuming you have a useEffect to fetch data on component mount
    useEffect(() => {
      // Call the API function with empty search parameters to fetch initial data
      getComplexUniData({}).then((data) => setHomes(data.results));
    }, []);

    const homeMapping = homes.map((complex, index) => (
      <div className='card' key={index}>
        <div className='heartbuttonAndImageBox'>
          <div className='heartButtonBox'>
            <button onClick={() => favoriteHandler(complex)} key={complex.id} className='heartButtons'>
              {favorites.some(fav => fav.id === complex.id) ? (
                <img src={heartIcon} alt='Logo of heart' />
              ) : (
                <img src={heartIconEmpty} alt='Logo of empty heart' style={{ width: '30px', height: '30px', }} />
              )}
            </button>
          </div>
          {/* <img src={complex.images[0]} alt={complex.name} style={styles.imageStyles} /> */}
        </div>
        <p style={styles.companyTitle}>{complex.internal_complex_name}</p>
        <div className='textInfo'>
          <p style={styles.complexInfo}>Price per sq meter: {complex.price_per_sq_meter}</p>
          <p style={styles.complexInfo}>Finish Year: {complex.finish_year}</p>
          <p style={styles.complexInfo}>Finish Month: {complex.finish_month}</p>
          <p style={styles.complexInfo}>Finished: {complex.finished ? 'Yes' : 'No'}</p>
          <p style={styles.complexInfo}>Visibility: {complex.visibility ? 'Yes' : 'No'}</p>
          <p style={styles.complexInfo}>VIP Complex: {complex.vipComplex ? 'Yes' : 'No'}</p>
          <p style={styles.complexInfo}>Floor Number: {complex.floor_number}</p>
          <p style={styles.complexInfo}>Space: {complex.space}</p>
          <p style={styles.complexInfo}>Number of Apartments: {complex.number_of_apartments}</p>
          <p style={styles.complexInfo}>Number of Houses: {complex.number_of_houses}</p>
          <p style={styles.complexInfo}>Number of Floors: {complex.number_of_floors}</p>
          <p style={styles.complexInfo}>Complex Level: {complex.complex_level}</p>
          <p style={styles.complexInfo}>Phone Number: {complex.phone_number}</p>
          <p style={styles.complexInfo}>Plot Area: {complex.plot_area}</p>
          {/* Update the line below with the actual date property */}
          <p style={styles.complexFinished}>Date: {complex.date}</p>
        </div>
      </div>
    ));
    


  return (
    <>

    <form onSubmit={handleSubmit}>
      {/* Add input fields for each search parameter */}
      <label>
        Internal Complex Name:
        <input type="text" name="internal_complex_name" value={searchParams.internal_complex_name} onChange={handleChange} />
      </label>

      <label>
        Price per Sq Meter:
        <input type="text" name="price_per_sq_meter" value={searchParams.price_per_sq_meter} onChange={handleChange} />
      </label>

      <label>
        Finish Year:
        <input type="text" name="finish_year" value={searchParams.finish_year} onChange={handleChange} />
      </label>

      <label>
        Finish Month:
        <input type="text" name="finish_month" value={searchParams.finish_month} onChange={handleChange} />
      </label>

      <label>
        Finished:
        <input type="text" name="finished" value={searchParams.finished} onChange={handleChange} />
      </label>

      <label>
        Visibility:
        <input type="text" name="visibility" value={searchParams.visibility} onChange={handleChange} />
      </label>

      <label>
        VIP Complex:
        <input type="text" name="vipComplex" value={searchParams.vipComplex} onChange={handleChange} />
      </label>

      <label>
        Floor Number:
        <input type="text" name="floor_number" value={searchParams.floor_number} onChange={handleChange} />
      </label>

      <label>
        Space:
        <input type="text" name="space" value={searchParams.space} onChange={handleChange} />
      </label>

      <label>
        Number of Apartments:
        <input type="text" name="number_of_apartments" value={searchParams.number_of_apartments} onChange={handleChange} />
      </label>

      <label>
        Number of Houses:
        <input type="text" name="number_of_houses" value={searchParams.number_of_houses} onChange={handleChange} />
      </label>

      <label>
        Number of Floors:
        <input type="text" name="number_of_floors" value={searchParams.number_of_floors} onChange={handleChange} />
      </label>

      <label>
        Complex Level:
        <input type="text" name="complex_level" value={searchParams.complex_level} onChange={handleChange} />
      </label>

      <label>
        Phone Number:
        <input type="text" name="phone_number" value={searchParams.phone_number} onChange={handleChange} />
      </label>

      <label>
        Plot Area:
        <input type="text" name="plot_area" value={searchParams.plot_area} onChange={handleChange} />
      </label>

      <button type="submit">Search</button>
    </form>

    {homeMapping}
    </>
  );
};

const styles = {
  imageStyles: {
    width: '278px',
    height: '229px',
    overflow: 'hidden',
    borderRadius: '20px',
  },
  companyTitle: {
    // position: 'absolute',
    // top: '262px',
    // paddingLeft: '20px'
  },
  complexInfo: {
    color: '#000000',
  },
  complexFinished: {
    color: '#515050',
  },
};


export default HomePage;
