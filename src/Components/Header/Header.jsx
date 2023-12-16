/* eslint-disable react/prop-types */
// import React from 'react'
import './Header.css';
import CompanyLogo from '../../assets/eliteCityLogo.svg';
import { Link } from "react-router-dom";
import HeartLogo from '../../assets/heartIcon.svg';
import Language from './Language/Language';




export default function Header({favorites, handleLanguageChange }) {



  return (
    <div className='header'>

      <div className='LogoAndNavBar'>
        <Link to='/homePage'>
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
          <div className='heartAndNumberBox'>
        <Link to='/favoriteComplex'>
            <div className='heartBox'>
                <button className='heartLogoButton'>
                  <img src={HeartLogo} alt='Icon of Heart' className='heartLogo'/>
                </button>
            </div>
        </Link>
            <div className='numberOfHeart'>
              <p>{favorites.length}</p>
            </div>
          </div>
        {/* Language Menu,  */}
        {/* აქ მხოლოდ ენებს ჩამოშლის ფუნქცია აქვს და გადასაყვანია ყველა ტექსტი სხვა ენებზეც */}
       <Language handleLanguageChange={handleLanguageChange} />
      
      </div>
            
    </div>
  )
}
