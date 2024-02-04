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

// ------------------
import "./Physical.css";
import axios from "axios";
import { useState, useEffect } from "react";
import P_PriceModal from "../modals for private page/P_PriceModal";
import P_SpaceModal from "../modals for private page/P_SpaceModal";
import P_StatusModal from "../modals for private page/P_StatusModa";
import button_icon from "../icons/Vector.svg";

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
    address: {
      city: item[`private_apartment_address_${lang}`].city_en,
      pharentDistrict:
        item[`private_apartment_address_${lang}`].pharentDistrict_en,
      district: item[`private_apartment_address_${lang}`].district_en,
      streetName: item[`private_apartment_address_${lang}`].street_name_en,
      address: item[`private_apartment_address_${lang}`].address_en,
      latitude: item[`private_apartment_address_${lang}`].latitude,
      longitude: item[`private_apartment_address_${lang}`].longitude,
    },
    images: item.private_apartment_images,
    privateApartmentName: item[`private_apartment_name_${lang}`],
    testPrivateField: item[`test_private_field_${lang}`],
  }));
};

import img1 from "../assets/ComplexesPhotos/0zzz.jpg";
import img2 from "../assets/ComplexesPhotos/1zz.jpg";
import img3 from "../assets/ComplexesPhotos/2zz.jpg";
import img4 from "../assets/ComplexesPhotos/3zz.jpg";
import img5 from "../assets/ComplexesPhotos/4zz.jpg";
import img6 from "../assets/ComplexesPhotos/5zz.jpg";

export default function EachComplex({ selectedLanguage }) {
  const [carouselPosition, setCarouselPosition] = useState(0);

  const sliderImages = [
    { id: 1, value: img1 },
    { id: 2, value: img2 },
    { id: 3, value: img3 },
    { id: 4, value: img4 },
    { id: 5, value: img5 },
    { id: 6, value: img6 },
  ];

  const [wordData, setWordData] = useState(sliderImages[0]);
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

  console.log("hello");
  // ------------------------------------axios for fetching private apartments -----------------------------------------

  const BaseURL_Private = "https://api.storkhome.ge/privateapartments/";

  useEffect(() => {
    const fetcPrivateApartments = async () => {
      // const cityParam = `address_${selectedLanguage}__city_${selectedLanguage}__city_${selectedLanguage}__icontains`;
      // const pharentdistrictParams =  `address_${selectedLanguage}__pharentDistrict_${selectedLanguage}__pharentDistrict_${selectedLanguage}__in`;
      // const districtParams = `address_${selectedLanguage}__district_${selectedLanguage}__district_${selectedLanguage}__in`;

      const cityParam = `city`;

      const limit = 12; // Define the limit or make it dynamic as per your requirement
      const offset = (currentPage - 1) * limit;

      let queryParams = new URLSearchParams({
        [cityParam]: selectedCity,
        min_square_price: min_square_price,
        max_square_price: max_square_price,
        min_full_price: minFullPrice,
        max_full_price: maxFullPrice,
        min_area: min_area,
        max_area: max_area,
        limit: limit,
        offset: offset,
      });

      if (selectedStatuses && selectedStatuses.length > 0) {
        selectedStatuses.forEach((status) => {
          queryParams.append("status", status);
        });
      }

      const queryString = queryParams.toString();
      const requestUrl = `${BaseURL_Private}${selectedLanguage}/?${queryString}`;

      const response = await axios.get(requestUrl);
      const data = response.data.results;
      const normalised_Data = normalizePrivateApartmentData(
        data,
        selectedLanguage
      );
      setPrivateApartments(normalised_Data);
      setTotalCount(response.data.total_items);
      setCorrentPage(response.data.current_page);
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
  ]);

  useEffect(() => {
    console.log("aq unda iyos suratebi", privateApartments);
  }, [totalCount, selectedLanguage]);

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
    let index = val < sliderImages.length - 1 ? val + 1 : val;
    setVal(index);
    const wordSlider = sliderImages[index];
    setWordData(wordSlider);
    setCarouselPosition(
      (prevPosition) => (prevPosition + 1) % sliderImages.length
    );
  };

  const handlePrevious = () => {
    let index = val <= sliderImages.length - 1 && val > 0 ? val - 1 : val;
    setVal(index);
    const wordSlider = sliderImages[index];
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

  // სტილების მაგივრად

  return (
    <div className="eachComplexBox">
      <div className="imageAndTextInfos">
        {/* Complexes photos info */}
        <div className="imageSliderBox">
          <div className="bigImageBox">
            <button className="btns" onClick={handlePrevious}>
              P
            </button>
            <img
              src={wordData.value}
              alt={`Complex ${wordData.id}`}
              height="450"
              width="711"
              className={clickedIndex !== null ? "clicked" : ""}
            />
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
                {complex.title}
              </p>
              <p style={{ color: "#838289" }}> {complex.city}</p>
              <p style={{ color: "#838282" }}> {complex.adress}</p>
              <p style={{ color: "#ccc", fontSize: "20px" }}>
                m²-ის ფასი {complex.price}$-დან
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
                <p style={{ color: "#FFFFFF" }}> {complex.city}</p>
                <p style={{ color: "#FFFFFF" }}> {complex.city}</p>
                <p style={{ color: "#FFFFFF" }}> {complex.city}</p>
                <p style={{ color: "#FFFFFF" }}> {complex.city}</p>
                <p style={{ color: "#FFFFFF" }}> {complex.city}</p>
              </div>
            </div>
            {/* დარეკვისა და ნომრის ჩვენების სექცია */}
            <div className="numberAndCallRequestBox">
              <div className="numberBox">
                <img src={phoneImage} style={{ width: "40px" }} alt="phone" />
                <p style={{ color: "#FFFFFF" }}>032 22 23 **</p>
                <button className="numberSHowButton">
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
                <button className="numberSHowButton">
                  ზარის
                  <br /> მოთხოვნა
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* ---------- */}

      {/* ბინების და გეგმარებების ცამოსაშლელი ბოქსი */}
      <div className="binebiDaGegmarebaFullBox">
        {/* ბინები და ყველა აპარტამენტის ტექსტი და ბათონი */}
        <div className="firstBoxOfBinebi">
          <p style={{ color: "#FFFFFF" }}>ბინები და გეგმარება</p>
          <button className="numberSHowButton">All appartments(12) </button>
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
      </div>
    </div>
  );
}

const spring = {
  type: "spring",
  stiffness: 100,
  damping: 30,
};
