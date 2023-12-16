// ------------  Import Statements ------------------
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css';
import selectedLanguage from '../Components/Header/Language/Language'

// ----- normalizeComplexData and normalizeLocationData functions ---
const normalizeComplexData = (data, lang) => {
  // Check if data is undefined or null
  if (!data) {
    console.error('Data is undefined or null.');
    return [];
  }

  // Check if data is an array
  if (!Array.isArray(data)) {
    console.error('Data is not an array.');
    return [];
  }

  return data.map(item => ({
    id: item.id,
    complexName: item[`complex_name_${lang}`],
    internalComplexName: item.internal_complex_name ? item.internal_complex_name.internal_complex_name : '',
    typeOfRoof: item[`type_of_roof_${lang}`],
    address: {
      street: item[`address_${lang}`]?.[`address_${lang}`],
      city: item[`address_${lang}`]?.[`city_${lang}`],
      district: item[`address_${lang}`]?.[`district_${lang}`],
      pharentDistrict: item[`address_${lang}`]?.[`pharentDistrict_${lang}`],
      streetName: item[`address_${lang}`]?.[`street_name_${lang}`],
      latitude: item[`address_${lang}`]?.latitude,
      longitude: item[`address_${lang}`]?.longitude,
    },
    company: {
      mobile: item[`company_${lang}`]?.Mobile,
      mobileHome: item[`company_${lang}`]?.Mobile_Home,
      about: item[`company_${lang}`]?.[`aboutcompany_${lang}`],
      address: item[`company_${lang}`]?.[`address_${lang}`],
      backgroundImage: item[`company_${lang}`]?.background_image,
      website: item[`company_${lang}`]?.companyweb,
      email: item[`company_${lang}`]?.email,
      facebookPage: item[`company_${lang}`]?.facebook_page,
      logo: item[`company_${lang}`]?.logocompany,
      name: item[`company_${lang}`]?.[`name_${lang}`],
      isTopCompany: item[`company_${lang}`]?.topCompany,
      isVisible: item[`company_${lang}`]?.visibility,
    },
    images: item.image_urls,
    complexDetails: {
      complexLevel: item.internal_complex_name?.complex_level,
      finishMonth: item.internal_complex_name?.finish_month,
      finishYear: item.internal_complex_name?.finish_year,
      isFinished: item.internal_complex_name?.status,
      floorNumber: item.internal_complex_name?.floor_number,
      numberOfApartments: item.internal_complex_name?.number_of_apartments,
      numberOfFloors: item.internal_complex_name?.number_of_floors,
      numberOfHouses: item.internal_complex_name?.number_of_houses,
      phoneNumber: item.internal_complex_name?.phone_number,
      plotArea: item.internal_complex_name?.plot_area,
      pricePerSqMeter: item.internal_complex_name?.price_per_sq_meter,
      space: item.internal_complex_name?.space,
      isVipComplex: item.internal_complex_name?.vipComplex,
      isVisible: item.internal_complex_name?.visibiliti,
    },
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

//---------- Constants and Axios Configuration -------
const baseURL = 'https://api.storkhome.ge';
const axiosInstance = axios.create({
  baseURL: baseURL,
});


// ----------- Async Function to Fetch Complex Unit Data --------
const getComplexUniData = async (searchParams, selectedLanguage, setComplexes) => {
  try {
    const response = await axiosInstance.get(`${baseURL}/complex/${selectedLanguage}/`, {
      params: searchParams,
    });[selectedLanguage]
    console.log(selectedLanguage);
    console.log(searchParams);
    console.log(setComplexes)

    const normalData = normalizeComplexData(response.data.results, selectedLanguage);
    console.log(normalData);
    console.log(selectedLanguage)
    setComplexes(normalData);
  } catch (error) {
    console.error('Error fetching complexes:', error);
  } 
};

const handleLanguageChange = (languageCode) => {
  // Update the selected language in the state
  setSelectedLanguage(languageCode);

  // Call the function to fetch data with the new language
  fetchData(languageCode);
};




// ---------------- FilterOptions Component --------------------
const FilterOptions = ({ onFilterChange, setComplexes, selectedLanguage }) => {
  const [activeFilter, setActiveFilter] = useState(null);
  const [searchParams, setSearchParams] = useState({});
  console.log(selectedLanguage);


  const openPopup = (filter) => {
    setActiveFilter(filter);
  };

  const closePopup = () => {
    setActiveFilter(null);
    fetchData();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchParams((searchParams) => ({
      ...searchParams,
      [name]: value,
    }));
  };

  const fetchData = async () => {
    try {
      const data = await getComplexUniData(searchParams, selectedLanguage, setComplexes);
      console.log('Fetched data:', data);
      onFilterChange(data);
      onLanguageChange(languageCode);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // -------------- Render Popup Content Based on Active Filter ---
  const renderPopup = () => {
    switch (activeFilter) {
      case 'popupp-space':
        return (
          <div className="popupp-space popupbuttons">
            <label>From: <input type="text" name="from" onChange={handleInputChange} /></label>
            <label>To: <input type="text" name="to" onChange={handleInputChange} /></label>
            <button onClick={closePopup}>Apply</button>
          </div>
        );
      case 'popup-price':
        return (
          <div className="popup-price popupbuttons">
            <div>
              <label>Full price From: <input type="text" name="fullPriceFrom" onChange={handleInputChange} /></label>
              <label>To: <input type="text" name="fullPriceTo" onChange={handleInputChange} /></label>
            </div>
            <div>
              <label>Price per square meter From: <input type="text" name="pricePerSqMeterFrom" onChange={handleInputChange} /></label>
              <label>To: <input type="text" name="pricePerSqMeterTo" onChange={handleInputChange} /></label>
            </div>
            <button onClick={closePopup}>Apply</button>
          </div>
        );
      case 'popup-status':
        return (
          <div className="popup-status popupbuttons">
            <div id="statusPopup" class="popup">
              <label><input type="checkbox"/> Passed</label>
              <label><input type="checkbox"/> Under construction</label>
              <label><input type="checkbox"/> 2023</label>
              <label><input type="checkbox"/> 2024</label>
              <label><input type="checkbox"/> 2025</label>
              <label><input type="checkbox"/> 2026</label>
              <label><input type="checkbox"/> 2027</label>
              <label><input type="checkbox"/> 2027+</label>
            </div>
            <button onClick={closePopup}>Apply</button>
          </div>
        );
      case 'popup-location':
        return (
          <div className="popup-location popupbuttons">
            <select>
              <option value="city1">City 1</option>
              <option value="city2">City 2</option>
            </select>
            <button onClick={closePopup}>Apply</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className='popupbuttons'>
      <button onClick={() => openPopup('popupp-space')}>Space</button>
      <button onClick={() => openPopup('popup-price')}>Price</button>
      <button onClick={() => openPopup('popup-status')}>Status</button>
      <button onClick={() => openPopup('popup-location')}>Location</button>

      {renderPopup()}
    </div>
  );
};

// -------------------  HomePage ----------------------------
const HomePage = ({selectedLanguage}) => {
  const [complexes, setComplexes] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // Default language
  const navigate = useNavigate();
  const { min_price_per_sq_meter, max_price_per_sq_meter, min_full_price, max_full_price, finished, min_area, max_area } = useParams();

  const updateURLWithFilters = () => {
    const queryParams = new URLSearchParams();

    if (min_price_per_sq_meter) queryParams.set('min_price_per_sq_meter', min_price_per_sq_meter);
    if (max_price_per_sq_meter) queryParams.set('max_price_per_sq_meter', max_price_per_sq_meter);
    if (min_full_price) queryParams.set('min_full_price', min_full_price);
    if (max_full_price) queryParams.set('max_full_price', max_full_price);
    if (finished !== null && finished !== undefined) queryParams.set('finished', finished);
    if (min_area) queryParams.set('min_area', min_area);
    if (max_area) queryParams.set('max_area', max_area);

    navigate(`?${queryParams.toString()}`, { replace: true });
  };

  const fetchData = async () => {
    try {
      await getComplexUniData({
        min_price_per_sq_meter,
        max_price_per_sq_meter,
        min_full_price,
        max_full_price,
        finished,
        min_area,
        max_area,
      }, selectedLanguage, setComplexes);
      console.log(selectedLanguage);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleFilterChange = (data) => {
    setComplexes(data);
  };

  const handleLanguageChange = (languageCode) => {
    setSelectedLanguage(languageCode);
    fetchData(languageCode); // Fetch data with the new language
  };

  useEffect(() => {
    updateURLWithFilters();
    fetchData(selectedLanguage); // Initial fetch with the default language
  }, [min_full_price, max_full_price, min_price_per_sq_meter, max_price_per_sq_meter, finished, min_area, max_area, selectedLanguage]);

  // ------ Rendering Filtered Homes ---------
  return (
    <div>
      <FilterOptions
        onFilterChange={handleFilterChange}
        onLanguageChange={handleLanguageChange} // Pass the function to handle language change
        setComplexes={setComplexes}
        selectedLanguage={selectedLanguage}
      />
      {/* Render complexes based on the filtered data */}
      {Array.isArray(complexes) && complexes.map((complex) => (
        <div key={complex.id}>
          {/* Render complex details */}
        </div>
      ))}
    </div>
  );
};

export default HomePage;