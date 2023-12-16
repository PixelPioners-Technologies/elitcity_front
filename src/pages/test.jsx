import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import heartIcon from '../assets/heartIcon.svg';
import heartIconEmpty from '../assets/heart-empty-white.svg';
import './HomePage.css';
//import { axiosInstance, getComplexUniData } from './api';
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
  const [homes, setHomes] = useState([]);
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
      const data = await getComplexUniData(searchParams);
      setHomes(data.results);
      onSearch(data);
    } catch (error) {
      console.error('Error searching data:', error);
    }
  };

  useEffect(() => {
    getComplexUniData({}).then((data) => setHomes(data.results));
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedComplex, setSelectedComplex] = useState(null);

  const openModal = (complex) => {
    setSelectedComplex(complex);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedComplex(null);
    setIsModalOpen(false);
  };

  const homeMapping = homes.map((complex, index) => (
    <div className='card' key={index}>
      <div className='heartbuttonAndImageBox'>
        <div className='heartButtonBox'>
          <button onClick={() => openModal(complex)} key={complex.id} className='heartButtons'>
            {favorites.some((fav) => fav.id === complex.id) ? (
              <img src={heartIcon} alt='Logo of heart' />
            ) : (
              <img src={heartIconEmpty} alt='Logo of empty heart' style={{ width: '30px', height: '30px' }} />
            )}
          </button>
        </div>
      </div>
    </div>
  ));

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* Add input fields for each search parameter */}
        {/* ... (rest of the input fields) */}
        <label>
        Internal Complex Name:
        <input type="text" name="internal_complex_name" value={searchParams.internal_complex_name} onChange={handleChange} />
      </label>
        <button type="submit">Search</button>
      </form>

      {homeMapping}

      {/* Modal for displaying detailed information */}
      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
        {selectedComplex && (
          <>
            <h2>{selectedComplex.internal_complex_name}</h2>
            {/* Add more details as needed */}
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
          </>
        )}
        <button onClick={closeModal}>Close</button>
      </Modal>
    </>
  );
};

export default HomePage;