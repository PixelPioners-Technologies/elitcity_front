/* eslint-disable react/prop-types */
// import React from 'react'
import "./Header.css";
import CompanyLogo from "../../assets/LogoOfStorkhome.svg";
import { Link } from "react-router-dom";
import HeartLogo from "../../assets/starLogo.svg";
import Language from "./Language/Language";
import ArrowDown from "../../assets/arrowDownFromHeader.svg";
import { motion } from "framer-motion";

export default function Header({
  favorites,
  favoritesPhysical,
  favoritesLots,
  handleLanguageChange,
  onButtonClick,
}) {
  return (
    <div className="header">
      <div className="LogoAndNavBar">
        <div className="logoBox">
          <Link to="/homePage">
            <img src={CompanyLogo} alt="Logo of Company STARKHOME COMPANY " />
          </Link>
        </div>
        <nav>
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
                    კომპლექსები
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
      </div>

      <div className="favouriteAndLanguageAndDayModeChanger">
        {/* სამკუთხედის ჩამოსაშლელი ისრის სურათი და დეველოპერების button */}
        <div className="downArrowImgAndDevelopersLinkBox">
          <div className="arrowDownImgBox">
            <img src={ArrowDown} alt="arrowDown image" />
          </div>
          <Link to="/developers">
            <button className="buttonItemsOfList">დეველო</button>
          </Link>
        </div>
        {/* ------------------------------- */}

        {/* ჯერ–ჯერობით favorite უბრალოდ img-ად მაქვს ვიზუალისთვის და არა ფუნქციონალით */}
        <div className="heartAndNumberBox">
          <Link to="/favoriteComplex">
            <div className="heartBox">
              <button className="heartLogoButton">
                <img
                  src={HeartLogo}
                  alt="Icon of Heart"
                  className="heartLogo"
                />
              </button>
            </div>
          </Link>
          <div className="numberOfHeart">
            <p>
              {favorites.length +
                favoritesPhysical.length +
                favoritesLots.length}
            </p>
          </div>
        </div>
        {/* Language Menu,  */}
        {/* აქ მხოლოდ ენებს ჩამოშლის ფუნქცია აქვს და გადასაყვანია ყველა ტექსტი სხვა ენებზეც, გურამს 
        აქვს მაპზე გაწერილი მოდალებად */}
        <Language handleLanguageChange={handleLanguageChange} />
      </div>
    </div>
  );
}
