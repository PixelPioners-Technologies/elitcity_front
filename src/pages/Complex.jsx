/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
// import React from 'react'
import './Complex.css';

import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import heartIcon from '../assets/heartIcon.svg'
import heartIconEmpty from '../assets/heart-empty-white.svg'


// Pagination
// import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Skeleton } from '@mui/material';


// ------------------------------------------------------------------------------------
// for Sorting
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
// ------------------------------------------------------------------------------------

// const axiosInstance = axios.create({
//   baseURL: 'http://34.201.93.104:8000'
// });

const axiosInstance = axios.create({
  baseURL: 'https://api.storkhome.ge'
});


// eslint-disable-next-line react/prop-types
export default function Complex({favoriteHandler, favorites}) {

  const [homes, setHomes] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [forPriceDecrease, setForPriceDecrease] = useState(null);
  const [sortedHomes, setSortedHomes] = useState(null); // Initialize sortedHomes state

  
// ------------------------------------------------------------------------------------
// for Sorting
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
// ------------------------------------------------------------------------------------




  // ცვლადი ქვერი სტრინგი სადაც შევინახავ მონაცემებს, კლიკის დროს სორტირებაზე, ქუერი სტრინგში უნდა დაემატოს სორტირების ნაწილი sort = price
  // get-
  // const response = await axiosInstance.get(`/complex/? ქუერი სტრინგის ცვლადი `);
  // მოკლედ ქუერი სტრინგი სანახავია


// // ------------------------------------------------------------------------------------
// // first useEffect sorting
//   useEffect(() => {
//     const fetchData = async (sortOrder) => {
//       try {
//         setIsLoading(true);
//         const response = await axiosInstance.get(`/complex/?limit=10&offset=${(currentPage - 1) * 10}`);
//         const { results, count } = response.data;
  
//         let sortedResults;
  
//         // Sort the results based on sortOrder
//         if (sortOrder === 'decrease') {
//           sortedResults = results.slice().sort((a, b) => {
//             return parseFloat(b.price_per_sq_meter) - parseFloat(a.price_per_sq_meter);
//           });
//         } else if (sortOrder === 'increase') {
//           sortedResults = results.slice().sort((a, b) => {
//             return parseFloat(a.price_per_sq_meter) - parseFloat(b.price_per_sq_meter);
//           });
//         } else {
//           sortedResults = results; // Default: no sorting
//         }
  
//         setHomes(sortedResults); // Default complex(without sorting)
//         setTotalCount(count); // Total amount of complexes
//         setIsLoading(false); // for Loader, like a youtube video slider (wave style)
//       } catch (error) {
//         setIsLoading(false);
//         console.error('Error fetching data:', error);
//       }
//     };
  
//     // Fetch data based on the currentPage and sortOrder
//     fetchData(forPriceDecrease);
//   }, [currentPage, forPriceDecrease]);
// // ------------------------------------------------------------------------------------




// ------------------------------------------------------------------------------------
// second useEffect
const sortHomes = (data, sortOrder) => {
  if (sortOrder === 'decrease') {
    return [...data].sort((a, b) => parseFloat(b.price_per_sq_meter) - parseFloat(a.price_per_sq_meter));
  } else if (sortOrder === 'increase') {
    return [...data].sort((a, b) => parseFloat(a.price_per_sq_meter) - parseFloat(b.price_per_sq_meter));
  } else {
    return data;
  }
};

useEffect(() => {
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(`/complex/?limit=10&offset=${(currentPage - 1) * 10}`);
      const { results, count } = response.data;
      setHomes(results);
      setTotalCount(count);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, [currentPage]);

useEffect(() => {
  const sortedResults = sortHomes(homes, forPriceDecrease);
  setSortedHomes(sortedResults);
}, [forPriceDecrease, homes]);

// ------------------------------------------------------------------------------------


// Pagination logic
const itemsPerPage = 10;
const totalPageCount = Math.ceil(totalCount / itemsPerPage);
const currentSortedHomes = sortedHomes ? sortedHomes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : [];



  

  // 

  // console.log('images: ', images);
  // console.log('homes all: ', homes);

  

// This is for scrool up, when user click other Pagination number
  const pagiHandler = () => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  // Maping variable
  // ------------------------------------------------------------------------------------
  const homeMaping = currentSortedHomes.map((complex, index) => (
    <div className='card' key={index}>
      <div className='heartbuttonAndImageBox'>
        <div className='heartButtonBox'>
          <button onClick={() => favoriteHandler(complex)} key={complex.id} className='heartButtons' >
            {favorites.some(fav => fav.id === complex.id) ? (
              <img src={heartIcon} alt='Logo of heart' />
              ) : (
                <img src={heartIconEmpty} alt='Logo of empty heart' style={{ width: '30px', height: '30px', }} />
                )}
          </button>
        </div>
        <img src={complex.images[0]} alt={complex.name} style={styles.imageStyles} />
      </div>
      <p style={styles.companyTitle}>{complex.name}</p>
      <div className='textInfo'>
        <p style={styles.complexInfo}>{complex.address.city}, {complex.address.street}</p>
        <p style={styles.complexInfo}>Price per sq meter: {complex.price_per_sq_meter}</p>
        {/* Update the line below with the actual date property */}
        <p style={styles.complexFinished}>Date: {complex.date}</p>
      </div>
    </div>
  ))
  // ------------------------------------------------------------------------------------


    // სკროლისთვის და ასევე ინტერვალისთვის რომ, ერთიანად არ აისქორლოს..
    const scrollToTop = () => {
      const scrollStep = -window.scrollY / (500 / 15);
  
      const scrollInterval = setInterval(() => {
        if (window.scrollY !== 0) {
          window.scrollBy(0, scrollStep);
        } else {
          clearInterval(scrollInterval);
        }
      }, 15);
    };


  
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


{/* for sorting */}
{/* // ------------------------------------------------------------------------------------ */}
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        სორტირება
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >

        <MenuItem onClick={() => { handleClose(); setForPriceDecrease('decrease'); }}>ფასი კლებადობით</MenuItem>
        <MenuItem onClick={() => { handleClose(); setForPriceDecrease('increase'); }}>ფასი ზრდადობით</MenuItem>

       
      </Menu>
{/* // ------------------------------------------------------------------------------------ */}




      <div className='allCards'>
        {isLoading ? (
          Array.from({ length: 10 }, (_, index) => (
            <div className='card' key={index}>
              <Skeleton variant='rectangle' animation='wave' width={styles.imageStyles.width} height={styles.imageStyles.height} />
              <Skeleton variant='text' animation='wave' width={150} height={20} style={styles.companyTitle} />
              <div className='textInfo'>
                <Skeleton variant='text' animation='wave' width={120} height={15} style={styles.complexInfo} />
                <Skeleton variant='text' animation='wave' width={180} height={15} style={styles.complexInfo} />
                <Skeleton variant='text' animation='wave' width={100} height={15} style={styles.complexFinished} />
              </div>
            </div>
          ))
        ) : (
          homeMaping
        )}
      </div>

      {/* for scroll UP */}
      <button onClick={scrollToTop} style={{ borderRadius: '30px' }} >
        <img src={scrollUp} alt='logo' style={{ width: '40px' }} />
      </button>

      
      {/* Pagination for user to select some page */}
      <div className='pagination'>
        <Stack spacing={2}>
          <Pagination
               count={totalPageCount}
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
