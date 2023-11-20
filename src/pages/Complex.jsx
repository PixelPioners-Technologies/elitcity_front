// import React from 'react'
import './Complex.css';

import axios from 'axios';
import { useState, useEffect } from 'react';

const axiosInstance = axios.create({
  baseURL: 'http://34.201.93.104:8000'
})

export default function Complex() {

  const [homes, setHomes] = useState(null);

  useEffect(() => {
    const requestHome = async () => {
      try {
        const response = await axiosInstance.get('/complex');
        const data = response.data;
        setHomes(data.results); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    requestHome();
  }, []);

  console.log(homes);




  return (
    <div className='ComplexBodyBox'>
       {/* <h1>Complex Page Component</h1> */}
       <div className='allCards'>
        {homes && homes.map((complex, index) => (
          <div className='card' key={index}>
            <img  src={complex.images[0].image} alt='photo of complex' style={styles.imageStyles} />
            <p style={styles.companyTitle}>{complex.name}</p>
            <div className='textInfo'>
              <p style={styles.complexInfo}>{complex.address}</p>
              {/* <p>{home.price_per_sq_meter}</p> */}
              <p style={styles.complexInfo}>{complex.price_per_sq_meter}</p>
              {/* <p>{home.finished}</p> */}
              <p style={styles.complexFinished} >{complex.phone_number}</p>
            </div>
          </div>
        ))}
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
    color: 'black',
  },
  complexFinished: {
    color: 'red',
  },
};
