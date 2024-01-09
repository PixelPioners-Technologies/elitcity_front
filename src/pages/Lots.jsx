// import React from 'react'
import './Lots.css';
import { useState } from 'react';
import { motion } from "framer-motion";



// for Sorting
// import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
// ------------------------------------------------------------------------------------
import dollar from '../assets/dollar-svgrepo-com.svg';
import lari from '../assets/lari-svgrepo-com.svg';
import arrowDown from '../assets/arrow-down-for-sorting.svg';




export default function Lots() {
  const [ascendentPrice, setAscendentPrice] = useState('');
  const [totalCount, setTotalCount] = useState(0);


  // for Sorting
const [anchorEl, setAnchorEl] = useState(null);
const open = Boolean(anchorEl);
const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};
const handleClose = () => {
  setAnchorEl(null);
};
// -------------------------------------------------------

// for toggle DOllar AND LARI ---==---(START)
const [isOn, setIsOn] = useState(false);
const toggleSwitch = () => setIsOn(!isOn);
// -----===--------(END)


  return (
    <div className='LotsBodyBox'>
       {/* ეს არის სორტირება და Dollar/Lari-ის ცვლილების button ... */}
      <div className='lotsSortingAndCurrencyBox'>

        <div className='lotsNumberInfoBox'>
          <p>ნაკვეთები {totalCount}</p>
        </div>

        {/* აქ არის  სორტირება და ვალუტის ცვლილების button -->>(START) */}
        <div className='sortingAndCurrencyBox'>

          {/* აქ არის მხოლოდ სორტირება 
          (START sortingBox) --->>*/}
          <div className='sortingBox'>
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              სორტირება
              <img src={arrowDown} alt='arrow-down-for-sorting' className='arrowDownImageForSorting'/>
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
              <MenuItem onClick={() => { handleClose(); setAscendentPrice('-created_at'); }}>თარიღი კლებადობით</MenuItem>
              <MenuItem onClick={() => { handleClose(); setAscendentPrice('created_at'); }}>თარიღი ზრდადობით</MenuItem>
              <MenuItem onClick={() => { handleClose(); setAscendentPrice('-price_per_sq_meter'); }}>ფასი კლებადობით</MenuItem>
              <MenuItem onClick={() => { handleClose(); setAscendentPrice('price_per_sq_meter'); }}>ფასი ზრდადობით</MenuItem>
              <MenuItem onClick={() => { handleClose(); setAscendentPrice('-rank'); }}>რანკი კლებადობით</MenuItem>
              <MenuItem onClick={() => { handleClose(); setAscendentPrice('rank'); }}>რანკი ზრდადობით</MenuItem>
            </Menu>
          </div>
          {/* -----------(END sortingBox) */}

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
          {/* ----------------(End) currency */}
        </div>
        {/* -----------(END sortingAndCurrencyBox) */}

          

      </div>
{/* // ------------------------------------------------------------------------------------ */}


    </div>
  )
}


const spring = {
  type: "spring",
  stiffness: 100,
  damping: 30,
};
