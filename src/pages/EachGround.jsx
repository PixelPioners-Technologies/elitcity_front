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
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import ground_location_icon from '../location_icons/ground_location_icon.png'


const normalizeGroundData = (data, lang) => {
  return ({
    id: data.id,
    internalName: data.internal_ground_name.internal_ground_name,
    area: data.internal_ground_name.area,
    fullPrice: data.internal_ground_name.full_price,
    squarePrice: data.internal_ground_name.square_price,
    status: data.internal_ground_name.status,
    rank: data.internal_ground_name.rank,
    isAvailable: data.internal_ground_name.is_available,
    visibility: data.internal_ground_name.visibiliti,
    address: {
      city: data[`ground_address_${lang}`][`city_${lang}`],
      parentDistrict: data[`ground_address_${lang}`][`pharentDistrict_${lang}`],
      district: data[`ground_address_${lang}`][`district_${lang}`],
      streetName: data[`ground_address_${lang}`][`street_name_${lang}`],
      address: data[`ground_address_${lang}`][`address_${lang}`],
      latitude: data[`ground_address_${lang}`].latitude,
      longitude: data[`ground_address_${lang}`].longitude,
    },
    groundName: data[`ground_name_${lang}`],
    images: data.ground_images,
  });
};

export default function EachGround({
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
  const [ground, setGround] = useState({})
  const [sliderImages, setSliderImages] = useState([]);


  // ---------------------------------  id  --------------------------------------------------
  const location = useLocation();
  const { prev_apartments } = location.state || {}; // Ensure fallback to prevent errors if state is undefined
  // --------------------------------------------------------------------------------------

  const [wordData, setWordData] = useState(null);
  const [val, setVal] = useState(0);
  const [clickedIndex, setClickedIndex] = useState(null);


  // ------------------------------------axios for fetching private apartments -----------------------------------------


  useEffect(() => {
    const fetcPrivateApartments = async () => {
      const requestUrl = `${BaseURLs.ground}${selectedLanguage}/${prev_apartments}`;
      const response = await axios.get(requestUrl);
      const data = response.data;
      const normadata = normalizeGroundData(data, selectedLanguage)
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
    console.log('Updated ground:', ground.address?.city);
  }, [ground]); // This effect will run after 'ground' has been updated


  // ---------------------------------------------------------------------------------------------

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
      views: "Views",
      description: 'Description'
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
        languageInfo.description = "Description";
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
        languageInfo.description = "აღწერილობა";
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
        languageInfo.description = "Описание";
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
  // const [isOn, setIsOn] = useState(false);
  // const toggleSwitch = () => setIsOn(!isOn);
  // // -----===--------(END)


  // const squareSymbol = "\u00B2";

  const mapcenter = {
    lat: ground.address?.latitude,
    lng: ground.address?.longitude,
  }


  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDxK-BSMfOM2fRtkTUMpRn5arTyUTR03r0",
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const scalesize = new window.google.maps.Size(40, 40)

  return (
    <div className="eachComplexBox">
      <div className="imageAndTextInfos">
        <div className="carusel_buttons">
          <button className="Btn" onClick={handlePrevious} >
            {handleStaticTextLanguageChange(selectedLanguage).previous_button}
          </button>
          <button className="Btn" onClick={handleNext} >
            {handleStaticTextLanguageChange(selectedLanguage).nex_button}
          </button>
        </div>
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
                  onClick={() => { toggleSwitch(); HandleStateChange() }}
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
            <h1 style={{ color: "#ccc", fontSize: "20px" }}>  {ground.groundName}</h1>
            <p style={{ color: "#838289", width: '300px' }}> {handleStaticTextLanguageChange(selectedLanguage).location} : {ground.address?.city} ,{ground.address?.streetName} </p>
            <p style={{ color: "#ccc", fontSize: "20px" }}>
              {handleStaticTextLanguageChange(selectedLanguage).square_price}:{currenceChangeState
                ? ground.squarePrice * getCorrencyRate
                : ground.squarePrice}</p>
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
      <div className='about_and_map' >
        <div className='aboud_and_map_child_container' >
          {/* about container  */}
          <div>
            <h1 className='about_land_header' > {handleStaticTextLanguageChange(selectedLanguage).description} </h1>
            <p className='about_land' >
              What is Lorem Ipsum?
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              It has survived not only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
              sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
              Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </div>

          {/* map container */}
          <div className='child_map_container' >
            <GoogleMap
              mapContainerStyle={{ height: '300px' }}
              center={mapcenter}
              zoom={16}
              options={{
                gestureHandling: "none",
                zoomControl: false,
                scrollwheel: false,
                disableDoubleClickZoom: true,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
              }}
            >
              <Marker
                key={ground.id}
                position={{
                  lat: ground.address?.latitude,
                  lng: ground.address?.longitude,
                }}
                icon={{
                  url: ground_location_icon,
                  scaledSize: scalesize
                }}
              />
            </GoogleMap>
          </div>

        </div>


      </div>
    </div>
  );
}

const spring = {
  type: "spring",
  stiffness: 100,
  damping: 30,
};
