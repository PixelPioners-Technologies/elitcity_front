import "./EachPrivateAppartment.css";
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
import { useLocation } from "react-router-dom";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import private_apartment_location_icon from "../location_icons/private_apartment2.png";
import metro from "../assets/Metro.svg";
import aptiaqi from "../assets/Aptiaqi.svg";
import supermarket from "../assets/Supermarket.svg";
import skveri from "../assets/skveri.svg";


const normalizePrivateApartmentData = (data, lang) => {
  return {
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

    rooms: data.internal_private_apartment_name.rooms,
    kitchen: data.internal_private_apartment_name.kitchen,
    Bathroom: data.internal_private_apartment_name.Bathroom,
    bedroom: data.internal_private_apartment_name.bedroom,
    Balcony: data.internal_private_apartment_name.Balcony,


    metro: data.internal_private_apartment_name.metro,
    pharmacy: data.internal_private_apartment_name.pharmacy,
    supermarket: data.internal_private_apartment_name.supermarket,
    square: data.internal_private_apartment_name.square,


    address: {
      city: data[`private_apartment_address_${lang}`][`city_${lang}`],
      parentDistrict:
        data[`private_apartment_address_${lang}`][`pharentDistrict_${lang}`],
      district: data[`private_apartment_address_${lang}`][`district_${lang}`],
      streetName:
        data[`private_apartment_address_${lang}`][`street_name_${lang}`],
      address: data[`private_apartment_address_${lang}`][`address_${lang}`],
      latitude: data[`private_apartment_address_${lang}`].latitude,
      longitude: data[`private_apartment_address_${lang}`].longitude,
    },
    images: data.private_apartment_images,
    privateApartmentName: data[`private_apartment_name_${lang}`],
    about: data[`about_${lang}`],
  };
};

export default function EachPrivateAppartment({
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
  const [ground, setGround] = useState({});
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
      const normadata = normalizePrivateApartmentData(data, selectedLanguage);
      setGround(normadata);
      console.log(data)
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
    console.log("Updated ground:", ground);
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
      location: "location",
      area: "Area",
      rank: "rank",
      nex_button: "Next",
      previous_button: "Previous",
      show_mobile_number: "Show nuber",
      request_call: "Call request",
      status: "Status",
      views: "Views",
      description: 'Description',

      rooms: 'Rooms',
      kitchen: 'Kitchen',
      Bathroom: 'Bathroom',
      bedroom: 'Bedroom',
      Balcony: 'Balcony',

      metro: "Metro",
      pharmacy: "Pharmacy",
      supermarket: "Supermarket",
      square: "Square",
      nearObjects: "Near Objects",

    };

    switch (lang) {
      case "en":
        languageInfo.square_price = "Price per M²";
        languageInfo.location = "Location";
        languageInfo.area = "Area";
        languageInfo.rank = "rank";
        languageInfo.nex_button = "Next";
        languageInfo.previous_button = "Previous";
        languageInfo.show_mobile_number = "Show nuber";
        languageInfo.request_call = "Call request";
        languageInfo.status = "Status";
        languageInfo.views = "Views";
        languageInfo.description = "Description";

        languageInfo.rooms = "Rooms";
        languageInfo.kitchen = "Kitchen";
        languageInfo.Bathroom = "Bathroom";
        languageInfo.bedroom = "Bedroom";
        languageInfo.Balcony = "Balcony";

        languageInfo.metro = "Metro";
        languageInfo.pharmacy = "Pharmacy";
        languageInfo.supermarket = "Supermarket";
        languageInfo.square = "Square";
        languageInfo.nearObjects = "Near Objects";



        break;

      case "ka":
        languageInfo.square_price = "M² - ის ფასი";
        languageInfo.location = "მდებარეობა";
        languageInfo.area = "ფართი";
        languageInfo.rank = "რანკი";
        languageInfo.nex_button = "შემდეგი";
        languageInfo.previous_button = "წინა";
        languageInfo.show_mobile_number = "ნომრის ჩვენება";
        languageInfo.request_call = "ზარის მოთხოვნა";
        languageInfo.status = "სტატუსი";
        languageInfo.views = "ნახვები";
        languageInfo.description = "აღწერილობა";
        languageInfo.rooms = "ოთახები";
        languageInfo.kitchen = "სამზარეულო";
        languageInfo.Bathroom = "საპირფარეშო";
        languageInfo.bedroom = "საძინებელი";
        languageInfo.Balcony = "აივანი";

        languageInfo.metro = "მეტრო";
        languageInfo.pharmacy = "აფთიაქი";
        languageInfo.supermarket = "სუპერმარკეტი";
        languageInfo.square = "სკვერი";
        languageInfo.nearObjects = "ახლო მდებარე ობიექტები";


        break;

      case "ru":
        languageInfo.square_price = "Цена за м²";
        languageInfo.location = "Расположение";
        languageInfo.area = "Область";
        languageInfo.rank = "Классифицировать";
        languageInfo.nex_button = "Следующий";
        languageInfo.previous_button = "Предыдущий";
        languageInfo.show_mobile_number = "Показать номер";
        languageInfo.request_call = "Запрос на звонок";
        languageInfo.status = "Положение дел";
        languageInfo.views = "Взгляды";
        languageInfo.description = "Описание";
        languageInfo.rooms = "Номера";
        languageInfo.kitchen = "Кухня";
        languageInfo.Bathroom = "Ванная комната";
        languageInfo.bedroom = "Спальная комната";
        languageInfo.Balcony = "Балкон";

        languageInfo.metro = "Метро";
        languageInfo.pharmacy = "Аптека";
        languageInfo.supermarket = "Супермаркет";
        languageInfo.square = "Площадь";
        languageInfo.nearObjects = "Близкие объекты";

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

  const squareSymbol = "\u00B2";

  const mapcenter = {
    lat: ground.address?.latitude || 41.7151,
    lng: ground.address?.longitude || 44.8271,
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

  const scalesize = new window.google.maps.Size(40, 40);

  return (
    <div className="eachComplexBox">
      <div className="imageAndTextInfos">
        {/* Complexes photos info */}
        {/* <div className="imageSliderBoxS"> */}
        {/* <div className="carusel_buttons"> */}
        {/* <button className="Btn" onClick={handlePrevious} >
              {handleStaticTextLanguageChange(selectedLanguage).previous_button}
            </button> */}
        {/* <button className="Btn" onClick={handleNext} >
              {handleStaticTextLanguageChange(selectedLanguage).nex_button}
            </button> */}
        {/* </div> */}
        {/* </div> */}
        <div className="lands_image">
          {wordData && ( // Check if wordData is not null/undefined before rendering
            <img
              id="lands_image"
              src={wordData.value}
              alt={`Complex ${wordData.id}`}
              height="450"
              width="711"
              className={clickedIndex !== null ? "clicked" : ""}
            />
          )}

          <div className="miniImagesBoxS">
            <button className="Btn" onClick={handlePrevious}>
              {handleStaticTextLanguageChange(selectedLanguage).previous_button}
            </button>
            {sliderImages
              .slice(carouselPosition, carouselPosition + 4) // Use carouselPosition here
              .map((data, i) => (
                <div className="thumbnail" key={i}>
                  <img
                    className={`${wordData.id === data.id ? "clicked" : ""} ${clickedIndex === i ? "enlarge" : ""
                      }`}
                    src={data.value}
                    alt={`Complex ${data.id}`}
                    onClick={() => handleClick(i + carouselPosition)}
                    height="70"
                    width="100"
                  />
                </div>
              ))}
            <button className="Btn" onClick={handleNext}>
              {handleStaticTextLanguageChange(selectedLanguage).nex_button}
            </button>
          </div>
        </div>
        {/* --------- */}

        {/* complex text info */}
        <div className="ground_all_settind2">
          <div className="seenIdFavouriteAndOthersBox">
            <div className="seenAndIdBox">
              <p style={{ color: "#838282" }}>
                {handleStaticTextLanguageChange(selectedLanguage).views}
              </p>
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
          <div className="ground_settings">
            <h1 style={{ color: "#ccc", fontSize: "20px" }}>
              {" "}
              {ground.privateApartmentName}
            </h1>
            <p style={{ color: "#838289", width: "300px" }}>
              {" "}
              {handleStaticTextLanguageChange(selectedLanguage).location} :{" "}
              {ground.address?.city} ,{ground.address?.streetName}{" "}
            </p>
            <p style={{ color: "#ccc", fontSize: "20px" }}>
              {handleStaticTextLanguageChange(selectedLanguage).square_price}:{" "}
              {currenceChangeState
                ? ground.squarePrice * getCorrencyRate
                : ground.squarePrice}</p>
            <p style={{ color: "#C2BFBF" }}>{handleStaticTextLanguageChange(selectedLanguage).status}: {cardStatusSettingLanguage(selectedLanguage, ground.status)}</p>
            <p style={{ color: "#C2BFBF" }}> {handleStaticTextLanguageChange(selectedLanguage).area} : {ground.area} m²  </p>
            <p style={{ color: "#C2BFBF" }}> {handleStaticTextLanguageChange(selectedLanguage).rank}: {ground.rank}</p>
            <p style={{ color: "#C2BFBF" }}> {handleStaticTextLanguageChange(selectedLanguage).rooms}     :{ground.rooms}   </p>
            <p style={{ color: "#C2BFBF" }}> {handleStaticTextLanguageChange(selectedLanguage).kitchen}  : {ground.kitchen}   </p>
            <p style={{ color: "#C2BFBF" }}>  {handleStaticTextLanguageChange(selectedLanguage).Bathroom}  :{ground.Bathroom}   </p>
            <p style={{ color: "#C2BFBF" }}> {handleStaticTextLanguageChange(selectedLanguage).bedroom} : {ground.bedroom}   </p>
            <p style={{ color: "#C2BFBF" }}>  {handleStaticTextLanguageChange(selectedLanguage).Balcony}  :{ground.Balcony}   </p>

          </div>
          {/* დარეკვისა და ნომრის ჩვენების სექცია */}
          <div className="numberAndCallRequestBox">
            <div className="numberBox">
              <img src={phoneImage} style={{ width: "40px" }} alt="phone" />
              <p style={{ color: "#FFFFFF" }}>032 22 23 **</p>
              <button className="numberSHowButton">
                {
                  handleStaticTextLanguageChange(selectedLanguage)
                    .show_mobile_number
                }
              </button>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              // whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="callRequestBox">
                <img
                  src={headSetImage}
                  style={{ width: "40px" }}
                  alt="headset"
                />
                <button
                  className="numberSHowButton"
                  onClick={handleCallButtonClick}
                >
                  {
                    handleStaticTextLanguageChange(selectedLanguage)
                      .request_call
                  }
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      {/* ---------- */}
      {/* ---------- */}
      <div className="about_and_map_P">
        <div className="aboud_and_map_child_container_P">
          {/* about container  */}
          <div>
            <h1 className='about_land_header_P' > {handleStaticTextLanguageChange(selectedLanguage).description} </h1>
            <p className='about_land_P' >
              {ground.about}
            </p>
          </div>

          {/* map container */}
          <div className="child_map_container_P">
            <GoogleMap
              mapContainerStyle={{ height: "300px" }}
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

        <div className="textBoxOfAxloMdebare">
          {/* (START) ახლო მდებარე ობიექტები box */}
          <div className="textBoxOfH4axloMdebareObieqtebi">
            <h4 style={{ color: "white" }}>
              {handleStaticTextLanguageChange(selectedLanguage).nearObjects}
            </h4>
          </div>
          <div className="iconAndItsText">
            {ground?.metro && (
              <>
                <img src={metro} alt="metro" />
                <p>
                  {
                    handleStaticTextLanguageChange(selectedLanguage)
                      .metro
                  }
                </p>
              </>
            )}
          </div>
          <div className="iconAndItsText">
            {ground?.supermarket && (
              <>
                <img src={supermarket} alt="supermarket" />
                <p>
                  {
                    handleStaticTextLanguageChange(selectedLanguage)
                      .supermarket
                  }
                </p>
              </>
            )}
          </div>
          <div className="iconAndItsText">
            {ground?.pharmacy && (
              <>
                <img src={aptiaqi} alt="aptiaqi" />
                <p>
                  {
                    handleStaticTextLanguageChange(selectedLanguage)
                      .pharmacy
                  }
                </p>
              </>
            )}
          </div>
          <div className="iconAndItsText">
            {ground?.square && (
              <>
                <img src={skveri} alt="skveri" />
                <p>
                  {
                    handleStaticTextLanguageChange(selectedLanguage)
                      .square
                  }
                </p>
              </>
            )}
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
