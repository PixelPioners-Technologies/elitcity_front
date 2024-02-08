/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import "./EachApartment.css";
import DATA from "../EachComplexDATA.json";
import { motion } from "framer-motion";
import lari from "../assets/lari-svgrepo-com.svg";
import dollar from "../assets/dollar-svgrepo-com.svg";
import star from "../assets/Star for Each Complex Page.svg";
import share from "../assets/ShareImage.svg";
import phoneImage from "../assets/🦆 icon _phone_.svg";
import headSetImage from "../assets/🦆 icon _headset_.svg";
import heartIcon from "../assets/starLogo.svg";
import heartIconEmpty from "../assets/emptyStarLogo.svg";
import arrowDown from "../assets/arrow-down.svg";
import arrowUp from "../assets/arrow-up.svg";
import { BaseURLs } from "../App";
import { useNavigate } from "react-router-dom";

// images
import binebisRaodenoba from "../assets/key.svg";
import korpusebisRaodenoba from "../assets/buildings.svg";
import parti from "../assets/Room.svg";
import cherisSimagle from "../assets/cherisSimagle.svg";
import sartulianoba from "../assets/sartulianoba.svg";
import konstruqcia from "../assets/konstruqcia.svg";
import parkingi from "../assets/parking_.svg";
import dacva from "../assets/dacvaCamera.svg";
import otaxebi from "../assets/otaxebi.svg";
import chabareba from "../assets/chabarebaTetriKarkasi.svg";
import sinatle from "../assets/sinatle.svg";
import tenianoba from "../assets/tenianoba.svg";
import kvebisObieqti from "../assets/kvebisObieqtebi.svg";
import lipti from "../assets/lipti.svg";
import shlagbaumi from "../assets/shlagbaumi.svg";
import konsierji from "../assets/konsierji.svg";
import ezo from "../assets/ezo.svg";

// ------------------
import "./Physical.css";
import axios from "axios";
import { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";
const normalizeApartmentData = (data, lang) => {
  return {
    id: data.id,
    complex: {
      id: data[`complex_${lang}`].id,
      complexName: data[`complex_${lang}`][`complex_name_${lang}`],
      internalComplexName:
        data[`complex_${lang}`].internal_complex_name.internal_complex_name,
      fullPrice: data[`complex_${lang}`].internal_complex_name.full_price,
      pricePerSqMeter:
        data[`complex_${lang}`].internal_complex_name.price_per_sq_meter,
      finishYear: data[`complex_${lang}`].internal_complex_name.finish_year,
      finishMonth: data[`complex_${lang}`].internal_complex_name.finish_month,
      isFinished: data[`complex_${lang}`].internal_complex_name.status,
      isVisible: data[`complex_${lang}`].internal_complex_name.visibiliti,
      isVipComplex: data[`complex_${lang}`].internal_complex_name.vipComplex,
      floorNumber: data[`complex_${lang}`].internal_complex_name.floor_number,
      space: data[`complex_${lang}`].internal_complex_name.space,
      numberOfApartments:
        data[`complex_${lang}`].internal_complex_name.number_of_apartments,
      numberOfFloors:
        data[`complex_${lang}`].internal_complex_name.number_of_floors,
      phoneNumber: data[`complex_${lang}`].internal_complex_name.phone_number,
      plotArea: data[`complex_${lang}`].internal_complex_name.plot_area,
      typeOfRoof: data[`complex_${lang}`][`type_of_roof_${lang}`],
      images: data[`complex_${lang}`].image_urls,
      company: {
        id: data[`complex_${lang}`].company_en.id,
        name: data[`complex_${lang}`].company_en[`name_${lang}`],
        mobile: data[`complex_${lang}`].company_en.Mobile,
        mobileHome: data[`complex_${lang}`].company_en.Mobile_Home,
        email: data[`complex_${lang}`].company_en.email,
        website: data[`complex_${lang}`].company_en.companyweb,
        facebookPage: data[`complex_${lang}`].company_en.facebook_page,
        logo: data[`complex_${lang}`].company_en.logocompany,
        backgroundImage: data[`complex_${lang}`].company_en.background_image,
        isTopCompany: data[`complex_${lang}`].company_en.topCompany,
        isVisible: data[`complex_${lang}`].company_en.visibility,
        about: data[`complex_${lang}`].company_en[`aboutcompany_${lang}`],
        address: data[`complex_${lang}`].company_en[`address_${lang}`],
      },
    },
    apartmentDetails: {
      internalApartmentName:
        data.internal_apartment_name.internal_apartment_name,
      numberOfRooms: data.internal_apartment_name.number_of_rooms,
      area: data.internal_apartment_name.area,
      fullPrice: data.internal_apartment_name.full_price,
      squarePrice: data.internal_apartment_name.square_price,
      floorNumber: data.internal_apartment_name.floor_number,
      isAvailable: data.internal_apartment_name.is_available,
      isVisible: data.internal_apartment_name.visibiliti,
    },
    apartmentAddress: {
      city: data[`appartment_address_${lang}`][`city_${lang}`],
      district: data[`appartment_address_${lang}`][`district_${lang}`],
      pharentDistrict:
        data[`appartment_address_${lang}`][`pharentDistrict_${lang}`],
      streetName: data[`appartment_address_${lang}`][`street_name_${lang}`],
      address: data[`appartment_address_${lang}`][`address_${lang}`],
      latitude: data[`appartment_address_${lang}`].latitude,
      longitude: data[`appartment_address_${lang}`].longitude,
    },
    images: data.appartment_images,
    testField: data[`test_field_${lang}`],
  };
};
export default function EachApartment({
  selectedLanguage,
  favorites,
  favoriteHandler,
  handleCallButtonClick,
}) {
  const [carouselPosition, setCarouselPosition] = useState(0);

  // const sliderImages = [
  //   { id: 1, value: img1 },
  //   { id: 2, value: img2 },
  //   { id: 3, value: img3 },
  //   { id: 4, value: img4 },
  //   { id: 5, value: img5 },
  //   { id: 6, value: img6 },
  // ];

  const [eachComplexAllAppartments, seteachComplexAllAppartments] = useState(
    []
  );
  useEffect(() => {
    console.log(
      "---------------------------------------",
      eachComplexAllAppartments
    );
  }, [eachComplexAllAppartments]);
  const [wordData, setWordData] = useState(null);
  const [val, setVal] = useState(0);
  const [clickedIndex, setClickedIndex] = useState(null);

  const [privateApartments, setPrivateApartments] = useState([]);
  console.log("privateApartmentssssssssssss", privateApartments);

  const [is_P_PriceModalOpen, setIs_P_PriceModalOpen] = useState(false);
  const [is_P_SpaceModalOpen, setIs_P_SpaceModalOpen] = useState(false);
  const [is_P_StatusModalOpen, setIs_P_StatusModalOpen] = useState(false);

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState([]);

  const [min_square_price, setMin_square_price] = useState("");
  const [max_square_price, setMax_square_price] = useState("");

  const [min_area, setMin_area] = useState("");
  const [max_area, setMax_area] = useState("");

  const [minFullPrice, setMinFullPrice] = useState("");
  const [maxFullPrice, setMaxFullPrice] = useState("");

  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCorrentPage] = useState(0);

  // const [sliderMiniImages, setSliderMiniImages] = useState([]);
  const [sliderImages, setSliderImages] = useState([]);

  const [eachPrivateApartment, setEachPrivateApartment] = useState([]);

  const location = useLocation();
  const { apartmentId } = location.state || {}; // Ensure fallback to prevent errors if state is undefined

  useEffect(() => {
    setSelectedCity("");
    setMin_area("");
    setMax_area("");
    setMinFullPrice("");
    setMaxFullPrice("");
    setMin_square_price("");
    setMax_square_price("");
    setSelectedStatuses([]);
  }, [selectedLanguage]);

  // ---------

  // console.log("hello");

  // ეს ნომრის ჩვენებისთვის
  const [showFullNumber, setShowFullNumber] = useState(false);
  const phoneNumber = eachPrivateApartment?.phoneNumber;

  const handleToggleNumberDisplay = () => {
    setShowFullNumber(true);
  };

  // Assuming this is inside a functional component
  const [showApartments, setShowApartments] = useState(false);

  const handleShowHideClick = () => {
    setShowApartments(!showApartments);
  };

  // ------------------------------------axios for fetching private apartments -----------------------------------------

  useEffect(() => {
    const fetcPrivateApartments = async () => {
      // const cityParam = `address_${selectedLanguage}__city_${selectedLanguage}__city_${selectedLanguage}__icontains`;
      // const pharentdistrictParams =  `address_${selectedLanguage}__pharentDistrict_${selectedLanguage}__pharentDistrict_${selectedLanguage}__in`;
      // const districtParams = `address_${selectedLanguage}__district_${selectedLanguage}__district_${selectedLanguage}__in`;

      // const cityParam = `city`;

      // const limit = 12; // Define the limit or make it dynamic as per your requirement
      // const offset = (currentPage - 1) * limit;

      // let queryParams = new URLSearchParams({
      //   [cityParam]: selectedCity,
      //   min_square_price: min_square_price,
      //   max_square_price: max_square_price,
      //   min_full_price: minFullPrice,
      //   max_full_price: maxFullPrice,
      //   min_area: min_area,
      //   max_area: max_area,
      //   limit: limit,
      //   offset: offset,
      // });

      // if (selectedStatuses && selectedStatuses.length > 0) {
      //   selectedStatuses.forEach((status) => {
      //     queryParams.append("status", status);
      //   });
      // }

      // const queryString = queryParams.toString();
      const requestUrl = `${BaseURLs.apartment}${selectedLanguage}/${apartmentId}`; // /?${queryString}
      const response = await axios.get(requestUrl);
      // console.log("ssssssss", response.data.results[0];
      const data = response.data;
      const normalised_Data = normalizeApartmentData(data, selectedLanguage);
      console.log("----11111111111-------------------,", normalised_Data);
      seteachComplexAllAppartments(normalised_Data);

      // Update sliderImages state with all images from the fetched data
      const sliderImagesFromData = data.appartment_images.map(
        (imgUrl, index) => ({
          id: index,
          value: imgUrl, // Directly using the URL from the JSON data
        })
      );
      setSliderImages(sliderImagesFromData); // Update the state
      setWordData(sliderImagesFromData[0] || null); // Initialize with the first image or null if empty

      // setTotalCount(response.data.total_items);
      // setCorrentPage(response.data.current_page);
    };
    fetcPrivateApartments();
  }, [
    selectedLanguage,
    selectedCity,
    min_square_price,
    max_square_price,
    minFullPrice,
    maxFullPrice,
    selectedStatuses,
    max_area,
    min_area,
    currentPage,
    apartmentId,
  ]);

  console.log("imagesss;:::::;", sliderImages);

  console.log("eachPrivateApartment DATA: ", eachPrivateApartment);

  useEffect(() => {
    console.log("aq unda iyos suratebi", privateApartments);
  }, [totalCount, selectedLanguage, apartmentId]);

  // ----------------------------------------logic for space and proce modal to open and close -----------------------------------------------

  const handle_P_SpaceButtonClick = () => {
    setIs_P_SpaceModalOpen(true);
    setIs_P_PriceModalOpen(false);
    setIs_P_StatusModalOpen(false);
  };

  const close_P_SpaceModal = () => {
    setIs_P_SpaceModalOpen(false);
  };

  const handle_P_PriceButtonClick = () => {
    setIs_P_PriceModalOpen(true);
    setIs_P_SpaceModalOpen(false);
    setIs_P_StatusModalOpen(false);
  };

  const handleClose_P_PriceModal = () => {
    setIs_P_PriceModalOpen(false);
  };

  const handle_P_StatusButtonClick = () => {
    setIs_P_StatusModalOpen(true);
    setIs_P_SpaceModalOpen(false);
    setIs_P_PriceModalOpen(false);
  };

  const handleClose_P_StatusModal = () => {
    setIs_P_StatusModalOpen(false);
  };

  // ---------------------------------------------------------------------------------------------------------------------

  const handleClick = (index) => {
    setClickedIndex(index);
    console.log(index);
    setVal(index);
    const wordSlider = sliderImages[index];
    setWordData(wordSlider);
  };

  const handleNext = () => {
    const newIndex = val < sliderImages.length - 1 ? val + 1 : 0; // Cycle to the start if at the end
    setVal(newIndex);
    const wordSlider = sliderImages[newIndex];
    setWordData(wordSlider);
    setCarouselPosition(
      (prevPosition) => (prevPosition + 1) % sliderImages.length
    );
  };

  const handlePrevious = () => {
    const newIndex = val > 0 ? val - 1 : sliderImages.length - 1; // Cycle to the end if at the start
    setVal(newIndex);
    const wordSlider = sliderImages[newIndex];
    setWordData(wordSlider);
    setCarouselPosition(
      (prevPosition) =>
        (prevPosition - 1 + sliderImages.length) % sliderImages.length
    );
  };

  // for toggle DOllar AND LARI ---==---(START)
  const [isOn, setIsOn] = useState(false);
  const toggleSwitch = () => setIsOn(!isOn);
  // -----===--------(END)

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

  //

  return (
    <div className="eachComplexBox">
      <div className="imageAndTextInfos">
        {/* Complexes photos info */}
        <div className="imageSliderBox">
          <div className="bigImageBox">
            <button className="btns" onClick={handlePrevious}>
              P
            </button>
            {wordData && ( // Check if wordData is not null/undefined before rendering
              <img
                src={wordData.value}
                alt={`Complex ${wordData.id}`}
                height="450"
                width="711"
                className={clickedIndex !== null ? "clicked" : ""}
              />
            )}
            <button className="btns" onClick={handleNext}>
              N
            </button>
          </div>
          <div className="miniImagesBox">
            {sliderImages
              .slice(carouselPosition, carouselPosition + 4)
              .map((data, i) => (
                <div className="thumbnail" key={i}>
                  <img
                    className={`${wordData.id === data.id ? "clicked" : ""} ${
                      clickedIndex === i ? "enlarge" : ""
                    }`}
                    src={data.value}
                    alt={`Complex ${data.id}`}
                    onClick={() => handleClick(i + carouselPosition)}
                    height="70"
                    width="100"
                  />
                </div>
              ))}
          </div>
        </div>
        {/* --------- */}

        {/* complex text info */}
      </div>
      {/* ---------- */}
      {console.log(
        "eachPrivateApartment",
        eachPrivateApartment.internal_complex_name?.rank
      )}

      {/* ბინების და გეგმარებების ცამოსაშლელი ბოქსი */}
      <div className="binebiDaGegmarebaFullBox">
        {/* ეს დივი არის ..კომპლექსის შესახებ'' ესეთი წარწერა რომაა და true/false-ის მეშვეობით
        რომ ვფილტრავთ, მაგალითად სართულების ოდენობა, კამერა, ოთახები და ა.შ. */}
        <div>
          <div className="shidaInformaciaIconebisBox">
            {/* სათითაო icons და ტექსტი */}
            <div className="eachDivBoxOfIcons">
              <img
                src={binebisRaodenoba}
                alt="binebisRaodenoba"
                className="stylesOfIconsOnEachComplex"
              />
              <div className="eachDivBoxOfTextOfIcons">
                <p>ბინების რაოდენობა</p>
                <p>
                  {eachPrivateApartment.numberOfApartments !== null
                    ? eachPrivateApartment.numberOfApartments
                    : "---"}
                </p>
              </div>
            </div>
            {/* ----- */}

            {/* სათითაო icons და ტექსტი */}
            <div className="eachDivBoxOfIcons">
              <img
                src={korpusebisRaodenoba}
                alt="korpusebisRaodenoba"
                className="stylesOfIconsOnEachComplex"
              />
              <div className="eachDivBoxOfTextOfIcons">
                <p>კორპუსების რაოდენობა</p>
                <p>
                  {eachPrivateApartment.numberOfBuildings !== null
                    ? eachPrivateApartment.numberOfBuildings
                    : "---"}
                </p>{" "}
              </div>
            </div>
            {/* ----- */}

            {/* სათითაო icons და ტექსტი */}
            <div className="eachDivBoxOfIcons">
              <img
                src={parti}
                alt="parti"
                className="stylesOfIconsOnEachComplex"
              />
              <div className="eachDivBoxOfTextOfIcons">
                <p>ფართი</p>
                <p>
                  {eachPrivateApartment.space !== null
                    ? eachPrivateApartment.space
                    : "---"}
                </p>
              </div>
            </div>
            {/* ----- */}

            {/* სათითაო icons და ტექსტი */}
            <div className="eachDivBoxOfIcons">
              <img
                src={cherisSimagle}
                alt="cherisSimagle"
                className="stylesOfIconsOnEachComplex"
              />
              <div className="eachDivBoxOfTextOfIcons">
                <p>ჭერის სიმაღლე</p>
                <p>
                  {eachPrivateApartment.ceilingHeightMeters !== null
                    ? eachPrivateApartment.ceilingHeightMeters
                    : "---"}
                </p>
              </div>
            </div>
            {/* ----- */}

            {/* სათითაო icons და ტექსტი */}
            <div className="eachDivBoxOfIcons">
              <img
                src={sartulianoba}
                alt="cherisSimagle"
                className="stylesOfIconsOnEachComplex"
              />
              <div className="eachDivBoxOfTextOfIcons">
                <p>სართულიანობა</p>
                <p>
                  {eachPrivateApartment.flooring !== null
                    ? eachPrivateApartment.flooring
                    : "---"}
                </p>
              </div>
            </div>
            {/* ----- */}

            {/* სათითაო icons და ტექსტი */}
            <div className="eachDivBoxOfIcons">
              <img
                src={konstruqcia}
                alt="cherisSimagle"
                className="stylesOfIconsOnEachComplex"
              />
              <div className="eachDivBoxOfTextOfIcons">
                <p>კონსტრუქცია</p>
                <p>
                  {eachPrivateApartment.construction !== null
                    ? eachPrivateApartment.construction
                    : "---"}
                </p>
              </div>
            </div>
            {/* ----- */}

            {/* სათითაო icons და ტექსტი */}
            <div className="eachDivBoxOfIcons">
              <img
                src={parkingi}
                alt="parkingi"
                className="stylesOfIconsOnEachComplex"
              />
              <div className="eachDivBoxOfTextOfIcons">
                <p>პარკინგი</p>
                <p>
                  {eachPrivateApartment.parkingQuantity !== null
                    ? eachPrivateApartment.parkingQuantity
                    : "---"}
                </p>
              </div>
            </div>
            {/* ----- */}

            {/* სათითაო icons და ტექსტი */}
            <div className="eachDivBoxOfIcons">
              <img
                src={dacva}
                alt="dacva"
                className="stylesOfIconsOnEachComplex"
              />
              <div className="eachDivBoxOfTextOfIcons">
                <p>დაცვა</p>
                <p>
                  {eachPrivateApartment.protectionType !== null
                    ? eachPrivateApartment.protectionType
                    : "---"}
                </p>
              </div>
            </div>
            {/* ----- */}

            {/* სათითაო icons და ტექსტი */}
            <div className="eachDivBoxOfIcons">
              <img
                src={otaxebi}
                alt="otaxebi"
                className="stylesOfIconsOnEachComplex"
              />
              <div className="eachDivBoxOfTextOfIcons">
                <p>ოთახები</p>
                <p>
                  {eachPrivateApartment.roomsQuantity !== null
                    ? eachPrivateApartment.roomsQuantity
                    : "---"}
                </p>
              </div>
            </div>
            {/* ----- */}

            {/* სათითაო icons და ტექსტი */}
            <div className="eachDivBoxOfIcons">
              <img
                src={chabareba}
                alt="chabareba"
                className="stylesOfIconsOnEachComplex"
              />
              <div className="eachDivBoxOfTextOfIcons">
                <p>ჩაბარება</p>
                <p>
                  {eachPrivateApartment.submissionType !== null
                    ? eachPrivateApartment.submissionType
                    : "---"}
                </p>
              </div>
            </div>
            {/* ----- */}

            {/* სათითაო icons და ტექსტი */}
            <div className="eachDivBoxOfIcons">
              <img
                src={sinatle}
                alt="sinatle"
                className="stylesOfIconsOnEachComplex"
              />
              <div className="eachDivBoxOfTextOfIcons">
                <p>სინათლე</p>
                <p>
                  {eachPrivateApartment.lightPercentage !== null
                    ? eachPrivateApartment.lightPercentage
                    : "---"}
                </p>
              </div>
            </div>
            {/* ----- */}

            {/* სათითაო icons და ტექსტი */}
            <div className="eachDivBoxOfIcons">
              <img
                src={tenianoba}
                alt="tenianoba"
                className="stylesOfIconsOnEachComplex"
              />
              <div className="eachDivBoxOfTextOfIcons">
                <p>ტენიანობა</p>
                <p>
                  {eachPrivateApartment.humidityPercentage !== null
                    ? eachPrivateApartment.humidityPercentage
                    : "---"}
                </p>
              </div>
            </div>
            {/* ----- */}

            {/* iwyeba:   inprastruqturisIconsBox */}
            <div className="inprastruqturisIconsBigBox">
              <h2>ინფრასტრუქტურა</h2>
              <div className="inprastruqturisIconsBox">
                {/* სათითაო icons და ტექსტი */}
                {eachPrivateApartment.cateringFacility && (
                  <div className="eachDivBoxOfIcons">
                    <img
                      src={kvebisObieqti}
                      alt="kvebisObieqti"
                      className="stylesOfIconsOnEachComplex"
                    />
                    <div className="eachDivBoxOfTextOfIcons">
                      <p>კვების ობიექტი</p>
                      <p>{eachPrivateApartment.cateringFacility}</p>
                    </div>
                  </div>
                )}

                {/* ----- */}

                {/* სათითაო icons და ტექსტი */}
                {eachPrivateApartment.elevatorType && (
                  <div className="eachDivBoxOfIcons">
                    <img
                      src={lipti}
                      alt="lipti"
                      className="stylesOfIconsOnEachComplex"
                    />
                    <div className="eachDivBoxOfTextOfIcons">
                      <p>ლიფტი</p>
                      <p>{eachPrivateApartment.elevatorType}</p>
                    </div>
                  </div>
                )}

                {/* ----- */}

                {/* სათითაო icons და ტექსტი */}
                {eachPrivateApartment.schlangbaum && (
                  <div className="eachDivBoxOfIcons">
                    <img
                      src={shlagbaumi}
                      alt="shlagbaumi"
                      className="stylesOfIconsOnEachComplex"
                    />
                    <div className="eachDivBoxOfTextOfIcons">
                      <p>შლანგბაუმი</p>
                      <p>{eachPrivateApartment.schlangbaum}</p>
                    </div>
                  </div>
                )}

                {/* ----- */}

                {/* სათითაო icons და ტექსტი */}
                {eachPrivateApartment.conciergeService && (
                  <div className="eachDivBoxOfIcons">
                    <img
                      src={konsierji}
                      alt="konsierji"
                      className="stylesOfIconsOnEachComplex"
                    />
                    <div className="eachDivBoxOfTextOfIcons">
                      <p>კონსიერჟი</p>
                      <p>{eachPrivateApartment.conciergeService}</p>
                    </div>
                  </div>
                )}

                {/* ----- */}

                {/* სათითაო icons და ტექსტი */}
                {eachPrivateApartment.yardDescription && (
                  <div className="eachDivBoxOfIcons">
                    <img
                      src={ezo}
                      alt="ezo"
                      className="stylesOfIconsOnEachComplex"
                    />
                    <div className="eachDivBoxOfTextOfIcons">
                      <p>ეზო</p>
                      <p>{eachPrivateApartment.yardDescription}</p>
                    </div>
                  </div>
                )}

                {/* ----- */}
              </div>
            </div>
            {/* mtavrdeba:  inprastruqturisIconsBox--------- */}
          </div>
        </div>
        {/* ----------- */}
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
