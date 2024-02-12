/* eslint-disable react/prop-types */
// import React from 'react'
import React from "react";
import "./Header.css";
import CompanyLogo from "../../assets/LogoOfStorkhome.svg";
import { Link } from "react-router-dom";
import HeartLogo from "../../assets/starLogo.svg";
import Language from "./Language/Language";
import ArrowDown from "../../assets/arrowDownFromHeader.svg";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Header({
  favorites,
  handleLanguageChange,
  onButtonClick,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="header">
      <Link to="/homePage">
        <img src={CompanyLogo} alt="Logo of Company STARKHOME COMPANY " />
      </Link>
      {/* ------------------------------- */}
      {/* ჯერ–ჯერობით favorite უბრალოდ img-ად მაქვს ვიზუალისთვის და არა ფუნქციონალით */}
      <div className="row_reverse">
        <nav className={isMenuOpen ? "open" : "close"}>
          <ul>
            <li>
              <Link to="/complex">
                <motion.div
                  className="textButtonContainer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <button
                    onClick={() => onButtonClick("ComplexButton")}
                    className="buttonItemsOfList"
                  >
                    კომპლესები
                  </button>
                </motion.div>
              </Link>
            </li>
            <li>
              <Link to="/lots">
                <motion.div
                  className="textButtonContainer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <button className="buttonItemsOfList">ნაკვეთები</button>
                </motion.div>
              </Link>
            </li>
            <li>
              <Link to="/developers">
                <motion.div
                  className="textButtonContainer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <button className="buttonItemsOfList">დეველოპერები</button>
                </motion.div>
              </Link>
            </li>
            <li>
              <Link to="/physical">
                <motion.div
                  className="textButtonContainer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <button className="buttonItemsOfList">ფიზიკური პირები</button>
                </motion.div>
              </Link>
            </li>
            <li>
              <Link to="/map">
                <motion.div
                  className="textButtonContainer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <button className="buttonItemsOfList">რუკა</button>
                </motion.div>
              </Link>
            </li>
            <li>
              <Link to="/sales">
                <motion.div
                  className="textButtonContainer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <button className="buttonItemsOfList">აქციები</button>
                </motion.div>
              </Link>
            </li>
            <li>
              <Link to="/articles">
                <motion.div
                  className="textButtonContainer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <button className="buttonItemsOfList">სტატიები</button>
                </motion.div>
              </Link>
            </li>
            <li>
              <Link to="/storkhome">
                <motion.div
                  className="textButtonContainer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <button className="buttonItemsOfList">storkhome+</button>
                </motion.div>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="downArrowImgAndDevelopersLinkBox">
          <div className="arrowDownImgBox">
            <img src={ArrowDown} alt="arrowDown image" />
          </div>
          <Link to="/developers">
            <button className="buttonItemsOfList">დეველო</button>
          </Link>
        </div>
      </div>

      <div className="favouriteAndLanguageAndDayModeChanger">
        <Link to="/favoriteComplex">
          <div className="heartBox">
            <button className="heartLogoButton">
              <img src={HeartLogo} alt="Icon of Heart" className="heartLogo" />
            </button>
          </div>
        </Link>
        {/* აქ მხოლოდ ენებს ჩამოშლის ფუნქცია აქვს და გადასაყვანია ყველა ტექსტი სხვა ენებზეც, გურამს 
        აქვს მაპზე გაწერილი მოდალებად */}
        <Language handleLanguageChange={handleLanguageChange} />
      </div>
      <div className="burger_menu_icon" onClick={toggleMenu}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </div>
  );
}
