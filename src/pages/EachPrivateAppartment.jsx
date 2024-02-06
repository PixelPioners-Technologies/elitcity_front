import './EachGround.css'
import "./EachComplex.css";
import { motion } from "framer-motion";
import lari from "../assets/lari-svgrepo-com.svg";
import dollar from "../assets/dollar-svgrepo-com.svg";
import star from "../assets/Star for Each Complex Page.svg";
import share from "../assets/ShareImage.svg";
import phoneImage from "../assets/🦆 icon _phone_.svg";
import headSetImage from "../assets/🦆 icon _headset_.svg";
import { BaseURLs } from "../App";
import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';


const normalizePrivateApartmentData = (data, lang) => {
  return ({
    id: data.id,
    internalName:
      data.internal_private_apartment_name.internal_private_apartment_name,
    numberOfRooms: data.internal_private_apartment_name.number_of_rooms,
    status: data.internal_private_apartment_name.status,
    area: data.internal_private_apartment_name.area,
    fullPrice: data.internal_private_apartment_name.full_price,
    squarePrice: data.internal_private_apartment_name.square_price,
    floorNumber: data.internal_private_apartment_name.floor_number,
    isAvailable: data.internal_private_apartment_name.is_available,
    visibility: data.internal_private_apartment_name.visibiliti,
    rank: data.internal_private_apartment_name.rank,
    address: {
      city: data[`private_apartment_address_${lang}`][`city_${lang}`],
      parentDistrict: data[`private_apartment_address_${lang}`][`pharentDistrict_${lang}`],
      district: data[`private_apartment_address_${lang}`][`district_${lang}`],
      streetName: data[`private_apartment_address_${lang}`][`street_name_${lang}`],
      address: data[`private_apartment_address_${lang}`][`address_${lang}`],
      latitude: data[`private_apartment_address_${lang}`].latitude,
      longitude: data[`private_apartment_address_${lang}`].longitude,
    },
    images: data.private_apartment_images,
    privateApartmentName: data[`private_apartment_name_${lang}`],
    testPrivateField: data[`test_private_field_${lang}`],
  });
};

export default function EachPrivateAppartment({ selectedLanguage, favorites, favoriteHandler, handleCallButtonClick }) {
  const [carouselPosition, setCarouselPosition] = useState(0);
  const [ground, setGround] = useState({})
  const [private_apartment, setPrivate_apartment] = useState({});
  const [sliderImages, setSliderImages] = useState([]);

  const [wordData, setWordData] = useState(null);
  const [val, setVal] = useState(0);
  const [clickedIndex, setClickedIndex] = useState(null);

  // ---------------------------------  id  --------------------------------------------------
  const location = useLocation();
  const { p_apartment_id } = location.state || {}; // Ensure fallback to prevent errors if state is undefined
  // ---------------------------------------------------------------------------------------------------------------
  
  
  
  
  // ------------------------------------axios for fetching private apartments -----------------------------------------
  useEffect(() => {
    const fetcPrivateApartments = async () => {
      const requestUrl = `${BaseURLs.private_apartment}${selectedLanguage}/${p_apartment_id}`;
      const response = await axios.get(requestUrl);
      const data = response.data;
      const normadata = normalizePrivateApartmentData(data, selectedLanguage)
      setGround(normadata)

      // Update sliderImages state with all images from the fetched data
      const sliderImagesFromData = normadata.images.map((imgUrl, index) => ({
        id: index,
        value: imgUrl, // Directly using the URL from the JSON data
      }));
      setSliderImages(sliderImagesFromData); // Update the state
      setWordData(sliderImagesFromData[0] || null); // Initialize with the first image or null if empty
    };
    fetcPrivateApartments();
  }, [selectedLanguage]);


  useEffect(() => {
    console.log('Updated ground:' , ground);
  }, [ground]); // This effect will run after 'ground' has been updated


  // ---------------------------------------------------------------------------------------------

  const cardStatusSettingLanguage = (lang, status) => {
    const statusLanguageInfo = {
      en: {
        1: "Newly renovated",
        2: "With old repairs",
        3: "To be repairedd",
      },
      ka: {
        // Assuming 'ka' stands for another language, e.g., Georgian
        1: "ახალ გარემონტებულო",
        2: "ძველი რემონტით",
        3: "სარემონტო",
      },
      ru: {
        // Assuming 'ru' stands for Russian
        1: "Недавно отремонтированный",
        2: "Со старым ремонтом",
        3: "Подлежит ремонту",
      },
      // Add more languages as needed
    };

    // Get the status descriptions for the current language
    const currentLanguageStatusInfo = statusLanguageInfo[lang];

    // Return the status description based on the status value
    return currentLanguageStatusInfo[status];
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

  

  const handleStaticTextLanguageChange = (lang) => {
    var languageInfo = {
      square_price: "Price per M²",
      location: 'location',
      area: 'Area',
      rank: 'rank',
      nex_button: 'Next',
      previous_button: 'Previous',
      show_mobile_number: "Show nuber",
      request_call: "Call request",
      status: "Status",
      views: "Views"
    };

    switch (lang) {
      case "en":
        languageInfo.square_price = "Price per M²";
        languageInfo.location = 'Location';
        languageInfo.area = 'Area';
        languageInfo.rank = 'rank';
        languageInfo.nex_button = 'Next';
        languageInfo.previous_button = 'Previous';
        languageInfo.show_mobile_number = "Show nuber";
        languageInfo.request_call = "Call request";
        languageInfo.status = "Status";
        languageInfo.views = "Views";
        break;

      case "ka":
        languageInfo.square_price = "M² - ის ფასი";
        languageInfo.location = 'მდებარეობა';
        languageInfo.area = 'ფართი';
        languageInfo.rank = 'რანკი';
        languageInfo.nex_button = 'შემდეგი';
        languageInfo.previous_button = 'წინა';
        languageInfo.show_mobile_number = "ნომრის ჩვენება";
        languageInfo.request_call = "ზარის მოთხოვნა";
        languageInfo.status = "სტატუსი";
        languageInfo.views = "ნახვები";
        break;

      case "ru":
        languageInfo.square_price = "Цена за м²";
        languageInfo.location = 'Расположение';
        languageInfo.area = 'Область';
        languageInfo.rank = 'Классифицировать';
        languageInfo.nex_button = 'Следующий';
        languageInfo.previous_button = 'Предыдущий';
        languageInfo.show_mobile_number = "Показать номер";
        languageInfo.request_call = "Запрос на звонок";
        languageInfo.status = "Положение дел";
        languageInfo.views = "Взгляды";
        break;
    }
    return languageInfo;
  };


  // ---------------------------------------------------------------------------------------------


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
    setWordData(sliderImages[newIndex]);
  };

  const handlePrevious = () => {
    const newIndex = val > 0 ? val - 1 : sliderImages.length - 1; // Cycle to the end if at the start
    setVal(newIndex);
    setWordData(sliderImages[newIndex]);
  };


  // for toggle DOllar AND LARI ---==---(START)
  const [isOn, setIsOn] = useState(false);
  const toggleSwitch = () => setIsOn(!isOn);
  // -----===--------(END)


  const squareSymbol = "\u00B2";



  return (
    <div className="eachComplexBox">
      <div className="imageAndTextInfos">
        {/* Complexes photos info */}
        <div className="imageSliderBox">
          <div className="bigImageBox">
            {wordData && ( // Check if wordData is not null/undefined before rendering
              <img
                src={wordData.value}
                alt={`Complex ${wordData.id}`}
                height="450"
                width="711"
                className={clickedIndex !== null ? "clicked" : ""}
              />
            )}
            <div className="carusel_buttons">
              <button className="Btn" onClick={handlePrevious} >
                {handleStaticTextLanguageChange(selectedLanguage).previous_button}
              </button>
              <button className="Btn" onClick={handleNext} >
                {handleStaticTextLanguageChange(selectedLanguage).nex_button}
              </button>
            </div>
          </div>

          <div className="miniImagesBox">
            {sliderImages
              .slice(carouselPosition, carouselPosition + 4) // Use carouselPosition here
              .map((data, i) => (
                <div className="thumbnail" key={i}>
                  <img
                    className={`${wordData.id === data.id ? "clicked" : ""} ${clickedIndex === i ? "enlarge" : ""}`}
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
        <div className="ground_all_settind">
          <div className="seenIdFavouriteAndOthersBox">
            <div className="seenAndIdBox">
              <p style={{ color: "#838282" }}>{handleStaticTextLanguageChange(selectedLanguage).views}</p>
              <p style={{ color: "#838282" }}>ID: {ground.id}</p>
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
          <div className="ground_settings">
            <h1 style={{ color: "#ccc", fontSize: "20px" }}>  {ground.privateApartmentName}</h1>
            <p style={{ color: "#838289", width: '300px' }}> {handleStaticTextLanguageChange(selectedLanguage).location} : {ground.address?.city} ,{ground.address?.streetName} </p>
            <p style={{ color: "#ccc", fontSize: "20px" }}>  {handleStaticTextLanguageChange(selectedLanguage).square_price} : {ground.squarePrice}</p>
            <p style={{ color: "#C2BFBF" }}>{handleStaticTextLanguageChange(selectedLanguage).status}: {cardStatusSettingLanguage(selectedLanguage, ground.status)}</p>
            <p style={{ color: "#C2BFBF" }}> {handleStaticTextLanguageChange(selectedLanguage).area} : {ground.area} m²  </p>
            <p style={{ color: "#C2BFBF" }}> {handleStaticTextLanguageChange(selectedLanguage).rank}: {ground.rank}</p>


          </div>
          {/* დარეკვისა და ნომრის ჩვენების სექცია */}
          <div className="numberAndCallRequestBox">
            <div className="numberBox">
              <img src={phoneImage} style={{ width: "40px" }} alt="phone" />
              <p style={{ color: "#FFFFFF" }}>032 22 23 **</p>
              <button className="numberSHowButton">
                {handleStaticTextLanguageChange(selectedLanguage).show_mobile_number}
              </button>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              // whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className="callRequestBox">
                <img
                  src={headSetImage}
                  style={{ width: "40px" }}
                  alt="headset"
                />
                <button className="numberSHowButton" onClick={handleCallButtonClick} >
                  {handleStaticTextLanguageChange(selectedLanguage).request_call}
                </button>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
      {/* ---------- */}

    </div>
  );
}

const spring = {
  type: "spring",
  stiffness: 100,
  damping: 30,
};
