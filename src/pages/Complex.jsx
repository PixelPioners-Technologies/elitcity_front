// import React from 'react'
import './Complex.css';

import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

// Sort სორტირებისთვის
// import * as React from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import { useDemoData } from '@mui/x-data-grid-generator';



// Pagination
// import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';




const axiosInstance = axios.create({
  baseURL: 'http://34.201.93.104:8000'
});

// const VISIBLE_FIELDS = ['name', 'rating', 'country', 'dateCreated', 'isAdmin'];


export default function Complex() {

  const [homes, setHomes] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
const [totalCount, setTotalCount] = useState(0);
// for sorting
// const [sortBy, setSortBy] = useState({ field: 'name', order: 'asc' });


  // const { data } = useDemoData({
  //   dataSet: 'Employee',
  //   visibleFields: VISIBLE_FIELDS,
  //   rowLength: 100,
  // });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/complex/?limit=10&offset=${(currentPage - 1) * 10}`);

        // const response = await axiosInstance.get(
        //   `/complex/?limit=10&offset=${(currentPage - 1) * 10}&ordering=${sortBy.order === 'desc' ? '-' : ''}${sortBy.field}`
        // );
                const { results, count } = response.data;
        setHomes(results);
        setTotalCount(count);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [currentPage]);
  // }, [currentPage, sortBy]);


  // for sorting
  // const handleSort = (field) => {
  //   const sortOrder = sortBy.field === field && sortBy.order === 'asc' ? 'desc' : 'asc';
  //   setSortBy({ field, order: sortOrder });
  // };


  console.log(homes);




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
        {/* <div className='SortBox'>
          <DataGrid
            sortingOrder={['desc', 'asc']}
            initialState={{
              ...data.initialState,
              sorting: {
                ...data.initialState?.sorting,
                sortModel: [
                  {
                    field: 'commodity',
                    sort: 'asc',
                  },
                ],
              },
            }}
            {...data}
          />
        </div> */}
      </div>

         {/* Sorting buttons */}
      {/* <div className='SortBox'>
        <button onClick={() => handleSort('name')}>Sort by Name</button>
        <button onClick={() => handleSort('address')}>Sort by Address</button>
        <button onClick={() => handleSort('price_per_sq_meter')}>Sort by Price</button>
      </div> */}

      {/* <h1>Complex Page Component</h1> */}
      <div className='allCards'>
        {homes && homes.map((complex, index) => (
          <div className='card' key={index}>
            {/* <img  src={complex.images[0].image} alt='photo of complex' style={styles.imageStyles} /> */}
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
