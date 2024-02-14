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
import metro from "../assets/Metro.svg";
import aptiaqi from "../assets/Aptiaqi.svg";
import supermarket from "../assets/Supermarket.svg";
import skveri from "../assets/skveri.svg";
import forMapPhoto from "../assets/ComplexesPhotos/1zz.jpg";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import private_apartment_location_icon from "../location_icons/private_apartment2.png";
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
      internalComplex: {
        id: data[`complex_${lang}`].internal_complex_name.id,
        createdAt: data[`complex_${lang}`].internal_complex_name.created_at,
        internalComplexName:
          data[`complex_${lang}`].internal_complex_name.internal_complex_name,
        fullPrice: data[`complex_${lang}`].internal_complex_name.full_price,
        roomsQuantity:
          data[`complex_${lang}`].internal_complex_name.rooms_quantity,

        pricePerSqMeter:
          data[`complex_${lang}`].internal_complex_name.price_per_sq_meter,
        parkingQuantity:
          data[`complex_${lang}`].internal_complex_name.parking_quantity,
        lightPercentage:
          data[`complex_${lang}`].internal_complex_name.light_percentage,
        humidityPercentage:
          data[`complex_${lang}`].internal_complex_name.humidity_percentage,
        cateringFacility:
          data[`complex_${lang}`].internal_complex_name.catering_facility,
        elevatorType:
          data[`complex_${lang}`].internal_complex_name.elevator_type,
        schlangbaum: data[`complex_${lang}`].internal_complex_name.schlangbaum,
        conciergeService:
          data[`complex_${lang}`].internal_complex_name.concierge_service,
        yardDescription:
          data[`complex_${lang}`].internal_complex_name.yard_description,
        finishYear: data[`complex_${lang}`].internal_complex_name.finish_year,
        finishMonth: data[`complex_${lang}`].internal_complex_name.finish_month,
        status: data[`complex_${lang}`].internal_complex_name.status,
        visibility: data[`complex_${lang}`].internal_complex_name.visibiliti,
        vipComplex: data[`complex_${lang}`].internal_complex_name.vipComplex,
        floorNumber: data[`complex_${lang}`].internal_complex_name.floor_number,
        space: data[`complex_${lang}`].internal_complex_name.space,
        ceilingHeightMeters:
          data[`complex_${lang}`].internal_complex_name.ceiling_height_meters,

        numberOfApartments:
          data[`complex_${lang}`].internal_complex_name.number_of_apartments,
        numberOfBuildings:
          data[`complex_${lang}`].internal_complex_name.number_of_buildings,
        flooring: data[`complex_${lang}`].internal_complex_name.flooring,

        numberOfFloors:
          data[`complex_${lang}`].internal_complex_name.number_of_floors,
        phoneNumber: data[`complex_${lang}`].internal_complex_name.phone_number,
        plotArea: data[`complex_${lang}`].internal_complex_name.plot_area,
        rank: data[`complex_${lang}`].internal_complex_name.rank,
      },
      typeOfRoof: data[`complex_${lang}`][`type_of_roof_${lang}`],
      images: data[`complex_${lang}`].image_urls,
      company: {
        id: data[`complex_${lang}`][`company_${lang}`].id,
        recordId: data[`complex_${lang}`][`company_${lang}`].record_id,
        internalName: data[`complex_${lang}`][`company_${lang}`].internal_name,
        mobile: data[`complex_${lang}`][`company_${lang}`].Mobile,
        mobileHome: data[`complex_${lang}`][`company_${lang}`].Mobile_Home,
        email: data[`complex_${lang}`][`company_${lang}`].email,
        companyWeb: data[`complex_${lang}`][`company_${lang}`].companyweb,
        facebookPage: data[`complex_${lang}`][`company_${lang}`].facebook_page,
        logoCompany: data[`complex_${lang}`][`company_${lang}`].logocompany,
        backgroundImage:
          data[`complex_${lang}`][`company_${lang}`].background_image,
        topCompany: data[`complex_${lang}`][`company_${lang}`].topCompany,
        visibility: data[`complex_${lang}`][`company_${lang}`].visibility,
        name: data[`complex_${lang}`][`company_${lang}`][`name_${lang}`],
        address: data[`complex_${lang}`][`company_${lang}`][`address_${lang}`],
        aboutCompany:
          data[`complex_${lang}`][`company_${lang}`][`aboutcompany_${lang}`],
      },
      address: {
        city: data[`complex_${lang}`][`address_${lang}`][`city_${lang}`],
        pharentDistrict:
          data[`complex_${lang}`][`address_${lang}`][`pharentDistrict_${lang}`],
        district:
          data[`complex_${lang}`][`address_${lang}`][`district_${lang}`],
        streetName:
          data[`complex_${lang}`][`address_${lang}`][`street_name_${lang}`],
        address: data[`complex_${lang}`][`address_${lang}`][`address_${lang}`],
        longitude: data[`complex_${lang}`][`address_${lang}`].longitude,
        latitude: data[`complex_${lang}`][`address_${lang}`].latitude,
      },
      construction: data[`complex_${lang}`][`construction_type_${lang}`],
      protectionType: data[`complex_${lang}`][`protection_type_${lang}`],
      submissionType: data[`complex_${lang}`][`submission_type_${lang}`],
    },

    apartmentAddress: {
      city: data[`appartment_address_${lang}`][`city_${lang}`],
      pharentDistrict:
        data[`appartment_address_${lang}`][`pharentDistrict_${lang}`],
      district: data[`appartment_address_${lang}`][`district_${lang}`],
      streetName: data[`appartment_address_${lang}`][`street_name_${lang}`],
      address: data[`appartment_address_${lang}`][`address_${lang}`],
      longitude: data[`appartment_address_${lang}`].longitude,
      latitude: data[`appartment_address_${lang}`].latitude,
    },

    internalApartmentDetails: {
      id: data.internal_apartment_name.id,
      internalApartmentName:
        data.internal_apartment_name.internal_apartment_name,
      numberOfRooms: data.internal_apartment_name.number_of_rooms,
      area: data.internal_apartment_name.area,
      fullPrice: data.internal_apartment_name.full_price,
      squarePrice: data.internal_apartment_name.square_price,
      floorNumber: data.internal_apartment_name.floor_number,
      isAvailable: data.internal_apartment_name.is_available,
      visibility: data.internal_apartment_name.visibiliti,
      rooms: data.internal_apartment_name.rooms,
      kitchen: data.internal_apartment_name.kitchen,
      bathroom: data.internal_apartment_name.Bathroom,
      bedroom: data.internal_apartment_name.bedroom,
      balcony: data.internal_apartment_name.Balcony,
    },

    apartmentImages: data.appartment_images,
    testField: data[`test_field_${lang}`],
  };
};

// "rooms": 6,
// "kitchen": 4,
// "Bathroom": 7,
// "bedroom": 8,
// "Balcony": 3

export default function EachApartment({
  selectedLanguage,
  favorites,
  favoriteHandler,
  handleCallButtonClick,
  getCorrencyRate,
  HandleStateChange,
  currenceChangeState,
  isOn,
  toggleSwitch,
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
  {
    console.log(
      "---------------------------------------",
      eachComplexAllAppartments.address?.adress?.city
    );
  }

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
  const phoneNumbers =
    eachComplexAllAppartments?.complex?.internalComplex?.phoneNumber;

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
      const requestUrl = `${BaseURLs.apartment}${selectedLanguage}/${apartmentId}`; // /?${queryString}
      const response = await axios.get(requestUrl);

      const data = response.data;

      const normalised_Data = normalizeApartmentData(data, selectedLanguage);
      seteachComplexAllAppartments(normalised_Data);
      console.log("zzzzzz", normalised_Data);

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

  // lat: eachComplexAllAppartments?.address?.latitude || 41.7151,
  // lng: eachComplexAllAppartments?.address?.longitude || 44.8271,

  // useEffect(()=> {
  //   console.log('esa ==',eachComplexAllAppartments?.address?.latitude)
  // },[eachComplexAllAppartments])

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
      allAppartments: "All Appartments",
      appartmentsAndPlanning: "Appartments and Planning",
      aboutComplex: "About Complex",
      nearObjects: "Near Objects",
      metro: "Metro",
      pharmacy: "Pharmacy",
      supermarket: "Supermarket",
      square: "Square",
      infrastructure: "Infrastructure",
      seen: "Seen",
      kitchen: "Kitchen",
      bathroom: "bathroom",
      bedroom: "Bedroom",
      balcony: "Balcony",
      pricePerM: "Price per m²",
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
        languageInfo.allAppartments = "All Apartments";
        languageInfo.appartmentsAndPlanning = "Apartments and Planning";
        languageInfo.aboutComplex = "About Complex";
        languageInfo.nearObjects = "Near Objects";
        languageInfo.metro = "Metro";
        languageInfo.pharmacy = "Pharmacy";
        languageInfo.supermarket = "Supermarket";
        languageInfo.square = "Square";
        languageInfo.infrastructure = "Infrastructure";
        languageInfo.seen = "Seen";
        languageInfo.kitchen = "Kitchen";
        languageInfo.bathroom = "Bathroom";
        languageInfo.bedroom = "Bedroom";
        languageInfo.balcony = "Balcony";
        languageInfo.pricePerM = "Price per m²";

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
        languageInfo.allAppartments = "ყველა ბინა";
        languageInfo.appartmentsAndPlanning = "ბინები და გეგმარება";
        languageInfo.aboutComplex = "კომპლექსის შესახებ";
        languageInfo.nearObjects = "ახლო მდებარე ობიექტები";
        languageInfo.metro = "მეტრო";
        languageInfo.pharmacy = "აფთიაქი";
        languageInfo.supermarket = "სუპერმარკეტი";
        languageInfo.square = "სკვერი";
        languageInfo.infrastructure = "ინფრასტრუქტურა";
        languageInfo.seen = "ნახვები";
        languageInfo.kitchen = "სამზარეულო";
        languageInfo.bathroom = "სააბაზანო";
        languageInfo.bedroom = "საძინებელი";
        languageInfo.balcony = "აივანი";
        languageInfo.pricePerM = "m²-ის ფასი";

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
        languageInfo.allAppartments = "Все квартиры";
        languageInfo.appartmentsAndPlanning = "Квартиры и планировка";
        languageInfo.aboutComplex = "О комплексе";
        languageInfo.nearObjects = "Близкие объекты";
        languageInfo.metro = "Метро";
        languageInfo.pharmacy = "Аптека";
        languageInfo.supermarket = "Супермаркет";
        languageInfo.square = "Площадь";
        languageInfo.infrastructure = "Инфраструктура";
        languageInfo.seen = "Просмотрено";
        languageInfo.kitchen = "Кухня";
        languageInfo.bathroom = "Ванная";
        languageInfo.bedroom = "Спальня";
        languageInfo.balcony = "Балкон";
        languageInfo.pricePerM = "Цена за м²";

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

  const mapcenter = {
    lat: eachComplexAllAppartments?.apartmentAddress?.latitude || 41.7151,
    lng: eachComplexAllAppartments?.apartmentAddress?.longitude || 44.8271,
  };

  console.log("longebi da latebi apartm ------------", mapcenter);

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
    <div className="eachComplexBoxn">
      <div className="imageAndTextInfos4">
        {/* Complexes photos info */}
        <div className="imageSliderBox">
          <div className=" apart_class_image">
            <button className="btns" onClick={handlePrevious}>
              P
            </button>
            {wordData && ( // Check if wordData is not null/undefined before rendering
              <img
                id="lands_image"
                src={wordData.value}
                alt={`Complex ${wordData.id}`}
                // height="450"
                // width="711"
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
        {DATA.map((complex, index) => (
          <div key={index} className="complexTextsBox">
            <div className="seenIdFavouriteAndOthersBox">
              <div className="seenAndIdBox">
                <p style={{ color: "#838282" }}>
                  {handle_P_StatusButtonLanguageChange(selectedLanguage).seen}:
                  : {complex.seen}
                </p>
                <p style={{ color: "#838282" }}>ID: {complex.ID}</p>
              </div>

              <div className="favouriteDollarAndShareBox">
                {/* Star favourite box */}
                <button className="heartButtons">
                  <img src={star} style={{ width: "30px", height: "30px" }} />
                </button>
                {/* ----Dollar and Lari Toggle button */}
                <div className="currencyBox">
                  <div
                    className="switch"
                    data-ison={isOn}
                    onClick={() => {
                      toggleSwitch();
                      HandleStateChange();
                    }}
                  >
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
                {/* Share Button */}
                <button className="heartButtons">
                  <img src={share} style={{ width: "30px", height: "30px" }} />
                </button>
              </div>
            </div>
            {/* აქ არის პირველი ზედა ტექსტები, არქი, მისამართი, ქუჩა, მ2-ის ფასი */}
            <div className="companyAdressPriceTextBox">
              <p style={{ color: "#838289" }}>
                {eachComplexAllAppartments?.apartmentAddress?.city}
              </p>

              <p style={{ color: "#838289" }}>
                {eachComplexAllAppartments?.apartmentAddress?.streetName}
              </p>

              {eachComplexAllAppartments &&
                eachComplexAllAppartments.complex && (
                  <p style={{ color: "#ccc", fontSize: "20px" }}>
                    {
                      handle_P_StatusButtonLanguageChange(selectedLanguage)
                        .pricePerM
                    }{" "}
                    {currenceChangeState
                      ? eachComplexAllAppartments?.complex?.internalComplex
                          ?.pricePerSqMeter * getCorrencyRate
                      : eachComplexAllAppartments?.complex?.internalComplex
                          ?.pricePerSqMeter}
                    $
                  </p>
                )}
            </div>

            <div className="chabarebaPartebiKorpusebi">
              {/* ქვედა, მეორე ტექსტია.. bathroom,bedroom,balcony  Fართები... სართულიანობა */}
              <div className="eachTextOnListTexts">
                <div className="room_details" style={{ color: "#C2BFBF" }}>
                  <p className="room_details_headers">
                    {
                      handle_P_StatusButtonLanguageChange(selectedLanguage)
                        .rooms
                    }{" "}
                    :
                    {eachComplexAllAppartments?.internalApartmentDetails?.rooms}{" "}
                  </p>
                </div>
                <div className="room_details" style={{ color: "#C2BFBF" }}>
                  {
                    handle_P_StatusButtonLanguageChange(selectedLanguage)
                      .kitchen
                  }
                  :{" "}
                  {eachComplexAllAppartments?.internalApartmentDetails?.kitchen}
                </div>
                <div className="room_details" style={{ color: "#C2BFBF" }}>
                  {
                    handle_P_StatusButtonLanguageChange(selectedLanguage)
                      .bathroom
                  }
                  :{" "}
                  {
                    eachComplexAllAppartments?.internalApartmentDetails
                      ?.bathroom
                  }
                </div>
                <div className="room_details" style={{ color: "#C2BFBF" }}>
                  {
                    handle_P_StatusButtonLanguageChange(selectedLanguage)
                      .bedroom
                  }
                  :{" "}
                  {eachComplexAllAppartments?.internalApartmentDetails?.bedroom}
                </div>
                <div className="room_details" style={{ color: "#C2BFBF" }}>
                  {
                    handle_P_StatusButtonLanguageChange(selectedLanguage)
                      .balcony
                  }
                  :{" "}
                  {eachComplexAllAppartments?.internalApartmentDetails?.balcony}
                </div>
              </div>

              <div className="eachTextOnListTextsTwo">
                {/* {eachComplexAllAppartments &&
                  eachComplexAllAppartments.apartmentDetails && ( */}
                <p style={{ color: "white" }}>
                  {
                    eachComplexAllAppartments?.internalApartmentName
                      ?.internalApartmentName?.internalApartmentName
                      ?.numberOfRooms
                  }
                </p>
                {/* )} */}
                <p style={{ color: "#FFFFFF" }}>
                  {" "}
                  {eachPrivateApartment?.space}
                </p>
                <p style={{ color: "#FFFFFF" }}>
                  {eachPrivateApartment?.numberOfApartments}
                </p>
                <p style={{ color: "#FFFFFF" }}>
                  {/* აქ, ბაზაში ნull არის მითითებული და ჯერ ჩავაკომენტარე რო ფრონტისთვის მეჩვენებინა */}
                  {/* {eachPrivateApartment?.numberOfBuildings} */}
                  null
                </p>
                <p style={{ color: "#FFFFFF" }}>
                  {eachPrivateApartment?.numberOfFloors}
                </p>
              </div>
            </div>
            {/* დარეკვისა და ნომრის ჩვენების სექცია */}
            <div className="numberAndCallRequestBox">
              <div className="numberBox">
                <img src={phoneImage} style={{ width: "40px" }} alt="phone" />
                <p style={{ color: "#FFFFFF" }}>
                  {phoneNumbers && showFullNumber
                    ? phoneNumbers
                    : phoneNumbers
                        ?.slice(0, -2)
                        .padEnd(phoneNumbers?.length, "*")}
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
                <img
                  src={headSetImage}
                  style={{ width: "40px" }}
                  alt="headset"
                />
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
        ))}
      </div>
      {/* ---------- */}

      <div className="binebiDaGegmarebaFullBox">
        <h4 style={{ color: "white" }}>
          {" "}
          {handle_P_StatusButtonLanguageChange(selectedLanguage).description}
        </h4>
        <p style={{ color: "white", marginTop: "10px" }}>
          {eachComplexAllAppartments.testField}
        </p>

        <h4 style={{ color: "white", marginTop: "20px", marginBottom: "10px" }}>
          {handle_P_StatusButtonLanguageChange(selectedLanguage).aboutComplex}
        </h4>
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
                <p>
                  {" "}
                  {
                    handle_P_StatusButtonLanguageChange(selectedLanguage)
                      .number_of_apartments
                  }
                </p>
                <p>
                  {eachComplexAllAppartments?.complex?.internalComplex
                    ?.numberOfApartments !== null
                    ? eachComplexAllAppartments?.complex?.internalComplex
                        ?.numberOfApartments
                    : "---"}{" "}
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
                  {" "}
                  {
                    handle_P_StatusButtonLanguageChange(selectedLanguage)
                      .number_of_buildings
                  }
                </p>
                <p>
                  {eachComplexAllAppartments?.complex?.internalComplex
                    ?.numberOfBuildings !== null
                    ? eachComplexAllAppartments?.complex?.internalComplex
                        ?.numberOfBuildings
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
                  {" "}
                  {
                    handle_P_StatusButtonLanguageChange(selectedLanguage)
                      .spaceButtonLanguage
                  }
                </p>
                <p>
                  {eachComplexAllAppartments?.complex?.internalComplex
                    ?.space !== null
                    ? eachComplexAllAppartments?.complex?.internalComplex?.space
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
                  {" "}
                  {
                    handle_P_StatusButtonLanguageChange(selectedLanguage)
                      .ceiling_height_meters
                  }
                </p>
                <p>
                  {eachComplexAllAppartments?.complex?.internalComplex
                    .ceilingHeightMeters !== null
                    ? eachComplexAllAppartments?.complex?.internalComplex
                        .ceilingHeightMeters
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
                  {" "}
                  {
                    handle_P_StatusButtonLanguageChange(selectedLanguage)
                      .flooring
                  }
                </p>
                <p>
                  {eachComplexAllAppartments?.complex?.internalComplex
                    ?.flooring !== null
                    ? eachComplexAllAppartments?.complex?.internalComplex
                        ?.flooring
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
                  {" "}
                  {
                    handle_P_StatusButtonLanguageChange(selectedLanguage)
                      .construction
                  }
                </p>
                <p>
                  {eachComplexAllAppartments?.complex?.construction !== null
                    ? eachComplexAllAppartments?.complex?.construction
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
                <p>
                  {" "}
                  {
                    handle_P_StatusButtonLanguageChange(selectedLanguage)
                      .parking
                  }
                </p>
                <p>
                  {eachComplexAllAppartments?.complex?.internalComplex
                    ?.parkingQuantity !== null
                    ? eachComplexAllAppartments?.complex?.internalComplex
                        ?.parkingQuantity
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
                  {" "}
                  {
                    handle_P_StatusButtonLanguageChange(selectedLanguage)
                      .protection
                  }
                </p>
                <p>
                  {eachComplexAllAppartments?.complex?.protectionType !== null
                    ? eachComplexAllAppartments?.complex?.protectionType
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
                  {" "}
                  {handle_P_StatusButtonLanguageChange(selectedLanguage).rooms}
                </p>
                <p>
                  {eachComplexAllAppartments?.complex?.internalComplex
                    ?.roomsQuantity !== null
                    ? eachComplexAllAppartments?.complex?.internalComplex
                        ?.roomsQuantity
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
                  {" "}
                  {
                    handle_P_StatusButtonLanguageChange(selectedLanguage)
                      .submission
                  }
                </p>
                <p>
                  {eachComplexAllAppartments?.complex?.submissionType !== null
                    ? eachComplexAllAppartments?.complex?.submissionType
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
                  {" "}
                  {handle_P_StatusButtonLanguageChange(selectedLanguage).light}
                </p>
                <p>
                  {eachComplexAllAppartments?.complex?.internalComplex
                    ?.lightPercentage !== null
                    ? eachComplexAllAppartments?.complex?.internalComplex
                        ?.lightPercentage
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
                  {" "}
                  {
                    handle_P_StatusButtonLanguageChange(selectedLanguage)
                      .humidity
                  }
                </p>
                <p>
                  {eachComplexAllAppartments?.complex?.internalComplex
                    ?.humidityPercentage !== null
                    ? eachComplexAllAppartments?.complex?.internalComplex
                        ?.humidityPercentage
                    : "---"}
                </p>
              </div>
            </div>
            {/* ----- */}

            {/* iwyeba:   inprastruqturisIconsBox */}
            <div className="inprastruqturisIconsBigBox">
              <h2>
                {" "}
                {
                  handle_P_StatusButtonLanguageChange(selectedLanguage)
                    .infrastructure
                }
              </h2>
              <div className="inprastruqturisIconsBox">
                {/* სათითაო icons და ტექსტი */}
                {eachComplexAllAppartments?.complex?.internalComplex
                  ?.cateringFacility && (
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
                {eachComplexAllAppartments?.complex?.internalComplex
                  ?.elevatorType && (
                  <div className="eachDivBoxOfIcons">
                    <img
                      src={lipti}
                      alt="lipti"
                      className="stylesOfIconsOnEachComplex"
                    />
                    <div className="eachDivBoxOfTextOfIcons">
                      <p>
                        {" "}
                        {
                          handle_P_StatusButtonLanguageChange(selectedLanguage)
                            .elevator
                        }
                      </p>
                      <p>
                        {
                          eachComplexAllAppartments?.complex?.internalComplex
                            ?.elevatorType
                        }
                      </p>
                    </div>
                  </div>
                )}

                {/* ----- */}

                {/* სათითაო icons და ტექსტი */}
                {eachComplexAllAppartments?.complex?.internalComplex
                  ?.schlangbaum && (
                  <div className="eachDivBoxOfIcons">
                    <img
                      src={shlagbaumi}
                      alt="shlagbaumi"
                      className="stylesOfIconsOnEachComplex"
                    />
                    <div className="eachDivBoxOfTextOfIcons">
                      <p>
                        {" "}
                        {
                          handle_P_StatusButtonLanguageChange(selectedLanguage)
                            .schlangbaum
                        }
                      </p>
                      <p>
                        {
                          eachComplexAllAppartments?.complex?.internalComplex
                            ?.schlangbaum
                        }
                      </p>
                    </div>
                  </div>
                )}

                {/* ----- */}

                {/* სათითაო icons და ტექსტი */}
                {eachComplexAllAppartments?.complex?.internalComplex
                  ?.conciergeService && (
                  <div className="eachDivBoxOfIcons">
                    <img
                      src={konsierji}
                      alt="konsierji"
                      className="stylesOfIconsOnEachComplex"
                    />
                    <div className="eachDivBoxOfTextOfIcons">
                      <p>
                        {" "}
                        {
                          handle_P_StatusButtonLanguageChange(selectedLanguage)
                            .concierge
                        }
                      </p>
                      <p>
                        {
                          eachComplexAllAppartments?.complex?.internalComplex
                            ?.conciergeService
                        }
                      </p>
                    </div>
                  </div>
                )}

                {/* ----- */}

                {/* სათითაო icons და ტექსტი */}
                {eachComplexAllAppartments?.complex?.internalComplex
                  ?.yardDescription && (
                  <div className="eachDivBoxOfIcons">
                    <img
                      src={ezo}
                      alt="ezo"
                      className="stylesOfIconsOnEachComplex"
                    />
                    <div className="eachDivBoxOfTextOfIcons">
                      <p>
                        {" "}
                        {
                          handle_P_StatusButtonLanguageChange(selectedLanguage)
                            .yard
                        }
                      </p>
                      <p>
                        {
                          eachComplexAllAppartments?.complex?.internalComplex
                            ?.yardDescription
                        }
                      </p>
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

      {/* (START) ახლო მდებარე ობიექტები box */}
      <div className="textBoxOfH4axloMdebareObieqtebi">
        <h4 style={{ color: "white" }}>
          {handle_P_StatusButtonLanguageChange(selectedLanguage).nearObjects}
        </h4>
      </div>

      <div className="axloMdebareObieqtebiBox">
        <div className="textBoxOfAxloMdebare">
          <div className="iconAndItsText">
            <img src={metro} alt="metro" />
            <p>{handle_P_StatusButtonLanguageChange(selectedLanguage).metro}</p>
          </div>
          <div className="iconAndItsText">
            <img src={aptiaqi} alt="aptiaqi" />
            <p>
              {handle_P_StatusButtonLanguageChange(selectedLanguage).pharmacy}
            </p>
          </div>{" "}
          <div className="iconAndItsText">
            <img src={supermarket} alt="supermarket" />
            <p>
              {
                handle_P_StatusButtonLanguageChange(selectedLanguage)
                  .supermarket
              }
            </p>
          </div>{" "}
          <div className="iconAndItsText">
            <img src={skveri} alt="skveri" />
            <p>
              {handle_P_StatusButtonLanguageChange(selectedLanguage).square}
            </p>
          </div>
        </div>

        <div className="child_map_container_P">
          <GoogleMap
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
                lat: eachComplexAllAppartments?.apartmentAddress?.latitude,
                lng: eachComplexAllAppartments?.apartmentAddress?.longitude,
              }}
<<<<<<< HEAD
              icon={{
                url: private_apartment_location_icon,
                scaledSize: scalesize,
              }}
            />
          </GoogleMap>
=======
            >
              <Marker
                key={privateApartments.id}
                position={{
                  lat: mapcenter.lat,
                  lng: mapcenter.lng,
            
            
                }}
                icon={{
                  url: private_apartment_location_icon,
                  scaledSize: scalesize
                }}
              />
            </GoogleMap>
>>>>>>> origin/main
        </div>
      </div>
      {/* (END) ახლო მდებარე ობიექტები box -------- */}
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
