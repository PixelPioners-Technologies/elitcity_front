/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
/* eslint-disable no-case-declarations */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react';
import button_icon from '../icons/Vector.svg';
import button_icon1 from "../icons/findimage.svg";
import Modal_1 from '../modals for main page/Modal_1';
import PriceModal_1 from '../modals for main page/PriceModal_1';
import SpaceModal_1 from '../modals for main page/SpaceModal_1';
import StatusModal_1 from '../modals for main page/StatusModa_1';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

import loupe from '../icons/loupe.png'


import './HomePage.css'
import { Data } from '@react-google-maps/api';
// const initialCenter = {
//   lat: 41.7151,
//   lng: 44.8271
// };




// ---------------------------------------------------------------------------------------------------------------------

export default function Map({ selectedLanguage,

  // favorites,
  // complexChangeHandler,
  // locationsChangeHandler,
  selectedCityChangeHandler,
  selectedPharentDistrictsChangeHandler,
  selectedDistrictsChangeHandler,
  minPricePerSquareMeterChangeHandler,
  maxPricePerSquareMeterChangeHandler,
  minFullPriceChangeHandler,
  maxFullPriceChangeHandler,
  min_spacehangeHandler,
  max_spacehangeHandler,
  selectedStatusesChangeHandler,
  selectedStatuses,
  locations,
  searchButtonhangeHandler,
  min_space,
  max_space,
  minPricePerSquareMeter,
  maxPricePerSquareMeter,
  minFullPrice,
  maxFullPrice,
  searchButton,
  selectedCity,
  selectedPharentDistricts,
  selectedDistricts,
  searchInput,
  setSearchInput,

}) {

  const [modalContent, setModalContent] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);


  // const [status, setStatus] = useState('');

  // const [mapCenter, setMapCenter] = useState(initialCenter);
  // const [zoomLevel, setZoomLevel] = useState(13);

  // const [mapInstance, setMapInstance] = useState(null);

  const [isSpaceModalOpen, setIsSpaceModalOpen] = useState(false);
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);


  // const [searchInput, setSearchInput] = useState('');
  // const [searchButton , setSearchButton] = useState(false);

  // const searchButtonHandler = () => {
  //   setSearchButton(!searchButton)
  // };


  //----------------------------------------------------------------------------------------------------


  // ----------------------------------------------------------------------------------------------

  //--------------------------------------modal and logic for opening filtration window --------------------------------------

  const renderModalContent = () => {
    switch (modalContent) {
      case 'cities':
        return <div>
          {locations.map((cityItem, index) => (
            <button key={index} onClick={() => handleCityClick(cityItem.city)} className='city_button'>
              <span>{cityItem.city}</span>
            </button>
          ))}
          <button className='modal_close_button_homePage' onClick={closeModal} >close</button>
        </div>
      case "pharentdistricts":
        // Find the city object from the locations array
        const city = locations.find(loc => loc.city === selectedCity);
        if (!city) return null;

        return (
          <div className='location_modal_container-homepage' >
            <div className='districts_and_pharentdostricts-homepage'>
              {city.pharentDistricts.map((parentDistrict, index) => (
                <ul key={index} >

                  <div className='pharent_district_chackmarks-homepage' >
                    <label className="container-homepage">
                      <input
                        type="checkbox"
                        checked={selectedPharentDistricts.includes(parentDistrict.pharentDistrict)}
                        onChange={(e) => handleParentDistrictChange(e, parentDistrict.pharentDistrict)}
                      />
                      <div className="checkmark-homepage"></div>
                    </label>
                    <p>{parentDistrict.pharentDistrict}</p>
                  </div>

                  <div className='district_checkmarks-homepage' >
                    {parentDistrict.districts.map((district, districtIndex) => (
                      <li key={districtIndex} className='child_district_checkmarks-homepage' >
                        <label className="container-homepage">
                          <input
                            type="checkbox"
                            checked={selectedDistricts.includes(district)}
                            onChange={(e) => handleDistrictChange(e, district)}
                          />
                          <div className="checkmark-homepage"></div>
                        </label>

                        <p>{district}</p>
                      </li>
                    ))}
                  </div>
                </ul>
              ))}
            </div>
            <button className='modal_close_button_homePage' onClick={closeModal}>Close</button>
          </div>
        );

      default:
        return null;
    }
  };


  const handleShowModal = () => {
    setModalContent('cities')
    setIsModalOpen(true)
    setIsSpaceModalOpen(false);
    setIsPriceModalOpen(false)
    setIsStatusModalOpen(false)
  }

  const handleCityClick = (city) => {
    console.log("City selected: ", city);
    setModalContent("pharentdistricts")
    selectedCityChangeHandler(city)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleParentDistrictChange = (e, parentDistrict) => {

    selectedPharentDistrictsChangeHandler(prevSelected => {
      if (e.target.checked) {
        return [...prevSelected, parentDistrict];
      } else {
        return prevSelected.filter(pd => pd !== parentDistrict);
      }
    });
    // Find the city object from the locations array
    const city = locations.find(loc => loc.city === selectedCity);
    if (!city) return;

    // Find the specific parent district object
    const parentDistrictObj = city.pharentDistricts.find(pd => pd.pharentDistrict === parentDistrict);
    if (!parentDistrictObj) return;

    selectedDistrictsChangeHandler(prevSelected => {
      if (e.target.checked) {
        // Add all districts of the parent district to the selected list
        // Ensure no duplicates are added
        const updatedDistricts = new Set([...prevSelected, ...parentDistrictObj.districts]);
        return Array.from(updatedDistricts);
      } else {
        // Remove all districts of the parent district from the selected list
        return prevSelected.filter(d => !parentDistrictObj.districts.includes(d));
      }
    });
  };

  const handleDistrictChange = (e, district) => {
    selectedDistrictsChangeHandler(prevSelected => {
      if (e.target.checked) {
        return [...prevSelected, district];
      } else {
        return prevSelected.filter(d => d !== district);
      }
    });
  };



  // useEffect( () => {
  //   console.log('pharentdistrict selected : ' , selectedPharentDistricts)
  //   console.log("district selected : " ,selectedDistricts)
  //   console.log(status)
  // },[selectedPharentDistricts,selectedDistricts ] )

  useEffect(() => {
    console.log("Selected Statuses:", selectedStatuses);
    // ... rest of your useEffect code ...
  }, [selectedStatuses]);

  // ---------------------------------------------------------------------------------------------------------------------
  // ----------------------------------------logic for space and proce modal to open and close -----------------------------------------------

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
  }

  const handleClosePriceModal = () => {
    setIsPriceModalOpen(false)
  }

  const handleStatusButtonClick = () => {
    setIsStatusModalOpen(true);
    setIsSpaceModalOpen(false);
    setIsPriceModalOpen(false);
    setIsModalOpen(false);
  }

  const handleCloseStatusModal = () => {
    setIsStatusModalOpen(false);
  }


  // ---------------------------------------------------------------------------------------------------------------------
  // ----------------------------------icon coloure and  status  change  ----------------------------------------------------------


  const statusTranslations = {
    1: { en: 'Planned', ka: 'დაგეგმილი', ru: 'Запланировано' },
    2: { en: 'Under Construction', ka: 'მშენებარე', ru: 'Строится' },
    3: { en: 'Completed', ka: 'დასრულებული', ru: 'Завершено' }
    // Add more statuses and translations if needed
  };

  const renderStatusOptions = () => {
    return Object.entries(statusTranslations).map(([value, labels]) => (
      <div className='status_chackboxes' key={value}>

        <label className="container" style={{ display: 'flex', gap: '15px' }}>
          <input
            type="checkbox"
            checked={selectedStatuses.includes(value)}
            value={value}
            onChange={(e) => handleStatusChange(e, value)}
          />
          <div className="checkmark"></div>
          <p className='text_modal_color' >{labels[selectedLanguage]}</p>
        </label>
      </div>
    ));
  };

  // ---------------------------------------------------------------------------------------------------------------------

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
  // ---------------------------------------------------------------------------------------------------------------------

  // ---------------------------------------------------------------------------------------------------------------------
  return (
    <div className='hhh'>
      <>
        <div className='main_map main_foto '>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 2 }}
          >
            <div className='for_comfort'>
              <div className='adgilicomportistvis'>
                ადგილი შენი კომფორტისთვის
              </div>
              <div className='filter_cont_for_homepage'>

                {/* button for filtering space */}
                <div className="button-modal-container-homepage">
                  <div onClick={handleSpaceButtonClick} className='space_button_homepage'  >
                    {handleStatusButtonLanguageChange(selectedLanguage).spaceButtonLanguage}
                    <img src={button_icon} alt="button dropdown icon" className='dropdown' />
                  </div>

                  <SpaceModal_1 isOpen={isSpaceModalOpen} close={closeSpaceModal}>
                    <div>
                      <div>
                        <text className='priceTextHomePage'>{handleStatusButtonLanguageChange(selectedLanguage).spaceButtonLanguage}</text>
                      </div>
                      <input className='min_price_homePage'
                        type='number'
                        placeholder={handleStatusButtonLanguageChange(selectedLanguage).minPrice}
                        value={min_space}
                        onChange={(e) => max_spacehangeHandler(e.target.value)}
                      />

                      <input className='min_price_homePage'
                        type="number"
                        placeholder={handleStatusButtonLanguageChange(selectedLanguage).maxPrice}
                        value={max_space}
                        onChange={(e) => min_spacehangeHandler(e.target.value)}
                      />
                    </div>

                    <button className='modal_close_button_homePage' onClick={closeSpaceModal}>
                      {handleStatusButtonLanguageChange(selectedLanguage).spaceButtonClose}
                    </button>
                  </SpaceModal_1>

                </div>

                {/* button for filtering price  */}
                <div className="button-modal-container-homepage">
                  <div onClick={handlePriceButtonClick} className='space_button_homepage'  >
                    {handleStatusButtonLanguageChange(selectedLanguage).priceButtonLanguage}
                    <img src={button_icon} alt="button dropdown icon" className='dropdown' />
                  </div>
                  <PriceModal_1 isOpen={isPriceModalOpen} close={handleClosePriceModal} >
                    <div className='fullPriceHomePage'>
                      {handleStatusButtonLanguageChange(selectedLanguage).fullPriceHomePage}
                    </div>
                    <div>
                      <input className='min_price_homePage'
                        type="number"
                        placeholder={handleStatusButtonLanguageChange(selectedLanguage).dan}
                        value={minPricePerSquareMeter}
                        onChange={(e) => minPricePerSquareMeterChangeHandler(e.target.value)}
                      />

                      <input className='min_price_homePage'
                        type="number"
                        placeholder={handleStatusButtonLanguageChange(selectedLanguage).mde}
                        value={maxPricePerSquareMeter}
                        onChange={(e) => maxPricePerSquareMeterChangeHandler(e.target.value)}
                      />

                      <div className='meterPriceHomePage'>
                        {handleStatusButtonLanguageChange(selectedLanguage).meterPriceHomePage}
                      </div>

                      <input className='min_price_homePage'
                        type="number"
                        placeholder={handleStatusButtonLanguageChange(selectedLanguage).dan}
                        value={minFullPrice}
                        onChange={(e) => minFullPriceChangeHandler(e.target.value)}
                      />

                      <input className='min_price_homePage'
                        type="number"
                        placeholder={handleStatusButtonLanguageChange(selectedLanguage).mde}
                        value={maxFullPrice}
                        onChange={(e) => maxFullPriceChangeHandler(e.target.value)}
                      />
                    </div>
                    <button className='modal_close_button_homePage' onClick={handleClosePriceModal}>
                      {handleStatusButtonLanguageChange(selectedLanguage).spaceButtonClose}
                    </button>
                  </PriceModal_1>
                </div>

                {/* button for locations */}
                <div className="button-modal-container-homepage" >
                  <div onClick={handleShowModal} className='lacation_button_homepage'   >
                    {handleStatusButtonLanguageChange(selectedLanguage).cityButtonLanguage}
                    <img src={button_icon} alt="button dropdown icon" className='dropdown' />
                  </div>
                  <Modal_1 isOpen={isModalOpen} close={closeModal} >
                    {renderModalContent()}
                  </Modal_1>
                </div>

                {/* button for status */}
                <div className="button-modal-container-homepage" >
                  <div onClick={handleStatusButtonClick} className='lacation_button_homepage'   >
                    {handleStatusButtonLanguageChange(selectedLanguage).statusInfoLanguage}
                    <img src={button_icon} alt="button dropdown icon" className='dropdown' />
                  </div>
                  <StatusModal_1 isOpen={isStatusModalOpen} close={handleCloseStatusModal} >
                    {renderStatusOptions()}
                    <button className='modal_close_button_homePage' onClick={handleCloseStatusModal}>
                      {handleStatusButtonLanguageChange(selectedLanguage).spaceButtonClose}
                    </button>
                  </StatusModal_1>
                </div>
                {/* Button For find word (sityvit dzebna) */}
                <div className="lacation_button" >
                  <input className='string_filter_input'
                    type='search'
                    placeholder={handleStatusButtonLanguageChange(selectedLanguage).allFindButtonLanguage}
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                  <img src={loupe} alt="search icon" className="dropdown" />
                </div>
              </div>

            </div>
          </motion.div>

          <motion.div
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 2 }}
          >

            {/* Map button link */}
            <div className="button-container">
              <Link to="/map">
                <button className='homepage_map_link'>{handleStatusButtonLanguageChange(selectedLanguage).findMapButtonLanguage}</button>
              </Link>
              <Link to="/complex">
                <button className='homepage_serch_button' onClick={() => searchButtonhangeHandler(!searchButton)}>
                  {handleStatusButtonLanguageChange(selectedLanguage).allFindButtonLanguage}
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </>
    </div>

  );
}


//127.0.0.1:8000/complex/en/?address_en__city_en__city_en=&
// address_en__city_en__city_en__icontains=&
// address_en__pharentDistrict_en__pharentDistrict_en=&
// address_en__pharentDistrict_en__pharentDistrict_en__icontains=isani-samgori&
// address_en__pharentDistrict_en__pharentDistrict_en__in=&
// address_en__district_en__district_en=&address_en__district_en__district_en__icontains=&
// address_en__district_en__district_en__in=lisi





//127.0.0.1:8000/complex/en/?
// address_en__city_en__city_en=&
// address_en__city_en__city_en__icontains=&
// min_price_per_sq_meter=&
// max_price_per_sq_meter=&
// max_full_price=&min_full_price=&
// status=2



