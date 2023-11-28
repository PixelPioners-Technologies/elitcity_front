/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import heartIcon from '../assets/heartIcon.svg'


import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Skeleton } from '@mui/material';

const axiosInstance = axios.create({
  baseURL: 'http://34.201.93.104:8000',
});

export default function ApartmentList({ favoriteHandler }) {
  const [apartments, setApartments] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get(`/apartments/?limit=10&offset=${(currentPage - 1) * 10}`);
        const { results, count } = response.data;

        setApartments(results);
        setTotalCount(count);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [currentPage]);

  const pagiHandler = () => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  };

  return (
    <div className='ApartmentListContainer'>
      <div className='infoFieldOfComplexsPlansMaps'>
        <p>კომპლექსები {totalCount}</p>
        <div className='projectsPlansMapsBox'>
          <Link to='/complex' ><button>პროექტები</button></Link>
          <Link to='/complex/apartmentList' ><button>გეგმარებები</button></Link>
          <Link to='/map' ><button>რუკა</button></Link>
        </div>
      </div>
      {/* ... */}
      <div className='allApartments'>
        {isLoading ? (
          Array.from({ length: 10 }, (_, index) => (
            <Skeleton
              key={index}
              variant='rectangle'
              animation='wave'
              width={styles.imageStyles.width}
              height={styles.imageStyles.height}
            />
          ))
        ) : (
          apartments &&
          apartments.map((apartment, index) => (
            <div className='apartmentCard' key={index}>
              {/* ... */}
              {/* Your apartment information */}
              <button onClick={() => favoriteHandler(apartment)}>
                <img src={heartIcon} alt='favorite Icon' />
              </button>

              <h1>{apartment.id}</h1>
              <p>Number of rooms: {apartment.number_of_rooms}</p>
              <p>Area: {apartment.area}</p>
              <p>Price: {apartment.price}</p>
              <p>Floor number: {apartment.floor_number}</p>
              <p>Is available: {apartment.is_available ? 'Yes' : 'No'}</p>
              <p>Complex: {apartment.complex}</p>
              {/* ... */}
            </div>
          ))
        )}
      </div>
      {/* ... */}
      <div className='pagination'>
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(totalCount / 10)}
            shape='rounded'
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
            onClick={pagiHandler}
            sx={{
              '& .MuiPaginationItem-root': {
                color: 'black', // Change the color to your desired color
              },
              '& .Mui-selected': {
                backgroundColor: 'green', // Change the selected page background color
                color: 'white', // Change the selected page text color
                '&:hover': {
                  backgroundColor: 'green', // Change the background color on hover
                },
              },
            }}
          />
        </Stack>
      </div>
    </div>
  );
}

const styles = {
  imageStyles: {
    width: '278px',
    height: '229px',
    overflow: 'hidden',
    borderRadius: '20px',
  },
  // ... Other style definitions
};
