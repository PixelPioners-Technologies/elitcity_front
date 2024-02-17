import "./Complex.css";
import { motion } from "framer-motion";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import heartIcon from "../assets/starLogo.svg";
import Filter from "../assets/filter.png";
import LocationIcon from "../assets/locationIcon.png";
import Sort from "../assets/sort.png";
import Arrows from "../assets/arrows.png";

import heartIconEmpty from "../assets/emptyStarLogo.svg";
import mapSignLogo from "../assets/mapSignLogoo.svg";

import dollar_black from "../assets/dollar-svgrepo-com.svg";
import lari_black from "../assets/lari-svgrepo-com.svg";
import dollar from "../assets/dollar-whitee.svg";
import lari from "../assets/lari-white.svg";

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

  sortingChangeHandler,

  searchInput,
  setSearchInput,
  stringSearchHeandles,
}) {
  // const [homes, setHomes] = useState([]);

  // const [isLoading, setIsLoading] = useState(true);
  // const [forPriceDecrease, setForPriceDecrease] = useState(null);
  // const [sortedHomes, setSortedHomes] = useState(null);
  // const [ascendentPrice, setAscendentPrice] = useState("");

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

  useEffect(() => {
    // console.log('corrent page----', complexes.complexDetails.rank)
    console.log("corrent page----", complexes);
  }, [complexes]);

  // useEffect(() => {

  //   console.log("total_item_number on complex", total_item_number);
  // }, [total_item_number]);

  // 1111111111111111111111111111111111
  // for toggle DOllar AND LARI ---==---(START)
  // const [isOn, setIsOn] = useState(false);
  // const toggleSwitch = () => setIsOn(!isOn);
  // // -----===--------(END)

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
      mde: "to",
      pricePerM: "Price per m²",

      sortingButtonAscendentPrice: "Ascendant price in m²",
      sortingButtonDescendentPrice: "Descendent price in m²",
      sortingButtonAscendantTime: "Ascendant created at",
      sortingButtonDescendentTime: "Decendant created at",
      sortingButtonAscendent_rank: "Ascendant rank",
      sortingButtonDescendent_rank: "Decendant rank",

      complexes: "Complexes",
      map: "Map",
      sorting: "Sorting",
      place_for_your_comfort: "A place for your comfort",
      sort: "Sort",
    };

    switch (lang) {
      case "en":
        languageInfo.statusInfoLanguage = "Select Status";
        languageInfo.cityButtonLanguage = "Location";
        languageInfo.spaceButtonLanguage = "Space";
        languageInfo.priceButtonLanguage = "Price";
        languageInfo.allStatusLanguage = "All";
        languageInfo.findMapButtonLanguage = "Find Map";
        languageInfo.allFindButtonLanguage = "Find";
        languageInfo.spaceButtonClose = "Close";
        languageInfo.minPrice = "From m²";
        languageInfo.maxPrice = "To m²";
        languageInfo.roomStudio = "Studio";
        languageInfo.fullPriceHomePage = "Full price";
        languageInfo.meterPriceHomePage = "The price of m²";
        languageInfo.dan = "from";
        languageInfo.mde = "to";
        languageInfo.pricePerM = "Price per m²";

        languageInfo.sortingButtonAscendentPrice = "Ascendant price in m²";
        languageInfo.sortingButtonDescendentPrice = "Descendent price in m²";
        languageInfo.sortingButtonAscendantTime = "Ascendant created at";
        languageInfo.sortingButtonDescendentTime = "Decendent created at";
        languageInfo.sortingButtonAscendent_rank = "Ascendant rank";
        languageInfo.sortingButtonDescendent_rank = "Decendant rank";

        languageInfo.complexes = "Complexes";
        languageInfo.map = "Map";
        languageInfo.sorting = "Sorting";
        languageInfo.sort = "Sort";

        languageInfo.place_for_your_comfort = "A place for your comfort";

        break;

      case "ka":
        languageInfo.statusInfoLanguage = "აირჩიე სტატუსი";
        languageInfo.cityButtonLanguage = "მდებარეობა";
        languageInfo.spaceButtonLanguage = "ფართი";
        languageInfo.priceButtonLanguage = "ფასი";
        languageInfo.allStatusLanguage = "ყველა";
        languageInfo.findMapButtonLanguage = "რუკაზე ძიება";
        languageInfo.allFindButtonLanguage = "ძიება";
        languageInfo.spaceButtonClose = "დახურვა";
        languageInfo.minPrice = "დან მ²";
        languageInfo.maxPrice = "მდე მ²";
        languageInfo.roomStudio = "სტუდიო";
        languageInfo.fullPriceHomePage = "სრული ფასი";
        languageInfo.meterPriceHomePage = "მ² - ის ფასი";
        languageInfo.dan = "დან";
        languageInfo.mde = "მდე";
        languageInfo.pricePerM = "მ² ფასი";

        languageInfo.sortingButtonAscendentPrice = "მ² ფასი ზრდადობით";
        languageInfo.sortingButtonDescendentPrice = "მ² ფასი კლებადობით";
        languageInfo.sortingButtonAscendantTime = "თარიღი ზრდადობით";
        languageInfo.sortingButtonDescendentTime = "თარიღი კლებადობით";
        languageInfo.sortingButtonAscendent_rank = "რანკი ზრდით";
        languageInfo.sortingButtonDescendent_rank = "რანკი კლებით";

        languageInfo.complexes = "კომპლექსები";
        languageInfo.map = "რუქა";
        languageInfo.sorting = "სორტირება";
        languageInfo.sort = "სორტ";
        languageInfo.place_for_your_comfort = "ადგილი შენი კომფორტისტვის";

        break;

      case "ru":
        languageInfo.statusInfoLanguage = "выберите статус";
        languageInfo.cityButtonLanguage = "Местоположение";
        languageInfo.spaceButtonLanguage = "Площадь";
        languageInfo.priceButtonLanguage = "Цена";
        languageInfo.allStatusLanguage = "Все";
        languageInfo.findMapButtonLanguage = "Карта";
        languageInfo.allFindButtonLanguage = "Поиск";
        languageInfo.spaceButtonClose = "закрить";
        languageInfo.minPrice = "из м²";
        languageInfo.maxPrice = "до м²";
        languageInfo.roomStudio = "Студия";
        languageInfo.fullPriceHomePage = "Полная стоимость";
        languageInfo.meterPriceHomePage = "Цена м²";
        languageInfo.dan = "из";
        languageInfo.mde = "до";
        languageInfo.pricePerM = "Цена за м²";

        languageInfo.sortingButtonAscendentPrice = "Цена м² по увеличение";
        languageInfo.sortingButtonDescendentPrice = "Цена м² по снижение";
        languageInfo.sortingButtonAscendantTime = "Время по увеличение";
        languageInfo.sortingButtonDescendentTime = "Время по снижение";
        languageInfo.sortingButtonAscendent_rank = "Ранга по увеличение";
        languageInfo.sortingButtonDescendent_rank = "Ранга по снижение";

        languageInfo.complexes = "Комплексекс";
        languageInfo.map = "карта";
        languageInfo.sorting = "Сортировка";
        languageInfo.sort = "Сорт";

        languageInfo.place_for_your_comfort = "Место для вашего комфорта";

        break;
    }
    return languageInfo;
  };

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

  const getStatusTranslation = (status, selectedLanguage) => {
    const statusTranslations = {
      1: { en: "Planned", ka: "დაგეგმილი", ru: "Запланировано" },
      2: { en: "Under Construction", ka: "მშენებარე", ru: "Строится" },
      3: { en: "Completed", ka: "დასრულებული", ru: "Завершено" },
    };

    const translation =
      statusTranslations[status]?.[selectedLanguage] || "Status Unknown";

    return translation;
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
    setOpen(!Open);
    // console.log("open:", Open);
  };

  const [openSortComp, setOpenComp] = useState(false);

  const sortOpen = () => {
    setOpenComp(!openSortComp);
  };

  return (
    <div className="complex_page_div" >
      <div className="filter_cont_for_complexes">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 2 }}
          className="column_div"
        >
          {/* for_comfort column_div_for_comfort */}
          <div
            className={openSortComp ? "for_comfort" : "column_div_for_comfort "}
          >
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
                    <div>
                      <text className="priceTextHomePage">
                        {
                          handleStatusButtonLanguageChange(selectedLanguage)
                            .spaceButtonLanguage
                        }
                      </text>
                    </div>
                    <input
                      className="min_price_complex"
                      type="number"
                      placeholder={
                        handleStatusButtonLanguageChange(selectedLanguage)
                          .minPrice
                      }
                      value={min_space}
                      onChange={(e) => max_spacehangeHandler(e.target.value)}
                    />

                    <input
                      className="min_price_complex"
                      type="number"
                      placeholder={
                        handleStatusButtonLanguageChange(selectedLanguage)
                          .maxPrice
                      }
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
                <PriceModal_complex
                  isOpen={isPriceModalOpen}
                  close={handleClosePriceModal}
                >
                  <div className="fullPriceHomePage">
                    {
                      handleStatusButtonLanguageChange(selectedLanguage)
                        .fullPriceHomePage
                    }

                    <div className="currencyBox_homepage">
                      <div
                        className="switch_homepage"
                        data-ison={isOn}
                        onClick={toggleSwitch}
                      >
                        <motion.div
                          className="handle_homepage"
                          layout
                          transition={spring}
                        >
                          <img
                            src={lari_black}
                            alt="Lari Sign"
                            className={`currency-sign_homepage ${
                              isOn ? "active" : ""
                            }`}
                          />
                          <img
                            src={dollar_black}
                            alt="Dollar Sign"
                            className={`currency-sign_homepage ${
                              !isOn ? "active" : ""
                            }`}
                          />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="inputInlineDispley">
                      {/* pirveli  */}
                      <div className="for_dolar_and_lari">
                        <input
                          className="min_price_complex"
                          type="number"
                          placeholder={
                            handleStatusButtonLanguageChange(selectedLanguage)
                              .dan
                          }
                          value={minPricePerSquareMeter}
                          onChange={(e) =>
                            minPricePerSquareMeterChangeHandler(e.target.value)
                          }
                        />
                        <img
                          src={isOn ? dollar : lari}
                          alt="lari"
                          className="currency-sign_homepage_11"
                        />
                      </div>
                      {/* meore  */}
                      <div className="for_dolar_and_lari">
                        <input
                          className="min_price_complex"
                          type="number"
                          placeholder={
                            handleStatusButtonLanguageChange(selectedLanguage)
                              .mde
                          }
                          value={maxPricePerSquareMeter}
                          onChange={(e) =>
                            maxPricePerSquareMeterChangeHandler(e.target.value)
                          }
                        />
                        <img
                          src={isOn ? dollar : lari}
                          alt="lari"
                          className="currency-sign_homepage_11"
                        />
                      </div>
                    </div>

                    <div className="meterPriceHomePageComplex">
                      {
                        handleStatusButtonLanguageChange(selectedLanguage)
                          .meterPriceHomePage
                      }
                    </div>
                    {/* mesame  */}
                    <div className="inputInlineDispley">
                      <div className="for_dolar_and_lari">
                        <input
                          className="min_price_complex"
                          type="number"
                          placeholder={
                            handleStatusButtonLanguageChange(selectedLanguage)
                              .dan
                          }
                          value={minFullPrice}
                          onChange={(e) =>
                            props.minFullPriceChangeHandler(e.target.value)
                          }
                        />
                        <img
                          src={isOn ? dollar : lari}
                          alt="lari"
                          className="currency-sign_homepage_11"
                        />
                      </div>
                      {/* meotxe  */}
                      <div className="for_dolar_and_lari">
                        <input
                          className="min_price_complex"
                          type="number"
                          placeholder={
                            handleStatusButtonLanguageChange(selectedLanguage)
                              .mde
                          }
                          value={maxFullPrice}
                          onChange={(e) =>
                            maxFullPriceChangeHandler(e.target.value)
                          }
                        />
                        <img
                          src={isOn ? dollar : lari}
                          alt="lari"
                          className="currency-sign_homepage_11"
                        />
                      </div>
                    </div>
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
                  onChange={(e) => stringSearchHeandles(e.target.value)}
                />

                <img src={loupe} alt="search icon" className="dropdown" />
                {/* ------------------------- */}
              </div>
              {/* <div className="button-modal-container  find_map_div">
                <div onClick={handleSearchButtonClick} className="space_button">
                  <button
                    className="homepage_serch_button_complexpage"
                    style={{ color: "white" }}
                    onClick={() => searchButtonhangeHandler(!searchButton)}
                  >
                    {" "}
                    {
                      handleStatusButtonLanguageChange(selectedLanguage)
                        .allFindButtonLanguage
                    }
                  </button>
                </div>
              </div> */}
            </div>
            {/* <div className="flex_end"> */}
            <div className="button-modal-container  find_map_div">
              <Link to="/map">
                <motion.div
                  className="textButtonContainer map_styles"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="mapAndLogoImg styles_for_top_map">
                    <img
                      src={LocationIcon}
                      alt="mapSignLogo"
                      className="location_icon_respons"
                    />
                    <button className="textButton">
                      {" "}
                      {handleStatusButtonLanguageChange(selectedLanguage).map}
                    </button>
                  </div>
                </motion.div>
              </Link>
              <div
                onClick={handleSearchButtonClick}
                className="space_button gap_short"
              >
                <button
                  className="homepage_serch_button_complexpage"
                  style={{ color: "white" }}
                  onClick={() => searchButtonhangeHandler(!searchButton)}
                >
                  {" "}
                  {
                    handleStatusButtonLanguageChange(selectedLanguage)
                      .allFindButtonLanguage
                  }
                </button>
                {/* </div> */}
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
                {handleStatusButtonLanguageChange(selectedLanguage).complexes}{" "}
                {total_item_number}
              </p>
            </div>
            {/* აქ არის კომპლექსებზე, გეგმარებებზე, რუკაზე, სორტირება და დოლარი ---- */}
            <div className="projectsPlansMapsSortingAndDollarBox">
              {/*  projects*/}
              <div className="project_div_parent res">
                <div className="project_icon_div">
                  <div className="line line_sizes"></div>
                  <div className="line  line_sizes"></div>
                  <div className="line  line_sizes"></div>
                </div>
                <p className="projects_name">projects</p>
              </div>
              {/* map */}
              <Link to="/map">
                <motion.div
                  className="textButtonContainer map_styles_for_complex"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="mapAndLogoImg">
                    <img
                      src={LocationIcon}
                      alt="mapSignLogo"
                      className="location_icon_respons"
                    />
                    <button className="textButton">
                      {" "}
                      {handleStatusButtonLanguageChange(selectedLanguage).map}
                    </button>
                  </div>
                </motion.div>
              </Link>
              {/* sort button */}
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                style={{ color: "white", fontSize: "16px" }}
              >
                <div className="sortAndArrowDownImgBox">
                  <p className="sort_text_web">
                    {handleStatusButtonLanguageChange(selectedLanguage).sorting}
                  </p>
                  <img
                    className="sort_hide_resp"
                    src={arrowDownSorting}
                    style={{ width: "20px" }}
                  />
                  <img
                    className="arrow_for_complex"
                    src={Arrows}
                    style={{ width: "25px" }}
                  />
                </div>
              </Button>
              {/* sort icon for complex */}
              <div className="sort_icon_for_complex_mob" onClick={sortOpen}>
                <img
                  src={Sort}
                  style={{ width: "20px", height: "25px" }}
                  alt="/"
                />
              </div>

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
                      sortingChangeHandler("-created_at");
                    }}
                  >
                    {
                      handleStatusButtonLanguageChange(selectedLanguage)
                        .sortingButtonDescendentTime
                    }
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
                      sortingChangeHandler("created_at");
                    }}
                  >
                    {
                      handleStatusButtonLanguageChange(selectedLanguage)
                        .sortingButtonAscendantTime
                    }
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
                      sortingChangeHandler("-price_per_sq_meter");
                    }}
                  >
                    {
                      handleStatusButtonLanguageChange(selectedLanguage)
                        .sortingButtonDescendentPrice
                    }
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
                      sortingChangeHandler("price_per_sq_meter");
                    }}
                  >
                    {
                      handleStatusButtonLanguageChange(selectedLanguage)
                        .sortingButtonAscendentPrice
                    }
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
                      sortingChangeHandler("-rank");
                    }}
                  >
                    {
                      handleStatusButtonLanguageChange(selectedLanguage)
                        .sortingButtonDescendent_rank
                    }
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
                      sortingChangeHandler("rank");
                    }}
                  >
                    {
                      handleStatusButtonLanguageChange(selectedLanguage)
                        .sortingButtonAscendent_rank
                    }
                  </MenuItem>
                </motion.div>
              </Menu>
              {/* ---------------------------------- */}

              {/* ----Dollar and Lari Toggle button */}
              <div className="currency-Box  ">
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

                {/* ---------------- */}
              </div>
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
              transition={{ duration: 1.1 }}
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
                        style={{
                          width: "30px",
                          height: "30px",
                          border: "1px solid white",
                        }}
                      />
                    )}
                  </button>
                </div>
                <img
                  src={complex.images[0]}
                  alt={complex.name}
                  style={styles.imageStyles}
                  onClick={() => handleHouseClick(complex.id)}
                  className="complex_dard_1"
                />
              </div>
              <p className="company_title_on_card">{complex.complexName}</p>
              <div className="textinfo_and_company_logo">
                <div
                  className="textInfo"
                  onClick={() => handleHouseClick(complex.id)}
                >
                  <p style={styles.complexInfo}>{complex.address.city}</p>
                  <div className="price_and_">
                    <p style={styles.complexInfo}>
                      {
                        handleStatusButtonLanguageChange(selectedLanguage)
                          .pricePerM
                      }
                    </p>
                    <p style={styles.complexInfo}>
                      {" "}
                      {currenceChangeState
                        ? complex.complexDetails.pricePerSqMeter *
                          getCorrencyRate
                        : complex.complexDetails.pricePerSqMeter}
                    </p>
                  </div>
                  <p
                    style={styles.complexFinished}
                    className="complex_status_on_card"
                  >
                    {getStatusTranslation(
                      complex.complexDetails.isFinished,
                      selectedLanguage
                    )}
                  </p>
                </div>
                <div
                  style={{ color: "white" }}
                  className="company_logo_on_card"
                >
                  <img
                    src={complex.company.logo}
                    alt="company logo"
                    className="company_logo_3"
                  />
                  <p className="complex_status_in_card">
                    {complex.complexDetails.rank}
                  </p>
                </div>
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
            transition={{ duration: 1 }}
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
    maxWidth: "275px",
    height: "229px",
    overflow: "hidden",
    color: "white",
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
