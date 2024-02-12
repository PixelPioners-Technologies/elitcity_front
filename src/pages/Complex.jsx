/* eslint-disable no-case-declarations */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
// import React from 'react'
import "./Complex.css";
import { motion } from "framer-motion";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import heartIcon from "../assets/starLogo.svg";
import Filter from "../assets/filter.png";

import heartIconEmpty from "../assets/emptyStarLogo.svg";
import mapSignLogo from "../assets/mapSignLogoo.svg";
import dollar from "../assets/dollar-svgrepo-com.svg";
// import dollar from '../assets/dollar-whitee.svg';

import lari from "../assets/lari-svgrepo-com.svg";
// import lari from '../assets/lari-white.svg';
import arrowDownSorting from "../assets/arrow-down-white.svg";
import googleMapImage from "../assets/mapImageForFooter.svg";

// Pagination
// import * as React from 'react';
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Skeleton } from "@mui/material";

// ------------------------------------------------------------------------------------
// for Sorting
import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
// ------------------------------------------------------------------------------------

import { BaseURLs } from "../App";

import button_icon from "../icons/Vector.svg";

import Modal_main from "../modals_for_complex/Modal_main";
import PriceModal_complex from "../modals_for_complex/PriceModal_complex";
import SpaceModal_complex from "../modals_for_complex/SpaceModal_complex";
import StatusModal_complex from "../modals_for_complex/StatusModa_complex";

import loupe from "../icons/loupe.png";

// eslint-disable-next-line react/prop-types
export default function Complex({
  favoriteHandler,
  favorites,
  // selectedStatuses,
  selectedLanguage,
  locations,
  min_space,
  max_space,
  min_spacehangeHandler,
  max_spacehangeHandler,
  minPricePerSquareMeter,
  maxPricePerSquareMeter,
  minPricePerSquareMeterChangeHandler,
  maxPricePerSquareMeterChangeHandler,
  minFullPrice,
  maxFullPrice,
  minFullPriceChangeHandler,
  maxFullPriceChangeHandler,
  selectedCity,
  selectedPharentDistricts,
  selectedDistricts,
  searchButton,
  selectedStatuses,
  selectedStatusesChangeHandler,
  searchButtonhangeHandler,
  selectedDistrictsChangeHandler,
  selectedPharentDistrictsChangeHandler,
  selectedCityChangeHandler,
  searchInput,
  setSearchInput,
  totalPageCount,
  currentPage,
  handleCorrentPageHandler,
  complexes,
  total_item_number,

  getCorrencyRate,
  HandleStateChange,
  currenceChangeState,
  isOn,
  toggleSwitch,

}) {
  const [homes, setHomes] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [forPriceDecrease, setForPriceDecrease] = useState(null);
  const [sortedHomes, setSortedHomes] = useState(null); // Initialize sortedHomes state
  const [ascendentPrice, setAscendentPrice] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSpaceModalOpen, setIsSpaceModalOpen] = useState(false);
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

  const [modalContent, setModalContent] = useState("");

  // const [status, setStatus] = useState('');

  // const [mapCenter, setMapCenter] = useState(initialCenter);
  // const [zoomLevel, setZoomLevel] = useState(13);

  // const [mapInstance, setMapInstance] = useState(null);

  const navigate = useNavigate();

  // Assuming `complex` is an object representing each house
  // const handleHouseClick = (complexId) => {
  //   navigate(`/eachComplex/${complexId}`);
  // };

  const handleHouseClick = (complexId) => {
    navigate(`/eachComplex/${complexId}`, { state: { complexId } });
  };

  // useEffect(() => {
  //   console.log('corrent page----', totalPageCount)
  // }, [totalPageCount,currentPage ])

  // ------------------------------------------------------------------------------------
  // for Sorting
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // ------------------------------------------------------------------------------------

  const normalizeComplexData = (data, lang) => {
    // Check if data is undefined or null
    if (!data) {
      console.error("Data is undefined or null.");
      return [];
    }

    // Check if data is an array
    if (!Array.isArray(data)) {
      console.error("Data is not an array.");
      return [];
    }

    return data.map((item) => ({
      id: item.id,
      complexName: item[`complex_name_${lang}`],
      internalComplexName: item.internal_complex_name
        ? item.internal_complex_name.internal_complex_name
        : "",
      typeOfRoof: item[`type_of_roof_${lang}`],
      address: {
        street: item[`address_${lang}`]?.[`address_${lang}`],
        city: item[`address_${lang}`]?.[`city_${lang}`],
        district: item[`address_${lang}`]?.[`district_${lang}`],
        pharentDistrict: item[`address_${lang}`]?.[`pharentDistrict_${lang}`],
        streetName: item[`address_${lang}`]?.[`street_name_${lang}`],
        latitude: item[`address_${lang}`]?.latitude,
        longitude: item[`address_${lang}`]?.longitude,
      },
      company: {
        mobile: item[`company_${lang}`]?.Mobile,
        mobileHome: item[`company_${lang}`]?.Mobile_Home,
        about: item[`company_${lang}`]?.[`aboutcompany_${lang}`],
        address: item[`company_${lang}`]?.[`address_${lang}`],
        backgroundImage: item[`company_${lang}`]?.background_image,
        website: item[`company_${lang}`]?.companyweb,
        email: item[`company_${lang}`]?.email,
        facebookPage: item[`company_${lang}`]?.facebook_page,
        logo: item[`company_${lang}`]?.logocompany,
        name: item[`company_${lang}`]?.[`name_${lang}`],
        isTopCompany: item[`company_${lang}`]?.topCompany,
        isVisible: item[`company_${lang}`]?.visibility,
      },
      images: item.image_urls,
      complexDetails: {
        complexLevel: item.internal_complex_name?.complex_level,
        finishMonth: item.internal_complex_name?.finish_month,
        finishYear: item.internal_complex_name?.finish_year,
        isFinished: item.internal_complex_name?.status,
        floorNumber: item.internal_complex_name?.floor_number,
        numberOfApartments: item.internal_complex_name?.number_of_apartments,
        numberOfFloors: item.internal_complex_name?.number_of_floors,
        numberOfHouses: item.internal_complex_name?.number_of_houses,
        phoneNumber: item.internal_complex_name?.phone_number,
        plotArea: item.internal_complex_name?.plot_area,
        pricePerSqMeter: item.internal_complex_name?.price_per_sq_meter,
        space: item.internal_complex_name?.space,
        isVipComplex: item.internal_complex_name?.vipComplex,
        isVisible: item.internal_complex_name?.visibiliti,
      },
    }));
  };

  // ------------------------------------------------------------------------------------
  //--------------------------------------modal and logic for opening filtration window --------------------------------------

  const renderModalContent = () => {
    switch (modalContent) {
      case "cities":
        return (
          <div>
            {locations.map((cityItem, index) => (
              <button
                key={index}
                onClick={() => handleCityClick(cityItem.city)}
                className="city_button"
              >
                <span>{cityItem.city}</span>
              </button>
            ))}
            <button className="modal_close_button" onClick={closeModal}>
              close
            </button>
          </div>
        );
      case "pharentdistricts":
        // Find the city object from the locations array
        const city = locations.find((loc) => loc.city === selectedCity);
        if (!city) return null;

        return (
          <div className="location_modal_container">
            <div className="districts_and_pharentdostricts">
              {city.pharentDistricts.map((parentDistrict, index) => (
                <ul key={index}>
                  <div className="pharent_district_chackmarks">
                    <label className="container">
                      <input
                        type="checkbox"
                        checked={selectedPharentDistricts.includes(
                          parentDistrict.pharentDistrict
                        )}
                        onChange={(e) =>
                          handleParentDistrictChange(
                            e,
                            parentDistrict.pharentDistrict
                          )
                        }
                      />
                      <div className="checkmark"></div>
                    </label>
                    <p>{parentDistrict.pharentDistrict}</p>
                  </div>

                  <div className="district_checkmarks">
                    {parentDistrict.districts.map((district, districtIndex) => (
                      <li
                        key={districtIndex}
                        className="child_district_checkmarks"
                      >
                        <label className="container">
                          <input
                            type="checkbox"
                            checked={selectedDistricts.includes(district)}
                            onChange={(e) => handleDistrictChange(e, district)}
                          />
                          <div className="checkmark"></div>
                        </label>

                        <p>{district}</p>
                      </li>
                    ))}
                  </div>
                </ul>
              ))}
            </div>
            <button className="modal_close_button" onClick={closeModal}>
              Close
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  const handleShowModal = () => {
    setModalContent("cities");
    setIsModalOpen(true);
    setIsSpaceModalOpen(false);
    setIsPriceModalOpen(false);
    setIsStatusModalOpen(false);
  };

  const handleCityClick = (city) => {
    setModalContent("pharentdistricts");
    selectedCityChangeHandler(city);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleParentDistrictChange = (e, parentDistrict) => {
    selectedPharentDistrictsChangeHandler((prevSelected) => {
      if (e.target.checked) {
        return [...prevSelected, parentDistrict];
      } else {
        return prevSelected.filter((pd) => pd !== parentDistrict);
      }
    });
    // Find the city object from the locations array
    const city = locations.find((loc) => loc.city === selectedCity);
    if (!city) return;

    // Find the specific parent district object
    const parentDistrictObj = city.pharentDistricts.find(
      (pd) => pd.pharentDistrict === parentDistrict
    );
    if (!parentDistrictObj) return;

    selectedDistrictsChangeHandler((prevSelected) => {
      if (e.target.checked) {
        // Add all districts of the parent district to the selected list
        // Ensure no duplicates are added
        const updatedDistricts = new Set([
          ...prevSelected,
          ...parentDistrictObj.districts,
        ]);
        return Array.from(updatedDistricts);
      } else {
        // Remove all districts of the parent district from the selected list
        return prevSelected.filter(
          (d) => !parentDistrictObj.districts.includes(d)
        );
      }
    });
  };

  const handleDistrictChange = (e, district) => {
    selectedDistrictsChangeHandler((prevSelected) => {
      if (e.target.checked) {
        return [...prevSelected, district];
      } else {
        return prevSelected.filter((d) => d !== district);
      }
    });
  };

  // -(END)----------------------------------------------------------------------------

  // second useEffect (ეს მხოლოდ ფასის მიხედვითაა სორტირებული); ეს აღარაა საჭირო, რადგან გაკეთდა უვკე სორტირება !!!!!!!!
  // (თუმცა ჯერ
  // ეწეროს მაინც)
  // const sortHomes = (data, sortOrder) => {
  //   if (sortOrder === "decrease") {
  //     return [...data].sort(
  //       (a, b) =>
  //         parseFloat(b.price_per_sq_meter) - parseFloat(a.price_per_sq_meter)
  //     );
  //   } else if (sortOrder === "increase") {
  //     return [...data].sort(
  //       (a, b) =>
  //         parseFloat(a.price_per_sq_meter) - parseFloat(b.price_per_sq_meter)
  //     );
  //   } else {
  //     return data;
  //   }
  // };
  // const cityParam = `address_${selectedLanguage}__city_${selectedLanguage}__city_${selectedLanguage}__icontains`;
  // const pharentdistrictParams = `address_${selectedLanguage}__pharentDistrict_${selectedLanguage}__pharentDistrict_${selectedLanguage}__in`;
  // const districtParams = `address_${selectedLanguage}__district_${selectedLanguage}__district_${selectedLanguage}__in`;

  // // Create a URLSearchParams object
  // let queryParams = new URLSearchParams({
  //   [cityParam]: selectedCity,
  //   [pharentdistrictParams]: selectedPharentDistricts.join(","),
  //   [districtParams]: selectedDistricts.join(","),
  //   min_price_per_sq_meter: minPricePerSquareMeter,
  //   max_price_per_sq_meter: maxPricePerSquareMeter,
  //   min_full_price: minFullPrice,
  //   max_full_price: maxFullPrice,
  //   min_space: min_space,
  //   max_space: max_space,
  //   // status: selectedStatuses,
  //   ordering: ascendentPrice,
  // });

  // if (selectedStatuses && selectedStatuses.length > 0) {
  //   selectedStatuses.forEach((status) => {
  //     queryParams.append("status", status);
  //   });
  // }

  // const queryString = queryParams.toString();
  // const requestUrl = `${selectedLanguage}/?${queryString}`;

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setIsLoading(true);
  //       // const response = await axiosInstance.get(`https://api.storkhome.ge/complex/${selectedLanguage}/`);
  //       // const response = await axios.get(`${BaseURLs.complex}//${requestUrl}`);

  //       // const { results } = response.data.results[0];
  //       // const normalData = normalizeComplexData(
  //       //   response.data.results,
  //       //   selectedLanguage
  //       // );
  //       // setHomes(normalData);
  //       // setIsLoading(false);
  //       // handleSetTodalPageCount(response.data.total_items);
  //     } catch (error) {
  //       setIsLoading(false);
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   const sortedResults = sortHomes(homes, forPriceDecrease);
  //   setSortedHomes(sortedResults);
  // }, [forPriceDecrease, homes, min_space, max_space]);

  // ------------------------------------------------------------------------------------
  // --------ffunction for changing status button content language change and also select city button language change -------------

  const handleStatusButtonLanguageChange = (lang) => {
    var languageInfo = {
      statusInfoLanguage: "en",
      cityButtonLanguage: "Select City ",
      spaceButtonLanguage: "Space",
      priceButtonLanguage: "Price",
      allStatusLanguage: "All",
      findMapButtonLanguage: "Find Map",
      allFindButtonLanguage: "Find",
      spaceButtonClose: "Close",
      minPrice: "From m²",
      maxPrice: "To m²",
      roomStudio: "Studio",
      fullPriceHomePage: "Full price",
      meterPriceHomePage: "The price of m²",
      dan: "from",
      mde: "to"
    }

    switch (lang) {
      case "en":
        languageInfo.statusInfoLanguage = "Select Status"
        languageInfo.cityButtonLanguage = "Location"
        languageInfo.spaceButtonLanguage = "Space"
        languageInfo.priceButtonLanguage = "Price"
        languageInfo.allStatusLanguage = "All"
        languageInfo.findMapButtonLanguage = "Find Map"
        languageInfo.allFindButtonLanguage = "Find"
        languageInfo.spaceButtonClose = "Close"
        languageInfo.minPrice = "From m²"
        languageInfo.maxPrice = "To m²"
        languageInfo.roomStudio = "Studio"
        languageInfo.fullPriceHomePage = "Full price"
        languageInfo.meterPriceHomePage = "The price of m²"
        languageInfo.dan = "from"
        languageInfo.mde = "to"
        break;

      case "ka":
        languageInfo.statusInfoLanguage = "აირჩიე სტატუსი"
        languageInfo.cityButtonLanguage = "მდებარეობა"
        languageInfo.spaceButtonLanguage = "ფართი"
        languageInfo.priceButtonLanguage = "ფასი"
        languageInfo.allStatusLanguage = "ყველა"
        languageInfo.findMapButtonLanguage = "რუკაზე ძიება"
        languageInfo.allFindButtonLanguage = "ძიება"
        languageInfo.spaceButtonClose = "დახურვა"
        languageInfo.minPrice = "დან მ²"
        languageInfo.maxPrice = "მდე მ²"
        languageInfo.roomStudio = "სტუდიო"
        languageInfo.fullPriceHomePage = "სრული ფასი"
        languageInfo.meterPriceHomePage = "მ² - ის ფასი"
        languageInfo.dan = "დან"
        languageInfo.mde = "მდე"
        break

      case "ru":
        languageInfo.statusInfoLanguage = "выберите статус"
        languageInfo.cityButtonLanguage = "Местоположение"
        languageInfo.spaceButtonLanguage = "Площадь"
        languageInfo.priceButtonLanguage = "Цена"
        languageInfo.allStatusLanguage = "Все"
        languageInfo.findMapButtonLanguage = "Карта"
        languageInfo.allFindButtonLanguage = "Натдти"
        languageInfo.spaceButtonClose = "закрить"
        languageInfo.minPrice = "из м²"
        languageInfo.maxPrice = "до м²"
        languageInfo.roomStudio = "Студия"
        languageInfo.fullPriceHomePage = "Полная стоимость"
        languageInfo.meterPriceHomePage = "Цена м²"
        languageInfo.dan = "из"
        languageInfo.mde = "до"
        break
    }
    return languageInfo
  }


  // ------------------------------------------------------------------------------------

  // --------------------------function for selecting status for filtration -----------------------------------------------

  const handleStatusChange = (e, value) => {
    selectedStatusesChangeHandler((prevSelectedStatuses) => {
      const newSelectedStatuses = e.target.checked
        ? [...prevSelectedStatuses, value]
        : prevSelectedStatuses.filter((status) => status !== value);

      console.log("Updated Selected Statuses:", newSelectedStatuses); // Log the new state
      return newSelectedStatuses;
    });
  };

  // -----------------------------------------------------------------------------------------------------------------------------

  // // Pagination logic
  // const itemsPerPage = 12;
  // // const totalPageCount = Math.ceil(totalCount / itemsPerPage);
  // const currentSortedHomes = sortedHomes
  //   ? sortedHomes.slice(
  //     (currentPage - 1) * itemsPerPage,
  //     currentPage * itemsPerPage
  //   )
  //   : [];

  // ------------------------------------------------------------------------------------
  // const homeMaping = currentSortedHomes.map((complex, index) => (
  //   <div
  //     className="card"
  //     key={complex.id}
  //     onClick={() => handleHouseClick(complex.id)}
  //     >
  //     <motion.div
  //       initial={{ x: -50, opacity: 0 }}
  //       transition={{ duration: 1 }}
  //       whileInView={{ x: 0, opacity: 1 }}
  //       viewport={{ once: true }}
  //     >
  //       <div className="heartbuttonAndImageBox">
  //         <div className="heartButtonBox">
  //           <button
  //             onClick={() => favoriteHandler(complex)}
  //             key={complex.id}
  //             className="heartButtons"
  //           >
  //             {favorites.some((fav) => fav.id === complex.id) ? (
  //               <img src={heartIcon} alt="Logo of heart" />
  //             ) : (
  //               <img
  //                 src={heartIconEmpty}
  //                 alt="Logo of empty heart"
  //                 style={{ width: "30px", height: "30px" }}
  //               />
  //             )}
  //           </button>
  //         </div>
  //         <img
  //           src={complex.images[0]}
  //           alt={complex.name}
  //           style={styles.imageStyles}
  //         />
  //       </div>
  //       <p style={styles.companyTitle}>{complex.name}</p>
  //       <div className="textInfo">
  //         <p style={styles.complexInfo}>
  //           {complex.address.city}, {complex.address.street}
  //         </p>
  //         <p style={styles.complexInfo}>
  //           Price per sq meter: {complex.price_per_sq_meter}
  //         </p>
  //         {/* Update the line below with the actual date property */}
  //         <p style={styles.complexFinished}>Date: {complex.date}</p>
  //       </div>
  //     </motion.div>
  //   </div>
  // ));
  // ------------------------------------------------------------------------------------

  // ------------------------render status option--------------------------------------------

  const statusTranslations = {
    1: { en: "Planned", ka: "დაგეგმილი", ru: "Запланировано" },
    2: { en: "Under Construction", ka: "მშენებარე", ru: "Строится" },
    3: { en: "Completed", ka: "დასრულებული", ru: "Завершено" },

    // Add more statuses and translations if needed
  };

  const renderStatusOptions = () => {
    return Object.entries(statusTranslations).map(([value, labels]) => (
      <div className="status_chackboxes" key={value}>
        <label className="container" style={{ display: "flex", gap: "15px" }}>
          <input
            type="checkbox"
            checked={selectedStatuses.includes(value)}
            value={value}
            onChange={(e) => handleStatusChange(e, value)}
          />
          <div className="checkmark"></div>
          <p className="text_modal_color">{labels[selectedLanguage]}</p>
        </label>
      </div>
    ));
  };
  // -----------------------------------------------------------------------------

  const handleSpaceButtonClick = () => {
    setIsSpaceModalOpen(true);
    setIsPriceModalOpen(false);
    setIsStatusModalOpen(false);
    setIsModalOpen(false);
  };

  const closeSpaceModal = () => {
    setIsSpaceModalOpen(false);
  };

  const handlePriceButtonClick = () => {
    setIsPriceModalOpen(true);
    setIsSpaceModalOpen(false);
    setIsModalOpen(false);
    setIsStatusModalOpen(false);
  };

  const handleClosePriceModal = () => {
    setIsPriceModalOpen(false);
  };

  const handleStatusButtonClick = () => {
    setIsStatusModalOpen(true);
    setIsSpaceModalOpen(false);
    setIsPriceModalOpen(false);
    setIsModalOpen(false);
  };

  const handleCloseStatusModal = () => {
    setIsStatusModalOpen(false);
  };

  const handleSearchButtonClick = () => {
    setIsStatusModalOpen(false);
    setIsSpaceModalOpen(false);
    setIsPriceModalOpen(false);
    setIsModalOpen(false);
  };

  const pagiHandler = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    searchButtonhangeHandler(!searchButton);
  };


  const [Open, setOpen] = useState(false);

  const toggleFunc = () => {
    setOpen(!Open)
    // console.log("open:", Open);
  }


  return (
    <div className="ComplexBodyBox">
      <div className="filter_cont_for_complexes">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <div className="for_comfort">

            <div className="adgilicomportistvis title">
              <p>ადგილი შენი კომფორტისთვის</p> 
              <img onClick={toggleFunc} className="filter_icon_for_links" src={Filter} alt="/" />
            </div>
            <div className={Open ? "filter_cont_for_complex" : "close_cont"}>

              {/* button for filtering space */}
              <div className="button-modal-container ">
                <div onClick={handleSpaceButtonClick} className="space_button">
                  {
                    handleStatusButtonLanguageChange(selectedLanguage)
                      .spaceButtonLanguage
                  }
                  <img
                    src={button_icon}
                    alt="button dropdown icon"
                    className="dropdown"
                  />
                </div>

                <SpaceModal_complex
                  isOpen={isSpaceModalOpen}
                  close={closeSpaceModal}
                >
                  <div>
                    <input
                      type="number"
                      placeholder="Min Price Per Square Meter"

                      value={min_space}
                      onChange={(e) => max_spacehangeHandler(e.target.value)}
                    />

                    <input className='min_price_complex'
                      type="number"
                      placeholder={handleStatusButtonLanguageChange(selectedLanguage).maxPrice}
                      value={max_space}
                      onChange={(e) => min_spacehangeHandler(e.target.value)}
                    />
                  </div>

                  <button
                    className="modal_close_button"
                    onClick={closeSpaceModal}
                  >
                    {
                      handleStatusButtonLanguageChange(selectedLanguage)
                        .spaceButtonClose
                    }

                  </button>
                </SpaceModal_complex>
              </div>
              {/* button for filtering price  */}
              <div className="button-modal-container">
                <div onClick={handlePriceButtonClick} className="space_button">
                  {
                    handleStatusButtonLanguageChange(selectedLanguage)
                      .priceButtonLanguage
                  }
                  <img
                    src={button_icon}
                    alt="button dropdown icon"
                    className="dropdown"
                  />
                </div>
                <PriceModal_complex isOpen={isPriceModalOpen} close={handleClosePriceModal} >
                  <div className='fullPriceHomePage'>
                    {handleStatusButtonLanguageChange(selectedLanguage).fullPriceHomePage}
                  </div>
                  <div>
                    <input className='min_price_complex'
                      type="number"
                      placeholder={handleStatusButtonLanguageChange(selectedLanguage).dan}           
                      value={minPricePerSquareMeter}
                      onChange={(e) =>
                        minPricePerSquareMeterChangeHandler(e.target.value)
                      }
                    />

                    <input className='min_price_complex'
                      type="number"
                      placeholder={handleStatusButtonLanguageChange(selectedLanguage).mde}
                      value={maxPricePerSquareMeter}
                      onChange={(e) =>
                        maxPricePerSquareMeterChangeHandler(e.target.value)
                      }
                    />

                    <div className='meterPriceHomePageComplex'>
                      {handleStatusButtonLanguageChange(selectedLanguage).meterPriceHomePage}
                    </div>

                    <input className='min_price_complex'
                      type="number"
                      placeholder={handleStatusButtonLanguageChange(selectedLanguage).dan}
                      value={minFullPrice}
                      onChange={(e) =>
                        minFullPriceChangeHandler(e.target.value)
                      }
                    />

                    <input className='min_price_complex'
                      type="number"
                      placeholder={handleStatusButtonLanguageChange(selectedLanguage).mde}             
                      value={maxFullPrice}
                      onChange={(e) =>
                        maxFullPriceChangeHandler(e.target.value)
                      }
                    />
                  </div>
                  <button
                    className="modal_close_button"
                    onClick={handleClosePriceModal}
                  >
                    {
                      handleStatusButtonLanguageChange(selectedLanguage)
                        .spaceButtonClose
                    }
                  </button>
                </PriceModal_complex>
              </div>

              {/* button for locations */}
              <div className="button-modal-container">
                <div onClick={handleShowModal} className="lacation_button">
                  {
                    handleStatusButtonLanguageChange(selectedLanguage)
                      .cityButtonLanguage
                  }
                  <img
                    src={button_icon}
                    alt="button dropdown icon"
                    className="dropdown"
                  />
                </div>
                <Modal_main isOpen={isModalOpen} close={closeModal}>
                  {renderModalContent()}
                </Modal_main>
              </div>

              {/* button for status */}
              <div className="button-modal-container">
                <div
                  onClick={handleStatusButtonClick}
                  className="lacation_button"
                >
                  {
                    handleStatusButtonLanguageChange(selectedLanguage)
                      .statusInfoLanguage
                  }
                  <img
                    src={button_icon}
                    alt="button dropdown icon"
                    className="dropdown"
                  />
                </div>
                <StatusModal_complex
                  isOpen={isStatusModalOpen}
                  close={handleCloseStatusModal}
                >
                  {renderStatusOptions()}
                  <button
                    className="modal_close_button"
                    onClick={handleCloseStatusModal}
                  >
                    {
                      handleStatusButtonLanguageChange(selectedLanguage)
                        .spaceButtonClose
                    }
                  </button>
                </StatusModal_complex>
              </div>
              {/* Button For find word (sityvit dzebna) */}
              <div className="lacation_button">
                <input
                  className="string_filter_input"
                  type="text"
                  placeholder={
                    handleStatusButtonLanguageChange(selectedLanguage)
                      .allFindButtonLanguage
                  }
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <img src={loupe} alt="search icon" className="dropdown" />
                {/* ------------------------- */}
              </div>
              <div className="button-modal-container ">
                <div onClick={handleSearchButtonClick} className="space_button">
                  <button
                    className="homepage_serch_button_complexpage"
                    style={{ color: "white" }}
                    onClick={() => searchButtonhangeHandler(!searchButton)}
                  >
                    {" "}
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ეს არის ჩამონათვალი button–ები, რომ გადახვიდე კომპლექსებზე, გეგმარებებზე, რუკაზე, სორტირება და დასაკელება და counter-ი ... */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        transition={{ duration: 1 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="motionBox"
      >
        <div className="forPaddingOfInfoFieldOfComplexsPlansMaps">
          <div className="infoFieldOfComplexsPlansMaps">
            <div className="complexInfoAndCountShowBox">
              <p className="komplex_text" style={{ color: "white" }}>
                კომპლექსები {total_item_number}
              </p>
            </div>
            {/* აქ არის კომპლექსებზე, გეგმარებებზე, რუკაზე, სორტირება და დოლარი ---- */}
            <div className="projectsPlansMapsSortingAndDollarBox">
              <Link to="/complex">
                <motion.div
                  className="textButtonContainer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="mapAndLogoImg">
                    <img
                      src={mapSignLogo}
                      alt="mapSignLogo"
                      className="mapSignLogo"
                    />
                    <button className="textButton">პროექტები</button>
                  </div>
                </motion.div>
              </Link>

              <Link to="/complex/apartmentList">
                <motion.div
                  className="textButtonContainer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="mapAndLogoImg">
                    <img
                      src={mapSignLogo}
                      alt="mapSignLogo"
                      className="mapSignLogo"
                    />
                    <button className="textButton">გეგმარებები</button>
                  </div>
                </motion.div>
              </Link>

              <Link to="/map">
                <motion.div
                  className="textButtonContainer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="mapAndLogoImg">
                    <img
                      src={mapSignLogo}
                      alt="mapSignLogo"
                      className="mapSignLogo"
                    />
                    <button className="textButton">რუკა</button>
                  </div>
                </motion.div>
              </Link>
              {/* მხოლოდ for sorting ----- */}
              {/* ველოდები სახლების ატვირთვას, და back-ში სორტირების გაკეთებას, რომ შესაბამისი რექუესთი გავაგზავნო
                რასაც მომხმარებელი აირჩევს: მაგ.: ფასი ზრდადობით და ა.შ.  */}
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                style={{ color: "white", fontSize: "16px" }}
              >
                <div className="sortAndArrowDownImgBox">
                  <p className="sort_text_web">სორტირება</p>
                  <p className="sort_text">სორტ</p>
                  <img src={arrowDownSorting} style={{ width: "20px" }} />
                </div>
              </Button>

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  style: {
                    backgroundColor: "black",
                    width: "270px",
                  },
                  "aria-labelledby": "basic-button",
                }}
                //
                component={motion.div}
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1 },
                }}
                initial="hidden"
                animate={open ? "visible" : "hidden"}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <MenuItem
                    style={{
                      backgroundColor: "#000",
                      color: "#fff",
                      padding: "8px 16px",
                    }}
                    onClick={() => {
                      handleClose();
                      setAscendentPrice("-created_at");
                    }}
                  >
                    თარიღი კლებადობით
                  </MenuItem>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <MenuItem
                    style={{
                      backgroundColor: "#000",
                      color: "#fff",
                      padding: "8px 16px",
                    }}
                    onClick={() => {
                      handleClose();
                      setAscendentPrice("created_at");
                    }}
                  >
                    თარიღი ზრდადობით
                  </MenuItem>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <MenuItem
                    style={{
                      backgroundColor: "#000",
                      color: "#fff",
                      padding: "8px 16px",
                    }}
                    onClick={() => {
                      handleClose();
                      setAscendentPrice("-price_per_sq_meter");
                    }}
                  >
                    ფასი კლებადობით
                  </MenuItem>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <MenuItem
                    style={{
                      backgroundColor: "#000",
                      color: "#fff",
                      padding: "8px 16px",
                    }}
                    onClick={() => {
                      handleClose();
                      setAscendentPrice("price_per_sq_meter");
                    }}
                  >
                    ფასი ზრდადობით
                  </MenuItem>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <MenuItem
                    style={{
                      backgroundColor: "#000",
                      color: "#fff",
                      padding: "8px 16px",
                    }}
                    onClick={() => {
                      handleClose();
                      setAscendentPrice("-rank");
                    }}
                  >
                    რანკი კლებადობით
                  </MenuItem>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <MenuItem
                    style={{
                      backgroundColor: "#000",
                      color: "#fff",
                      padding: "8px 16px",
                    }}
                    onClick={() => {
                      handleClose();
                      setAscendentPrice("rank");
                    }}
                  >
                    რანკი ზრდადობით
                  </MenuItem>
                </motion.div>
              </Menu>
              {/* ---------------------------------- */}

              {/* ----Dollar and Lari Toggle button */}
              <div className="currencyBox">
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
              </div>
              {/* ---------------- */}
            </div>
          </div>
        </div>
      </motion.div>

      {/* // ------------------------------------------------------------------------------------ */}

      <div className="allCards">
        {complexes.map((complex, index) => (

          <div className="card" key={complex.id}>
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              transition={{ duration: 1 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="heartbuttonAndImageBox">
                <div className="heartButtonBox">
                  <button
                    onClick={() => favoriteHandler(complex)}
                    key={complex.id}
                    className="heartButtons"
                  >
                    {favorites.some((fav) => fav.id === complex.id) ? (
                      <img src={heartIcon} alt="Logo of heart" />
                    ) : (
                      <img
                        src={heartIconEmpty}
                        alt="Logo of empty heart"
                        style={{ width: "30px", height: "30px" }}
                      />
                    )}
                  </button>
                </div>
                <img
                  src={complex.images[0]}
                  alt={complex.name}
                  style={styles.imageStyles}


                  onClick={() => handleHouseClick(complex.id)}
                />
              </div>
              <p style={styles.companyTitle}>{complex.name}</p>
              <div
                className="textInfo"
                onClick={() => handleHouseClick(complex.id)}
              >
                <p style={styles.complexInfo}>
                  {complex.address.city}
                  {/* {complex.address.street} */}
                </p>
                <p style={styles.complexInfo}>
                  {complex.complexDetails.pricePerSqMeter}
                  {handleStatusButtonLanguageChange(selectedLanguage).pricePerM}
                </p>
                {/* Update the line below with the actual date property */}
                <p style={styles.complexFinished}>
                  {complex.complexDetails.finishYear}
                </p>

              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* for scroll UP */}
      {/* <button onClick={scrollToTop} style={{ borderRadius: '30px' }} >
        <img src={scrollUp} alt='logo' style={{ width: '40px' }} />
      </button> */}

      {/* Pagination for user to select some page */}
      <div className="pagination">
        <Stack spacing={2} className="row_link">
          <Pagination
            className="numbers_link"
            count={totalPageCount}
            shape="rounded"
            page={currentPage}
            onChange={(event, value) => {
              handleCorrentPageHandler(value); // Assuming this updates `currentPage`
            }}
            onClick={pagiHandler}
            sx={{
              "& .MuiPaginationItem-root": {
                display: "flex !important",
                flexDirection: "row !important",
                color: "#fff !important", // White text color for unselected items, with increased specificity
                margin: "3px !important", // Removes margin between buttons, with increased specificity
                padding: "0 !important",
                // Removes padding inside buttons, with increased specificity
                "&:hover": {
                  flexDirection: "row !important",
                  display: "flex !important",
                  backgroundColor: "#f0f0f0 !important", // Background color on hover for unselected items, with increased specificity
                  color: "#000 !important", // Text color on hover for unselected items, with increased specificity
                },
              },
              "& .Mui-selected": {
                flexDirection: "row !important",
                display: "flex !important",
                backgroundColor: "#fff !important", // White background color for the selected item, with increased specificity
                color: "#000 !important", // Black text color for the selected item, with increased specificity
                "&:hover": {
                  backgroundColor: "#fff !important", // Keep the background color on hover for selected item, with increased specificity
                  color: "#000 !important", // Keep the text color on hover for selected item, with increased specificity
                },
              },
              "& .MuiPaginationItem-ellipsis": {
                flexDirection: "row !important",
                color: "#fff !important", // Color of the ellipsis, with increased specificity
                margin: "0 !important", // Removes margin around the ellipsis, with increased specificity
                padding: "0 !important", // Removes padding around the ellipsis, with increased specificity
              },
              ".MuiPagination-ul": {
                flexDirection: "row !important",
                display: "flex !important",
                justifyContent: "center !important", // Centers the pagination items, with increased specificity
                flexWrap: "nowrap !important", // Prevents the pagination items from wrapping, with increased specificity
              },
            }}
          />
        </Stack>
      </div>

      {/* ---------------------------------------------------------------- */}
      <div className="googleMapImageBox">
        <Link to="/map">
          <motion.div
            initial={{ x: -150, opacity: 0 }}
            transition={{ duration: 1.5 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <img
              src={googleMapImage}
              alt="googleMapImage"
              className="googleMapImage google_map"
            />
          </motion.div>
        </Link>
      </div>
    </div>
  );
}

const styles = {
  imageStyles: {
    width: "250px",
    height: "229px",
    overflow: "hidden",
    // borderRadius: "20px",
  },
  companyTitle: {
    // position: 'absolute',
    // top: '262px',
    // paddingLeft: '20px'
  },
  complexInfo: {
    color: "white",
  },
  complexFinished: {
    color: "white",
  },
};

const spring = {
  type: "spring",
  stiffness: 100,
  damping: 30,
};

