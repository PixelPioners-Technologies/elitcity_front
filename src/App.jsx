/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import "./App.css";
import Header from "./Components/Header/Header";
import { Route, Routes, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import HomePage from "./pages/HomePage";
import Complex from "./pages/Complex";
import Lots from "./pages/Lots";
import Developers from "./pages/Developers";
import Map from "./pages/Map";
import Sales from "./pages/Sales";
import FavoriteComplex from "./pages/FavoriteComplex";
import Nothing from "./pages/Nothing";
import Physical from "./pages/Physical";
import Articles from "./pages/Articles";
import Storkhome from "./pages/Storkhome";
import axios from "axios";
import EachComplex from "./pages/EachComplex";
import EachGround from "./pages/EachGround";
import EachPrivateAppartment from "./pages/EachPrivateAppartment";
import Call_Modal from "./Modals_for_stokhome_plus/Call_Modal";
import headphone_icon from "./icons/headphones.png";
// import { color } from "framer-motion";
import { motion } from "framer-motion";
import cancel_icon from "./icons/cancel.png";
import EachApartment from "./pages/EachApartment";
import EachBlog from "./pages/EachBlog";
import Each_Developer from "./pages/Each_Developer";
// import storkhome__logo from "./company_logo/storkhome__logo.png";
import storkhome__logo from "../src/assets/11111111111111111.svg";

import Facebook from "./Facebook";
import Footer from "./pages/Footer";




const gTagId = import.meta.env.VITE_G_TAG_ID;



const safeGtagCall = (action, ...params) => {
  if (typeof window.gtag === 'function') {
    window.gtag(action, ...params);
  } else {
    console.warn('gtag not initialized');
    // Optionally, you could queue these calls to be made once gtag is initialized
  }
};

const usePageTracking = () => {
  const location = useLocation();
  useEffect(() => {
    const pagePath = location.pathname + location.search;
    safeGtagCall("config", gTagId, {
      page_path: pagePath,
    });
  }, [location]);
};

function trackButtonClick(buttonName) {
  safeGtagCall("event", "click", {
    event_category: "Header",
    event_label: buttonName,
  });
}







const BaseURLs = {
  complex: "https://api.storkhome.ge/complex/",
  company: "https://api.storkhome.ge/company/",
  apartment: "https://api.storkhome.ge/apartment/",
  private_apartment: "https://api.storkhome.ge/privateapartments/",
  ground: "https://api.storkhome.ge/ground/",
  promotion: "https://api.storkhome.ge/promotions/",
  blog: "https://api.storkhome.ge/blog/",
  map: "https://api.storkhome.ge/map/",
  complex_and_apartments: "https://api.storkhome.ge/complexandappartments/",
  company_and_complex: "https://api.storkhome.ge/companycomplex/",
  proxy: "https://api.storkhome.ge/proxy/",
  ids: "https://api.storkhome.ge/",
};

export { BaseURLs };

//--ეს ლოგიკსა უზრუნველყოფს მოსული ინფორმაციის ფილდების გადაკეთებას, რადგან ენის სვლილებისას იცვლება მათი ფილდების სახელებიც--
// zz

const normalizeComplexData = (data, lang) => {
  return data.map((item) => ({
    id: item.id,
    complexName: item[`complex_name_${lang}`],
    internalComplexName: item.internal_complex_name.internal_complex_name,
    typeOfRoof: item[`type_of_roof_${lang}`],
    address: {
      street: item[`address_${lang}`][`address_${lang}`],
      city: item[`address_${lang}`][`city_${lang}`],
      district: item[`address_${lang}`][`district_${lang}`],
      pharentDistrict: item[`address_${lang}`][`pharentDistrict_${lang}`],
      streetName: item[`address_${lang}`][`street_name_${lang}`],
      latitude: item[`address_${lang}`].latitude,
      longitude: item[`address_${lang}`].longitude,
    },
    company: {
      mobile: item[`company_${lang}`].Mobile,
      mobileHome: item[`company_${lang}`].Mobile_Home,
      about: item[`company_${lang}`][`aboutcompany_${lang}`],
      address: item[`company_${lang}`][`address_${lang}`],
      backgroundImage: item[`company_${lang}`].background_image,
      website: item[`company_${lang}`].companyweb,
      email: item[`company_${lang}`].email,
      facebookPage: item[`company_${lang}`].facebook_page,
      logo: item[`company_${lang}`].logocompany,
      name: item[`company_${lang}`][`name_${lang}`],
      isTopCompany: item[`company_${lang}`].topCompany,
      isVisible: item[`company_${lang}`].visibility,
    },
    images: item.image_urls,
    complexDetails: {
      complexLevel: item.internal_complex_name.complex_level,
      finishMonth: item.internal_complex_name.finish_month,
      finishYear: item.internal_complex_name.finish_year,
      isFinished: item.internal_complex_name.status,
      floorNumber: item.internal_complex_name.floor_number,
      numberOfApartments: item.internal_complex_name.number_of_apartments,
      numberOfFloors: item.internal_complex_name.number_of_floors,
      numberOfHouses: item.internal_complex_name.number_of_houses,
      phoneNumber: item.internal_complex_name.phone_number,
      plotArea: item.internal_complex_name.plot_area,
      pricePerSqMeter: item.internal_complex_name.price_per_sq_meter,
      space: item.internal_complex_name.space,
      isVipComplex: item.internal_complex_name.vipComplex,
      isVisible: item.internal_complex_name.visibiliti,

      metro: item.internal_complex_name.metro,
      Pharmacy: item.internal_complex_name.Pharmacy,
      supermarket: item.internal_complex_name.supermarket,
      Square: item.internal_complex_name.Square,
      Description: item.internal_complex_name.Description,

      rank: item.internal_complex_name.rank,
    },
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



function App() {
  usePageTracking();
  useClearLocalStorageWeekly()

  const [forVisible, setForVisible] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("ka");
  const [favorites, setFavorites] = useState([]);
  const [favoritesLots, setFavoritesLots] = useState([]);
  const [favoritesPhysical, setFavoritesPhysical] = useState([]);
  const [favoriteApartment, setFavoriteApartment] = useState([]);

  const [getCorrencyRate, setGetCorrencyRate] = useState(0);

  // ------------------------------steitebi chasawodeblad -----------------------------
  const [complexes, setComplexes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  const [selectedPharentDistricts, setSelectedPharentDistricts] = useState([]);
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  // ===================================================================================================
  const [minPricePerSquareMeter, setMinPricePerSquareMeter] = useState("");
  const [maxPricePerSquareMeter, setMaxPricePerSquareMeter] = useState("");

  const [
    converted_min_price_square_meter,
    setConverted_min_price_square_meter,
  ] = useState(minPricePerSquareMeter);
  const [
    converted_max_price_square_meter,
    setConverted_max_price_square_meter,
  ] = useState(maxPricePerSquareMeter);

  const [minFullPrice, setMinFullPrice] = useState("");
  const [maxFullPrice, setMaxFullPrice] = useState("");

  const [converted_min_full_price, setConverted_min_full_price] =
    useState(minFullPrice);
  const [converted_max_full_price, setConverted_max_full_price] =
    useState(maxFullPrice);
  // ===================================================================================================

  const [min_space, setMin_space] = useState("");
  const [max_space, setMax_space] = useState("");

  const [selectedStatuses, setSelectedStatuses] = useState([]);

  const [searchButton, setSearchButton] = useState(false);

  const [isCallModalOpen, setIsCallModalOpen] = useState(false);

  const [totalPageCount, setTotalPageCount] = useState(0);
  const [currentPage, setCorrentPage] = useState(0);
  const [total_item_number, setTotal_item_number] = useState("");

  // const [homes, setHomes] = useState([]);

  // const [complex_homes, setComplex_homes] = useState([]);

  const [showSplashScreen, setShowSplashScreen] = useState(true);

  const [ascendentPrice, setAscendentPrice] = useState("");
  const [searchInput, setSearchInput] = useState("");

  // -----------------------------------------------------------------------------------------------------

  // -------------------------------funqciebi  steitebis cvlilebistvis ---------------------------------
  const sortingChangeHandler = (data) => {
    setAscendentPrice(data);
  };

  const stringSearchHeandles = (data) => {
    setSearchInput(data);
  };

  const complexChangeHandler = (data) => {
    setComplexes(data);
  };
  const locationsChangeHandler = (data) => {
    setLocations(data);
  };
  const selectedCityChangeHandler = (data) => {
    setSelectedCity(data);
  };
  const selectedPharentDistrictsChangeHandler = (data) => {
    setSelectedPharentDistricts(data);
  };
  const selectedDistrictsChangeHandler = (data) => {
    setSelectedDistricts(data);
  };

  // ------------------==================------------------------------------------------------
  const minPricePerSquareMeterChangeHandler = (data) => {
    setMinPricePerSquareMeter(data);
  };
  const maxPricePerSquareMeterChangeHandler = (data) => {
    setMaxPricePerSquareMeter(data);
  };

  // -----------------------------------------------------------------------------------------------

  const minFullPriceChangeHandler = (data) => {
    setMinFullPrice(data);
  };
  const maxFullPriceChangeHandler = (data) => {
    setMaxFullPrice(data);
  };

  // ---------------===================--------------------------------------------------------

  const min_spacehangeHandler = (data) => {
    setMin_space(data);
  };
  const max_spacehangeHandler = (data) => {
    setMax_space(data);
  };
  const selectedStatusesChangeHandler = (data) => {
    setSelectedStatuses(data);
  };

  const searchButtonhangeHandler = (data) => {
    setSearchButton(data);

    if (minPricePerSquareMeter === "") {
      setConverted_min_price_square_meter("");
    } else {
      const conversionRate = !isOn ? 1 / getCorrencyRate : 1;
      setConverted_min_price_square_meter(
        String(minPricePerSquareMeter * conversionRate)
      );
    }

    if (maxPricePerSquareMeter === "") {
      setConverted_max_price_square_meter("");
    } else {
      const conversionRate = !isOn ? 1 / getCorrencyRate : 1;
      setConverted_max_price_square_meter(
        String(maxPricePerSquareMeter * conversionRate)
      );
    }

    if (minFullPrice === "") {
      setConverted_min_full_price("");
    } else {
      const conversionRate = !isOn ? 1 / getCorrencyRate : 1;
      setConverted_min_full_price(String(minFullPrice * conversionRate));
    }

    if (maxFullPrice === "") {
      setConverted_max_full_price("");
    } else {
      const conversionRate = !isOn ? 1 / getCorrencyRate : 1;
      setConverted_max_full_price(String(maxFullPrice * conversionRate));
    }
  };

  const handleCorrentPageHandler = (data) => {
    setCorrentPage(data);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSetTodalPageCount = (data) => {
    setTotalPageCount(data);
  };

  const handleSetAllItems = (data) => {
    setTotal_item_number(data);
  };

  useEffect(() => {
    const applyFontBasedOnLanguage = (language) => {
      let fontFamily;
      switch (language) {
        case "en":
          fontFamily = "Roboto-Bold, sans-serif";
          break;
        case "ka":
          fontFamily = "Noto Sans Georgian-Bold, sans-serif"; // Ensure the font name is correct and spaces are properly placed
          break;
        case "ru":
          fontFamily = "PT Serif, sans-serif"; // Removed "Bold" assuming you'll control weight separately
          break;
        default:
          fontFamily = "Roboto-Bold, sans-serif"; // Default fallback
      }

      document.body.style.fontFamily = fontFamily;
    };

    applyFontBasedOnLanguage(selectedLanguage);

    // Optional: Reset font family when component unmounts
    return () => {
      document.body.style.fontFamily = "";
    };
  }, [selectedLanguage]);

  // -----------------------------------------------------------------------------------------------------


  useEffect(() => {
    const fetchComplexes = async () => {
      const cityParam = `address_${selectedLanguage}__city_${selectedLanguage}__city_${selectedLanguage}__icontains`;
      const pharentdistrictParams = `address_${selectedLanguage}__pharentDistrict_${selectedLanguage}__pharentDistrict_${selectedLanguage}__in`;
      const districtParams = `address_${selectedLanguage}__district_${selectedLanguage}__district_${selectedLanguage}__in`;
      // Create a URLSearchParams object

      const limit = 12; // Define the limit or make it dynamic as per your requirement
      const offset = (currentPage - 1) * limit;

      let queryParams = new URLSearchParams({
        [cityParam]: selectedCity,
        [pharentdistrictParams]: selectedPharentDistricts.join(","),
        [districtParams]: selectedDistricts.join(","),
        min_price_per_sq_meter: converted_min_price_square_meter,
        max_price_per_sq_meter: converted_max_price_square_meter,
        min_full_price: converted_min_full_price,
        max_full_price: converted_max_full_price,
        min_space: min_space,
        max_space: max_space,
        limit: limit,
        offset: offset,
        ordering: ascendentPrice,
        search: searchInput,
      });

      // Append each status as a separate parameter
      selectedStatuses.forEach((status) => {
        queryParams.append("status", status);
      });

      // Construct the full URL with query parameters
      const queryString = queryParams.toString();
      const requestUrl = `${BaseURLs.complex}${selectedLanguage}/?${queryString}`;
      try {
        const response = await axios.get(requestUrl);
        const normalData = normalizeComplexData(
          response.data.results,
          selectedLanguage
        );
        setComplexes(normalData);

        handleSetTodalPageCount(response.data.total_pages); // Set total number of pages
        handleCorrentPageHandler(response.data.current_page); // Set current page
        handleSetAllItems(response.data.total_items);
      } catch (error) {
        console.error("Error fetching complexes:", error);
      }
    };

    fetchComplexes();


  }, [searchButton, ascendentPrice]);

  // const rank = complexes.map((complex.internal_complex_name.rank) => {

  // }  )

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
  }, [searchButton]);

  // ----------------------------------------------------------------------------------------------

  //-----------------------------------fetch private apartments --------------------------------------

  // ---------------------------language change function --------------------------
  const handleLanguageChange = (languageCode) => {
    setSelectedLanguage(languageCode);
  };
  // -----------------------------------------------------------------------------------------------

  // ---------------------------------functionality for making favorite complexes --------------------
  // favorites infos State (and favorite functionality with local storage)
  // START (favorite functionality)

  // Retrieve saved favorites from localStorage on initial render
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites"));
    if (savedFavorites) {
      setFavorites(savedFavorites);
    }
  }, []);

  // Load favorites from localStorage on initial render FOR COMPLEX
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // favorites functionality
  const favoriteHandler = (complex) => {
    const isAlreadySaved = favorites.some((c) => c.id === complex.id);

    if (isAlreadySaved) {
      const updatedComplexes = favorites.filter((c) => c.id !== complex.id);
      setFavorites(updatedComplexes);
      localStorage.setItem("favorites", JSON.stringify(updatedComplexes)); // Update localStorage
    } else {
      const updatedFavorites = [...favorites, complex];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Update localStorage
    }
  };
  // -----------------------------------------------------------------------------------------------

  // Load favorites from localStorage on initial render FOR LOTS

  // Retrieve saved favorites from localStorage on initial render
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favoritesLots"));
    if (savedFavorites) {
      setFavoritesLots(savedFavorites);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favoritesLots", JSON.stringify(favoritesLots));
  }, [favoritesLots]);

  // favoritesLots functionality
  const favoriteHandlerLots = (complex) => {
    const isAlreadySaved = favoritesLots.some((c) => c.id === complex.id);

    if (isAlreadySaved) {
      const updatedComplexes = favoritesLots.filter((c) => c.id !== complex.id);
      setFavoritesLots(updatedComplexes);
      localStorage.setItem("favoritesLots", JSON.stringify(updatedComplexes)); // Update localStorage
    } else {
      const updatedfavoritesLots = [...favoritesLots, complex];
      setFavoritesLots(updatedfavoritesLots);
      localStorage.setItem(
        "favoritesLots",
        JSON.stringify(updatedfavoritesLots)
      ); // Update localStorage
    }
  };
  // -----------------------------------------------------------------------------------------------

  // Load favorites from localStorage on initial render FOR PHYSICAL JSX

  // Retrieve saved favorites from localStorage on initial render
  useEffect(() => {
    const savedFavorites = JSON.parse(
      localStorage.getItem("favoritesPhysical")
    );
    if (savedFavorites) {
      setFavoritesPhysical(savedFavorites);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "favoritesPhysical",
      JSON.stringify(favoritesPhysical)
    );
  }, [favoritesPhysical]);

  // favoritesPhysical functionality
  const favoriteHandlerPhysical = (complex) => {
    const isAlreadySaved = favoritesPhysical.some((c) => c.id === complex.id);

    if (isAlreadySaved) {
      const updatedComplexes = favoritesPhysical.filter(
        (c) => c.id !== complex.id
      );
      setFavoritesPhysical(updatedComplexes);
      localStorage.setItem(
        "favoritesPhysical",
        JSON.stringify(updatedComplexes)
      ); // Update localStorage
    } else {
      const updatedfavoritesPhysical = [...favoritesPhysical, complex];
      setFavoritesPhysical(updatedfavoritesPhysical);
      localStorage.setItem(
        "favoritesPhysical",
        JSON.stringify(updatedfavoritesPhysical)
      ); // Update localStorage
    }
  };
  // -----------------------------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------------------

  // Load favorites from localStorage on initial render FOR PHYSICAL JSX
  // const [favoriteApartment, setFavoriteApartment] = useState([]);

  // Retrieve saved favorites from localStorage on initial render
  useEffect(() => {
    const savedFavorites = JSON.parse(
      localStorage.getItem("favoriteapartment")
    );
    if (savedFavorites) {
      setFavoriteApartment(savedFavorites);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "favoriteapartment",
      JSON.stringify(favoriteApartment)
    );
  }, [favoriteApartment]);

  // favoritesPhysical functionality
  const favorite_apartment_handler = (complex) => {
    const isAlreadySaved = favoriteApartment.some((c) => c.id === complex.id);

    if (isAlreadySaved) {
      const updatedComplexes = favoriteApartment.filter(
        (c) => c.id !== complex.id
      );
      setFavoriteApartment(updatedComplexes);
      localStorage.setItem(
        "favoriteapartment",
        JSON.stringify(updatedComplexes)
      ); // Update localStorage
    } else {
      const updated_favorite_apartment = [...favoriteApartment, complex];
      setFavoriteApartment(updated_favorite_apartment);
      localStorage.setItem(
        "favoriteapartment",
        JSON.stringify(updated_favorite_apartment)
      ); // Update localStorage
    }
  };
  // -----------------------------------------------------------------------------------------------
  // -------------------------------------function for fetching usd corrency --------------------------

  useEffect(() => {
    async function getExchangeRate() {
      const today = new Date().toISOString().split("T")[0]; // Format as "YYYY-MM-DD"
      const url = `https://nbg.gov.ge/gw/api/ct/monetarypolicy/currencies/ka/json?currencies=USD&date=${today}`;

      try {
        const response = await axios.get(url);
        const rates = response.data[0].currencies;
        const rateInfo = rates.find((rate) => rate.code === "USD");
        if (rateInfo) {
          setGetCorrencyRate(rateInfo.rate);

        }
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
      }
    }

    getExchangeRate();
  }, []);

  // --------------------------------------kursis cvlilebis logika ---------------------------------------------

  const [currenceChangeState, setCurrenceChangeState] = useState(true);

  const HandleStateChange = () => {
    setCurrenceChangeState(!currenceChangeState);
    console.log(currenceChangeState);
  };

  // for toggle DOllar AND LARI ---==---(START)
  const [isOn, setIsOn] = useState(false);
  const toggleSwitch = () => setIsOn(!isOn);
  // -----===--------(END)

  // -------------------------------------------------------------- ---------------------------------------------
  // ------------------------function for opening call modal----------------------------------
  useEffect(() => {
    // First timer to open the modal after 10 seconds
    const timer1 = setTimeout(() => {
      setIsCallModalOpen(true);
    }, 600000);

    // Second timer to close and then reopen the modal after 20 seconds
    const timer2 = setTimeout(() => {
      setIsCallModalOpen(false); // Close the modal first to create a noticeable effect
      setTimeout(() => setIsCallModalOpen(true), 200); // Reopen it shortly after closing for user notice
    }, 1200000);

    // Cleanup function to clear both timers if the component unmounts
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);




  // ------------------------------------------------------------------------------------------
  // ----------------------------static buttons and input language translation----------------------------------------

  const languageTranslationForCheetModal = (lang) => {
    var languageInfo = {
      name: "Name",
      phone_number: "Phone number",
      please_choose: "Please choose",
      salse_Department: "Sales department",
      storkhome_plus: "Storkhome +",
      other: "Other",
      send: "Send",
      sheet_send: "Information sent successfully!",
      email: "Email"
    };

    switch (lang) {
      case "en":
        languageInfo.name = "Name";
        languageInfo.phone_number = "Phone number";
        languageInfo.please_choose = "Please choose";
        languageInfo.salse_Department = "Sales department";
        languageInfo.storkhome_plus = "Storkhome +";
        languageInfo.other = "Other";
        languageInfo.send = "Send";
        languageInfo.sheet_send = "Information sent successfully!";
        languageInfo.email = "Email";


        break;

      case "ka":
        languageInfo.name = "სახელი";
        languageInfo.phone_number = "ტელეფონის ნომერი";
        languageInfo.please_choose = "გთხოვთ აირჩიეთ";
        languageInfo.salse_Department = "გაყიდვების განყოფილება";
        languageInfo.storkhome_plus = "Storkhome +";
        languageInfo.other = "სხვა";
        languageInfo.send = "გაგზავნა";
        languageInfo.sheet_send = "ინფორმაცია წარმატებით გაიგზავნა";
        languageInfo.email = "ელ-ფოსტა";

        break;

      case "ru":
        languageInfo.name = "Имя";
        languageInfo.phone_number = "Номер телефона";
        languageInfo.please_choose = "Пожалуйста, выбери";
        languageInfo.salse_Department = "Отдел продаж";
        languageInfo.storkhome_plus = "Storkhome +";
        languageInfo.other = "Другой";
        languageInfo.send = "Отправлять";
        languageInfo.sheet_send = "Информация успешно отправлена!";
        languageInfo.email = "Электронная почта";

        break;
    }
    return languageInfo;
  };
  // ------------------------------------------------------------------------------------------

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [salesDepartment, setSalesDepartment] = useState(false);
  const [storkhomePlus, setStorkhomePlus] = useState(false);
  const [other, setOther] = useState(false);
  const [other_text, setOther_text] = useState('');

  const [sedtsheet, setSedtsheet] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendSheet = () => {
    setIsLoading(true); // Indicate loading
    setPopupMessage("Sending..."); // Initial popup message
    setShowPopup(true); // Show popup immediately
    setSedtsheet(!sedtsheet); // Trigger the useEffect
  };


  const handle_toggle_show_other_text = () => {
    setOther(!other)
  }

  useEffect(() => {
    const sendDataToSheet = async () => {
      if (!sedtsheet) return;

      const formData = {
        name,
        phone,
        email,
        salesDepartment,
        storkhomePlus,
        other,
        other_text,
      };

      try {
        const response = await axios.post(BaseURLs.proxy, formData);
        setPopupMessage("Data sent successfully!");
        // Optionally reset form fields here if you want to clear the form upon success
      } catch (error) {
        setPopupMessage("Failed to send data.");
      } finally {
        setIsLoading(false); // Stop loading indicator
        setTimeout(() => {
          setShowPopup(false);
          // Reset sedtsheet to allow for future submissions
          setSedtsheet(false);
          setName('')
          setPhone('')
          setEmail('')
          setStorkhomePlus(false)
          setOther(false)
          setOther(false)
        }, 2000);
        setTimeout(() => {
          setIsCallModalOpen(false)
        }, 1600);
      }
    };

    sendDataToSheet();
  }, [sedtsheet]);


  const handleCloseCallModal = () => {
    setIsCallModalOpen(false);
    setName('')
    setPhone('')
    setEmail('')
    setStorkhomePlus(false)
    setOther(false)
    setOther(false)
  };

  const handleCallButtonClick = () => {
    setIsCallModalOpen(true);
  };

  const handle_other_text_change = (e) => {
    setOther_text(e.target.value)
  }

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSalesDepartmentChange = () => {
    setSalesDepartment(!salesDepartment);
  };

  const handleStorkhomePlusChange = () => {
    setStorkhomePlus(!storkhomePlus);
  };

  const handleOtherChange = () => {
    setOther(!other);
  };
  // ----------------------------------es mere unda waishalos, es aris damaluli pathistvis ------------------------------
  const location = useLocation();

  // ----------------------------------------------------------------------------------------------------------------


  if ((location.pathname).length > 2) {
    useEffect(() => {
      const timer = setTimeout(() => {
        setShowSplashScreen(false);
      }, 3000); // 3000 milliseconds = 3 seconds

      return () => clearTimeout(timer); // Clean up the timer
    }, []);

    if (showSplashScreen) {
      return (
        <div className="slashscreen_container">
          <img
            className="slash_company_logo"
            src={storkhome__logo}
            alt="company_logo"
          />
          <div className="spinner">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      );
    }
  }
  return (
    <div className="App">
      <div>
        {/* <Facebook /> */}
      </div>
      {(location.pathname).length > 2 && (
        <div>
          <Header
            favorites={favorites}
            favoritesPhysical={favoritesPhysical}
            favoritesLots={favoritesLots}
            handleLanguageChange={handleLanguageChange}
            // onButtonClick={trackButtonClick}
            selectedLanguage={selectedLanguage}
          />
        </div>
      )}

      <Routes>
        <Route path="/" element={<Nothing />} />

        <Route
          path="/hhomepage"
          element={
            <HomePage
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              stringSearchHeandles={stringSearchHeandles}
              favoriteHandler={favoriteHandler}
              favorites={favorites}
              selectedLanguage={selectedLanguage}
              complexChangeHandler={complexChangeHandler}
              locationsChangeHandler={locationsChangeHandler}
              selectedCityChangeHandler={selectedCityChangeHandler}
              selectedPharentDistrictsChangeHandler={
                selectedPharentDistrictsChangeHandler
              }
              selectedDistrictsChangeHandler={selectedDistrictsChangeHandler}
              minPricePerSquareMeterChangeHandler={
                minPricePerSquareMeterChangeHandler
              }
              maxPricePerSquareMeterChangeHandler={
                maxPricePerSquareMeterChangeHandler
              }
              minFullPriceChangeHandler={minFullPriceChangeHandler}
              maxFullPriceChangeHandler={maxFullPriceChangeHandler}
              min_spacehangeHandler={min_spacehangeHandler}
              max_spacehangeHandler={max_spacehangeHandler}
              selectedStatusesChangeHandler={selectedStatusesChangeHandler}
              selectedStatuses={selectedStatuses}
              locations={locations}
              searchButtonhangeHandler={searchButtonhangeHandler}
              min_space={min_space}
              max_space={max_space}
              minPricePerSquareMeter={minPricePerSquareMeter}
              maxPricePerSquareMeter={maxPricePerSquareMeter}
              minFullPrice={minFullPrice}
              maxFullPrice={maxFullPrice}
              searchButton={searchButton}
              selectedCity={selectedCity}
              selectedPharentDistricts={selectedPharentDistricts}
              selectedDistricts={selectedDistricts}
              isOn={isOn}
              toggleSwitch={toggleSwitch}
            />
          }
        />
        <Route path="complex">
          <Route
            index={true}
            element={
              <Complex
                favoriteHandler={favoriteHandler}
                favorites={favorites}
                selectedLanguage={selectedLanguage}
                selectedStatuses={selectedStatuses}
                selectedStatusesChangeHandler={selectedStatusesChangeHandler}
                locations={locations}
                min_space={min_space}
                min_spacehangeHandler={min_spacehangeHandler}
                max_space={max_space}
                max_spacehangeHandler={max_spacehangeHandler}
                // ------------------==================------------------------------------------------------
                minPricePerSquareMeterChangeHandler={
                  minPricePerSquareMeterChangeHandler
                }
                minPricePerSquareMeter={minPricePerSquareMeter}
                maxPricePerSquareMeterChangeHandler={
                  maxPricePerSquareMeterChangeHandler
                }
                maxPricePerSquareMeter={maxPricePerSquareMeter}
                minFullPriceChangeHandler={minFullPriceChangeHandler}
                minFullPrice={minFullPrice}
                maxFullPriceChangeHandler={maxFullPriceChangeHandler}
                maxFullPrice={maxFullPrice}
                // ------------------==================------------------------------------------------------
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                selectedCity={selectedCity}
                selectedPharentDistricts={selectedPharentDistricts}
                selectedDistrictsChangeHandler={selectedDistrictsChangeHandler}
                selectedDistricts={selectedDistricts}
                searchButton={searchButton}
                searchButtonhangeHandler={searchButtonhangeHandler}
                selectedCityChangeHandler={selectedCityChangeHandler}
                selectedPharentDistrictsChangeHandler={
                  selectedPharentDistrictsChangeHandler
                }
                totalPageCount={totalPageCount}
                currentPage={currentPage}
                handleCorrentPageHandler={handleCorrentPageHandler}
                handleSetTodalPageCount={handleSetTodalPageCount}
                complexes={complexes}
                total_item_number={total_item_number}
                getCorrencyRate={getCorrencyRate}
                HandleStateChange={HandleStateChange}
                currenceChangeState={currenceChangeState}
                isOn={isOn}
                toggleSwitch={toggleSwitch}
                sortingChangeHandler={sortingChangeHandler}
                stringSearchHeandles={stringSearchHeandles}
              />
            }
          />
        </Route>
        <Route
          path="lots"
          element={
            <Lots
              favoritesLots={favoritesLots}
              favoriteHandlerLots={favoriteHandlerLots}
              selectedLanguage={selectedLanguage}
              getCorrencyRate={getCorrencyRate}
              HandleStateChange={HandleStateChange}
              currenceChangeState={currenceChangeState}
              isOn={isOn}
              toggleSwitch={toggleSwitch}
            />
          }
        />
        <Route
          path="developers"
          element={
            <Developers
              favorites={favorites}
              selectedLanguage={selectedLanguage}
            />
          }
        />
        <Route
          path="map"
          element={<Map
            selectedLanguage={selectedLanguage}
            toggleSwitch={toggleSwitch}
            currenceChangeState={currenceChangeState}
            isOn={isOn}
            HandleStateChange={HandleStateChange}
            getCorrencyRate={getCorrencyRate}


          />}
        />
        <Route
          path="sales"
          element={
            <Sales
              selectedLanguage={selectedLanguage}
              handleCallButtonClick={handleCallButtonClick}
            />
          }
        />
        <Route
          path="physical"
          element={
            <Physical
              favoritesPhysical={favoritesPhysical}
              favoriteHandlerPhysical={favoriteHandlerPhysical}
              selectedLanguage={selectedLanguage}
              handleCallButtonClick={handleCallButtonClick}
              getCorrencyRate={getCorrencyRate}
              HandleStateChange={HandleStateChange}
              currenceChangeState={currenceChangeState}
              isOn={isOn}
              toggleSwitch={toggleSwitch}
            />
          }
        />
        <Route
          path="articles"
          element={<Articles selectedLanguage={selectedLanguage} />}
        />
        <Route
          path="storkhome"
          element={
            <Storkhome
              selectedLanguage={selectedLanguage}
              handleCallButtonClick={handleCallButtonClick}
            />
          }
        />

        <Route
          path="eachComplex/:complexId"
          element={
            <EachComplex
              selectedLanguage={selectedLanguage}
              favorites={favorites}
              favoriteHandler={favoriteHandler}
              handleCallButtonClick={handleCallButtonClick}
              getCorrencyRate={getCorrencyRate}
              HandleStateChange={HandleStateChange}
              currenceChangeState={currenceChangeState}
              isOn={isOn}
              toggleSwitch={toggleSwitch}
              favoriteApartment={favoriteApartment}
              favorite_apartment_handler={favorite_apartment_handler}
            />
          }
        />

        <Route
          path="eachground/:groundId"
          element={
            <EachGround
              selectedLanguage={selectedLanguage}
              favorites={favorites}
              favoriteHandler={favoriteHandler}
              handleCallButtonClick={handleCallButtonClick}
              getCorrencyRate={getCorrencyRate}
              HandleStateChange={HandleStateChange}
              currenceChangeState={currenceChangeState}
              isOn={isOn}
              toggleSwitch={toggleSwitch}
              favoritesLot={favoritesLots}
              favoritesLots={favoritesLots}
              favoriteHandlerLots={favoriteHandlerLots}
            />
          }
        />

        <Route
          path="eachprivateappartment/:privateappartmentid"
          element={
            <EachPrivateAppartment
              selectedLanguage={selectedLanguage}
              favorites={favorites}
              favoriteHandler={favoriteHandler}
              handleCallButtonClick={handleCallButtonClick}
              getCorrencyRate={getCorrencyRate}
              HandleStateChange={HandleStateChange}
              currenceChangeState={currenceChangeState}
              isOn={isOn}
              toggleSwitch={toggleSwitch}
              favoriteHandlerPhysical={favoriteHandlerPhysical}
              favoritesPhysical={favoritesPhysical}
              favoriteHandlerLots={favoriteHandlerLots}
            />
          }
        />

        <Route
          path="eachapartment/:apartmentId"
          element={
            <EachApartment
              selectedLanguage={selectedLanguage}
              favorites={favorites}
              favoriteHandler={favoriteHandler}
              handleCallButtonClick={handleCallButtonClick}
              getCorrencyRate={getCorrencyRate}
              HandleStateChange={HandleStateChange}
              currenceChangeState={currenceChangeState}
              isOn={isOn}
              toggleSwitch={toggleSwitch}
              favoriteApartment={favoriteApartment}
              favorite_apartment_handler={favorite_apartment_handler}
            />
          }
        />

        <Route
          path="eachcompany/:companyID"
          element={
            <Each_Developer
              selectedLanguage={selectedLanguage}
              favorites={favorites}
              favoriteHandler={favoriteHandler}
              handleCallButtonClick={handleCallButtonClick}
              getCorrencyRate={getCorrencyRate}
              HandleStateChange={HandleStateChange}
              currenceChangeState={currenceChangeState}
              isOn={isOn}
              toggleSwitch={toggleSwitch}
            />
          }
        />

        <Route
          path="eachblog/:blogId"
          element={
            <EachBlog
              selectedLanguage={selectedLanguage}
            // handleCallButtonClick={handleCallButtonClick}
            />
          }
        />

        <Route
          path="favoriteComplex"
          element={
            <FavoriteComplex
              favoriteHandlerPhysical={favoriteHandlerPhysical}
              favoriteHandlerLots={favoriteHandlerLots}
              favoriteHandler={favoriteHandler}
              favoritesLots={favoritesLots}
              favoritesPhysical={favoritesPhysical}
              favorites={favorites}
              getCorrencyRate={getCorrencyRate}
              HandleStateChange={HandleStateChange}
              currenceChangeState={currenceChangeState}
              isOn={isOn}
              toggleSwitch={toggleSwitch}
              favoriteApartment={favoriteApartment}
              favorite_apartment_handler={favorite_apartment_handler}
              selectedLanguage={selectedLanguage}
            />
          }
        />
      </Routes>
      {(location.pathname).length > 2 && (
        <Footer />
      )}
      <Call_Modal
        isOpen={isCallModalOpen}
        close={handleCloseCallModal}
      // onClick={(e) => e.stopPropagation()}
      >
        <div className="call_modal_containerr">
          <div className="cancel_icon_container">
            <img
              src={cancel_icon}
              alt="cencel icon"
              className="cansel_button"
              onClick={handleCloseCallModal}
            />
          </div>
          <div>
            <div className="headphone_icon_container">
              <img
                className="headphone_icon"
                src={headphone_icon}
                alt="headphone icon"
              />
            </div>
            <div className="call_input_container">
              <input
                name="name"
                type="text"
                className="call_input"
                onChange={handleNameChange}
                value={name}
                placeholder={
                  languageTranslationForCheetModal(selectedLanguage).name
                }
              />
            </div>
            <div className="call_input_container">
              <input
                value={phone}
                onChange={handlePhoneChange}
                type="number"
                className="call_input"
                placeholder={
                  languageTranslationForCheetModal(selectedLanguage)
                    .phone_number
                }
              />
            </div>

            <div className="call_input_container">
              <input
                value={email}
                onChange={handleEmailChange}
                type="text"
                className="call_input"
                placeholder={
                  languageTranslationForCheetModal(selectedLanguage)
                    .email
                }


              />
            </div>
          </div>
          <div className="choose_container">
            <div className="department_choices">
              {" "}
              <p className="choose">
                {
                  languageTranslationForCheetModal(selectedLanguage)
                    .please_choose
                }
              </p>{" "}
            </div>
          </div>
          {/* departamentis chekmarkebi */}
          <div className="call_checkmark_container">
            {/* 1 chekmark konteineri  tavisi saxelit */}
            <div className="little_checkmark_container">
              <label>
                <input
                  type="checkbox"
                  className="input"
                  value={salesDepartment}
                  onChange={handleSalesDepartmentChange}
                />
                <span className="custom-checkbox"></span>
              </label>
              <p style={{ color: "white" }}>
                {
                  languageTranslationForCheetModal(selectedLanguage)
                    .salse_Department
                }
              </p>
            </div>

            {/* 2 chekmark konteineri  tavisi saxelit */}
            <div className="little_checkmark_container">
              <label>
                <input
                  type="checkbox"
                  className="input"
                  value={storkhomePlus}
                  onChange={handleStorkhomePlusChange}
                />
                <span className="custom-checkbox"></span>
              </label>
              <p style={{ color: "white" }}>
                {
                  languageTranslationForCheetModal(selectedLanguage)
                    .storkhome_plus
                }
              </p>
            </div>

            {/* 3 chekmark konteineri  tavisi saxelit */}
            <div className="little_checkmark_container">
              <label>
                <input
                  type="checkbox"
                  className="input"
                  value={other}
                  onChange={handle_toggle_show_other_text}
                />
                <span className="custom-checkbox"></span>
              </label>

              <p style={{ color: "white" }}>
                {languageTranslationForCheetModal(selectedLanguage).other}
              </p>
            </div>
            <div style={{ display: 'flex', justifyContent: "center", alignItems: 'center', width: "100%" }} >
              {!other ?
                ""
                : <div className="call_input_container">
                  <input
                    name="name"
                    type="text"
                    className="call_input"
                    onChange={handle_other_text_change}
                    value={other_text}
                    placeholder={languageTranslationForCheetModal(selectedLanguage).name}
                  />
                </div>
              }

            </div>
          </div>
          <div className="send_container">
            <motion.div
              className="textButtonContainer send_sheet_button_container"
              whileHover={{ scale: 1.05 }}
              // whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <button className="senc_to_sheet" onClick={handleSendSheet}>
                {languageTranslationForCheetModal(selectedLanguage).send}
              </button>
            </motion.div>
            {showPopup && (
              <div className="sheet_sended">
                {isLoading
                  ? "Sending...."
                  : languageTranslationForCheetModal(selectedLanguage)
                    .sheet_send}
              </div>
            )}
          </div>
        </div>
      </Call_Modal>
    </div>
  );
}

export default App;


{/* <div className="call_input_container">
<input
  name="name"
  type="text"
  className="call_input"
  onChange={handleNameChange}
  value={name}
  placeholder={
    languageTranslationForCheetModal(selectedLanguage).name
  }
/>
</div> */}