// import React from 'react'
import './Complex.css';

import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";




// Pagination
// import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';




const axiosInstance = axios.create({
  baseURL: 'http://34.201.93.104:8000'
});



export default function Complex() {

  const [homes, setHomes] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [images, setImages] = useState([]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/complex/?limit=10&offset=${(currentPage - 1) * 10}`);
        const responseImage = await axiosInstance.get(`/images/?limit=10&offset=${(currentPage - 1) * 10}`);
       
          const { results, count } = response.data;
          
          
          setHomes(results);
          setTotalCount(count);
          setImages(responseImage.data.results);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      
      fetchData();
    }, [currentPage]);
    console.log('images: ', images);


  console.log(homes);

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
          <Link to='/complex/plans' ><button>პროექტები</button></Link>
          <Link to='/map' ><button>რუკა</button></Link>
        </div>
      </div>

      {/* ფილტრის გაკეთება back-ში ხდება და მერე მე query params-ით ვაჩვენებ sort–ირებას
          https://v5.reactrouter.com/web/example/query-parameters
       */}


      {/* <h1>Complex Page Component</h1> */}
      <div className='allCards'>
        {homes && homes.map((complex, index, ) => (
          <div className='card' key={index}>
              <img src={images[index]?.image} alt='photo of complex' style={styles.imageStyles} />
             {/* )} */}

            <p style={styles.companyTitle}>{complex.name}</p>
            <div className='textInfo'>
              <p style={styles.complexInfo}>{complex.address}</p>
              <p style={styles.complexInfo}>{complex.price_per_sq_meter}</p>
              <p style={styles.complexFinished} >თარიღი...</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className='pagination'>
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(totalCount / 10)} 
            shape="rounded"
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
            onClick={pagiHandler}
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
