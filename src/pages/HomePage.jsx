import React, { useState, useEffect } from 'react';
import { Checkbox, Input, } from 'antd';
import { Link } from 'react-router-dom';
import './HomePage.css'
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://34.201.93.104:8000',
});

const YourComponent = () => {
  const [filters, setFilters] = useState({
    min_area: '',
    max_area: '',
    min_price_per_sq_meter: '',
    max_price_per_sq_meter: '',
    finished: false,
  });

  const [data, setData] = useState([]);
  console.log(data);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [images, setimages] = useState([]);
  console.log(images);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams({
        ...filters,
        limit: 10,
        offset: (currentPage - 1) * 10,
      }).toString();

      const response = await axiosInstance.get(`/apartments?${queryParams}`);
      const imageResponse = await axiosInstance.get('http://34.201.93.104:8000/apartmentimage/?limit=10&offset=0');

      setimages(imageResponse.data.results);
      console.log(images);
      setData(response.data.results);
      console.log(data)
    } catch (error) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filterName, value) => {
    setFilters({
      ...filters,
      [filterName]: value,
    });
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    
    <>
    <div className='divdiv'>
        <Link to='/FavoriteComplex'>
          <button>პროექტები</button>
        </Link>
    
    <div className='filt_div'>
      
      {/* Render your filter inputs and controls */}
      <div className='labels'>
        Min Area:
        <Input className='input'
          type="title"
          value={filters.min_area}
          onChange={(e) => handleFilterChange('min_area', e.target.value)}
        />
      </div>
      <div className='labels'>
        Max Area:
        <Input className='input'
          type="number"
          value={filters.max_area}
          onChange={(e) => handleFilterChange('max_area', e.target.value)}
        />
      </div>
      <div className='labels'>
        Min price Area:
        <Input className='input'
          type="number"
          value={filters.min_price_per_sq_meter}
          onChange={(e) => handleFilterChange('min_price_per_sq_meter', e.target.value)}
        />
      </div>
      <div className='labels'>
        Max price Area:
        <Input className='input'
          type="number"
          value={filters.max_price_per_sq_meter}
          onChange={(e) => handleFilterChange('max_price_per_sq_meter', e.target.value)}
        />
      </div>
      <div className='labels'>
        Finished:
        <Checkbox
          checked={filters.finished}
          onChange={(e) => handleFilterChange('finished', e.target.checked)}
        >
          Finished
        </Checkbox>
      </div>
      </div>
      <div>
      <button onClick={fetchData} disabled={loading}>
        Apply Filters
      </button>

      <ul className='unorder'>
        {data.map((results) => (
          <li key={results.id} className='orered'>
            Complex ID = {results.complex}
            floor_number = {results.floor_number}

          </li>
          
        ))}
      </ul>
      <div>
      {images && images.map((images, index, ) => (
        <img key={index} src={images.images} alt={`photo of complex ${index + 1}`} className='images'/>
))};
      </div>
      <div className='pagination'>
        <botton onClick={() => handlePageChange(currentPage - 1)} disabled={loading} className='previus'>
          Previus
        </botton>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={loading} className='next'>
          Next
        </button>
      </div>
      
    </div>
    </div>
    </>
  );
};

export default YourComponent;
