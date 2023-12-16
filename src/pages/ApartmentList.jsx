/* eslint-disable react/prop-types */

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import heartIcon from '../assets/heartIcon.svg'
import heartIconEmpty from '../assets/heart-empty.svg'


import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Skeleton } from '@mui/material';

const axiosInstance = axios.create({
  baseURL: 'https://api.storkhome.ge'
});




// ///////////////////
// favorite-is id-ebi emtxveva compleqsebis Cardebze da gasasworebelia 

export default function ApartmentList({ favoriteHandler, favorites }) {
  const [apartments, setApartments] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // New state for error handling


  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null); // Reset error state before fetching

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
        {error ? ( // Display error message if an error occurred
          <p>{error}</p>
        ) : 
        
        isLoading ? (
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
          apartments && apartments.length > 0 ? (
          apartments.map((apartment, index) => (
            <div className='apartmentCard' key={index}>
              {/* ... */}
              {/* Your apartment information */}
            <div className='heartbuttonAndImageBox'>
              <div className='heartButtonBox'>
                <button onClick={() => favoriteHandler(apartment)} key={apartment.id} className='heartButtons' >
                  {favorites.some(fav => fav.id === apartment.id) ? (
                    <img src={heartIcon} alt='Logo of heart' />
                    ) : (
                      <img src={heartIconEmpty} alt='Logo of empty heart' style={{ width: '30px', height: '30px', }} />
                      )}
                </button>
              </div>
              {/* <img src={apartment.images[0]} alt={apartment.name} style={styles.imageStyles} /> */}
              </div>

              <h1>{apartment.id}</h1>
              <p style={styles.companyTitle} >Number of rooms: {apartment.number_of_rooms}</p>
              <p style={styles.companyTitle} >Area: {apartment.area}</p>
              <p style={styles.companyTitle}>Price: {apartment.price}</p>
              <p style={styles.companyTitle}>Floor number: {apartment.floor_number}</p>
              <p style={styles.companyTitle}>Is available: {apartment.is_available ? 'Yes' : 'No'}</p>
              <p >Complex: {apartment.complex}</p>
              {/* ... */}
            </div>
          ))
          ) : (
            <p>No apartments found.</p>
          )
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
