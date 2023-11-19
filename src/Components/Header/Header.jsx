// import React from 'react'
import './Header.css';
import CompanyLogo from '../../assets/eliteCityLogo.svg';
import { Link } from "react-router-dom";
import HeartLogo from '../../assets/heartIcon.svg';
import LanguageIcon from '../../assets/worldLanguageIcon.svg';

// for Languages menu ...
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import georgianFlag from '../../assets/flag-for-flag-georgia-svgrepo-com.svg';
import englishFlag from '../../assets/united-kingdom-uk-svgrepo-com.svg';
import russianFlag from '../../assets/flag-ru-svgrepo-com.svg';



export default function Header() {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='header'>

      <div className='LogoAndNavBar'>
        <Link to='/'>
          <img src={CompanyLogo} alt='Logo of Company ELITECITY COMPANY ' />
        </Link>
        <nav>
          <ul>
            <li>
              <Link to='/complex'><button className='buttonItemsOfList'>კომპლესები</button></Link>
            </li>
            <li>
              <Link to='/lots'><button className='buttonItemsOfList'>ნაკვეთები</button></Link>
            </li>
            <li>
              <Link to='/developers'><button className='buttonItemsOfList'>დეველოპერები</button></Link>
            </li>
            <li>
              <Link to='/map'><button className='buttonItemsOfList'>რუკა</button></Link>
            </li>
            <li>
              <Link to='/sales'><button className='buttonItemsOfList'>აქციები</button></Link>
            </li>
          </ul>
        </nav>
      </div>


      <div className='favouriteAndLanguageAndDayModeChanger'>

        {/* ჯერ–ჯერობით favorite უბრალოდ img-ად მაქვს ვიზუალისთვის და არა ფუნქციონალით */}
        <div className='heartBox'>
          <button className='heartLogoButton'>
            <img src={HeartLogo} alt='Icon of Heart' className='heartLogo'/>
          </button>
        </div>
        {/* Language Menu,  */}
        {/* აქ მხოლოდ ენებს ჩამოშლის ფუნქცია აქვს და გადასაყვანია ყველა ტექსტი სხვა ენებზეც */}
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
            <MenuItem onClick={handleClose}>
              <img src={georgianFlag} alt='georgian flag' style={{width: '17px'}} />
              <p style={{marginLeft: '5px'}}>
                Georgian
              </p>
              </MenuItem>
            <MenuItem onClick={handleClose}>
              <img src={englishFlag} alt='georgian flag' style={{width: '17px'}} />
              <p style={{marginLeft: '5px'}}>
                English
              </p>
              </MenuItem>
            <MenuItem onClick={handleClose}>
              <img src={russianFlag} alt='georgian flag' style={{width: '17px'}} />
              <p style={{marginLeft: '5px'}}>
                Russian
              </p>
              </MenuItem>
          </Menu>
        </div>
      
      </div>
            
    </div>
  )
}
