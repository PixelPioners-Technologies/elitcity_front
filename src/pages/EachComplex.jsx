/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import "./EachComplex.css";
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

// ------------------
import "./Physical.css";
import axios from "axios";
import { useState, useEffect } from "react";
import P_PriceModal from "../modals for private page/P_PriceModal";
import P_SpaceModal from "../modals for private page/P_SpaceModal";
import P_StatusModal from "../modals for private page/P_StatusModa";
import button_icon from "../icons/Vector.svg";

import { useLocation } from "react-router-dom";
function normalizeData(item, lang) {
  return {
    id: item.id,
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

    // Add other fields from internal_complex_name as needed
    complexImages: item.complex_images.images,
    apartments: item[`appartment_name_${lang}`].map((apartment) => ({
      id: apartment.id,
      apartmentName: apartment[`appartment_name_${lang}`],
      testField: apartment[`test_field_${lang}`],
      internalApartmentName: apartment.internal_apartment_name,
      images: apartment.appartment_images.images,
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

import img1 from "../assets/ComplexesPhotos/0zzz.jpg";
import img2 from "../assets/ComplexesPhotos/1zz.jpg";
import img3 from "../assets/ComplexesPhotos/2zz.jpg";
import img4 from "../assets/ComplexesPhotos/3zz.jpg";
import img5 from "../assets/ComplexesPhotos/4zz.jpg";
import img6 from "../assets/ComplexesPhotos/5zz.jpg";

export default function EachComplex({
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

      const cityParam = `city`;

      const limit = 12; // Define the limit or make it dynamic as per your requirement
      const offset = (currentPage - 1) * limit;

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

      if (selectedStatuses && selectedStatuses.length > 0) {
        selectedStatuses.forEach((status) => {
          queryParams.append("status", status);
        });
      }

      // const queryString = queryParams.toString();
      const requestUrl = `${BaseURLs.complex_and_apartments}${selectedLanguage}/${complexId}`; // /?${queryString}
      const response = await axios.get(requestUrl);
      // console.log("ssssssss", response.data.results[0];
      const data = response.data;
      const normalised_Data = normalizeData(data, selectedLanguage);
      console.log("----111---,", normalised_Data);
      setEachPrivateApartment(normalised_Data);
      setPrivateApartments(normalised_Data);

      // Update sliderImages state with all images from the fetched data
      const sliderImagesFromData = normadata.images.map((imgUrl, index) => ({
        id: index,
        value: imgUrl, // Directly using the URL from the JSON data
      }));
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
    complexId,
  ]);

  console.log("imagesss;:::::;", sliderImages);

  console.log("eachPrivateApartment DATA: ", eachPrivateApartment);

  useEffect(() => {
    console.log("aq unda iyos suratebi", privateApartments);
  }, [totalCount, selectedLanguage, complexId]);

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

  const navigate = useNavigate();

  // Assuming `complex` is an object representing each house
  const handleAppartmentClick = (complexId) => {
    navigate(`/eachComplex/${complexId}`);
  };

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
        {DATA.map((complex, index) => (
          <div key={index} className="complexTextsBox">
            <div className="seenIdFavouriteAndOthersBox">
              <div className="seenAndIdBox">
                <p style={{ color: "#838282" }}>Seen: {complex.seen}</p>
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
                    onClick={toggleSwitch}
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
              <p style={{ color: "#ccc", fontSize: "20px" }}>
                {" "}
                {eachPrivateApartment?.internalComplexName}
              </p>
              <p style={{ color: "#838289" }}>
                {eachPrivateApartment &&
                  eachPrivateApartment.apartments &&
                  eachPrivateApartment.apartments.length > 0 &&
                  eachPrivateApartment.apartments[0]?.address.city}
              </p>
              <p style={{ color: "#838289" }}>
                {eachPrivateApartment &&
                  eachPrivateApartment.apartments &&
                  eachPrivateApartment.apartments.length > 0 &&
                  `${eachPrivateApartment.apartments[0]?.address.streetName}, ${eachPrivateApartment.apartments[0]?.address.city}`}
              </p>

              <p style={{ color: "#838282" }}>
                {" "}
                {eachPrivateApartment?.adress}
              </p>
              <p style={{ color: "#ccc", fontSize: "20px" }}>
                m²-ის ფასი {eachPrivateApartment?.pricePerSqMeter}$-დან
              </p>
            </div>

            <div className="chabarebaPartebiKorpusebi">
              {/* ქვედა, მეორე ტექსტია.. ჩაბარება, Fართები... სართულიანობა */}
              <div className="eachTextOnListTexts">
                <p style={{ color: "#C2BFBF" }}> ჩაბარება </p>
                <p style={{ color: "#C2BFBF" }}> ფართები</p>
                <p style={{ color: "#C2BFBF" }}> ბინების რ-ობა</p>
                <p style={{ color: "#C2BFBF" }}> კორპუსები</p>
                <p style={{ color: "#C2BFBF" }}> სართულიანობა</p>
              </div>

              <div className="eachTextOnListTextsTwo">
                <p style={{ color: "#FFFFFF" }}>
                  {eachPrivateApartment?.finishYear}
                </p>
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
                  {phoneNumber && showFullNumber
                    ? phoneNumber
                    : phoneNumber
                        ?.slice(0, -2)
                        .padEnd(phoneNumber?.length, "*")}
                </p>
                <button
                  onClick={handleToggleNumberDisplay}
                  className="numberSHowButton"
                >
                  ნომრის
                  <br /> ჩვენება
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
                  ზარის
                  <br /> მოთხოვნა
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* ---------- */}
      {console.log(
        "eachPrivateApartment",
        eachPrivateApartment.internal_complex_name?.rank
      )}

      {/* ბინების და გეგმარებების ცამოსაშლელი ბოქსი */}
      <div className="binebiDaGegmarebaFullBox">
        {/* ბინები და ყველა აპარტამენტის ტექსტი და ბათონი */}
        <div className="firstBoxOfBinebi">
          <p style={{ color: "#FFFFFF" }}>ბინები და გეგმარება</p>
          <button className="numberSHowButton" onClick={handleShowHideClick}>
            All appartments(12)
            {showApartments ? (
              <img src={arrowUp} style={{ width: "20px", marginLeft: "5px" }} />
            ) : (
              <img src={arrowDown} style={{ width: "30px" }} />
            )}
          </button>
        </div>
        {/* ფილტრაცია (start) */}
        <div className="private_filter_conteiner">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="filter_cont_for_physical ">
              {/* button for filtering space */}
              <div className="button-modal-container ">
                <div
                  onClick={handle_P_SpaceButtonClick}
                  className="space_button"
                >
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
                <div
                  onClick={handle_P_PriceButtonClick}
                  className="space_button"
                >
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
            </div>
          </motion.div>
        </div>
        {/* ---------- (end ფილტრაცია ბოქსი) */}

        {/* ეს დივი არის გეგმარებები რომ ჩამოიშალოს... */}
        {showApartments && (
          <div className="allCards_physical paddingForEachComplexCardBox">
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
                        {favorites.some(
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
                      {
                        car_settings_language_change(selectedLanguage)
                          .square_from
                      }
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
        )}
        {/* ------------ */}

        {/* ეს დივი არის ..კომპლექსის შესახებ'' ესეთი წარწერა რომაა და true/false-ის მეშვეობით
        რომ ვფილტრავთ, მაგალითად სართულების ოდენობა, კამერა, ოთახები და ა.შ. */}
        <div style={{ height: "300px", backgroundColor: "gray" }}>
          <p>hi</p>
          <p>hi</p>
          <p>hi</p>
          <p>hi</p>
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
