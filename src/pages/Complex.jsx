// import React from 'react'
import './Complex.css';

import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import heartIcon from '../assets/heartIcon.svg'


// Pagination
// import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Skeleton } from '@mui/material';




const axiosInstance = axios.create({
  baseURL: 'http://34.201.93.104:8000'
});



// eslint-disable-next-line react/prop-types
export default function Complex({favoriteHandler}) {

  const [homes, setHomes] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);


  // ცვლადი ქვერი სტრინგი სადაც შევინახავ მონაცემებს, კლიკის დროს სორტირებაზე, ქუერი სტრინგში უნდა დაემატოს სორტირების ნაწილი sort = price
  // get-
  // const response = await axiosInstance.get(`/complex/? ქუერი სტრინგის ცვლადი `);
  // მოკლედ ქუერი სტრინგი სანახავია



  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get(`/complex/?limit=10&offset=${(currentPage - 1) * 10}`);
        const { results, count } = response.data;
        setHomes(results);
        setTotalCount(count);
        setIsLoading(false); // Set loading state to false after fetching data
      } catch (error) {
        setIsLoading(false); // Set loading state to false in case of error
          console.error('Error fetching data:', error);
        }
    };
    fetchData();
  }, [currentPage]);

  // console.log('images: ', images);
  console.log('homes all: ', homes);

// This is for scrool up, when user click other Pagination number
  const pagiHandler = () => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }


  
  return (
    <div className='ComplexBodyBox'>
      {/* ეს არის ჩამონათვალი button–ები, რომ გადახვიდე კომპლექსებზე, გეგმარებებზე, რუკაზე, სორტირება... */}
      <div className='infoFieldOfComplexsPlansMaps'>
        <p>კომპლექსები {totalCount}</p>
        <div className='projectsPlansMapsBox'>
          <Link to='/complex' ><button>პროექტები</button></Link>
          <Link to='/complex/apartmentList' ><button>გეგმარებები</button></Link>
          <Link to='/map' ><button>რუკა</button></Link>
        </div>
      </div>


      {/* <h1>Complex Page Component</h1> */}
     <div className='allCards'>
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
          homes &&
          homes.map((complex, index) => (
            <div className='card' key={index}>
              <button onClick={() => favoriteHandler(complex)} key={complex.id}>
                <img src={heartIcon} alt='Logo of heart' />
              </button> 
              <img src={complex.images[0]} alt={complex.name} style={styles.imageStyles} />
              <p style={styles.companyTitle}>{complex.name}</p>
              <div className='textInfo'>
                <p style={styles.complexInfo}>{complex.address.city}, {complex.address.street}</p>
                <p style={styles.complexInfo}>Price per sq meter: {complex.price_per_sq_meter}</p>
                <p style={styles.complexFinished}>Date: ...</p>
              </div>
            </div>
          ))

        )}
      </div>
      
      {/* Pagination for user to select some page */}
      <div className='pagination'>
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(totalCount / 10)} 
            shape="rounded"
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
  )
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
