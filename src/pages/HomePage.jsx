import React, { useState, useEffect } from 'react';
import { Checkbox, Input } from 'antd';
import axios from 'axios';
import './HomePage.css';

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, [filters, currentPage]);

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
    <div className='filt_div'>
      {/* Render your filter inputs and controls */}
      <label>
        Min Area:
        <Input
          type="number"
          value={filters.min_area}
          onChange={(e) => handleFilterChange('min_area', e.target.value)}
        />
      </label>
      <label>
        Max Area:
        <Input
          type="number"
          value={filters.max_area}
          onChange={(e) => handleFilterChange('max_area', e.target.value)}
        />
      </label>
      <label>
        Min price Area:
        <Input
          type="number"
          value={filters.min_price_per_sq_meter}
          onChange={(e) => handleFilterChange('min_price_per_sq_meter', e.target.value)}
        />
      </label>
      <label>
        Max price Area:
        <Input
          type="number"
          value={filters.max_price_per_sq_meter}
          onChange={(e) => handleFilterChange('max_price_per_sq_meter', e.target.value)}
        />
      </label>
      <label>
        Finished:
        <Checkbox
          checked={filters.finished}
          onChange={(e) => handleFilterChange('finished', e.target.checked)}
        >
          Finished
        </Checkbox>
      </label>

      <button onClick={fetchData} disabled={loading}>
        Apply Filters
      </button>

      <ul className='unorder'>
        {data.map((results) => (
          <li key={results.id} className='orered'>
            Complex ID = {results.complex}
          </li>
        ))}
      </ul>

      <div className='pagination'>
        <botton onClick={() => handlePageChange(currentPage - 1)} disabled={loading} className='previus'>
          Previus
        </botton>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={loading} className='next'>
          Next
        </button>
      </div>
    </div>
  );
};

export default YourComponent;
