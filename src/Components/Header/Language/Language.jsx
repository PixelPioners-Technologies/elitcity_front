/* eslint-disable no-unused-vars */
import React from 'react'
import './Language.css';
import { useState } from 'react';
import axios from 'axios';


// for Languages menu ...
// import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LanguageIcon from '../../../assets/worldLanguageIcon.svg';
import georgianFlag from '../../../assets/flag-for-flag-georgia-svgrepo-com.svg';
import englishFlag from '../../../assets/united-kingdom-uk-svgrepo-com.svg';
import russianFlag from '../../../assets/flag-ru-svgrepo-com.svg';


export default function Language({handleLanguageChange}) {

  const [anchorEl, setAnchorEl] = React.useState(null);

  // for Language Menu in library
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


    // Here, you can make an Axios request with the selected language
    // axios.get(`https://api.storkhome.ge/complex/${selectedLanguage}`)
    //   .then((response) => {
    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching data:', error);
    //   });

  return (
    <div>
      <div className='languageBox'>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <img src={LanguageIcon} alt='Logo of languages' />
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
          <MenuItem onClick={() => { handleLanguageChange('ka'); handleClose(); }} >
            <img src={georgianFlag} alt='georgian flag' style={{ width: '17px' }} />
            <p style={{ marginLeft: '5px' }}>
              Georgian
            </p>z
          </MenuItem>
          <MenuItem onClick={() => { handleLanguageChange('en'); handleClose(); }}>
            <img src={englishFlag} alt='georgian flag' style={{ width: '17px' }} />
            <p style={{ marginLeft: '5px' }}>
              English
            </p>
          </MenuItem>
          <MenuItem onClick={() => { handleLanguageChange('ru'); handleClose(); }}>
            <img src={russianFlag} alt='georgian flag' style={{ width: '17px' }} />
            <p style={{ marginLeft: '5px' }}>
              Russian
            </p>
          </MenuItem>
        </Menu>
      </div>
    </div>
  )
}
