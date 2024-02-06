/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-case-declarations */
/* eslint-disable react/prop-types */
import "./Physical.css";
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
import lari from "../assets/lari-svgrepo-com.svg";
import dollar from "../assets/dollar-svgrepo-com.svg";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import heartIcon from "../assets/starLogo.svg";
import heartIconEmpty from "../assets/emptyStarLogo.svg";
import googleMapImage from "../assets/mapImageForFooter.svg";
import { BaseURLs } from "../App";
import { useNavigate } from "react-router-dom";

const normalizePrivateApartmentData = (data, lang) => {
  return data.map((item) => ({
    id: item.id,
    internalName:
      item.internal_private_apartment_name.internal_private_apartment_name,
    numberOfRooms: item.internal_private_apartment_name.number_of_rooms,
    status: item.internal_private_apartment_name.status,
    area: item.internal_private_apartment_name.area,
    fullPrice: item.internal_private_apartment_name.full_price,
    squarePrice: item.internal_private_apartment_name.square_price,
    floorNumber: item.internal_private_apartment_name.floor_number,
    isAvailable: item.internal_private_apartment_name.is_available,
    visibility: item.internal_private_apartment_name.visibiliti,
    rank: item.internal_private_apartment_name.rank,
    address: {
      city: item[`private_apartment_address_${lang}`][`city_${lang}`],
      parentDistrict:
        item[`private_apartment_address_${lang}`][`pharentDistrict_${lang}`],
      district: item[`private_apartment_address_${lang}`][`district_${lang}`],
      streetName:
        item[`private_apartment_address_${lang}`][`street_name_${lang}`],
      address: item[`private_apartment_address_${lang}`][`address_${lang}`],
      latitude: item[`private_apartment_address_${lang}`].latitude,
      longitude: item[`private_apartment_address_${lang}`].longitude,
    },
    images: item.private_apartment_images,
    privateApartmentName: item[`private_apartment_name_${lang}`],
    testPrivateField: item[`test_private_field_${lang}`],
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
  favorites,
  favoriteHandler,
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
  const [selectedRoomNumbers, setSelectedRoomNumbers] = useState([]);

  const [min_square_price, setMin_square_price] = useState("");
  const [max_square_price, setMax_square_price] = useState("");

  const [min_area, setMin_area] = useState("");
  const [max_area, setMax_area] = useState("");

  const [minFullPrice, setMinFullPrice] = useState("");
  const [maxFullPrice, setMaxFullPrice] = useState("");

  const [totalCount, setTotalCount] = useState(0);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [currentPage, setCorrentPage] = useState(0);
  const [ascendentPrice, setAscendentPrice] = useState("");

  const [stringFilterValue, setStringFilterValue] = useState("");

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

  // Assuming `complex` is an object representing each house
  const handleAppartmentClick = (p_apartment_id) => {
    navigate(`/eachprivateappartment/${p_apartment_id}`,{ state: { p_apartment_id } });
  };

  useEffect(()=> {

    console.log(privateApartments.id)
  },[privateApartments])
  
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
        min_square_price: min_square_price,
        max_square_price: max_square_price,
        min_full_price: minFullPrice,
        max_full_price: maxFullPrice,
        min_area: min_area,
        max_area: max_area,
        limit: limit,
        offset: offset,
        ordering: ascendentPrice,
        search: stringFilterValue,
      });

      if (selectedStatuses && selectedStatuses.length > 0) {
        selectedStatuses.forEach((status) => {
          queryParams.append("status", status);
        });
      }
      if (selectedRoomNumbers && selectedRoomNumbers.length > 0) {
        selectedRoomNumbers.forEach((room_number) => {
          queryParams.append("number_of_rooms", room_number);
        });
      }

      const queryString = queryParams.toString();
      const requestUrl = `${BaseURLs.private_apartment}${selectedLanguage}/?${queryString}`;

      const response = await axios.get(requestUrl);
      const data = response.data.results;
      const normalised_Data = normalizePrivateApartmentData(
        data,
        selectedLanguage
      );
      setPrivateApartments(normalised_Data);
      setTotalCount(response.data.total_items);
      setTotalPageCount(response.data.total_pages);
      setCorrentPage(response.data.current_page);
    };
    fetcPrivateApartments();
  }, [
    selectedLanguage,
    selectedCity,
    selectedPharentDistricts,
    selectedDistricts,
    min_square_price,
    max_square_price,
    minFullPrice,
    maxFullPrice,
    selectedStatuses,
    max_area,
    min_area,
    currentPage,
    ascendentPrice,
    stringFilterValue,
    selectedRoomNumbers,
  ]);

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

  // -----------------------------------------------------------------------------------------------------------------------------
  // ----------------------------------icon coloure and  status  change  ----------------------------------------------------------

  // const getStatusText = (status, lang) => {
  //   const statusTexts = {
  //     en: {
  //       1: "Planned",
  //       2: "Under Construction",
  //       3: "Completed"
  //     },
  //     ka: {
  //       1: "დაგეგმილი",
  //       2: "მშენებარე",
  //       3: "დასრულებული"
  //     },
  //     ru: {
  //       1: "Запланировано",
  //       2: "Строится",
  //       3: "Завершено"
  //     }
  //   };

  //   return statusTexts[lang][status] || `unknown status`;
  // };

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

  // ("1" , 'Newly renovated'),
  // ('2' , 'with old repairs'),
  // ('3', 'to be repaired'),

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
    };

    switch (lang) {
      case "en":
        languageInfo.statusInfoLanguage = "Select Status";
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
        break;

      case "ka":
        languageInfo.statusInfoLanguage = "აირჩიე სტატუსი";
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
        break;

      case "ru":
        languageInfo.statusInfoLanguage = "Выберите статус";
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

  // for toggle DOllar AND LARI ---==---(START)
  const [isOn, setIsOn] = useState(false);
  const toggleSwitch = () => setIsOn(!isOn);
  // -----===--------(END)

  // This is for scrool up, when user click other Pagination number
  const pagiHandler = () => {
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

        break;
    }
    return languageInfo;
  };

  // --------------------------------------------language change for card status setting and content ---------------------------------------------------
  const cardStatusSettingLanguage = (lang, status) => {
    const statusLanguageInfo = {
      en: {
        1: "Newly renovated",
        2: "With old repairs",
        3: "To be repaired",
      },
      ka: {
        // Assuming 'ka' stands for another language, e.g., Georgian
        1: "ახალი რემონტი",
        2: "ძველი რემონტით",
        3: "სარემონტო",
      },
      ru: {
        // Assuming 'ru' stands for Russian
        1: "Недавно отремонтированный",
        2: "Со старым ремонтом",
        3: "Требует ремонта",
      },
      // Add more languages as needed
    };

    // Get the status descriptions for the current language
    const currentLanguageStatusInfo = statusLanguageInfo[lang];

    // Return the status description based on the status value
    return currentLanguageStatusInfo[status];
  };

  // ----------------------------------------------------------------------------------------------------------
  // ------------------------------------ otaxebis raodenobis  filtraciis logika -------------------------------------

  const NUMBER_OF_ROOM_CHOICES = [
    {
      value: "studio",
      label: `${handleStatusButtonLanguageChange(selectedLanguage).studio}`,
    },
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5+", label: "5+" },
  ];

  // Function to handle change in checkbox selection
  const handleRoomNumberChange = (value) => {
    const currentIndex = selectedRoomNumbers.indexOf(value);
    const newSelectedRoomNumbers = [...selectedRoomNumbers];

    if (currentIndex === -1) {
      newSelectedRoomNumbers.push(value);
    } else {
      newSelectedRoomNumbers.splice(currentIndex, 1);
    }

    setSelectedRoomNumbers(newSelectedRoomNumbers);
  };

  // ------------------------------------------------------------------------------------------------------------------------
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

  return (
    <div className="ComplexBodyBox_physical">
      <div className="private_filter_conteiner">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="filter_cont_for_physical ">
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
                  <input
                    type="number"
                    className="filter_inputs"
                    placeholder="Min Price Per Square Meter"
                    value={min_area}
                    onChange={(e) => setMin_area(e.target.value)}
                  />

                  <input
                    type="number"
                    className="filter_inputs"
                    placeholder="Max Price Per Square Meter"
                    value={max_area}
                    onChange={(e) => setMax_area(e.target.value)}
                  />
                  {/* otaxebis raodenobis filtraciistvis */}
                  <div className="room_choice_container">
                    {NUMBER_OF_ROOM_CHOICES.map((choice) => (
                      <React.Fragment key={choice.value}>
                        <label
                          className={`checkbox-label ${
                            selectedRoomNumbers.includes(choice.value)
                              ? "selected"
                              : ""
                          }`}
                          onClick={() => handleRoomNumberChange(choice.value)}
                        >
                          {choice.label}
                        </label>
                        <input
                          type="checkbox"
                          id={`checkbox-${choice.value}`}
                          name="number_of_rooms"
                          value={choice.value}
                          checked={selectedRoomNumbers.includes(choice.value)}
                          onChange={() => {}}
                          style={{ display: "none" }}
                        />
                      </React.Fragment>
                    ))}
                  </div>

                  <p>otaxebis filtraciac unda iyos aq</p>
                </div>
                <button
                  className="modal_close_button"
                  onClick={close_P_SpaceModal}
                >
                  Close
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
                  <input
                    type="number"
                    className="filter_inputs"
                    placeholder="Min Price Per Square Meter"
                    value={min_square_price}
                    onChange={(e) => setMin_square_price(e.target.value)}
                  />

                  <input
                    type="number"
                    className="filter_inputs"
                    placeholder="Max Price Per Square Meter"
                    value={max_square_price}
                    onChange={(e) => setMax_square_price(e.target.value)}
                  />

                  <input
                    type="number"
                    className="filter_inputs"
                    placeholder="Min Full Price"
                    value={minFullPrice}
                    onChange={(e) => setMinFullPrice(e.target.value)}
                  />

                  <input
                    type="number"
                    className="filter_inputs"
                    placeholder="Max Full Price"
                    value={maxFullPrice}
                    onChange={(e) => setMaxFullPrice(e.target.value)}
                  />
                </div>
                <button
                  className="modal_close_button"
                  onClick={handleClose_P_PriceModal}
                >
                  Close
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
                {renderStatusOptions()}
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
          </div>
        </motion.div>
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
              <Link to="/complex">
                <motion.div
                  className="textButtonContainer_physical"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="mapAndLogoImg_physical">
                    <img
                      src={mapSignLogo}
                      alt="mapSignLogo"
                      className="mapSignLogo"
                    />
                    <button className="textButton_physical">პროექტები</button>
                  </div>
                </motion.div>
              </Link>
              {/* 
              <Link to='/complex/apartmentList' >
              <motion.div
                className="textButtonContainer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <div className='mapAndLogoImg'>
                  <img src={mapSignLogo} alt='mapSignLogo_physical' className='mapSignLogo' />
                  <button className='textButton'>გეგმარებები</button>
                </div>
              </motion.div>
              </Link>
 */}

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
                <div className="sortAndArrowDownImgBox_physical">
                  სორტირება
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

              {/* ----Dollar and Lari Toggle button */}
              <div className="currencyBox_physical">
                <div
                  className="switch_physical"
                  data-ison={isOn}
                  onClick={toggleSwitch}
                >
                  <motion.div
                    className="handle_physical"
                    layout
                    transition={spring}
                  >
                    <img
                      src={lari}
                      alt="Lari Sign"
                      className={`currency-sign_physical ${
                        isOn ? "active" : ""
                      }`}
                    />
                    <img
                      src={dollar}
                      alt="Dollar Sign"
                      className={`currency-sign_physical ${
                        !isOn ? "active" : ""
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

      <div className="allCards_physical">
        {privateApartments.map((prev_apartments, index) => (
          <div
            className="card_physical"
            key={index}
            onClick={() => handleAppartmentClick(prev_apartments.id)}
          >
            <motion.div
              key={currentPage}
              initial={{ x: -50, opacity: 0 }}
              transition={{ duration: 1 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="heartbuttonAndImageBox_physical">
                <div className="heartButtonBox_physical">
                  <button
                    onClick={() => favoriteHandler(prev_apartments)}
                    key={prev_apartments.id}
                    className="heartButtons_physical"
                  >
                    {favorites.some((fav) => fav.id === prev_apartments.id) ? (
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
                  style={styles.imageStyles}
                />
              </div>
              {/* --------------card details------------------- */}
              <h1 className="company_title" style={styles.companyTitle}>
                {prev_apartments.privateApartmentName}
              </h1>
              <div className="textInfo_physical">
                <p className="city_settings" style={styles.complexInfo}>
                  {car_settings_language_change(selectedLanguage).city} :{" "}
                  {prev_apartments.address.city}
                </p>
                <p className="price_settings" style={styles.complexInfo}>
                  {prev_apartments.squarePrice}{" "}
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
            onChange={(event, value) => setCorrentPage(Number(value))}
            onClick={pagiHandler}
            sx={{
              "& .MuiPaginationItem-root": {
                color: "#fff !important", // White text color for unselected items, with increased specificity
                margin: "3px !important", // Removes margin between buttons, with increased specificity
                padding: "0 !important", // Removes padding inside buttons, with increased specificity
                "&:hover": {
                  backgroundColor: "#f0f0f0 !important", // Background color on hover for unselected items, with increased specificity
                  color: "#000 !important", // Text color on hover for unselected items, with increased specificity
                },
              },
              "& .Mui-selected": {
                backgroundColor: "#fff !important", // White background color for the selected item, with increased specificity
                color: "#000 !important", // Black text color for the selected item, with increased specificity
                "&:hover": {
                  backgroundColor: "#fff !important", // Keep the background color on hover for selected item, with increased specificity
                  color: "#000 !important", // Keep the text color on hover for selected item, with increased specificity
                },
              },
              "& .MuiPaginationItem-ellipsis": {
                color: "#fff !important", // Color of the ellipsis, with increased specificity
                margin: "0 !important", // Removes margin around the ellipsis, with increased specificity
                padding: "0 !important", // Removes padding around the ellipsis, with increased specificity
              },
              ".MuiPagination-ul": {
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
    borderRadius: "20px",
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
