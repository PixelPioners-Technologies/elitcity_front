/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import './App.css'
import Header from './Components/Header/Header'
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import Complex from './pages/Complex';
import Lots from './pages/Lots';
import Developers from './pages/Developers';
import Map from './pages/Map';
import Sales from './pages/Sales';
import FavoriteComplex from './pages/FavoriteComplex';
import ApartmentList from './pages/ApartmentList';
import Nothing from './pages/Nothing';
import Physical from './pages/Physical';
import Articles from './pages/Articles';
import Storkhome from './pages/Storkhome';
import axios from 'axios';



const Base_URL = "http://127.0.0.1:8000/complex/";


//--ეს ლოგიკსა უზრუნველყოფს მოსული ინფორმაციის ფილდების გადაკეთებას, რადგან ენის სვლილებისას იცვლება მათი ფილდების სახელებიც--

const normalizeComplexData = (data, lang) => {
  return data.map(item => ({
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
    }
  }));
};


const normalizeLocationData = (data, lang) => {
  return data.map(cityItem => {
    const cityNameField = `city_${lang}`;
    const pharentDistrictField = `pharentDistrict_${lang}`;
    const districtField = `district_${lang}`;

    const cityName = cityItem[cityNameField];
    const pharentDistricts = cityItem[pharentDistrictField].map(pharentDistrictItem => {
      const pharentDistrictName = pharentDistrictItem[pharentDistrictField];
      const districts = pharentDistrictItem[districtField].map(districtItem => districtItem[districtField]);

      return { pharentDistrict: pharentDistrictName, districts };
    });

    return { city: cityName, pharentDistricts };
  });
};


function App() {
  const [forVisible, setForVisible] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [favorites, setFavorites] = useState([]);
  const [getCorrencyRate, setGetCorrencyRate] = useState(0);

  // ------------------------------steitebi chasawodeblad -----------------------------
  const [complexes, setComplexes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');

  const [selectedPharentDistricts, setSelectedPharentDistricts] = useState([]);
  const [selectedDistricts, setSelectedDistricts] = useState([]);

  const [minPricePerSquareMeter, setMinPricePerSquareMeter] = useState('');
  const [maxPricePerSquareMeter, setMaxPricePerSquareMeter] = useState('');

  const [minFullPrice, setMinFullPrice] = useState('');
  const [maxFullPrice, setMaxFullPrice] = useState('');

  const [min_space, setMin_space] = useState('');
  const [max_space, setMax_space] = useState('');

  const [selectedStatuses, setSelectedStatuses] = useState([]);

  const [searchButton, setSearchButton] = useState(false);
  // -----------------------------------------------------------------------------------------------------


  // -------------------------------funqciebi  steitebis cvlilebistvis ---------------------------------
  const complexChangeHandler = (data) => {
    setComplexes(data)
  }
  const locationsChangeHandler = (data) => {
    setLocations(data)
  }
  const selectedCityChangeHandler = (data) => {
    setSelectedCity(data)
  }
  const selectedPharentDistrictsChangeHandler = (data) => {
    setSelectedPharentDistricts(data)
  }
  const selectedDistrictsChangeHandler = (data) => {
    setSelectedDistricts(data)
  }
  const minPricePerSquareMeterChangeHandler = (data) => {
    setMinPricePerSquareMeter(data)
  }
  const maxPricePerSquareMeterChangeHandler = (data) => {
    setMaxPricePerSquareMeter(data)
  }
  const minFullPriceChangeHandler = (data) => {
    setMinFullPrice(data)
  }
  const maxFullPriceChangeHandler = (data) => {
    setMaxFullPrice(data)
  }
  const min_spacehangeHandler = (data) => {
    setMax_space(data)
  }
  const max_spacehangeHandler = (data) => {
    setMin_space(data)
  }
  const selectedStatusesChangeHandler = (data) => {
    setSelectedStatuses(data)
  }
  const searchButtonhangeHandler = (data) => {
    setSearchButton(data)
  }



  // -----------------------------------------------------------------------------------------------------

  useEffect(() => {
    const fetchComplexes = async () => {
      const cityParam = `address_${selectedLanguage}__city_${selectedLanguage}__city_${selectedLanguage}__icontains`;
      const pharentdistrictParams = `address_${selectedLanguage}__pharentDistrict_${selectedLanguage}__pharentDistrict_${selectedLanguage}__in`;
      const districtParams = `address_${selectedLanguage}__district_${selectedLanguage}__district_${selectedLanguage}__in`;
      // Create a URLSearchParams object
      let queryParams = new URLSearchParams({
        [cityParam]: selectedCity,
        [pharentdistrictParams]: selectedPharentDistricts.join(','),
        [districtParams]: selectedDistricts.join(','),
        min_price_per_sq_meter: minPricePerSquareMeter,
        max_price_per_sq_meter: maxPricePerSquareMeter,
        min_full_price: minFullPrice,
        max_full_price: maxFullPrice,
        min_space: min_space,
        max_space: max_space,
      });

      // Append each status as a separate parameter
      selectedStatuses.forEach(status => {
        queryParams.append('status', status);
      });

      // Construct the full URL with query parameters
      const queryString = queryParams.toString();
      const requestUrl = `${Base_URL}${selectedLanguage}/?${queryString}`;

      //////////////////////    T  E  S  T  ///////////////////////////
      // local_url = 'http://127.0.0.1:8000'
      // const requestUrl = `${local_url}${selectedLanguage}/?${queryString}`;
      /////////////// Can Erase if not need////////////////////////////

      try {
        const response = await axios.get(requestUrl);
        const normalData = normalizeComplexData(response.data.results, selectedLanguage);
        setComplexes(normalData);
      } catch (error) {
        console.error('Error fetching complexes:', error);
      }
    };

    fetchComplexes();
  }, [searchButton]);

  // console.log(complexes)
  //-----------------------------------fetch ionly locations --------------------------------------

  const base_URL_for_location = 'http://127.0.0.1:8000/map/'

  useEffect(() => {
    const fetchLocations = async () => {

      try {
        const response = await axios.get(`${base_URL_for_location}${selectedLanguage}`);
        const normalisedLocationData = normalizeLocationData(response.data, selectedLanguage)
        setLocations(normalisedLocationData)
      } catch (error) {
        console.error("error fetching on locations =>> ", error)
      }
    }

    fetchLocations();
  }, [searchButton])



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
    const savedFavorites = JSON.parse(localStorage.getItem('favorites'));
    if (savedFavorites) {
      setFavorites(savedFavorites);
    }
  }, []);

  // Load favorites from localStorage on initial render
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // favorites functionality
  const favoriteHandler = (complex) => {
    const isAlreadySaved = favorites.some((c) => c.id === complex.id);

    if (isAlreadySaved) {
      const updatedComplexes = favorites.filter((c) => c.id !== complex.id);
      setFavorites(updatedComplexes);
      localStorage.setItem('favorites', JSON.stringify(updatedComplexes)); // Update localStorage

    } else {
      const updatedFavorites = [...favorites, complex];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Update localStorage
    }
  };
  // -----------------------------------------------------------------------------------------------



  // -------------------------------------function for fetching usd corrency --------------------------

  useEffect(() => {
    async function getExchangeRate() {
      const today = new Date().toISOString().split('T')[0]; // Format as "YYYY-MM-DD"
      const url = `https://nbg.gov.ge/gw/api/ct/monetarypolicy/currencies/ka/json?currencies=USD&date=${today}`;

      try {
        const response = await axios.get(url);
        const rates = response.data[0].currencies;
        const rateInfo = rates.find(rate => rate.code === 'USD');
        if (rateInfo) {
          setGetCorrencyRate(rateInfo.rate);
          console.log('Exchange rate from USD to GEL:', rateInfo.rate);
        }
      } catch (error) {
        console.error('Error fetching exchange rate:', error);
      }
    }

    getExchangeRate();
  }, []);

  // ------------------------------------------------------------------------------------------

  return (
    <div className='App'>
      {/* Conditional rendering for the Header */}
      {(forVisible && window.location.pathname !== "/") ? (
        <div>
          <Header favorites={favorites} handleLanguageChange={handleLanguageChange} />
        </div>
      ) : null}

      <Routes>
        <Route path="/" element={<Nothing />} />

        <Route path="homePage"
          element={<HomePage favoriteHandler={favoriteHandler}
            favorites={favorites}
            selectedLanguage={selectedLanguage}
            complexChangeHandler={complexChangeHandler}
            locationsChangeHandler={locationsChangeHandler}
            selectedCityChangeHandler={selectedCityChangeHandler}
            selectedPharentDistrictsChangeHandler={selectedPharentDistrictsChangeHandler}
            selectedDistrictsChangeHandler={selectedDistrictsChangeHandler}
            minPricePerSquareMeterChangeHandler={minPricePerSquareMeterChangeHandler}
            maxPricePerSquareMeterChangeHandler={maxPricePerSquareMeterChangeHandler}
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

          />} />
        <Route path='complex'>
          <Route index={true} element={<Complex
            favoriteHandler={favoriteHandler}
            favorites={favorites}
            selectedLanguage={selectedLanguage}
            selectedStatuses={selectedStatuses}
            locations={locations}
            min_space={min_space}
            max_space={max_space}
            minPricePerSquareMeter={minPricePerSquareMeter}
            maxPricePerSquareMeter={maxPricePerSquareMeter}
            minFullPrice={minFullPrice}
            maxFullPrice={maxFullPrice}
            selectedCity={selectedCity}
            selectedPharentDistricts={selectedPharentDistricts}
            selectedDistricts={selectedDistricts}
            searchButton={searchButton}


          />} />
          <Route path='apartmentList' element={<ApartmentList favoriteHandler={favoriteHandler} favorites={favorites} />} />
        </Route>
        <Route path='lots' element={<Lots favorites={favorites} selectedLanguage={selectedLanguage} />} />
        <Route path='developers' element={<Developers  favorites={favorites} selectedLanguage={selectedLanguage} />} />
        <Route path='map' element={<Map selectedLanguage={selectedLanguage} />} />
        <Route path='sales' element={<Sales />} />
        <Route path='physical' element={<Physical favorites={favorites} selectedLanguage={selectedLanguage} />} />
        <Route path='articles' element={<Articles />} />
        <Route path='storkhome' element={<Storkhome selectedLanguage={selectedLanguage}   />} />


        <Route path='favoriteComplex' element={<FavoriteComplex favorites={favorites} />} />
      </Routes>
    </div>
  )
}

export default App


