
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
import storkhome__logo from './company_logo/storkhome__logo.png'
import Facebook from "./Facebook";


// This function assumes you've already initialized GA as shown in your index.html
const usePageTracking = () => {
  const location = useLocation();
  useEffect(() => {
    const pagePath = location.pathname + location.search;

    window.gtag("config", "G-FFTZPPMQNZ", {
      page_path: pagePath,
    });
  }, [location]);
};

function trackButtonClick(buttonName) {
  window.gtag("event", "click", {
    event_category: "Header",
    event_label: buttonName,
  });
}

//   useEffect(() => {
//     const pagePath = location.pathname + location.search;

//     // Here we're using the gtag function directly as it's globally available from the index.html script
//     window.gtag("config", "G-FFTZPPMQNZ", {
//       page_path: pagePath,
//     });
//   }, [location]);
// };

// function trackButtonClick(buttonName) {
//   ReactGA.event({
//     category: "Header",
//     action: "Click",
//     label: buttonName,
//   });
// }

const BaseURLs = {
  //   // storkhome

  complex: "https://api.storkhome.ge/complex/",
  company: "https://api.storkhome.ge/company/",
  apartment: "https://api.storkhome.ge/apartment/",
  private_apartment: "https://api.storkhome.ge/privateapartments/",
  ground: "https://api.storkhome.ge/ground/",
  promotion: "https://api.storkhome.ge/promotions/",
  blog: "https://api.storkhome.ge/blog/",
  map: "https://api.storkhome.ge/map/",
  complex_and_apartments: "https://api.storkhome.ge/complexandappartments/",
  company_and_complex: 'https://api.storkhome.ge/companycomplex/',
  proxy: 'https://api.storkhome.ge/proxy/',


  // local

  // complex: "http://127.0.0.1:8000/complex/",
  // company: "http://127.0.0.1:8000/company/",
  // apartment: "http://127.0.0.1:8000/apartment/",
  // private_apartment: "http://127.0.0.1:8000/privateapartments/",
  // ground: "http://127.0.0.1:8000/ground/",
  // promotion: "http://127.0.0.1:8000/promotions/",
  // blog: "http://127.0.0.1:8000/blog/",
  // map: "http://127.0.0.1:8000/map/",
  // complex_and_apartments: "http://127.0.0.1:8000/complexandappartments/",
  // company_and_complex: 'http://127.0.0.1:8000/companycomplex/',
  // proxy: 'http://127.0.0.1:8000/proxy/',


};

export { BaseURLs };

//--ეს ლოგიკსა უზრუნველყოფს მოსული ინფორმაციის ფილდების გადაკეთებას, რადგან ენის სვლილებისას იცვლება მათი ფილდების სახელებიც--

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

      rank: item.internal_complex_name.rank
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

  const [forVisible, setForVisible] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [favorites, setFavorites] = useState([]);
  const [favoritesLots, setFavoritesLots] = useState([]);
  const [favoritesPhysical, setFavoritesPhysical] = useState([]);

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

  const [converted_min_price_square_meter, setConverted_min_price_square_meter] = useState(minPricePerSquareMeter);
  const [converted_max_price_square_meter, setConverted_max_price_square_meter] = useState(maxPricePerSquareMeter);

  const [minFullPrice, setMinFullPrice] = useState("");
  const [maxFullPrice, setMaxFullPrice] = useState("");

  const [converted_min_full_price, setConverted_min_full_price] = useState(minFullPrice);
  const [converted_max_full_price, setConverted_max_full_price] = useState(maxFullPrice);
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

  // const [showSplashScreen, setShowSplashScreen] = useState(true);

  const [ascendentPrice, setAscendentPrice] = useState("");
  const [searchInput, setSearchInput] = useState("");

  // -----------------------------------------------------------------------------------------------------

  // -------------------------------funqciebi  steitebis cvlilebistvis ---------------------------------
  const sortingChangeHandler = (data) => {
    setAscendentPrice(data)
  }

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

    if (minPricePerSquareMeter === ""){
      setConverted_min_price_square_meter("");
    }else{
      const conversionRate = !isOn ? 1 / getCorrencyRate : 1;
      setConverted_min_price_square_meter(String(minPricePerSquareMeter * conversionRate ))
    }

    if (maxPricePerSquareMeter === ""){
      setConverted_max_price_square_meter("");
    }else{
      const conversionRate = !isOn ? 1 / getCorrencyRate : 1;
      setConverted_max_price_square_meter(String(maxPricePerSquareMeter * conversionRate ))
    }

    if (minFullPrice === ""){
      setConverted_min_full_price("");
    }else{
      const conversionRate = !isOn ? 1 / getCorrencyRate : 1;
      setConverted_min_full_price(String(minFullPrice * conversionRate ))
    }

    if (maxFullPrice === ""){
      setConverted_max_full_price("");
    }else{
      const conversionRate = !isOn ? 1 / getCorrencyRate : 1;
      setConverted_max_full_price(String(maxFullPrice * conversionRate ))
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
  // -----------------------------------------------------------------------------------------------------

  // useEffect(() => {
  //   console.log('total_item_number on app', total_item_number)
  // }, [total_item_number])

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
  }, [searchButton]);

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
          // console.log("Exchange rate from USD to GEL:", rateInfo.rate);
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
    }, 6000000); // 10 seconds

    // Second timer to close and then reopen the modal after 20 seconds
    const timer2 = setTimeout(() => {
      setIsCallModalOpen(false); // Close the modal first to create a noticeable effect
      setTimeout(() => setIsCallModalOpen(true), 200); // Reopen it shortly after closing for user notice
    }, 12000000); // 20 seconds

    // Cleanup function to clear both timers if the component unmounts
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []); // Empty dependency array means this effect runs once after initial render

  const handleCloseCallModal = () => {
    setIsCallModalOpen(false);
  };

  const handleCallButtonClick = () => {
    setIsCallModalOpen(true);
  };

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

        break;

      case "ka":
        languageInfo.name = "სახელი";
        languageInfo.phone_number = "ტელეფონის ნომერი";
        languageInfo.please_choose = "გთხოვთ აირჩიეთ";
        languageInfo.salse_Department = "გაყიდვების განყოფილება";
        languageInfo.storkhome_plus = "Storkhome +";
        languageInfo.other = "სხვა";
        languageInfo.send = "გაგზავნა";
        break;

      case "ru":
        languageInfo.name = "Имя";
        languageInfo.phone_number = "Номер телефона";
        languageInfo.please_choose = "Пожалуйста, выбери";
        languageInfo.salse_Department = "Отдел продаж";
        languageInfo.storkhome_plus = "Storkhome +";
        languageInfo.other = "Другой";
        languageInfo.send = "Отправлять";
        break;
    }
    return languageInfo;
  };
  // ------------------------------------------------------------------------------------------




  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [salesDepartment, setSalesDepartment] = useState(false);
  const [storkhomePlus, setStorkhomePlus] = useState(false);
  const [other, setOther] = useState(false);


  const [sedtsheet, setSedtsheet] = useState(false);

  const handleSendSheet = () => {
    setSedtsheet(!sedtsheet)
    console.log(name, phone, email, salesDepartment, storkhomePlus, other);
 
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
        other
      };

      try {
        // Await the Axios call
        const response = await axios.post(BaseURLs.proxy, formData);
        console.log(response.data); // Log the response data, not the whole response
      } catch (error) {
        console.error('Error sending data to sheet:', error);
      }
    };

    sendDataToSheet();
  }, [sedtsheet]);



  // Event handlers will be defined here

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





  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowSplashScreen(false);
  //   }, 3000); // 3000 milliseconds = 3 seconds

  //   return () => clearTimeout(timer); // Clean up the timer
  // }, []);

  // if (showSplashScreen) {
  //   return (
  //     <div className="slashscreen_container" >

  //       <img className="slash_company_logo" src={storkhome__logo} alt='company_logo' />
  //       <div className="spinner">
  //         <span></span>
  //         <span></span>
  //         <span></span>
  //         <span></span>
  //         <span></span>
  //         <span></span>
  //         <span></span>
  //         <span></span>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="App">
      <div>
        <Facebook/>
      </div>
      {/* Conditional rendering for the Header */}
      {forVisible && window.location.pathname !== "/" ? (
        <div>
          <Header
            favorites={favorites}
            favoritesPhysical={favoritesPhysical}
            favoritesLots={favoritesLots}
            handleLanguageChange={handleLanguageChange}
            onButtonClick={trackButtonClick}
            selectedLanguage={selectedLanguage}
          />
        </div>
      ) : null}

      <Routes>
        <Route path="/" element={<Nothing />} />

        <Route
          path="/homepage"
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
                minPricePerSquareMeterChangeHandler={minPricePerSquareMeterChangeHandler}
                minPricePerSquareMeter={minPricePerSquareMeter}

                maxPricePerSquareMeterChangeHandler={maxPricePerSquareMeterChangeHandler}
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
          element={<Map selectedLanguage={selectedLanguage} />}
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
            />
          }
        />
      </Routes>
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
                    .phone_number
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
                <input type="checkbox" className="input"

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
                <input type="checkbox" className="input"


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
                <input type="checkbox" className="input"

                  value={other}
                  onChange={handleOtherChange}

                />
                <span className="custom-checkbox"></span>
              </label>
              <p style={{ color: "white" }}>
                {languageTranslationForCheetModal(selectedLanguage).other}
              </p>
            </div>
          </div>
          <div className="send_container">
            <motion.div
              className="textButtonContainer send_sheet_button_container"
              whileHover={{ scale: 1.05 }}
              // whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <button className="senc_to_sheet" onClick={handleSendSheet} >
                {languageTranslationForCheetModal(selectedLanguage).send}
              </button>
            </motion.div>
          </div>
        </div>
      </Call_Modal>
    </div>
  );
}

export default App;
