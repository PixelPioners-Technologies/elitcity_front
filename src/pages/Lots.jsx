/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-case-declarations */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import "./Physical.css";
import "./Lots.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import P_Modal from "../modals for private page/P_Modal";
import P_PriceModal from "../modals for private page/P_PriceModal";
import P_SpaceModal from "../modals for private page/P_SpaceModal";
import P_StatusModal from "../modals for private page/P_StatusModa";
import { motion } from "framer-motion";
import button_icon from "../icons/Vector.svg";
import { Link } from "react-router-dom";
import mapSignLogo from "../assets/mapSignLogoo.svg";
import Button from "@mui/material/Button";
import arrowDownSorting from "../assets/arrow-down-white.svg";
import Menu from "@mui/material/Menu";
import loupe from "../icons/loupe.png";
import MenuItem from "@mui/material/MenuItem";
import lari from "../assets/lari-white.svg";
import dollar from "../assets/dollar-whitee.svg";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import heartIcon from "../assets/starLogo.svg";
import heartIconEmpty from "../assets/emptyStarLogo.svg";
import googleMapImage from "../assets/mapImageForFooter.svg";
import { BaseURLs } from "../App";
import { useNavigate } from "react-router-dom";
import LocationIcon from "../assets/locationIcon.png";
import Arrows from "../assets/arrows.png";
import Sort from "../assets/sort.png";
import dollar_black from "../assets/dollar-svgrepo-com.svg";
import lari_black from "../assets/lari-svgrepo-com.svg";

const normalizeGroundData = (data, lang) => {
  return data.map((item) => ({
    id: item.id,
    internalName: item.internal_ground_name.internal_ground_name,
    area: item.internal_ground_name.area,
    fullPrice: item.internal_ground_name.full_price,
    squarePrice: item.internal_ground_name.square_price,
    status: item.internal_ground_name.status,
    rank: item.internal_ground_name.rank,
    isAvailable: item.internal_ground_name.is_available,
    visibility: item.internal_ground_name.visibiliti,
    address: {
      city: item[`ground_address_${lang}`][`city_${lang}`],
      parentDistrict: item[`ground_address_${lang}`][`pharentDistrict_${lang}`],
      district: item[`ground_address_${lang}`][`district_${lang}`],
      streetName: item[`ground_address_${lang}`][`street_name_${lang}`],
      address: item[`ground_address_${lang}`][`address_${lang}`],
      latitude: item[`ground_address_${lang}`].latitude,
      longitude: item[`ground_address_${lang}`].longitude,
    },
    groundName: item[`ground_name_${lang}`],
    images: item.ground_images,
  }));
};

const normalizeLocationData = (data, lang) => {
  return data.map((cityItem) => {
    const cityNameField = `city_${lang}`;
    const pharentDistrictField = `pharentDistrict_${lang}`;
    const districtField = `district_${lang}`;

    const cityName = cityItem[cityNameField];
    const pharentDistricts = cityItem[pharentDistrictField].map(
      (pharentDistrictItem) => {
        const pharentDistrictName = pharentDistrictItem[pharentDistrictField];
        const districts = pharentDistrictItem[districtField].map(
          (districtItem) => districtItem[districtField]
        );

        return { pharentDistrict: pharentDistrictName, districts };
      }
    );

    return { city: cityName, pharentDistricts };
  });
};

export default function Physical({
  selectedLanguage,
  favoritesLots,
  favoriteHandlerLots,
  getCorrencyRate,
  HandleStateChange,
  currenceChangeState,
  isOn,
  toggleSwitch,
}) {
  const [privateApartments, setPrivateApartments] = useState([]);

  const [is_P_ModalOpen, setIs_P_ModalOpen] = useState("");
  const [is_P_PriceModalOpen, setIs_P_PriceModalOpen] = useState(false);
  const [is_P_SpaceModalOpen, setIs_P_SpaceModalOpen] = useState(false);
  const [is_P_StatusModalOpen, setIs_P_StatusModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedPharentDistricts, setSelectedPharentDistricts] = useState([]);
  const [selectedDistricts, setSelectedDistricts] = useState([]);

  const [locations, setLocations] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);

  const [min_area, setMin_area] = useState("");
  const [max_area, setMax_area] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [currentPage, setCorrentPage] = useState(0);
  const [ascendentPrice, setAscendentPrice] = useState("");

  const [stringFilterValue, setStringFilterValue] = useState("");
  const [graundStatus, setGraundStatus] = useState([]);

  const [search, setSearch] = useState(false);

  const [min_square_price, setMin_square_price] = useState("");
  const [max_square_price, setMax_square_price] = useState("");

  const [convertedMinSquarePrice, setConvertedMinSquarePrice] =
    useState(min_square_price);
  const [convertedMaxSquarePrice, setConvertedMaxSquarePrice] =
    useState(max_square_price);

  const [minFullPrice, setMinFullPrice] = useState("");
  const [maxFullPrice, setMaxFullPrice] = useState("");

  const [convertedMinFullPrice, setConvertedMinFullPrice] =
    useState(minFullPrice);
  const [convertedMaxFullPrice, setConvertedMaxFullPrice] =
    useState(maxFullPrice);

  useEffect(() => {
    setSelectedCity("");
    setSelectedPharentDistricts([]);
    setSelectedDistricts([]);
    setMin_area("");
    setMax_area("");
    setMinFullPrice("");
    setMaxFullPrice("");
    setMin_square_price("");
    setMax_square_price("");
    setLocations([]);
    setSelectedStatuses([]);
  }, [selectedLanguage]);

  const navigate = useNavigate();
  const handleLotsClick = (prev_apartments) => {
    navigate(`/eachground/${prev_apartments}`, { state: { prev_apartments } });
  };

  // ------------------------------------axios for fetching private apartments -----------------------------------------

  useEffect(() => {
    const fetcPrivateApartments = async () => {
      // const cityParam = `address_${selectedLanguage}__city_${selectedLanguage}__city_${selectedLanguage}__icontains`;
      // const pharentdistrictParams =  `address_${selectedLanguage}__pharentDistrict_${selectedLanguage}__pharentDistrict_${selectedLanguage}__in`;
      // const districtParams = `address_${selectedLanguage}__district_${selectedLanguage}__district_${selectedLanguage}__in`;

      const cityParam = `city`;
      const pharentdistrictParams = `parent_districts`;
      const districtParams = `districts`;

      const limit = 12; // Define the limit or make it dynamic as per your requirement
      const offset = (currentPage - 1) * limit;

      let queryParams = new URLSearchParams({
        [cityParam]: selectedCity,
        [pharentdistrictParams]: selectedPharentDistricts.join(","),
        [districtParams]: selectedDistricts.join(","),
        min_square_price: convertedMinSquarePrice,
        max_square_price: convertedMaxSquarePrice,
        min_full_price: convertedMinFullPrice,
        max_full_price: convertedMaxFullPrice,
        min_area: min_area,
        max_area: max_area,
        limit: limit,
        offset: offset,
        ordering: ascendentPrice,
        search: stringFilterValue,
      });

      if (graundStatus && graundStatus.length > 0) {
        graundStatus.forEach((status) => {
          queryParams.append("status", status);
        });
      }

      const queryString = queryParams.toString();
      const requestUrl = `${BaseURLs.ground}${selectedLanguage}/?${queryString}`;

      const response = await axios.get(requestUrl);
      const data = response.data.results;
      const normalised_Data = normalizeGroundData(data, selectedLanguage);
      setPrivateApartments(normalised_Data);
      setTotalCount(response.data.total_items);
      setTotalPageCount(response.data.total_pages);
      setCorrentPage(response.data.current_page);
    };
    fetcPrivateApartments();
  }, [
    selectedLanguage,
    search,
    // selectedCity,
    // selectedPharentDistricts,
    // selectedDistricts,
    // min_square_price,
    // max_square_price,
    // minFullPrice,
    // maxFullPrice,
    // max_area,
    // min_area,
    currentPage,
    // ascendentPrice,
    // stringFilterValue,
    // graundStatus,
  ]);

  const habdle_Search_Button_Click = () => {
    setSearch(!search);
    if (min_square_price === "") {
      setConvertedMinSquarePrice("");
    } else {
      // Proceed with conversion if there's a value
      const conversionRate = !isOn ? 1 / getCorrencyRate : 1;
      setConvertedMinSquarePrice(String(min_square_price * conversionRate));
    }

    if (max_square_price === "") {
      setConvertedMaxSquarePrice("");
    } else {
      const conversionRate = !isOn ? 1 / getCorrencyRate : 1;
      setConvertedMaxSquarePrice(String(max_square_price * conversionRate));
    }

    if (minFullPrice === "") {
      setConvertedMinFullPrice("");
    } else {
      const conversionRate = !isOn ? 1 / getCorrencyRate : 1;
      setConvertedMinFullPrice(String(minFullPrice * conversionRate));
    }

    if (maxFullPrice === "") {
      setConvertedMaxFullPrice("");
    } else {
      const conversionRate = !isOn ? 1 / getCorrencyRate : 1;
      setConvertedMaxFullPrice(String(maxFullPrice * conversionRate));
    }
  };

  // useEffect(() => {
  //   console.log("aq unda iyos suratebi", privateApartments);
  // }, [totalCount, selectedLanguage]);

  //-----------------------------------fetch ionly locations --------------------------------------

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(`${BaseURLs.map}${selectedLanguage}`);
        const normalisedLocationData = normalizeLocationData(
          response.data,
          selectedLanguage
        );
        setLocations(normalisedLocationData);
      } catch (error) {
        console.error("error fetching on locations =>> ", error);
      }
    };

    fetchLocations();
  }, [
    selectedLanguage,
    selectedCity,
    selectedPharentDistricts,
    selectedDistricts,
  ]);

  // ----------------------------------------------------------------------------------------------

  // ------------------------------------modal and logic for opening filtration window --------------------------------------
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

        const [lotsOpen, setLotsOpen] = useState(false);
        const toggleLots = () => {
          setLotsOpen(!lotsOpen);
        };
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

  // -------------------------------------------------------------------------------------------------------------------------------------

  // --------------------------------------------------------selecting districts and pharentdistricts --------------------------------------

  const handleParentDistrictChange = (e, parentDistrict) => {
    setSelectedPharentDistricts((prevSelected) => {
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

    setSelectedDistricts((prevSelected) => {
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
    setSelectedDistricts((prevSelected) => {
      const updatedSelectedDistricts = e.target.checked
        ? [...prevSelected, district]
        : prevSelected.filter((d) => d !== district);

      // Update parent districts based on selected districts
      const updatedSelectedParentDistricts = locations.reduce(
        (acc, cityItem) => {
          if (cityItem.city === selectedCity) {
            cityItem.pharentDistricts.forEach((pd) => {
              // Check if any district of this parent district is selected
              const isAnyDistrictSelected = pd.districts.some((dist) =>
                updatedSelectedDistricts.includes(dist)
              );

              // If any district is selected, add the parent district, else remove it
              if (isAnyDistrictSelected) {
                if (!acc.includes(pd.pharentDistrict)) {
                  acc.push(pd.pharentDistrict);
                }
              } else {
                acc = acc.filter((p) => p !== pd.pharentDistrict);
              }
            });
          }
          return acc;
        },
        [...selectedPharentDistricts]
      );

      // Update selectedPharentDistricts state
      setSelectedPharentDistricts(updatedSelectedParentDistricts);

      return updatedSelectedDistricts;
    });
  };

  // -------------------------------------------------------------------------------------------------------------------------------------

  // --------------------------function for selecting status for filtration -----------------------------------------------

  // const handleStatusChange = (e) => {
  //   setStatus(e.target.value);
  // };
  const handleStatusChange = (e, value) => {
    setSelectedStatuses((prevSelectedStatuses) => {
      const newSelectedStatuses = e.target.checked
        ? [...prevSelectedStatuses, value]
        : prevSelectedStatuses.filter((status) => status !== value);

      console.log("Updated Selected Statuses:", newSelectedStatuses); // Log the new state
      return newSelectedStatuses;
    });
  };

  const handleStatusChangeForGround = (e, value) => {
    setGraundStatus((prevSelectedStatuses) => {
      const newSelectedStatuses = e.target.checked
        ? [...prevSelectedStatuses, value]
        : prevSelectedStatuses.filter((status) => status !== value);

      console.log("Updated Selected Statuses:", newSelectedStatuses); // Log the new state
      return newSelectedStatuses;
    });
  };

  // -----------------------------------------------------------------------------------------------------------------------------
  // ----------------------------------icon coloure and  status  change  ----------------------------------------------------------

  const statusTranslations = {
    1: {
      en: "Newly renovated",
      ka: "ახალ გარემონტებულო",
      ru: "Недавно отремонтированный",
    },
    2: {
      en: "With old repairs",
      ka: "ძველი რემონტით",
      ru: "Со старым ремонтом",
    },
    3: { en: "To be repairedd", ka: "გაურემონტებელი", ru: "To be repairedd" },
    // Add more statuses and translations if needed
  };

  const renderStatusOptions = () => {
    return Object.entries(statusTranslations).map(([value, labels]) => (
      <div className="status_chackboxes" key={value}>
        <label className="container">
          <input
            type="checkbox"
            checked={selectedStatuses.includes(value)}
            value={value}
            onChange={(e) => handleStatusChange(e, value)}
          />
          <div className="checkmark"></div>
        </label>
        <p className="text_modal_color">{labels[selectedLanguage]}</p>
      </div>
    ));
  };

  // ---------------------------------------------------------------------------------------------------------------------
  // --------ffunction for changing status button content language change and also select city button language change -------------

  const handle_P_StatusButtonLanguageChange = (lang) => {
    var languageInfo = {
      statusInfoLanguage: "en",
      cityButtonLanguage: "Select City ",
      spaceButtonLanguage: "Space",
      priceButtonLanguage: "Price",
      allStatusLanguage: "All",
      legendUnderPlanning: "Under Planning",
      legendUnderConstructioin: "Under Construction",
      legendComplited: "Complited",
      stringFiltrationButtonLanguage: "Search by word",
      complexes: "Complexes",
      private_apartments: "Private Appartments",
      allFindButtonLanguage: "Search",
      minPrice: "From m²",
      maxPrice: "To m²",
      roomStudio: "Studio",
      fullPriceHomePage: "Full price",
      meterPriceHomePage: "The price of m²",
      dan: "from",
      mde: "to",
      map: "Map",
      sorting: "Sorting",
      sort: "Sort",
    };

    switch (lang) {
      case "en":
        languageInfo.statusInfoLanguage = "Status";
        languageInfo.cityButtonLanguage = "Location";
        languageInfo.spaceButtonLanguage = "Space";
        languageInfo.priceButtonLanguage = "Price";
        languageInfo.allStatusLanguage = "All";
        languageInfo.legendUnderPlanning = "Under Planning";
        languageInfo.legendUnderConstructioin = "Under Construction";
        languageInfo.legendComplited = "Complited";
        languageInfo.stringFiltrationButtonLanguage = "Search by word";
        languageInfo.complexes = "Complexes";
        languageInfo.private_apartments = "Private Appartments";
        languageInfo.allFindButtonLanguage = "Search";
        languageInfo.spaceButtonClose = "Close";
        languageInfo.minPrice = "From m²";
        languageInfo.maxPrice = "To m²";
        languageInfo.roomStudio = "Studio";
        languageInfo.fullPriceHomePage = "Full price";
        languageInfo.meterPriceHomePage = "The price of m²";
        languageInfo.dan = "from";
        languageInfo.mde = "to";

        languageInfo.map = "Map";
        languageInfo.sorting = "Sorting";
        languageInfo.sort = "Sort";

        break;

      case "ka":
        languageInfo.statusInfoLanguage = "სტატუსი";
        languageInfo.cityButtonLanguage = "მდებარეობა";
        languageInfo.spaceButtonLanguage = "ფართი";
        languageInfo.priceButtonLanguage = "ფასი";
        languageInfo.allStatusLanguage = "ყველა";
        languageInfo.legendUnderPlanning = "დაგეგმვის პროცესში";
        languageInfo.legendUnderConstructioin = "მშენებარე";
        languageInfo.legendComplited = "დასრულებული";
        languageInfo.stringFiltrationButtonLanguage = "იპოვე სიტყვით";
        languageInfo.complexes = "კომპლექსები";
        languageInfo.private_apartments = "კერძო ბინები";
        languageInfo.allFindButtonLanguage = "Search";
        languageInfo.spaceButtonClose = "დახურვა";
        languageInfo.minPrice = "დან მ²";
        languageInfo.maxPrice = "მდე მ²";
        languageInfo.roomStudio = "სტუდიო";
        languageInfo.fullPriceHomePage = "სრული ფასი";
        languageInfo.meterPriceHomePage = "მ² - ის ფასი";
        languageInfo.dan = "დან";
        languageInfo.mde = "მდე";

        languageInfo.map = "რუქა";
        languageInfo.sorting = "სორტირება";
        languageInfo.sort = "სორტ";

        break;

      case "ru":
        languageInfo.statusInfoLanguage = "статус";
        languageInfo.cityButtonLanguage = "Местоположение";
        languageInfo.spaceButtonLanguage = "Площадь";
        languageInfo.priceButtonLanguage = "Цена";
        languageInfo.allStatusLanguage = "Все";
        languageInfo.legendUnderPlanning = "На стадии планирования";
        languageInfo.legendUnderConstructioin = "На стадии строительства";
        languageInfo.legendComplited = "Завершено";
        languageInfo.stringFiltrationButtonLanguage = "Поиск по слову";
        languageInfo.complexes = "Комплексы";
        languageInfo.private_apartments = "Частные апартаменты";
        languageInfo.spaceButtonClose = "закрить";
        languageInfo.minPrice = "из м²";
        languageInfo.maxPrice = "до м²";
        languageInfo.roomStudio = "Студия";
        languageInfo.fullPriceHomePage = "Полная стоимость";
        languageInfo.meterPriceHomePage = "Цена м²";
        languageInfo.dan = "из";
        languageInfo.mde = "до";

        languageInfo.map = "карта";
        languageInfo.sorting = "Сортировка";
        languageInfo.sort = "Сорт";

        break;
    }
    return languageInfo;
  };

  // ---------------------------------------------------------------------------------------------------------------------
  // ----------------------------------------logic for space and proce modal to open and close -----------------------------------------------
  const closeModal = () => {
    setIs_P_ModalOpen(false);
  };

  const handleShowModal = () => {
    setModalContent("cities");
    setIs_P_ModalOpen(true);
    setIs_P_SpaceModalOpen(false);
    setIs_P_PriceModalOpen(false);
    setIs_P_StatusModalOpen(false);
  };

  const handleCityClick = (city) => {
    setModalContent("pharentdistricts");
    setSelectedCity(city);
    setIs_P_ModalOpen(true);
  };

  const handle_P_SpaceButtonClick = () => {
    setIs_P_SpaceModalOpen(true);
    setIs_P_PriceModalOpen(false);
    setIs_P_StatusModalOpen(false);
    setIs_P_ModalOpen(false);
  };

  const close_P_SpaceModal = () => {
    setIs_P_SpaceModalOpen(false);
  };

  const handle_P_PriceButtonClick = () => {
    setIs_P_PriceModalOpen(true);
    setIs_P_SpaceModalOpen(false);
    setIs_P_ModalOpen(false);
    setIs_P_StatusModalOpen(false);
  };

  const handleClose_P_PriceModal = () => {
    setIs_P_PriceModalOpen(false);
  };

  const handle_P_StatusButtonClick = () => {
    setIs_P_StatusModalOpen(true);
    setIs_P_SpaceModalOpen(false);
    setIs_P_PriceModalOpen(false);
    setIs_P_ModalOpen(false);
  };

  const handleClose_P_StatusModal = () => {
    setIs_P_StatusModalOpen(false);
  };

  // ---------------------------------------------------------------------------------------------------------------------

  // for Sorting
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // // for toggle DOllar AND LARI ---==---(START)
  // const [isOn, setIsOn] = useState(false);
  // const toggleSwitch = () => setIsOn(!isOn);
  // // -----===--------(END)

  // This is for scrool up, when user click other Pagination number
  const pagiHandler = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handle_pagination_arrow_page_up = (eevent, value) => {
    setCorrentPage(value);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ------------------------------------------------------------------------------------
  const handleStatusButtonLanguageChange = (lang) => {
    var languageInfo = {
      statusInfoLanguage: "en",
      sortingButtonAscendentPrice: "Ascendant price in m²",
      sortingButtonDescendentPrice: "Descendent price in m²",
      sortingButtonAscendantTime: "Ascendant created at",
      sortingButtonDescendentTime: "Decendant created at",
      sortingButtonAscendantFullPrice: "Ascendant full price ",
      sortingButtonDescendentFullPrice: "Descendant full price",
      studio: "Studio",
      allFindButtonLanguage: "Search",
      spaceButtonClose: "Close",

      minPrice: "From m²",
      maxPrice: "To m²",
      roomStudio: "Studio",
      fullPriceHomePage: "Full price",
      meterPriceHomePage: "The price of m²",
      dan: "from",
      mde: "to",
    };

    switch (lang) {
      case "en":
        languageInfo.sortingButtonAscendentPrice = "Ascendant price in m²";
        languageInfo.sortingButtonDescendentPrice = "Descendent price in m²";
        languageInfo.sortingButtonAscendantTime = "Ascendant created at";
        languageInfo.sortingButtonDescendentTime = "Decendent created at";
        languageInfo.sortingButtonAscendantFullPrice = "Ascendant full price ";
        languageInfo.sortingButtonDescendentFullPrice = "Decendent full price";
        languageInfo.studio = "Studio";
        languageInfo.allFindButtonLanguage = "Search";
        languageInfo.spaceButtonClose = "Close";
        languageInfo.minPrice = "From m²";
        languageInfo.maxPrice = "To m²";
        languageInfo.roomStudio = "Studio";
        languageInfo.fullPriceHomePage = "Full price";
        languageInfo.meterPriceHomePage = "The price of m²";
        languageInfo.dan = "from";
        languageInfo.mde = "to";

        break;

      case "ka":
        languageInfo.sortingButtonAscendentPrice = "მ² ფასი ზრდადობით";
        languageInfo.sortingButtonDescendentPrice = "მ² ფასი კლებადობით";
        languageInfo.sortingButtonAscendantTime = "თარიღი ზრდადობით";
        languageInfo.sortingButtonDescendentTime = "თარიღი კლებადობით";
        languageInfo.sortingButtonAscendantFullPrice = "მთლიანი ფასი ზრდადობით";
        languageInfo.sortingButtonDescendentFullPrice =
          "მთლიანი ფასი კლებადობით";
        languageInfo.studio = "სტუდიო";
        languageInfo.allFindButtonLanguage = "ძებნა";
        languageInfo.spaceButtonClose = "დახურვა";
        languageInfo.minPrice = "დან მ²";
        languageInfo.maxPrice = "მდე მ²";
        languageInfo.roomStudio = "სტუდიო";
        languageInfo.fullPriceHomePage = "სრული ფასი";
        languageInfo.meterPriceHomePage = "მ² - ის ფასი";
        languageInfo.dan = "დან";
        languageInfo.mde = "მდე";

        break;

      case "ru":
        languageInfo.sortingButtonAscendentPrice = "Ццена м² с шагом";
        languageInfo.sortingButtonDescendentPrice = "м² цена снижается";
        languageInfo.sortingButtonAscendantTime = "Асцендент создан в";
        languageInfo.sortingButtonDescendentTime = "Потомок создан в";
        languageInfo.sortingButtonAscendantFullPrice =
          "Полная цена Асцендента.";
        languageInfo.sortingButtonDescendentFullPrice =
          "Полная стоимость потомка";
        languageInfo.studio = "Студия";
        languageInfo.allFindButtonLanguage = "Поиск";
        languageInfo.spaceButtonClose = "закрить";
        languageInfo.minPrice = "из м²";
        languageInfo.maxPrice = "до м²";
        languageInfo.roomStudio = "Студия";
        languageInfo.fullPriceHomePage = "Полная стоимость";
        languageInfo.meterPriceHomePage = "Цена м²";
        languageInfo.dan = "из";
        languageInfo.mde = "до";

        break;
    }
    return languageInfo;
  };

  const statusTranslationFor_Ground = {
    1: {
      en: "Agricultural",
      ka: "სასოფლო-სამეურნეო",
      ru: "Сельскохозяйственный",
    },
    2: {
      en: "Land for settlement",
      ka: "სამოსახლო",
      ru: "Земля для поселения",
    },
    3: { en: "Commercial", ka: "კომერციული", ru: "Коммерческий" },
  };
  const render_Ground_StatusOption = () => {
    return Object.entries(statusTranslationFor_Ground).map(
      ([value, labels]) => (
        <div className="status_chackboxes" key={value}>
          <label className="container">
            <input
              type="checkbox"
              checked={graundStatus.includes(value)}
              value={value}
              onChange={(e) => handleStatusChangeForGround(e, value)}
            />
            <div className="checkmark"></div>
          </label>
          <p className="text_modal_color">{labels[selectedLanguage]}</p>
        </div>
      )
    );
  };

  // --------------------------------------------language change for card status setting and content ---------------------------------------------------
  const cardStatusSettingLanguage = (lang, status) => {
    const statusLanguageInfo = {
      en: {
        1: "Agricultural",
        2: "Land for settlement",
        3: "Commercial",
      },
      ka: {
        // Assuming 'ka' stands for another language, e.g., Georgian
        1: "სასოფლო-სამეურნეო",
        2: "სამოსახლო",
        3: "კომერციული",
      },
      ru: {
        // Assuming 'ru' stands for Russian
        1: "Сельскохозяйственный",
        2: "Земля для поселения",
        3: "Коммерческий",
      },
      // Add more languages as needed
    };

    // Get the status descriptions for the current language
    const currentLanguageStatusInfo = statusLanguageInfo[lang];

    // Return the status description based on the status value
    return currentLanguageStatusInfo[status];
  };

  // ----------------------------------------------------------------------------------------------------------

  // --------------------------------------card settings language change function ---------------------------------------------

  const squareSymbol = "\u00B2";

  const car_settings_language_change = (lang) => {
    var languageInfo = {
      city: "City",
      square_from: `M${squareSymbol} - from`,
    };

    switch (lang) {
      case "en":
        languageInfo.city = "City";
        languageInfo.square_from = `M${squareSymbol} - from`;

        break;

      case "ka":
        languageInfo.city = "ქალაქი";
        languageInfo.square_from = `მ${squareSymbol} - დან`;

        break;

      case "ru":
        languageInfo.city = "Город";
        languageInfo.square_from = `М${squareSymbol} от`;

        break;
    }
    return languageInfo;
  };

  // ------------------------------------------------------------------------------------------------------------------------

  // const handle_Search_Burron_Click = () => {

  // }

  const [sortOpen, setSortOpen] = useState(false);

  const sortOpenLots = () => {
    setSortOpen(!sortOpen);
  };
  const closeSort = () => {
    if (sortOpen) {
      setSortOpen(false);
    }
  };
  // "closeSort"
  return (
    <div className="ComplexBodyBox_physical">
      <div className={sortOpen ? "private_filter_conteiner " : "closeSort"}>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="filter_cont_for_physical flex_lots ">
            {/* button for filtering space */}
            <div className="button-modal-container ">
              <div onClick={handle_P_SpaceButtonClick} className="space_button">
                {
                  handle_P_StatusButtonLanguageChange(selectedLanguage)
                    .spaceButtonLanguage
                }
                <img
                  src={button_icon}
                  alt="button dropdown icon"
                  className="dropdown"
                />
              </div>

              <P_SpaceModal
                isOpen={is_P_SpaceModalOpen}
                close={close_P_SpaceModal}
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
                    type="number"
                    className="filter_inputs"
                    placeholder={
                      handleStatusButtonLanguageChange(selectedLanguage)
                        .minPrice
                    }
                    value={min_area}
                    onChange={(e) => setMin_area(e.target.value)}
                  />

                  <input
                    type="number"
                    className="filter_inputs"
                    placeholder={
                      handleStatusButtonLanguageChange(selectedLanguage)
                        .maxPrice
                    }
                    value={max_area}
                    onChange={(e) => setMax_area(e.target.value)}
                  />
                </div>
                <button
                  className="modal_close_button"
                  onClick={close_P_SpaceModal}
                >
                  {
                    handleStatusButtonLanguageChange(selectedLanguage)
                      .spaceButtonClose
                  }
                </button>
              </P_SpaceModal>
            </div>

            {/* button for filtering price  */}
            <div className="button-modal-container">
              <div onClick={handle_P_PriceButtonClick} className="space_button">
                {
                  handle_P_StatusButtonLanguageChange(selectedLanguage)
                    .priceButtonLanguage
                }
                <img
                  src={button_icon}
                  alt="button dropdown icon"
                  className="dropdown"
                />
              </div>
              <P_PriceModal
                isOpen={is_P_PriceModalOpen}
                close={handleClose_P_PriceModal}
              >
                <div>
                  <div className="fullPriceHomePage">
                    {
                      handleStatusButtonLanguageChange(selectedLanguage)
                        .fullPriceHomePage
                    }

                    <div className="currencyBox_homepage">
                      <div
                        className="switch_homepage"
                        data-ison={isOn}
                        onClick={() => {
                          toggleSwitch();
                          HandleStateChange();
                        }}
                      >
                        <motion.div
                          className="handle_homepage"
                          layout
                          transition={spring}
                        >
                          <img
                            src={lari_black}
                            alt="Lari Sign"
                            className={`currency-sign_homepage ${isOn ? "active" : ""
                              }`}
                          />
                          <img
                            src={dollar_black}
                            alt="Dollar Sign"
                            className={`currency-sign_homepage ${!isOn ? "active" : ""
                              }`}
                          />
                        </motion.div>
                      </div>
                    </div>


                  </div>

                  {/* pirveli inputi  */}
                  <div className="inputInlineDispley dabla">
                    <div className="for_dolar_and_lari">

                      <input
                        type="number"
                        className="filter_inputs"
                        placeholder={
                          handleStatusButtonLanguageChange(selectedLanguage).dan
                        }
                        value={min_square_price}
                        onChange={(e) => setMin_square_price(e.target.value)}
                      />
                      <img
                        src={isOn ? dollar : lari}
                        alt="lari"
                        className="currency-sign_homepage_11"
                      />
                    </div>

                    {/* meore inputi  */}
                    <div className="for_dolar_and_lari">

                      <input
                        type="number"
                        className="filter_inputs"
                        placeholder={
                          handleStatusButtonLanguageChange(selectedLanguage).mde
                        }
                        value={max_square_price}
                        onChange={(e) => setMax_square_price(e.target.value)}
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

                  {/* mesame inputi  */}
                  <div className="inputInlineDispley dabla">
                    <div className="for_dolar_and_lari">
                      <input
                        type="number"
                        className="filter_inputs"
                        placeholder={
                          handleStatusButtonLanguageChange(selectedLanguage).dan
                        }
                        value={minFullPrice}
                        onChange={(e) => setMinFullPrice(e.target.value)}
                      />
                      <img
                        src={isOn ? dollar : lari}
                        alt="lari"
                        className="currency-sign_homepage_11"
                      />
                    </div>


                    {/* meotxe inputi  */}
                    <div className="for_dolar_and_lari">

                      <input
                        type="number"
                        className="filter_inputs"
                        placeholder={
                          handleStatusButtonLanguageChange(selectedLanguage).mde
                        }
                        value={maxFullPrice}
                        onChange={(e) => setMaxFullPrice(e.target.value)}
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
                  onClick={handleClose_P_PriceModal}
                >
                  {
                    handleStatusButtonLanguageChange(selectedLanguage)
                      .spaceButtonClose
                  }
                </button>
              </P_PriceModal>
            </div>

            {/* button for locations */}
            <div className="button-modal-container">
              <div onClick={handleShowModal} className="lacation_button">
                {
                  handle_P_StatusButtonLanguageChange(selectedLanguage)
                    .cityButtonLanguage
                }
                <img
                  src={button_icon}
                  alt="button dropdown icon"
                  className="dropdown"
                />
              </div>
              <P_Modal isOpen={is_P_ModalOpen}>{renderModalContent()}</P_Modal>
            </div>

            {/* button for status */}
            <div className="button-modal-container">
              <div
                onClick={handle_P_StatusButtonClick}
                className="lacation_button"
              >
                {
                  handle_P_StatusButtonLanguageChange(selectedLanguage)
                    .statusInfoLanguage
                }
                <img
                  src={button_icon}
                  alt="button dropdown icon"
                  className="dropdown"
                />
              </div>
              <P_StatusModal
                isOpen={is_P_StatusModalOpen}
                close={handleClose_P_StatusModal}
              >
                {/* {renderStatusOptions()} */}
                {render_Ground_StatusOption()}
                <button
                  className="modal_close_button"
                  onClick={handleClose_P_StatusModal}
                >
                  Close
                </button>
              </P_StatusModal>
            </div>

            {/* for searching with string*/}
            <div className="button-modal-container">
              <div className="lacation_button">
                <input
                  className="string_filter_input"
                  type="text"
                  placeholder={
                    handle_P_StatusButtonLanguageChange(selectedLanguage)
                      .stringFiltrationButtonLanguage
                  }
                  value={stringFilterValue}
                  onChange={(e) => {
                    setStringFilterValue(e.target.value);
                  }}
                />
                <img
                  src={loupe}
                  alt="button dropdown icon"
                  className="dropdown"
                />
              </div>
            </div>
            {/*serach  Button  and map*/}
          </div>
        </motion.div>
        <div className=" flex_box_lots">
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
                  Map
                  {handleStatusButtonLanguageChange(selectedLanguage).map}
                </button>
              </div>
            </motion.div>
          </Link>
          <div
            className="all_search_button"
            onClick={habdle_Search_Button_Click}
          >
            {
              handleStatusButtonLanguageChange(selectedLanguage)
                .allFindButtonLanguage
            }
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------------------------------------------------------------------------- */}
      {/* ---------------------------------------------------------------------------------------------------------------------------------- */}
      {/* ---------------------------------------------------------------------------------------------------------------------------------- */}
      {/* ---------------------------------------------------------------------------------------------------------------------------------- */}
      {/* ---------------------------------------------------------------------------------------------------------------------------------- */}

      {/* ეს არის ჩამონათვალი button–ები, რომ გადახვიდე კომპლექსებზე, გეგმარებებზე, რუკაზე, სორტირება და დასაკელება და counter-ი ... */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        transition={{ duration: 1 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="motionBox_physical"
      >
        <div className="forPaddingOfInfoFieldOfComplexsPlansMaps_physical">
          <div className="infoFieldOfComplexsPlansMaps_physical">
            <div className="complexInfoAndCountShowBox_physical">
              <p style={{ color: "white" }}>
                {
                  handle_P_StatusButtonLanguageChange(selectedLanguage)
                    .private_apartments
                }{" "}
                : {totalCount}
              </p>
            </div>
            {/* აქ არის კომპლექსებზე, გეგმარებებზე, რუკაზე, სორტირება და დოლარი ---- */}
            <div className="projectsPlansMapsSortingAndDollarBox_physical">
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
                <div className="sortAndArrowDownImgBox_physical">
                  <p className="sort_text_web">
                    {
                      handle_P_StatusButtonLanguageChange(selectedLanguage)
                        .sorting
                    }
                  </p>
                  <img
                    className="none_arrow"
                    src={arrowDownSorting}
                    style={{ width: "20px" }}
                  />
                  <img
                    className="arrow_none"
                    src={Arrows}
                    style={{ width: "25px" }}
                  />
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
                      setAscendentPrice("created_at");
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
                      setAscendentPrice("-square_price");
                    }}
                  >
                    {" "}
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
                      setAscendentPrice("square_pricer");
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
                      setAscendentPrice("-full_price");
                    }}
                  >
                    {
                      handleStatusButtonLanguageChange(selectedLanguage)
                        .sortingButtonDescendentFullPrice
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
                      setAscendentPrice("full_price");
                    }}
                  >
                    {
                      handleStatusButtonLanguageChange(selectedLanguage)
                        .sortingButtonAscendantFullPrice
                    }
                  </MenuItem>
                </motion.div>
              </Menu>
              {/* ---------------------------------- */}
              <div
                className="sort_icon_for_complex_mob lots_sort"
                onClick={sortOpenLots}
              >
                <img
                  src={Sort}
                  style={{ width: "20px", height: "25px" }}
                  alt="/"
                />
              </div>
              {/* ----Dollar and Lari Toggle button */}
              <div className="currencyBox_physical">
                <div
                  className="switch_physical"
                  data-ison={isOn}
                  onClick={() => {
                    toggleSwitch();
                    HandleStateChange();
                  }}
                >
                  <motion.div
                    className="handle_physical"
                    layout
                    transition={spring}
                  >
                    <img
                      src={lari_black}
                      alt="Lari Sign"
                      className={`currency-sign_physical ${isOn ? "active" : ""
                        }`}
                    />
                    <img
                      src={dollar_black}
                      alt="Dollar Sign"
                      className={`currency-sign_physical ${!isOn ? "active" : ""
                        }`}
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

      <div className="allCards_physical" onClick={closeSort}>
        {privateApartments.map((prev_apartments, index) => (
          <div className="card_physical" key={prev_apartments.id}>
            <motion.div
              key={currentPage}
              initial={{ x: -50, opacity: 0 }}
              transition={{ duration: 1 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="gap_box"
            >
              <div className="heartbuttonAndImageBox_physical">
                <div className="heartButtonBox_physical">
                  <button
                    onClick={() => favoriteHandlerLots(prev_apartments)}
                    key={prev_apartments.id}
                    className="heartButtons_physical"
                  >
                    {favoritesLots.some(
                      (fav) => fav.id === prev_apartments.id
                    ) ? (
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
                  src={prev_apartments.images[0]}
                  alt={prev_apartments.name}
                  // style={styles.imageStyles}
                  onClick={() => handleLotsClick(prev_apartments.id)}
                  className="backImg"
                />
              </div>
              {/* --------------card details------------------- */}
              <h1 className="company_title" style={styles.companyTitle}>
                {prev_apartments.groundName}
              </h1>
              <div
                className="textInfo_physical"
                onClick={() => handleLotsClick(prev_apartments.id)}
              >
                <p className="city_settings" style={styles.complexInfo}>
                  {car_settings_language_change(selectedLanguage).city} :{" "}
                  {prev_apartments.address.city}
                </p>
                <p className="price_settings" style={styles.complexInfo}>
                  {/* {prev_apartments.squarePrice *   getCorrencyRate}{" "} */}
                  {currenceChangeState
                    ? (
                      Number(prev_apartments.squarePrice) * getCorrencyRate
                    ).toFixed(2)
                    : Number(prev_apartments.squarePrice).toFixed(2)}
                  {car_settings_language_change(selectedLanguage).square_from}
                </p>
                <div className="status_and_rank">
                  <p className="status_settings">
                    {" "}
                    {cardStatusSettingLanguage(
                      selectedLanguage,
                      prev_apartments.status
                    )}
                  </p>
                  <p className="private_apartment_rank">
                    {prev_apartments.rank}{" "}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
      {/* Pagination for user to select some page */}
      <div className="pagination">
        <Stack spacing={2}>
          <Pagination
            count={totalPageCount}
            shape="rounded"
            page={currentPage}
            onChange={handle_pagination_arrow_page_up}
            onClick={pagiHandler}
            sx={{
              "& .MuiPaginationItem-root": {
                display: "flex !important",
                flexDirection: "row !important",
                color: "#fff !important", // White text color for unselected items, with increased specificity
                margin: "3px !important", // Removes margin between buttons, with increased specificity
                padding: "0 !important", // Removes padding inside buttons, with increased specificity
                "&:hover": {
                  display: "flex !important",
                  flexDirection: "row !important",
                  backgroundColor: "#f0f0f0 !important", // Background color on hover for unselected items, with increased specificity
                  color: "#000 !important", // Text color on hover for unselected items, with increased specificity
                },
              },
              "& .Mui-selected": {
                display: "flex !important",
                flexDirection: "row !important",
                backgroundColor: "#fff !important", // White background color for the selected item, with increased specificity
                color: "#000 !important", // Black text color for the selected item, with increased specificity
                "&:hover": {
                  backgroundColor: "#fff !important", // Keep the background color on hover for selected item, with increased specificity
                  color: "#000 !important", // Keep the text color on hover for selected item, with increased specificity
                },
              },
              "& .MuiPaginationItem-ellipsis": {
                display: "flex !important",
                flexDirection: "row !important",
                color: "#fff !important", // Color of the ellipsis, with increased specificity
                margin: "0 !important", // Removes margin around the ellipsis, with increased specificity
                padding: "0 !important", // Removes padding around the ellipsis, with increased specificity
              },
              ".MuiPagination-ul": {
                display: "flex !important",
                flexDirection: "row !important",
                justifyContent: "center !important", // Centers the pagination items, with increased specificity
                flexWrap: "nowrap !important", // Prevents the pagination items from wrapping, with increased specificity
              },
            }}
          />
        </Stack>
      </div>
      {/* ---------------------------------------------------------------- */}
      <div className="googleMapImageBox_physical">
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
              className="googleMapImage_physical"
            />
          </motion.div>
        </Link>
      </div>
    </div>
  );
}

const styles = {
  imageStyles: {
    width: "278px",
    height: "229px",
    overflow: "hidden",
    // borderRadius: "20px",
  },
  companyTitle: {
    // position: 'absolute',
    // top: '262px',
    // paddingLeft: '20px'
    color: "white",
    fontSize: "16px",
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
