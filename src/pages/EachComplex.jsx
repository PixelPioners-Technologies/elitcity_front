/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import "./EachComplex.css";
import DATA from "../EachComplexDATA.json";
import { motion } from "framer-motion";
import dollar_black from "../assets/dollar-svgrepo-com.svg";
import lari_black from "../assets/lari-svgrepo-com.svg";
import dollar from "../assets/dollar-whitee.svg";
import lari from "../assets/lari-white.svg";

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
import ShareButton from "./Sheare";
// images
// import binebisRaodenoba from "../assets/key.svg";
// import korpusebisRaodenoba from "../assets/buildings.svg";
// import parti from "../assets/Room.svg";
// import cherisSimagle from "../assets/cherisSimagle.svg";
// import sartulianoba from "../assets/sartulianoba.svg";
// import konstruqcia from "../assets/konstruqcia.svg";
// import parkingi from "../assets/parking_.svg";
// import dacva from "../assets/dacvaCamera.svg";
// import otaxebi from "../assets/otaxebi.svg";
// import chabareba from "../assets/chabarebaTetriKarkasi.svg";
// import sinatle from "../assets/sinatle.svg";
// import tenianoba from "../assets/tenianoba.svg";

// import kvebisObieqti from "../assets/kvebisObieqtebi.svg";
// import lipti from "../assets/lipti.svg";
// import shlagbaumi from "../assets/shlagbaumi.svg";
// import konsierji from "../assets/konsierji.svg";
// import ezo from "../assets/ezo.svg";
import metro from "../assets/Metro.svg";
import aptiaqi from "../assets/Aptiaqi.svg";
import supermarket from "../assets/Supermarket.svg";
import skveri from "../assets/skveri.svg";
import forMapPhoto from "../assets/ComplexesPhotos/1zz.jpg";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import private_apartment_location_icon from "../location_icons/private_apartment2.png";

import binebisRaodenoba from "../icons/gasagebi.png";
import korpusebisRaodenoba from "../icons/korpusi.png";
import parti from "../icons/farti.png";
import cherisSimagle from "../icons/cheris_simagle.png";
import sartulianoba from "../icons/sartulianoba.png";
import konstruqcia from "../icons/konstruqcia.png";
import parkingi from "../icons/parkingi.png";
import dacva from "../icons/video_kamera.png";
import otaxebi from "../icons/otaxebi.png";
import chabareba from "../icons/chabareba.png";
import sinatle from "../icons/sinatle.png";
import tenianoba from "../icons/tenianoba.png";
import kvebisObieqti from "../icons/kvebis_obieqti.png";
import lipti from "../icons/lifti.png";
import shlagbaumi from "../icons/shlagbaumi.png";
import konsierji from "../icons/konsierji.png";
import ezo from "../icons/ezo.png";

// ------------------
import "./Physical.css";
import axios from "axios";
import { useState, useEffect } from "react";
import P_PriceModal from "../modals for private page/P_PriceModal";
import P_SpaceModal from "../modals for private page/P_SpaceModal";
import P_StatusModal from "../modals for private page/P_StatusModa";
import button_icon from "../icons/Vector.svg";

import { useLocation } from "react-router-dom";

import mew_dolar_white from "../icons/new_dolar_white.png";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";



// --------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------
// ---------  compleqsis misamartebi axali struqturidanaa amosagebi da ara aoartamentis addresidan  -------------------
// --------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------

function normalizeData(item, lang) {
  return {
    id: item.id,
    construction: item[`construction_type_${lang}`],
    description: item[`description_${lang}`],
    protectionType: item[`protection_type_${lang}`],
    submissionType: item[`submission_type_${lang}`],
    typeOfRoof: item[`type_of_roof_${lang}`],

    complexAddress: {
      city: item[`complex_address_${lang}`][`city_${lang}`],
      parentDistrict:
        item[`complex_address_${lang}`][`pharentDistrict_${lang}`],
      district: item[`complex_address_${lang}`][`district_${lang}`],
      streetName: item[`complex_address_${lang}`][`street_name_${lang}`],
      address: item[`complex_address_${lang}`][`address_${lang}`],
      longitude: item[`complex_address_${lang}`].longitude,
      latitude: item[`complex_address_${lang}`].latitude,
    },

    complexName: item[`complex_name_${lang}`],
    internalComplexName: item.internal_complex_name.internal_complex_name,
    fullPrice: item.internal_complex_name.full_price,
    pricePerSqMeter: item.internal_complex_name.price_per_sq_meter,
    finishYear: item.internal_complex_name.finish_year,
    finishMonth: item.internal_complex_name.finish_month,
    status: item.internal_complex_name.status,
    visibility: item.internal_complex_name.visibiliti,
    vipComplex: item.internal_complex_name.vipComplex,
    floorNumber: item.internal_complex_name.floor_number,
    space: item.internal_complex_name.space,
    numberOfApartments: item.internal_complex_name.number_of_apartments,
    numberOfFloors: item.internal_complex_name.number_of_floors,
    phoneNumber: item.internal_complex_name.phone_number,
    numberOfBuildings: item.internal_complex_name.number_of_buildings,
    flooring: item.internal_complex_name.flooring,
    parkingQuantity: item.internal_complex_name.parking_quantity,
    roomsQuantity: item.internal_complex_name.rooms_quantity,
    lightPercentage: item.internal_complex_name.light_percentage,
    humidityPercentage: item.internal_complex_name.humidity_percentage,
    areaSquareness: item.internal_complex_name.area_squareness,
    ceilingHeightMeters: item.internal_complex_name.ceiling_height_meters,
    cateringFacility: item.internal_complex_name.catering_facility,
    elevatorType: item.internal_complex_name.elevator_type,
    schlangbaum: item.internal_complex_name.schlangbaum,
    conciergeService: item.internal_complex_name.concierge_service,
    yardDescription: item.internal_complex_name.yard_description,
    plotArea: item.internal_complex_name.plot_area,
    rank: item.internal_complex_name.rank,

    metro: item.internal_complex_name.metro,
    pharmacy: item.internal_complex_name.pharmacy,
    supermarket: item.internal_complex_name.supermarket,
    square: item.internal_complex_name.square,

    // Add other fields from internal_complex_name as needed
    complexImages: item.complex_images,
    apartments: item[`appartment_name_${lang}`].map((apartment) => ({
      id: apartment.id,
      apartmentName: apartment[`appartment_name_${lang}`],
      testField: apartment[`test_field_${lang}`],
      internalApartmentName: apartment.internal_apartment_name,

      images: apartment.appartment_images,
      address: {
        city: apartment[`appartment_address_${lang}`][`city_${lang}`], // Correctly dynamic
        parentDistrict:
          apartment[`appartment_address_${lang}`][`pharentDistrict_${lang}`], // Corrected field name dynamically
        district: apartment[`appartment_address_${lang}`][`district_${lang}`], // Correctly dynamic
        streetName:
          apartment[`appartment_address_${lang}`][`street_name_${lang}`], // Correctly dynamic
        address: apartment[`appartment_address_${lang}`][`address_${lang}`], // Correctly dynamic
        latitude: apartment[`appartment_address_${lang}`].latitude,
        longitude: apartment[`appartment_address_${lang}`].longitude,
      },
    })),
    company: {
      id: item[`company_${lang}`].id,
      name: item[`company_${lang}`][`name_${lang}`], // Correctly dynamic
      mobile: item[`company_${lang}`].Mobile,
      mobileHome: item[`company_${lang}`].Mobile_Home,
      email: item[`company_${lang}`].email,
      website: item[`company_${lang}`].companyweb,
      facebookPage: item[`company_${lang}`].facebook_page,
      logo: item[`company_${lang}`].logocompany,
      backgroundImage: item[`company_${lang}`].background_image,
      topCompany: item[`company_${lang}`].topCompany,
      visibility: item[`company_${lang}`].visibility,
      address: item[`company_${lang}`][`address_${lang}`], // Correctly dynamic
      aboutCompany: item[`company_${lang}`][`aboutcompany_${lang}`], // Correctly dynamic
    },
    // Add other top-level fields like typeOfRoof, constructionType, etc., as needed, dynamically using the lang parameter
  };
}

export default function EachComplex({
  selectedLanguage,
  favorites,
  favoriteHandler,
  handleCallButtonClick,
  getCorrencyRate,
  HandleStateChange,
  currenceChangeState,
  isOn,
  toggleSwitch,
  favoriteApartment,
  favorite_apartment_handler,
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
    {}
  );
  const [wordData, setWordData] = useState(null);
  const [val, setVal] = useState(0);
  const [clickedIndex, setClickedIndex] = useState(null);

  const [privateApartments, setPrivateApartments] = useState([]);

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
  // console.log("sliderImages", sliderImages);

  const [eachPrivateApartment, setEachPrivateApartment] = useState([]);

  const [only_apartments, setOnly_apartments] = useState([]);

  const location = useLocation();
  const { complexId } = location.state || {}; // Ensure fallback to prevent errors if state is undefined

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

  const [allComplexImages, setAllComplexImages] = useState([]);

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
      if (selectedStatuses && selectedStatuses.length > 0) {
        selectedStatuses.forEach((status) => {
          queryParams.append("status", status);
        });
      }

      const requestUrl = `${BaseURLs.complex_and_apartments}${selectedLanguage}/${complexId}`; // /?${queryString}
      const response = await axios.get(requestUrl);
      const data = response.data;
      const normalised_Data = normalizeData(data, selectedLanguage);

      setAllComplexImages(data.complexImages);
      setEachPrivateApartment(normalised_Data);
      setPrivateApartments(normalised_Data);
      setOnly_apartments(normalised_Data.apartments);
      seteachComplexAllAppartments(normalised_Data);

      // const imagesWithIds = data.complex_images.map((original, thumbnail) => ({
      //   original: index,
      //   value: url,

      // }));
      console.log("images ", data.complex_images)
      const imagesWithIds = data.complex_images.map((image) => ({
        original: image,// Use the actual property name for the full-size image URL
        thumbnail: image, // Use the actual property name for the thumbnail image URL
      }));

      setSliderImages(imagesWithIds);
      setWordData(imagesWithIds[0] || null);
    };
    fetcPrivateApartments();
  }, [
    selectedLanguage,
    // selectedCity,
    // min_square_price,
    // max_square_price,
    // minFullPrice,
    // maxFullPrice,
    // selectedStatuses,
    // max_area,
    // min_area,
    // currentPage,
    // complexId,
    // sliderImages,
    // wordData,
    // allComplexImages,
  ]);

  // console.log("aq unda iyos imigebi ", eachComplexAllAppartments);
  // useEffect(() => {
  //   console.log("apartments ", privateApartments);
  // }, [privateApartments]);

  // ---------------------------------------------------------------------------------------------------------------------

  const handleClick = (index) => {
    setClickedIndex(index);
    setVal(index);
    const wordSlider = sliderImages[index];
    setWordData(wordSlider);
  };
  const handleNext = () => {
    const newIndex = val < sliderImages.length - 1 ? val + 1 : 0; // Cycle to the start if at the end
    setVal(newIndex);
    setWordData(sliderImages[newIndex]);
    if (carouselPosition > 0) {
      setCarouselPosition(carouselPosition - 1);
    }
  };

  const handlePrevious = () => {
    const newIndex = val > 0 ? val - 1 : sliderImages.length - 1; // Cycle to the end if at the start
    setVal(newIndex);
    setWordData(sliderImages[newIndex]);
    if (carouselPosition < sliderImages.length - 4) {
      setCarouselPosition(carouselPosition + 1);
    }
  };
  // for toggle DOllar AND LARI ---==---(START)
  // const [isOn, setIsOn] = useState(false);
  // const toggleSwitch = () => setIsOn(!isOn);
  // // -----===--------(END)

  // --------------------------function for selecting status for filtration -----------------------------------------------

  // const handleStatusChange = (e) => {
  //   setStatus(e.target.value);
  // };
  const handleStatusChange = (e, value) => {
    setSelectedStatuses((prevSelectedStatuses) => {
      const newSelectedStatuses = e.target.checked
        ? [...prevSelectedStatuses, value]
        : prevSelectedStatuses.filter((status) => status !== value);

      // console.log("Updated Selected Statuses:", newSelectedStatuses); // Log the new state
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
      number_of_apartments: "Number of appartments",
      number_of_buildings: "Number of buildings",
      ceiling_height_meters: "Ceiling Height Meters",
      flooring: "Flooring",
      construction: "Construction",
      parking: "Parking",
      protection: "Protection",
      rooms: "Rooms",
      submission: "Submission",
      light: "Light",
      humidity: "Humidity",
      catering_facility: "Catering Facility",
      elevator: "Elevator",
      schlangbaum: "Schlangbaum",
      concierge: "Concierge",
      yard: "Yard",
      description: "Description",
      spaces: "Spaces",
      buildings: "Buildings",
      showNumber: "Show Number",
      callRequest: "Call Request",
      allAppartments: "Affordable apartment",
      appartmentsAndPlanning: "Appartments and Planning",
      aboutComplex: "About Complex",
      nearObjects: "Near Objects",
      metro: "Metro",
      pharmacy: "Pharmacy",
      supermarket: "Supermarket",
      square: "Square",
      infrastructure: "Infrastructure",
      seen: "Seen",
      pricePerM: "Price from per m²",

      m2: "m²",
      sartuli: "Floor",
    };

    switch (lang) {
      case "en":
        languageInfo.m2 = "m²";
        languageInfo.sartuli = "Floor";

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
        languageInfo.number_of_apartments = "Number of appartments";
        languageInfo.number_of_buildings = "Number of buildings";
        languageInfo.ceiling_height_meters = "Ceiling Height Meters";
        languageInfo.flooring = "Flooring";
        languageInfo.construction = "Construction";
        languageInfo.parking = "Parking";
        languageInfo.protection = "Protection";
        languageInfo.rooms = "Rooms";
        languageInfo.submission = "Submission";
        languageInfo.light = "Light";
        languageInfo.humidity = "Humidity";
        languageInfo.catering_facility = "Catering Facility";
        languageInfo.elevator = "Elevator";
        languageInfo.schlangbaum = "Schlangbaum";
        languageInfo.concierge = "Concierge";
        languageInfo.yard = "Yard";
        languageInfo.description = "Description";
        languageInfo.spaces = "Spaces";
        languageInfo.buildings = "Buildings";
        languageInfo.showNumber = "Show Number";
        languageInfo.callRequest = "Call Request";
        languageInfo.allAppartments = "Affordable apartment";
        languageInfo.appartmentsAndPlanning = "Apartments and Planning";
        languageInfo.aboutComplex = "About Complex";
        languageInfo.nearObjects = "Near Objects";
        languageInfo.metro = "Metro";
        languageInfo.pharmacy = "Pharmacy";
        languageInfo.supermarket = "Supermarket";
        languageInfo.square = "Square";
        languageInfo.infrastructure = "Infrastructure";
        languageInfo.seen = "Seen";
        languageInfo.pricePerM = "Price from per m²";
        languageInfo.m2 = "m²";
        languageInfo.sartuli = "Floor";

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
        languageInfo.number_of_apartments = "ბინების რა-ობა";
        languageInfo.number_of_buildings = "კორპუსების რაოდენობა";
        languageInfo.ceiling_height_meters = "ჭერის სიმაღლე";
        languageInfo.flooring = "სართულიანობა";
        languageInfo.construction = "კონსტრუქცია";
        languageInfo.parking = "პარკინგი";
        languageInfo.protection = "დაცვა";
        languageInfo.rooms = "ოთახები";
        languageInfo.submission = "ჩაბარება";
        languageInfo.light = "სინათლე";
        languageInfo.humidity = "ტენიანობა";
        languageInfo.catering_facility = "საკვები ობიექტები";
        languageInfo.elevator = "ლიფტი";
        languageInfo.schlangbaum = "შლანგბაუმი";
        languageInfo.concierge = "კონსიერჟი";
        languageInfo.yard = "ეზო";
        languageInfo.description = "აღწერა";
        languageInfo.spaces = "ფართები";
        languageInfo.buildings = "კორპუსები";
        languageInfo.showNumber = "ნომრის ჩვენება";
        languageInfo.callRequest = "ზარის მოთხოვნა";
        languageInfo.allAppartments = "ხელმისაწვდომი ბინა";
        languageInfo.appartmentsAndPlanning = "ბინები და გეგმარება";
        languageInfo.aboutComplex = "კომპლექსის შესახებ";
        languageInfo.nearObjects = "ახლო მდებარე ობიექტები";
        languageInfo.metro = "მეტრო";
        languageInfo.pharmacy = "აფთიაქი";
        languageInfo.supermarket = "სუპერმარკეტი";
        languageInfo.square = "სკვერი";
        languageInfo.infrastructure = "ინფრასტრუქტურა";
        languageInfo.seen = "ნახვები";
        languageInfo.pricePerM = "m²-ის ფასი";
        languageInfo.priceTo = "-დან";
        languageInfo.m2 = "მ²";
        languageInfo.sartuli = "სართული";

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
        languageInfo.number_of_apartments = "количество квартир";
        languageInfo.number_of_buildings = "Количество зданий";
        languageInfo.ceiling_height_meters = "Высота потолка в метрах";
        languageInfo.flooring = "Пол";
        languageInfo.construction = "Конструкция";
        languageInfo.parking = "Парковка";
        languageInfo.protection = "Охрана";
        languageInfo.rooms = "Комнаты";
        languageInfo.submission = "Представление";
        languageInfo.light = "Свет";
        languageInfo.humidity = "Влажность";
        languageInfo.catering_facility = "Питание";
        languageInfo.elevator = "Лифт";
        languageInfo.schlangbaum = "Шлагбаум";
        languageInfo.concierge = "Консьерж";
        languageInfo.yard = "Двор";
        languageInfo.description = "Описание";
        languageInfo.spaces = "Пространства";
        languageInfo.buildings = "Здания";
        languageInfo.showNumber = "Показать номер";
        languageInfo.callRequest = "Запросить звонок";
        languageInfo.allAppartments = "Доступная квартира";
        languageInfo.appartmentsAndPlanning = "Квартиры и планировка";
        languageInfo.aboutComplex = "О комплексе";
        languageInfo.nearObjects = "Близкие объекты";
        languageInfo.metro = "Метро";
        languageInfo.pharmacy = "Аптека";
        languageInfo.supermarket = "Супермаркет";
        languageInfo.square = "Площадь";
        languageInfo.infrastructure = "Инфраструктура";
        languageInfo.seen = "Просмотрено";
        languageInfo.pricePerM = "Цена за м²";
        languageInfo.m2 = " м²";
        languageInfo.sartuli = "Пол";

        break;
    }
    return languageInfo;
  };

  const handle_room_language_change = (lang) => {
    var languageInfo = {
      studio: "Studio",
      one_room: "One room",
      two_rom: "Two rooms",
      three_room: "Three rooms",
      four_room: "Four rooms",
      fiveplus_room: "Five + rooms",
    };

    switch (lang) {
      case "en":
        languageInfo.studio = "Studio";
        languageInfo.one_room = "One room";
        languageInfo.two_rom = "Two rooms";
        languageInfo.three_room = "Three rooms";
        languageInfo.four_room = "Four rooms";
        languageInfo.fiveplus_room = "Five + rooms";

        break;

      case "ka":
        languageInfo.studio = "სტუდიო";
        languageInfo.one_room = "ერთოთახიანი";
        languageInfo.two_rom = "ოროთახიანი";
        languageInfo.three_room = "სამოთახიანი";
        languageInfo.four_room = "ოთხოთახიანი";
        languageInfo.fiveplus_room = "ხუთი და მეტი ოთახით";

        break;

      case "ru":
        languageInfo.studio = "Студия";
        languageInfo.one_room = "Одна комната";
        languageInfo.two_rom = "Две комнаты";
        languageInfo.three_room = "Три комнаты";
        languageInfo.four_room = "Четыре комнаты";
        languageInfo.fiveplus_room = "Пять + комнаты";
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

  // Assuming `complex` is an object representing each house
  // const handleAppartmentClick = (complexId) => {
  //   navigate(`/eachComplex/${complexId},`);
  // };

  const truncateText = (text, limit) => {
    if (!text) return ""; // Return an empty string if text is null or undefined
    return text.length > limit ? `${text.substring(0, limit)}...` : text;
  };

  // ---------------------------------------------------function for filtering room numbers ------------------------------------------

  const [studios, setStudios] = useState([]);
  const [oneBedrooms, setOneBedrooms] = useState([]);
  const [twoBedrooms, setTwoBedrooms] = useState([]);
  const [threeBedrooms, setThreeBedrooms] = useState([]);
  const [fourBedrooms, setFourBedrooms] = useState([]);
  const [fivePlusBedrooms, setFivePlusBedrooms] = useState([]);

  const [show_studio, setShow_studio] = useState(false);
  const [show_one_bedroom, setShow_one_bedroom] = useState(false);
  const [show_two_bedrom, setShow_two_bedrom] = useState(false);
  const [show_three_bedrom, setShow_three_bedrom] = useState(false);
  const [show_four_bedrom, setShow_four_bedrom] = useState(false);
  const [show_fivePlus_bedrom, setShow_fivePlus_bedrom] = useState(false);

  const handle_show_studio = () => {
    setShow_studio(!show_studio);
  };

  const handle_show_one_bedrom = () => {
    setShow_one_bedroom(!show_one_bedroom);
  };

  const handle_show_two_bedrom = () => {
    setShow_two_bedrom(!show_two_bedrom);
  };

  const handle_show_three_badroom = () => {
    setShow_three_bedrom(!show_three_bedrom);
  };

  const handle_show_four_bedroom = () => {
    setShow_four_bedrom(!show_four_bedrom);
  };

  const handle_show_fivePlus_bedroom = () => {
    setShow_fivePlus_bedrom(!show_fivePlus_bedrom);
  };

  useEffect(() => {
    // Filter apartments data whenever it changes
    const studiosFiltered = only_apartments.filter(
      (apartment) =>
        apartment.internalApartmentName.number_of_rooms === "studio"
    );
    const oneBedroomsFiltered = only_apartments.filter(
      (apartment) => apartment.internalApartmentName.number_of_rooms === "1"
    );
    const twoBedroomsFiltered = only_apartments.filter(
      (apartment) => apartment.internalApartmentName.number_of_rooms === "2"
    );
    const threeBedroomsFiltered = only_apartments.filter(
      (apartment) => apartment.internalApartmentName.number_of_rooms === "3"
    );
    const fourBedroomsFiltered = only_apartments.filter(
      (apartment) => apartment.internalApartmentName.number_of_rooms === "4"
    );
    const fivePlusBedroomsFiltered = only_apartments.filter(
      (apartment) =>
        parseInt(apartment.internalApartmentName.number_of_rooms) >= 5
    );

    // Update states with the filtered data
    setStudios(studiosFiltered);
    setOneBedrooms(oneBedroomsFiltered);
    setTwoBedrooms(twoBedroomsFiltered);
    setThreeBedrooms(threeBedroomsFiltered);
    setFourBedrooms(fourBedroomsFiltered);
    setFivePlusBedrooms(fivePlusBedroomsFiltered);

    console.log();
  }, [only_apartments]);

  // useEffect(() => {
  //   console.log("5+", fivePlusBedrooms)
  //   console.log("4", fourBedrooms)
  //   console.log("3", threeBedrooms)
  //   console.log("2", twoBedrooms)
  //   console.log("1", oneBedrooms)
  //   console.log("studio", studios)

  // }, [studios, fivePlusBedrooms, fourBedrooms, threeBedrooms, twoBedrooms, oneBedrooms, studios])

  // const navigate = useNavigate();
  const handleAppartmentClick = (apartmentId) => {
    navigate(`/eachapartment/${apartmentId}`, { state: { apartmentId } });
  };

  const mapcenter = {
    lat: eachComplexAllAppartments?.complexAddress?.latitude || 41.7151,
    lng: eachComplexAllAppartments?.complexAddress?.longitude || 44.8271,
  };

  const navigate = useNavigate();

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDxK-BSMfOM2fRtkTUMpRn5arTyUTR03r0",
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  const scalesize = new window.google.maps.Size(40, 40);

  return (
    <div className="eachComplexBox3">
      <div className="imageAndTextInfos3">
        {/* Complexes photos info */}
        <div className="image_galery_container"  >
          {sliderImages.length > 0 && <ImageGallery
            items={sliderImages}
            slideInterval={3000}
            thumbnailPosition="left"
            useBrowserFullscreen={true}
            showFullscreenButton={false}
          />}
        </div>

        {/* --------- */}

        {/* complex text info */}
        {/* აქ DATA.MAP დროებით მაქ დატოვებული როგორც კი ბექი მოგვარდება */}
        {/* {DATA.map((complex, index) => ( */}
        <div className="complexTextsBox2">
          <div className="seenIdFavouriteAndOthersBox2">
            <div className="seenAndIdBox">
              <p style={{ color: "#838282" }}>ID: {eachPrivateApartment?.id}</p>
            </div>

            <div className="favouriteDollarAndShareBox">
              {/* Star favourite box */}
              <button
                key={eachPrivateApartment.id}
                className="heartButtons"
                onClick={() => favoriteHandler(eachPrivateApartment)}
              >
                {favorites.some((fav) => fav.id === eachPrivateApartment.id) ? (
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

              {/* ----Dollar and Lari Toggle button */}
              {/* ----Dollar and Lari Toggle button */}
              <div
                className="valutis_cvlilebis_konteineri"
                data-ison={isOn}
                onClick={() => {
                  toggleSwitch();
                  HandleStateChange();
                }}
              >
                <div className={`same_stiles_corrency  ${isOn ? `chartuli` : "centrshi"}   `}   >
                  <img src={isOn ? dollar_black : dollar}
                    alt="dollar signe"
                    className="valutis_nishnebi" />
                </div>

                <div className={`same_stiles_corrency  ${!isOn ? `chartuli` : "centrshi"}   `}   >
                  <img src={!isOn ? lari_black : lari}
                    alt="dollar signe"
                    className="valutis_nishnebi" />
                </div>
              </div>
              {/* ---------------- */}
              {/* Share Button */}
              <ShareButton selectedLanguage={selectedLanguage} />

              {/* marge to main  */}
            </div>
          </div>
          {/* აქ არის პირველი ზედა ტექსტები, არქი, მისამართი, ქუჩა, მ2-ის ფასი */}
          <div className="companyAdressPriceTextBox">
            <p
              className="each_complex_title"
              style={{ color: "#ccc", fontSize: "20px" }}
            >
              {" "}
              {eachPrivateApartment?.complexName}
            </p>
            <p style={{ color: "#838289" }} className="each_complex_address">
              {eachPrivateApartment &&
                eachPrivateApartment.apartments &&
                eachPrivateApartment.apartments.length > 0 &&
                eachPrivateApartment.apartments[0]?.address.city}
            </p>
            <p
              style={{ color: "#838289" }}
              className="each_complex_price_square"
            >
              {eachPrivateApartment &&
                eachPrivateApartment.apartments &&
                eachPrivateApartment.apartments.length > 0 &&
                `${eachPrivateApartment.apartments[0]?.address.streetName}, ${eachPrivateApartment.apartments[0]?.address.city}`}
            </p>

            <p style={{ color: "#838282" }}> {eachPrivateApartment?.adress}</p>
            <p className="each_complex_price_square">
              {handle_P_StatusButtonLanguageChange(selectedLanguage).pricePerM}{" "}
              {currenceChangeState
                ?
                new Intl.NumberFormat('en-US', {
                  style: 'decimal',
                  useGrouping: true,
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                }).format(Number(eachPrivateApartment.pricePerSqMeter) * getCorrencyRate).replace(/,/g, ' ')
                : new Intl.NumberFormat('en-US', {
                  style: 'decimal',
                  useGrouping: true,
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                }).format(Number(eachPrivateApartment.pricePerSqMeter)).replace(/,/g, ' ')} {" "}
              {isOn ? "  $  " : "  ₾  "}
              {handle_P_StatusButtonLanguageChange(selectedLanguage).priceTo}
            </p>
          </div>

          <div className="chabarebaPartebiKorpusebi">
            {/* ქვედა, მეორე ტექსტია.. ჩაბარება, Fართები... სართულიანობა */}
            <div className="eachTextOnListTexts">
              <div className="first_and_second_cont">
                <p style={{ color: "#C2BFBF" }} className="chabareba">
                  {
                    handle_P_StatusButtonLanguageChange(selectedLanguage)
                      .submission
                  }
                </p>
                <p style={{ color: "#FFFFFF" }}>
                  {eachPrivateApartment?.finishYear}
                </p>
              </div>

              <div className="first_and_second_cont">
                <p style={{ color: "#C2BFBF" }} className="chabareba">
                  {handle_P_StatusButtonLanguageChange(selectedLanguage).spaces}
                </p>
                <p style={{ color: "#FFFFFF", width: "100px" }}>
                  {eachPrivateApartment?.numberOfApartments}{" "}
                  {handle_P_StatusButtonLanguageChange(selectedLanguage).m2}{" "}
                </p>
              </div>

              <div className="first_and_second_cont">
                <p style={{ color: "#C2BFBF" }} className="chabareba">
                  {
                    handle_P_StatusButtonLanguageChange(selectedLanguage)
                      .number_of_apartments
                  }
                </p>
                <p style={{ color: "#FFFFFF" }}>
                  {/* აქ, ბაზაში ნull არის მითითებული და ჯერ ჩავაკომენტარე რო ფრონტისთვის მეჩვენებინა */}
                  {/* {eachPrivateApartment?.numberOfBuildings} */} 30{" "}
                </p>
              </div>

              <div className="first_and_second_cont">
                <p style={{ color: "#C2BFBF" }} className="chabareba">
                  {
                    handle_P_StatusButtonLanguageChange(selectedLanguage)
                      .buildings
                  }
                </p>
                <p style={{ color: "#FFFFFF", width: "100px" }}>
                  {eachPrivateApartment?.numberOfBuildings}
                </p>
              </div>

              <div className="first_and_second_cont">
                <p style={{ color: "#C2BFBF" }} className="chabareba">
                  {
                    handle_P_StatusButtonLanguageChange(selectedLanguage)
                      .flooring
                  }
                </p>
                <p style={{ color: "#FFFFFF" }}>
                  {eachPrivateApartment?.numberOfFloors}
                </p>
              </div>
            </div>
          </div>
          {/* დარეკვისა და ნომრის ჩვენების სექცია */}
          <div className="numberAndCallRequestBox">
            <div className="numberBox">
              <img src={phoneImage} style={{ width: "40px" }} alt="phone" />
              <p style={{ color: "#FFFFFF" }}>
                {phoneNumber && showFullNumber
                  ? phoneNumber
                  : phoneNumber?.slice(0, -2).padEnd(phoneNumber?.length, "*")}
              </p>
              <button
                onClick={handleToggleNumberDisplay}
                className="numberSHowButton"
              >
                {
                  handle_P_StatusButtonLanguageChange(selectedLanguage)
                    .showNumber
                }
              </button>
            </div>
            <div className="callRequestBox">
              <img src={headSetImage} style={{ width: "40px" }} alt="headset" />
              <button
                onClick={handleCallButtonClick}
                className="numberSHowButton"
              >
                {
                  handle_P_StatusButtonLanguageChange(selectedLanguage)
                    .callRequest
                }
              </button>
            </div>
          </div>
        </div>
        {/* ))} */}
      </div>
      <div className="binebiDaGegmarebaFullBox">
        {/* ბინები და ყველა აპარტამენტის ტექსტი და ბათონი */}
        <div className="firstBoxOfBinebi">
          <p style={{ color: "#FFFFFF" }}>
            {
              handle_P_StatusButtonLanguageChange(selectedLanguage)
                .appartmentsAndPlanning
            }
          </p>
          <button className="numberSHowButton" onClick={handleShowHideClick}>
            {
              handle_P_StatusButtonLanguageChange(selectedLanguage)
                .allAppartments
            }
            {showApartments ? (
              <img src={arrowUp} style={{ width: "20px", marginLeft: "5px" }} />
            ) : (
              <img src={arrowDown} style={{ width: "30px" }} />
            )}
          </button>
        </div>

        {showApartments && studios.length > 0 && (
          <div className="allCards_physical_aa ">
            <div className="firstBoxOfBinebi">
              <p style={{ color: "#FFFFFF" }}>
                {handle_room_language_change(selectedLanguage).studio}
              </p>
              <button className="numberSHowButton" onClick={handle_show_studio}>
                {show_studio ? (
                  <img
                    src={arrowUp}
                    style={{ width: "20px", marginLeft: "5px" }}
                  />
                ) : (
                  <img src={arrowDown} style={{ width: "30px" }} />
                )}
              </button>
            </div>

            <div className="show_studio_apartment">
              {show_studio &&
                studios.map((prev_apartments, index) => (
                  <div className="card_physical_aa" key={index}>
                    <div
                    // key={currentPage}
                    // initial={{ x: -50, opacity: 0 }}
                    // transition={{ duration: 1 }}
                    // whileInView={{ x: 0, opacity: 1 }}
                    // viewport={{ once: true }}
                    >
                      <div className="heartbuttonAndImageBox_physical">
                        <div className="heartButtonBox_physical">
                          <button
                            onClick={() =>
                              favorite_apartment_handler(prev_apartments)
                            }
                            key={prev_apartments.id}
                            className="heartButtons_physical"
                          >
                            {favoriteApartment.some(
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
                          onClick={() =>
                            handleAppartmentClick(prev_apartments.id)
                          }
                          src={prev_apartments?.images[0]}
                          alt={prev_apartments.name}
                          style={styles.imageStyles}
                        />
                      </div>
                      {/* --------------card details------------------- */}
                      <div className="title_and_fullprice">
                        <h1
                          className="company_title"
                          style={styles.companyTitle}
                        >
                          {prev_apartments?.apartmentName}
                        </h1>
                        <div className="dolar_fullprice">
                          <h1
                            className="company_title"
                            style={styles.companyTitle}
                          >
                            {currenceChangeState
                              ?
                              new Intl.NumberFormat('en-US', {
                                style: 'decimal',
                                useGrouping: true,
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0
                              }).format(Number(prev_apartments?.internalApartmentName?.full_price) * getCorrencyRate).replace(/,/g, ' ')

                              : new Intl.NumberFormat('en-US', {
                                style: 'decimal',
                                useGrouping: true,
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0
                              }).format(Number(prev_apartments?.internalApartmentName?.full_price)).replace(/,/g, ' ')} {" "}
                            {isOn ? "  $  " : "  ₾  "}
                          </h1>
                        </div>
                      </div>

                      <div
                        className="textInfo_physical"
                        onClick={() =>
                          handleAppartmentClick(prev_apartments.id)
                        }
                      >
                        <p className="city_settings  ">
                          {prev_apartments.address.city} {" , "}
                          {prev_apartments.address.city}{" "}
                        </p>
                        <p
                          className="price_settings"
                          style={styles.complexInfo}
                        >
                          {" "}
                          {
                            prev_apartments?.internalApartmentName?.square_price
                          }{" "}
                          {
                            handle_P_StatusButtonLanguageChange(
                              selectedLanguage
                            ).m2
                          }{" "}
                        </p>
                        <p
                          className="price_settings"
                          style={styles.complexInfo}
                        >
                          {" "}
                          {
                            handle_P_StatusButtonLanguageChange(
                              selectedLanguage
                            ).sartuli
                          }{" "}
                          {"  : "}{" "}
                          {prev_apartments.internalApartmentName?.floor_number}
                        </p>
                        <div className="rooms_and_rank">
                          <p
                            className="price_settings"
                            style={styles.complexInfo}
                          >
                            {" "}
                            {
                              handle_P_StatusButtonLanguageChange(
                                selectedLanguage
                              ).rooms
                            }{" "}
                            {"  : "}{" "}
                            {
                              prev_apartments.internalApartmentName
                                ?.number_of_rooms
                            }
                          </p>
                          <p
                            className="price_settings"
                            style={styles.complexInfo}
                          >
                            {prev_apartments.internalApartmentName?.rank}
                          </p>
                        </div>
                        <p className="apartment_id_1">
                          {" "}
                          id : {prev_apartments?.id}{" "}
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
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* --------------------------------------------------------------------------------------------------- */}

        {showApartments && oneBedrooms.length > 0 && (
          <div className="allCards_physical_aa ">
            <div className="firstBoxOfBinebi">
              <p style={{ color: "#FFFFFF" }}>
                {handle_room_language_change(selectedLanguage).one_room}{" "}
              </p>
              <button
                className="numberSHowButton"
                onClick={handle_show_one_bedrom}
              >
                {show_one_bedroom ? (
                  <img
                    src={arrowUp}
                    style={{ width: "20px", marginLeft: "5px" }}
                  />
                ) : (
                  <img src={arrowDown} style={{ width: "30px" }} />
                )}
              </button>
            </div>

            <div className="show_studio_apartment">
              {show_one_bedroom &&
                oneBedrooms.map((prev_apartments, index) => (
                  <div className="card_physical_aa" key={index}>
                    <div
                    // key={currentPage}
                    // initial={{ x: -50, opacity: 0 }}
                    // transition={{ duration: 1 }}
                    // whileInView={{ x: 0, opacity: 1 }}
                    // viewport={{ once: true }}
                    >
                      <div className="heartbuttonAndImageBox_physical">
                        <div className="heartButtonBox_physical">
                          <button
                            onClick={() =>
                              favorite_apartment_handler(prev_apartments)
                            }
                            key={prev_apartments.id}
                            className="heartButtons_physical"
                          >
                            {favoriteApartment.some(
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
                          onClick={() =>
                            handleAppartmentClick(prev_apartments.id)
                          }
                          src={prev_apartments?.images[0]}
                          alt={prev_apartments.name}
                          style={styles.imageStyles}
                        />
                      </div>
                      {/* --------------card details------------------- */}
                      <div className="title_and_fullprice">
                        <h1
                          className="company_title"
                          style={styles.companyTitle}
                        >
                          {prev_apartments?.apartmentName}
                        </h1>
                        <div className="dolar_fullprice">
                          <h1
                            className="company_title"
                            style={styles.companyTitle}
                          >
                            {currenceChangeState
                              ?
                              new Intl.NumberFormat('en-US', {
                                style: 'decimal',
                                useGrouping: true,
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0
                              }).format(Number(prev_apartments?.internalApartmentName?.full_price) * getCorrencyRate).replace(/,/g, ' ')

                              : new Intl.NumberFormat('en-US', {
                                style: 'decimal',
                                useGrouping: true,
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0
                              }).format(Number(prev_apartments?.internalApartmentName?.full_price)).replace(/,/g, ' ')}
                            {isOn ? "  $  " : "  ₾  "}
                          </h1>
                        </div>
                      </div>

                      <div
                        className="textInfo_physical"
                        onClick={() =>
                          handleAppartmentClick(prev_apartments.id)
                        }
                      >
                        <p className="city_settings  ">
                          {prev_apartments.address.city} {" , "}
                          {prev_apartments.address.city}{" "}
                        </p>
                        <p
                          className="price_settings"
                          style={styles.complexInfo}
                        >
                          {" "}
                          {
                            prev_apartments?.internalApartmentName?.square_price
                          }{" "}
                          {
                            handle_P_StatusButtonLanguageChange(
                              selectedLanguage
                            ).m2
                          }{" "}
                        </p>
                        <p
                          className="price_settings"
                          style={styles.complexInfo}
                        >
                          {" "}
                          {
                            handle_P_StatusButtonLanguageChange(
                              selectedLanguage
                            ).sartuli
                          }{" "}
                          {"  : "}{" "}
                          {prev_apartments.internalApartmentName?.floor_number}
                        </p>
                        <div className="rooms_and_rank">
                          <p
                            className="price_settings"
                            style={styles.complexInfo}
                          >
                            {" "}
                            {
                              handle_P_StatusButtonLanguageChange(
                                selectedLanguage
                              ).rooms
                            }{" "}
                            {"  : "}{" "}
                            {
                              prev_apartments.internalApartmentName
                                ?.number_of_rooms
                            }
                          </p>
                          <p
                            className="price_settings"
                            style={styles.complexInfo}
                          >
                            {prev_apartments.internalApartmentName?.rank}
                          </p>
                        </div>
                        <p className="apartment_id_1">
                          {" "}
                          id : {prev_apartments?.id}{" "}
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
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* --------------------------------------------------------------------------------------------------- */}

        {showApartments && twoBedrooms.length > 0 && (
          <div className="allCards_physical_aa ">
            <div className="firstBoxOfBinebi">
              <p style={{ color: "#FFFFFF" }}>
                {handle_room_language_change(selectedLanguage).two_rom}
              </p>
              <button
                className="numberSHowButton"
                onClick={handle_show_two_bedrom}
              >
                {show_two_bedrom ? (
                  <img
                    src={arrowUp}
                    style={{ width: "20px", marginLeft: "5px" }}
                  />
                ) : (
                  <img src={arrowDown} style={{ width: "30px" }} />
                )}
              </button>
            </div>

            <div className="show_studio_apartment">
              {show_two_bedrom &&
                twoBedrooms.map((prev_apartments, index) => (
                  <div className="card_physical_aa" key={index}>
                    <div
                    // key={currentPage}
                    // initial={{ x: -50, opacity: 0 }}
                    // transition={{ duration: 1 }}
                    // whileInView={{ x: 0, opacity: 1 }}
                    // viewport={{ once: true }}
                    >
                      <div className="heartbuttonAndImageBox_physical">
                        <div className="heartButtonBox_physical">
                          <button
                            onClick={() =>
                              favorite_apartment_handler(prev_apartments)
                            }
                            key={prev_apartments.id}
                            className="heartButtons_physical"
                          >
                            {favoriteApartment.some(
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
                          onClick={() =>
                            handleAppartmentClick(prev_apartments.id)
                          }
                          src={prev_apartments?.images[0]}
                          alt={prev_apartments.name}
                          style={styles.imageStyles}
                        />
                      </div>
                      {/* --------------card details------------------- */}
                      <div className="title_and_fullprice">
                        <h1
                          className="company_title"
                          style={styles.companyTitle}
                        >
                          {prev_apartments?.apartmentName}
                        </h1>
                        <div className="dolar_fullprice">
                          <h1
                            className="company_title"
                            style={styles.companyTitle}
                          >
                            {currenceChangeState
                              ?
                              new Intl.NumberFormat('en-US', {
                                style: 'decimal',
                                useGrouping: true,
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0
                              }).format(Number(prev_apartments?.internalApartmentName?.full_price) * getCorrencyRate).replace(/,/g, ' ')

                              : new Intl.NumberFormat('en-US', {
                                style: 'decimal',
                                useGrouping: true,
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0
                              }).format(Number(prev_apartments?.internalApartmentName?.full_price)).replace(/,/g, ' ')}
                            {isOn ? "  $  " : "  ₾  "}
                          </h1>
                        </div>
                      </div>

                      <div
                        className="textInfo_physical"
                        onClick={() =>
                          handleAppartmentClick(prev_apartments.id)
                        }
                      >
                        <p className="city_settings  ">
                          {prev_apartments.address.city} {" , "}
                          {prev_apartments.address.city}{" "}
                        </p>
                        <p
                          className="price_settings"
                          style={styles.complexInfo}
                        >
                          {" "}
                          {
                            prev_apartments?.internalApartmentName?.square_price
                          }{" "}
                          {
                            handle_P_StatusButtonLanguageChange(
                              selectedLanguage
                            ).m2
                          }{" "}
                        </p>
                        <p
                          className="price_settings"
                          style={styles.complexInfo}
                        >
                          {" "}
                          {
                            handle_P_StatusButtonLanguageChange(
                              selectedLanguage
                            ).sartuli
                          }{" "}
                          {"  : "}{" "}
                          {prev_apartments.internalApartmentName?.floor_number}
                        </p>
                        <div className="rooms_and_rank">
                          <p
                            className="price_settings"
                            style={styles.complexInfo}
                          >
                            {" "}
                            {
                              handle_P_StatusButtonLanguageChange(
                                selectedLanguage
                              ).rooms
                            }{" "}
                            {"  : "}{" "}
                            {
                              prev_apartments.internalApartmentName
                                ?.number_of_rooms
                            }
                          </p>
                          <p
                            className="price_settings"
                            style={styles.complexInfo}
                          >
                            {prev_apartments.internalApartmentName?.rank}
                          </p>
                        </div>
                        <p className="apartment_id_1">
                          {" "}
                          id : {prev_apartments?.id}{" "}
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
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* --------------------------------------------------------------------------------------------------- */}

        {showApartments && threeBedrooms.length > 0 && (
          <div className="allCards_physical_aa ">
            <div className="firstBoxOfBinebi">
              <p style={{ color: "#FFFFFF" }}>
                {" "}
                {handle_room_language_change(selectedLanguage).three_room}{" "}
              </p>
              <button
                className="numberSHowButton"
                onClick={handle_show_three_badroom}
              >
                {show_three_bedrom ? (
                  <img
                    src={arrowUp}
                    style={{ width: "20px", marginLeft: "5px" }}
                  />
                ) : (
                  <img src={arrowDown} style={{ width: "30px" }} />
                )}
              </button>
            </div>

            <div className="show_studio_apartment">
              {show_three_bedrom &&
                threeBedrooms.map((prev_apartments, index) => (
                  <div className="card_physical_aa" key={index}>
                    <div
                    // key={currentPage}
                    // initial={{ x: -50, opacity: 0 }}
                    // transition={{ duration: 1 }}
                    // whileInView={{ x: 0, opacity: 1 }}
                    // viewport={{ once: true }}
                    >
                      <div className="heartbuttonAndImageBox_physical">
                        <div className="heartButtonBox_physical">
                          <button
                            onClick={() =>
                              favorite_apartment_handler(prev_apartments)
                            }
                            key={prev_apartments.id}
                            className="heartButtons_physical"
                          >
                            {favoriteApartment.some(
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
                          onClick={() =>
                            handleAppartmentClick(prev_apartments.id)
                          }
                          src={prev_apartments?.images[0]}
                          alt={prev_apartments.name}
                          style={styles.imageStyles}
                        />
                      </div>
                      {/* --------------card details------------------- */}
                      <div className="title_and_fullprice">
                        <h1
                          className="company_title"
                          style={styles.companyTitle}
                        >
                          {prev_apartments?.apartmentName}
                        </h1>
                        <div className="dolar_fullprice">
                          <h1
                            className="company_title"
                            style={styles.companyTitle}
                          >
                            {/* {prev_apartments?.internalApartmentName?.full_price} */}
                            {currenceChangeState
                              ?
                              new Intl.NumberFormat('en-US', {
                                style: 'decimal',
                                useGrouping: true,
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0
                              }).format(Number(prev_apartments?.internalApartmentName?.full_price) * getCorrencyRate).replace(/,/g, ' ')

                              : new Intl.NumberFormat('en-US', {
                                style: 'decimal',
                                useGrouping: true,
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0
                              }).format(Number(prev_apartments?.internalApartmentName?.full_price)).replace(/,/g, ' ')}

                            {isOn ? "  $  " : "  ₾  "}
                          </h1>
                          <img
                            src={mew_dolar_white}
                            alt="dollar signe"
                            className="dola_apartment_card"
                          />
                        </div>
                      </div>

                      <div
                        className="textInfo_physical"
                        onClick={() =>
                          handleAppartmentClick(prev_apartments.id)
                        }
                      >
                        <p className="city_settings  ">
                          {prev_apartments.address.city} {" , "}
                          {prev_apartments.address.city}{" "}
                        </p>
                        <p
                          className="price_settings"
                          style={styles.complexInfo}
                        >
                          {" "}
                          {
                            prev_apartments?.internalApartmentName?.square_price
                          }{" "}
                          {
                            handle_P_StatusButtonLanguageChange(
                              selectedLanguage
                            ).m2
                          }{" "}
                        </p>
                        <p
                          className="price_settings"
                          style={styles.complexInfo}
                        >
                          {" "}
                          {
                            handle_P_StatusButtonLanguageChange(
                              selectedLanguage
                            ).sartuli
                          }{" "}
                          {"  : "}{" "}
                          {prev_apartments.internalApartmentName?.floor_number}
                        </p>
                        <div className="rooms_and_rank">
                          <p
                            className="price_settings"
                            style={styles.complexInfo}
                          >
                            {" "}
                            {
                              handle_P_StatusButtonLanguageChange(
                                selectedLanguage
                              ).rooms
                            }{" "}
                            {"  : "}{" "}
                            {
                              prev_apartments.internalApartmentName
                                ?.number_of_rooms
                            }
                          </p>
                          <p
                            className="price_settings"
                            style={styles.complexInfo}
                          >
                            {prev_apartments.internalApartmentName?.rank}
                          </p>
                        </div>
                        <p className="apartment_id_1">
                          {" "}
                          id : {prev_apartments?.id}{" "}
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
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* --------------------------------------------------------------------------------------------------- */}

        {showApartments && fourBedrooms.length > 0 && (
          <div className="allCards_physical_aa ">
            <div className="firstBoxOfBinebi">
              <p style={{ color: "#FFFFFF" }}>
                {" "}
                {handle_room_language_change(selectedLanguage).four_room}
              </p>
              <button
                className="numberSHowButton"
                onClick={handle_show_four_bedroom}
              >
                {show_four_bedrom ? (
                  <img
                    src={arrowUp}
                    style={{ width: "20px", marginLeft: "5px" }}
                  />
                ) : (
                  <img src={arrowDown} style={{ width: "30px" }} />
                )}
              </button>
            </div>

            <div className="show_studio_apartment">
              {show_four_bedrom &&
                fourBedrooms.map((prev_apartments, index) => (
                  <div className="card_physical_aa" key={index}>
                    <div
                    // key={currentPage}
                    // initial={{ x: -50, opacity: 0 }}
                    // transition={{ duration: 1 }}
                    // whileInView={{ x: 0, opacity: 1 }}
                    // viewport={{ once: true }}
                    >
                      <div className="heartbuttonAndImageBox_physical">
                        <div className="heartButtonBox_physical">
                          <button
                            onClick={() =>
                              favorite_apartment_handler(prev_apartments)
                            }
                            key={prev_apartments.id}
                            className="heartButtons_physical"
                          >
                            {favoriteApartment.some(
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
                          onClick={() =>
                            handleAppartmentClick(prev_apartments.id)
                          }
                          src={prev_apartments?.images[0]}
                          alt={prev_apartments.name}
                          style={styles.imageStyles}
                        />
                      </div>
                      {/* --------------card details------------------- */}
                      <div className="title_and_fullprice">
                        <h1
                          className="company_title"
                          style={styles.companyTitle}
                        >
                          {prev_apartments?.apartmentName}
                        </h1>
                        <div className="dolar_fullprice">
                          <h1
                            className="company_title"
                            style={styles.companyTitle}
                          >
                            {/* {prev_apartments?.internalApartmentName?.full_price} */}
                            {currenceChangeState
                              ?
                              new Intl.NumberFormat('en-US', {
                                style: 'decimal',
                                useGrouping: true,
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0
                              }).format(Number(prev_apartments?.internalApartmentName?.full_price) * getCorrencyRate).replace(/,/g, ' ')

                              : new Intl.NumberFormat('en-US', {
                                style: 'decimal',
                                useGrouping: true,
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0
                              }).format(Number(prev_apartments?.internalApartmentName?.full_price)).replace(/,/g, ' ')}


                            {isOn ? "  $  " : "  ₾  "}
                          </h1>
                          {/* <img src={mew_dolar_white} alt="dollar signe" className="dola_apartment_card" /> */}
                        </div>
                      </div>

                      <div
                        className="textInfo_physical"
                        onClick={() =>
                          handleAppartmentClick(prev_apartments.id)
                        }
                      >
                        <p className="city_settings  ">
                          {prev_apartments.address.city} {" , "}
                          {prev_apartments.address.city}{" "}
                        </p>
                        <p
                          className="price_settings"
                          style={styles.complexInfo}
                        >
                          {" "}
                          {
                            prev_apartments?.internalApartmentName?.square_price
                          }{" "}
                          {
                            handle_P_StatusButtonLanguageChange(
                              selectedLanguage
                            ).m2
                          }{" "}
                        </p>
                        <p
                          className="price_settings"
                          style={styles.complexInfo}
                        >
                          {" "}
                          {
                            handle_P_StatusButtonLanguageChange(
                              selectedLanguage
                            ).sartuli
                          }{" "}
                          {"  : "}{" "}
                          {prev_apartments.internalApartmentName?.floor_number}
                        </p>
                        <div className="rooms_and_rank">
                          <p
                            className="price_settings"
                            style={styles.complexInfo}
                          >
                            {" "}
                            {
                              handle_P_StatusButtonLanguageChange(
                                selectedLanguage
                              ).rooms
                            }{" "}
                            {"  : "}{" "}
                            {
                              prev_apartments.internalApartmentName
                                ?.number_of_rooms
                            }
                          </p>
                          <p
                            className="price_settings"
                            style={styles.complexInfo}
                          >
                            {prev_apartments.internalApartmentName?.rank}
                          </p>
                        </div>
                        <p className="apartment_id_1">
                          {" "}
                          id : {prev_apartments?.id}{" "}
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
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* --------------------------------------------------------------------------------------------------- */}

        {showApartments && fivePlusBedrooms.length > 0 && (
          <div className="allCards_physical_aa ">
            <div className="firstBoxOfBinebi">
              <p style={{ color: "#FFFFFF" }}>
                {" "}
                {
                  handle_room_language_change(selectedLanguage).fiveplus_room
                }{" "}
              </p>
              <button
                className="numberSHowButton"
                onClick={handle_show_fivePlus_bedroom}
              >
                {show_fivePlus_bedrom ? (
                  <img
                    src={arrowUp}
                    style={{ width: "20px", marginLeft: "5px" }}
                  />
                ) : (
                  <img src={arrowDown} style={{ width: "30px" }} />
                )}
              </button>
            </div>

            <div className="show_studio_apartment">
              {show_fivePlus_bedrom &&
                fivePlusBedrooms.map((prev_apartments, index) => (
                  <div className="card_physical_aa" key={index}>
                    <div
                    // key={currentPage}
                    // initial={{ x: -50, opacity: 0 }}
                    // transition={{ duration: 1 }}
                    // whileInView={{ x: 0, opacity: 1 }}
                    // viewport={{ once: true }}
                    >
                      <div className="heartbuttonAndImageBox_physical">
                        <div className="heartButtonBox_physical">
                          <button
                            onClick={() =>
                              favorite_apartment_handler(prev_apartments)
                            }
                            key={prev_apartments.id}
                            className="heartButtons_physical"
                          >
                            {favoriteApartment.some(
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
                          onClick={() =>
                            handleAppartmentClick(prev_apartments.id)
                          }
                          src={prev_apartments?.images[0]}
                          alt={prev_apartments.name}
                          style={styles.imageStyles}
                        />
                      </div>
                      {/* --------------card details------------------- */}
                      <div className="title_and_fullprice">
                        <h1
                          className="company_title"
                          style={styles.companyTitle}
                        >
                          {prev_apartments?.apartmentName}
                        </h1>
                        <div className="dolar_fullprice">
                          <h1
                            className="company_title"
                            style={styles.companyTitle}
                          >
                            {/* {prev_apartments?.internalApartmentName?.full_price} */}
                            {currenceChangeState
                              ?
                              new Intl.NumberFormat('en-US', {
                                style: 'decimal',
                                useGrouping: true,
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0
                              }).format(Number(prev_apartments?.internalApartmentName?.full_price) * getCorrencyRate).replace(/,/g, ' ')

                              : new Intl.NumberFormat('en-US', {
                                style: 'decimal',
                                useGrouping: true,
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0
                              }).format(Number(prev_apartments?.internalApartmentName?.full_price)).replace(/,/g, ' ')}


                            {isOn ? "  $  " : "  ₾  "}
                          </h1>
                        </div>
                      </div>

                      <div
                        className="textInfo_physical"
                        onClick={() =>
                          handleAppartmentClick(prev_apartments.id)
                        }
                      >
                        <p className="city_settings  ">
                          {prev_apartments.address.city} {" , "}
                          {prev_apartments.address.city}{" "}
                        </p>
                        <p
                          className="price_settings"
                          style={styles.complexInfo}
                        >
                          {" "}
                          {
                            prev_apartments?.internalApartmentName?.square_price
                          }{" "}
                          {
                            handle_P_StatusButtonLanguageChange(
                              selectedLanguage
                            ).m2
                          }{" "}
                        </p>
                        <p
                          className="price_settings"
                          style={styles.complexInfo}
                        >
                          {" "}
                          {
                            handle_P_StatusButtonLanguageChange(
                              selectedLanguage
                            ).sartuli
                          }{" "}
                          {"  : "}{" "}
                          {prev_apartments.internalApartmentName?.floor_number}
                        </p>
                        <div className="rooms_and_rank">
                          <p
                            className="price_settings"
                            style={styles.complexInfo}
                          >
                            {" "}
                            {
                              handle_P_StatusButtonLanguageChange(
                                selectedLanguage
                              ).rooms
                            }{" "}
                            {"  : "}{" "}
                            {
                              prev_apartments.internalApartmentName
                                ?.number_of_rooms
                            }
                          </p>
                          <p
                            className="price_settings"
                            style={styles.complexInfo}
                          >
                            {prev_apartments.internalApartmentName?.rank}
                          </p>
                        </div>
                        <p className="apartment_id_1">
                          {" "}
                          id : {prev_apartments?.id}{" "}
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
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ეს დივი არის ..კომპლექსის შესახებ'' ესეთი წარწერა რომაა და true/false-ის მეშვეობით
        რომ ვფილტრავთ, მაგალითად სართულების ოდენობა, კამერა, ოთახები და ა.შ. */}
        <div>
          <h4
            style={{
              color: "white",
              marginTop: "20px",
              marginBottom: "10px",
              marginLeft: "80px",
            }}
          >
            {handle_P_StatusButtonLanguageChange(selectedLanguage).aboutComplex}
          </h4>
          <div className="shidaInformaciaIconebisBox">
            {/* სათითაო icons და ტექსტი */}
            <div className="eachDivBoxOfIcons">
              <img
                src={binebisRaodenoba}
                alt="binebisRaodenoba"
                className="stylesOfIconsOnEachComplex"
              />
              <div className="eachDivBoxOfTextOfIcons">
                <p>
                  {
                    handle_P_StatusButtonLanguageChange(selectedLanguage)
                      .number_of_apartments
                  }
                </p>
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
                <p>
                  {
                    handle_P_StatusButtonLanguageChange(selectedLanguage)
                      .number_of_buildings
                  }
                </p>
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
                <p>
                  {
                    handle_P_StatusButtonLanguageChange(selectedLanguage)
                      .spaceButtonLanguage
                  }
                </p>
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
                <p>
                  {
                    handle_P_StatusButtonLanguageChange(selectedLanguage)
                      .ceiling_height_meters
                  }
                </p>
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
                <p>
                  {
                    handle_P_StatusButtonLanguageChange(selectedLanguage)
                      .flooring
                  }
                </p>
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
                <p>
                  {
                    handle_P_StatusButtonLanguageChange(selectedLanguage)
                      .construction
                  }
                </p>
                <p>
                  {eachPrivateApartment.construction !== null
                    ? eachPrivateApartment.construction
                    : ""}
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
                <p>
                  {
                    handle_P_StatusButtonLanguageChange(selectedLanguage)
                      .parking
                  }
                </p>
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
                <p>
                  {
                    handle_P_StatusButtonLanguageChange(selectedLanguage)
                      .protection
                  }
                </p>
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
                <p>
                  {handle_P_StatusButtonLanguageChange(selectedLanguage).rooms}
                </p>
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
                <p>
                  {
                    handle_P_StatusButtonLanguageChange(selectedLanguage)
                      .submission
                  }
                </p>
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
                <p>
                  {handle_P_StatusButtonLanguageChange(selectedLanguage).light}
                </p>
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
                <p>
                  {
                    handle_P_StatusButtonLanguageChange(selectedLanguage)
                      .humidity
                  }
                </p>
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
              <h2 className="hh2">
                {" "}
                {
                  handle_P_StatusButtonLanguageChange(selectedLanguage)
                    .infrastructure
                }
              </h2>
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
                      <p>
                        {
                          handle_P_StatusButtonLanguageChange(selectedLanguage)
                            .catering_facility
                        }
                      </p>
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
                      <p>
                        {
                          handle_P_StatusButtonLanguageChange(selectedLanguage)
                            .elevator
                        }
                      </p>
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
                      <p>
                        {
                          handle_P_StatusButtonLanguageChange(selectedLanguage)
                            .schlangbaum
                        }
                      </p>
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
                      <p>
                        {
                          handle_P_StatusButtonLanguageChange(selectedLanguage)
                            .concierge
                        }
                      </p>
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
                      <p>
                        {
                          handle_P_StatusButtonLanguageChange(selectedLanguage)
                            .yard
                        }
                      </p>
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
        <h4 style={{ color: "white", marginTop: "20px" }}>
          {handle_P_StatusButtonLanguageChange(selectedLanguage).description}
        </h4>
        <p style={{ color: "white", marginTop: "20px" }}>
          {eachPrivateApartment?.description}
        </p>

        {/* (START) ახლო მდებარე ობიექტები box */}
      </div>

      <div className="textBoxOfH4axloMdebareObieqtebi">
        <div className="make_middle_space">
          <div className="axloMdebareObieqtebiBox">
            <div className="textBoxOfAxloMdebare">
              <h4 style={{ color: "white", marginTop: "40px" }}>
                {
                  handle_P_StatusButtonLanguageChange(selectedLanguage)
                    .nearObjects
                }
              </h4>
              <div className="iconAndItsText">
                {eachPrivateApartment?.metro && (
                  <>
                    <img src={metro} alt="metro" />
                    <p>
                      {
                        handle_P_StatusButtonLanguageChange(selectedLanguage)
                          .metro
                      }
                    </p>
                  </>
                )}
              </div>
              <div className="iconAndItsText">
                {eachPrivateApartment?.supermarket && (
                  <>
                    <img src={supermarket} alt="supermarket" />
                    <p>
                      {
                        handle_P_StatusButtonLanguageChange(selectedLanguage)
                          .supermarket
                      }
                    </p>
                  </>
                )}
              </div>
              <div className="iconAndItsText">
                {eachPrivateApartment?.pharmacy && (
                  <>
                    <img src={aptiaqi} alt="aptiaqi" />
                    <p>
                      {
                        handle_P_StatusButtonLanguageChange(selectedLanguage)
                          .pharmacy
                      }
                    </p>
                  </>
                )}
              </div>
              <div className="iconAndItsText">
                {eachPrivateApartment?.square && (
                  <>
                    <img src={skveri} alt="skveri" />
                    <p>
                      {
                        handle_P_StatusButtonLanguageChange(selectedLanguage)
                          .square
                      }
                    </p>
                  </>
                )}
              </div>
            </div>

            <div className="child_map_container_P ">
              <GoogleMap
                id="mapp"
                mapContainerStyle={{ height: "300px" }}
                center={mapcenter}
                zoom={16}
                options={{
                  gestureHandling: "none",
                  zoomControl: true,
                  scrollwheel: false,
                  disableDoubleClickZoom: true,
                  streetViewControl: false,
                  mapTypeControl: false,
                  fullscreenControl: false,
                }}
              >
                <Marker
                  key={privateApartments.id}
                  position={{
                    lat: mapcenter.lat,
                    lng: mapcenter.lng,
                  }}
                  icon={{
                    url: private_apartment_location_icon,
                    scaledSize: scalesize,
                  }}
                />
              </GoogleMap>
            </div>
          </div>
        </div>

        {/* (END) ახლო მდებარე ობიექტები box -------- */}

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
