import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

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

const HomePage = ({ onSearch, favoriteHandler, favorites }) => {
  const [homes, setHomes] = useState([]);
  const [selectedComplex, setSelectedComplex] = useState(null);
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

  const [spaceFilter, setSpaceFilter] = useState('');
  const [minPriceFilter, setMinPriceFilter] = useState('');
  const [maxPriceFilter, setMaxPriceFilter] = useState('');

  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);

  const openFilterModal = (filter) => {
    setSelectedFilter(filter);
    setFilterModalOpen(true);
  };

  const closeFilterModal = () => {
    setSelectedFilter(null);
    setFilterModalOpen(false);
  };

  const filterOptions = ['Space', 'Price', 'Status', 'Location'];

  const handleFilterSelect = (filter) => {
    openFilterModal(filter);
  };

  const filterMapping = filterOptions.map((filter, index) => (
    <div key={index} onClick={() => handleFilterSelect(filter)}>
      {filter}
    </div>
  ));

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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'space':
        setSpaceFilter(value);
        break;
      case 'minPricePerSquareMeter':
        setMinPriceFilter(value);
        break;
      case 'maxPricePerSquareMeter':
        setMaxPriceFilter(value);
        break;
      default:
        break;
    }

    setSearchParams((prevParams) => ({
      ...prevParams,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams();

        Object.entries(searchParams).forEach(([key, value]) => {
          if (value !== '') {
            params.append(key, value);
          }
        });

        if (spaceFilter !== '') {
          params.append('space', spaceFilter);
        }
        if (minPriceFilter !== '') {
          params.append('minPricePerSquareMeter', minPriceFilter);
        }
        if (maxPriceFilter !== '') {
          params.append('maxPricePerSquareMeter', maxPriceFilter);
        }

        const response = await axiosInstance.get('/complex/', {
          params: params,
        });

        setHomes(response.data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [searchParams, spaceFilter, minPriceFilter, maxPriceFilter]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (complex) => {
    setSelectedComplex(complex);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedComplex(null);
    setIsModalOpen(false);
  };

  const homeMapping = homes && homes.length > 0 ? (
    homes.map((complex, index) => (
      <div className='card' key={index}>
        <div className='heartbuttonAndImageBox'>
          <div className='heartButtonBox'>
            <button
              onClick={() => openModal(complex)}
              key={complex.id}
              className='heartButtons'
            >
              {favorites.some((fav) => fav.id === complex.id) ? (
                <div>ფართი</div>
              ) : (
                <div>ჩამოსქროლე</div>
              )}
            </button>
          </div>
        </div>

        <div className='spaceField' onClick={() => openModal(complex)}>
          Space: {complex.space}
        </div>
      </div>
    ))
  ) : (
    <p>No homes found</p>
  );

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="filterOptions">{filterMapping}</div>

        {homeMapping}

        <Modal isOpen={filterModalOpen} onRequestClose={closeFilterModal}>
          {selectedFilter && (
            <>
              <h2>{selectedFilter} Filter</h2>
              {selectedFilter === 'Space' && (
                <label>
                  Space:
                  <input
                    type="text"
                    name="space"
                    value={searchParams.space}
                    onChange={handleFilterChange}
                  />
                </label>
              )}
              {selectedFilter === 'Price' && (
                <>
                  <label>
                    Min Price per Sq Meter:
                    <input
                      type="text"
                      name="minPricePerSquareMeter"
                      value={searchParams.minPricePerSquareMeter}
                      onChange={handleFilterChange}
                    />
                  </label>
                  <label>
                    Max Price per Sq Meter:
                    <input
                      type="text"
                      name="maxPricePerSquareMeter"
                      value={searchParams.maxPricePerSquareMeter}
                      onChange={handleFilterChange}
                    />
                  </label>
                </>
              )}
            </>
          )}
          <button onClick={closeFilterModal}>Close</button>
        </Modal>
      </form>
    </>
  );
};

export default HomePage;
