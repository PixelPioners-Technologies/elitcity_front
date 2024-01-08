/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
// import React from 'react'
import './Complex.css';
import { motion } from "framer-motion";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import heartIcon from '../assets/starLogo.svg';

import heartIconEmpty from '../assets/emptyStarLogo.svg';
import mapSignLogo from  '../assets/mapSignLogoo.svg' ;
import dollar from '../assets/dollar-svgrepo-com.svg';
// import dollar from '../assets/dollar-whitee.svg';

import lari from '../assets/lari-svgrepo-com.svg';
// import lari from '../assets/lari-white.svg';




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
  // baseURL: 'https://api.storkhome.ge'
  baseURL: 'https://6cf2c30d277cc9c200a5ff0a313ac6cf.serveo.net/'


});


// eslint-disable-next-line react/prop-types
export default function Complex({favoriteHandler, favorites, selectedLanguage}) {

  const [homes, setHomes] = useState([]);
  console.log('-----',homes)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [forPriceDecrease, setForPriceDecrease] = useState(null);
  const [sortedHomes, setSortedHomes] = useState(null); // Initialize sortedHomes state



  // 1111111111111111111111111111111111
// for toggle DOllar AND LARI ---==---(START)
  const [isOn, setIsOn] = useState(false);
  const toggleSwitch = () => setIsOn(!isOn);
  // -----===--------(END)


  
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


const normalizeComplexData = (data, lang) => {
  // Check if data is undefined or null
  if (!data) {
    console.error('Data is undefined or null.');
    return [];
  }
  
  // Check if data is an array
  if (!Array.isArray(data)) {
    console.error('Data is not an array.');
    return [];
  }

  return data.map(item => ({
    id: item.id,
    complexName: item[`complex_name_${lang}`],
    internalComplexName: item.internal_complex_name ? item.internal_complex_name.internal_complex_name : '',
    typeOfRoof: item[`type_of_roof_${lang}`],
    address: {
      street: item[`address_${lang}`]?.[`address_${lang}`],
      city: item[`address_${lang}`]?.[`city_${lang}`],
      district: item[`address_${lang}`]?.[`district_${lang}`],
      pharentDistrict: item[`address_${lang}`]?.[`pharentDistrict_${lang}`],
      streetName: item[`address_${lang}`]?.[`street_name_${lang}`],
      latitude: item[`address_${lang}`]?.latitude,
      longitude: item[`address_${lang}`]?.longitude,
    },
    company: {
      mobile: item[`company_${lang}`]?.Mobile,
      mobileHome: item[`company_${lang}`]?.Mobile_Home,
      about: item[`company_${lang}`]?.[`aboutcompany_${lang}`],
      address: item[`company_${lang}`]?.[`address_${lang}`],
      backgroundImage: item[`company_${lang}`]?.background_image,
      website: item[`company_${lang}`]?.companyweb,
      email: item[`company_${lang}`]?.email,
      facebookPage: item[`company_${lang}`]?.facebook_page,
      logo: item[`company_${lang}`]?.logocompany,
      name: item[`company_${lang}`]?.[`name_${lang}`],
      isTopCompany: item[`company_${lang}`]?.topCompany,
      isVisible: item[`company_${lang}`]?.visibility,
    },
    images: item.image_urls,
    complexDetails: {
      complexLevel: item.internal_complex_name?.complex_level,
      finishMonth: item.internal_complex_name?.finish_month,
      finishYear: item.internal_complex_name?.finish_year,
      isFinished: item.internal_complex_name?.status,
      floorNumber: item.internal_complex_name?.floor_number,
      numberOfApartments: item.internal_complex_name?.number_of_apartments,
      numberOfFloors: item.internal_complex_name?.number_of_floors,
      numberOfHouses: item.internal_complex_name?.number_of_houses,
      phoneNumber: item.internal_complex_name?.phone_number,
      plotArea: item.internal_complex_name?.plot_area,
      pricePerSqMeter: item.internal_complex_name?.price_per_sq_meter,
      space: item.internal_complex_name?.space,
      isVipComplex: item.internal_complex_name?.vipComplex,
      isVisible: item.internal_complex_name?.visibiliti,
    },
  }));
};


// ------------------------------------------------------------------------------------

// (START)---- აქ სამივეა: ფასი, გამოქვეყნების თარიღი და რეიტინგის მიხედვითაც სორტირებული
// const sortHomes = (data, sortOrder, sortBy) => {
//   if (sortBy === 'price') {
//     if (sortOrder === 'decrease') {
//       return [...data].sort((a, b) => parseFloat(b.complexDetails.pricePerSqMeter) - parseFloat(a.complexDetails.pricePerSqMeter));
//     } else if (sortOrder === 'increase') {
//       return [...data].sort((a, b) => parseFloat(a.complexDetails.pricePerSqMeter) - parseFloat(b.complexDetails.pricePerSqMeter));
//     }
//   } else if (sortBy === 'publishedTime') {
//     if (sortOrder === 'decrease') {
//       return [...data].sort((a, b) => new Date(b.publishedTime) - new Date(a.publishedTime));
//     } else if (sortOrder === 'increase') {
//       return [...data].sort((a, b) => new Date(a.publishedTime) - new Date(b.publishedTime));
//     }
//   } else if (sortBy === 'rating') {
//     if (sortOrder === 'decrease') {
//       return [...data].sort((a, b) => b.rating - a.rating);
//     } else if (sortOrder === 'increase') {
//       return [...data].sort((a, b) => a.rating - b.rating);
//     }
//   }
//   return data;
// };
// -(END)-----------------------------------------------------------



// (START)-----  აქ კიდე ესაა გასაწერი, რომ კონკრეტულ ღილაკზე დაჭერისას რა ქნას... მაგიტომაცაა მითითებული
// ესენი:  setSortBy('price');, setSortBy('publishedTime'), setSortBy('rating');

{/* <MenuItem onClick={() => { handleClose(); setForPriceDecrease('decrease'); setSortBy('price'); }}>ფასი კლებადობით</MenuItem>
<MenuItem onClick={() => { handleClose(); setForPriceDecrease('increase'); setSortBy('price'); }}>ფასი ზრდადობით</MenuItem>

<MenuItem onClick={() => { handleClose(); setForPriceDecrease('decrease'); setSortBy('publishedTime'); }}>თარიღი კლებადობით</MenuItem>
<MenuItem onClick={() => { handleClose(); setForPriceDecrease('increase'); setSortBy('publishedTime'); }}>თარიღი ზრდადობით</MenuItem>

<MenuItem onClick={() => { handleClose(); setForPriceDecrease('decrease'); setSortBy('rating'); }}>რეიტინგი კლებადობით</MenuItem>
<MenuItem onClick={() => { handleClose(); setForPriceDecrease('increase'); setSortBy('rating'); }}>რეიტინგი ზრდადობით</MenuItem> */}
// -(END)----------------------------------------------------------------------------








// second useEffect (ეს მხოლოდ ფასის მიხედვითაა სორტირებული);
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
      const response = await axiosInstance.get(`https://api.storkhome.ge/complex/${selectedLanguage}/`);
      // const response = await axios.get('https://6cf2c30d277cc9c200a5ff0a313ac6cf.serveo.net/ordering=')
      // const { results } = response.data.results[0];
      const normalData = normalizeComplexData(response.data.results, selectedLanguage); 
      // console.log('es aris D A T A',data)
      console.log('es aris RESPONSE', response)
      setHomes(normalData);
      // console.log('es aris meore',results)
      // setTotalCount(count);
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
    // const scrollToTop = () => {
    //   const scrollStep = -window.scrollY / (500 / 15);
  
    //   const scrollInterval = setInterval(() => {
    //     if (window.scrollY !== 0) {
    //       window.scrollBy(0, scrollStep);
    //     } else {
    //       clearInterval(scrollInterval);
    //     }
    //   }, 15);
    // };


  
  return (
    <div className='ComplexBodyBox'>
      {/* ეს არის ჩამონათვალი button–ები, რომ გადახვიდე კომპლექსებზე, გეგმარებებზე, რუკაზე, სორტირება და დასაკელება და counter-ი ... */}
      <div className='infoFieldOfComplexsPlansMaps'>
        <div className='complexInfoAndCountShowBox'>
          <p>კომპლექსები {totalCount}</p>
        </div>
        {/* აქ არის კომპლექსებზე, გეგმარებებზე, რუკაზე, სორტირება ---- */}
        <div className='projectsPlansMapsSortingAndDollarBox'>
          <Link to='/complex' >
            <div className='mapAndLogoImg'>
              <img src={mapSignLogo} alt='mapSignLogo' className='mapSignLogo' />
              <button>პროექტები</button>
            </div>
          </Link>

          <Link to='/complex/apartmentList' >
            <div className='mapAndLogoImg'>
              <img src={mapSignLogo} alt='mapSignLogo' className='mapSignLogo' />
              <button>გეგმარებები</button>
            </div>

          </Link>


          <Link to='/map' >
            <div className='mapAndLogoImg'>
              <img src={mapSignLogo} alt='mapSignLogo' className='mapSignLogo' />
              <button>რუკა</button>
            </div>
          </Link>
        {/* მხოლოდ for sorting ----- */}
        {/* ველოდები სახლების ატვირთვას, და back-ში სორტირების გაკეთებას, რომ შესაბამისი რექუესთი გავაგზავნო
        რასაც მომხმარებელი აირჩევს: მაგ.: ფასი ზრდადობით და ა.შ.  */}
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
          <MenuItem onClick={() => { handleClose(); setForPriceDecrease('decrease'); }}>თარიღი კლებადობით</MenuItem>
          <MenuItem onClick={() => { handleClose(); setForPriceDecrease('decrease'); }}>თარიღი ზრდადობით</MenuItem>

          <MenuItem onClick={() => { handleClose(); setForPriceDecrease('-price_per_sq_meter'); }}>ფასი კლებადობით</MenuItem>
          <MenuItem onClick={() => { handleClose(); setForPriceDecrease('price_per_sq_meter'); }}>ფასი ზრდადობით</MenuItem>

          <MenuItem onClick={() => { handleClose(); setForPriceDecrease('increase'); }}>რეიტინგი კლებადობით</MenuItem>
          <MenuItem onClick={() => { handleClose(); setForPriceDecrease('increase'); }}>რეიტინგი ზრდადობით</MenuItem>

        </Menu>
        {/* -------------------------------- */}
        </div>

        {/* ----Dollar and Lari Toggle button */}

          <div className="switch" data-ison={isOn} onClick={toggleSwitch}>
            <motion.div className="handle" layout transition={spring}>
              <img
                src={lari}
                alt="Lari Sign"
                className={`currency-sign ${isOn ? "active" : ""}`}
                />
              <img
                src={dollar}
                alt="Dollar Sign"
                className={`currency-sign ${!isOn ? "active" : ""}`}
                />
            </motion.div>
          </div>
        {/* ---------------- */}

      </div>
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
      {/* <button onClick={scrollToTop} style={{ borderRadius: '30px' }} >
        <img src={scrollUp} alt='logo' style={{ width: '40px' }} />
      </button> */}

      
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
      {/* ---------------------------------------------------------------- */}

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

const spring = {
  type: "spring",
  stiffness: 100,
  damping: 30,
};
