/* eslint-disable react/prop-types */
// import React from 'react'
import './Header.css';
import CompanyLogo from '../../assets/LogoOfStorkhome.svg';
import { Link } from "react-router-dom";
import HeartLogo from '../../assets/starLogo.svg';
import Language from './Language/Language';
import ArrowDown from '../../assets/arrowDownFromHeader.svg';




export default function Header({favorites, handleLanguageChange }) {



  return (
    <div className='header'>

      <div className='LogoAndNavBar'>
        <div className='logoBox'>
          <Link to='/homePage'>
            <img src={CompanyLogo} alt='Logo of Company STARKHOME COMPANY ' />
          </Link>
        </div>
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
              <Link to='/developers'><button className='buttonItemsOfList'>ფიზიკური პირები</button></Link>
            </li>
            <li>
              <Link to='/map'><button className='buttonItemsOfList'>რუკა</button></Link>
            </li>
            <li>
              <Link to='/sales'><button className='buttonItemsOfList'>აქციები</button></Link>
            </li>
            <li>
              <Link to='/developers'><button className='buttonItemsOfList'>სტატიები</button></Link>
            </li>
            <li>
              <Link to='/developers'><button className='buttonItemsOfList'>storkhome+</button></Link>
            </li>
            
          </ul>
        </nav>
      </div>


      <div className='favouriteAndLanguageAndDayModeChanger'>
        {/* სამკუთხედის ჩამოსაშლელი ისრის სურათი და დეველოპერების button */}
        <div className='downArrowImgAndDevelopersLinkBox'>
          <div className='arrowDownImgBox'>
            <img src={ArrowDown} alt='arrowDown image'/>
          </div>
          <Link to='/developers'><button className='buttonItemsOfList'>დეველო</button></Link>
        </div>
        {/* ------------------------------- */}

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
        {/* აქ მხოლოდ ენებს ჩამოშლის ფუნქცია აქვს და გადასაყვანია ყველა ტექსტი სხვა ენებზეც, გურამს 
        აქვს მაპზე გაწერილი მოდალებად */}
       <Language handleLanguageChange={handleLanguageChange} />
      
      </div>
            
    </div>
  )
}
