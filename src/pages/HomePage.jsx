<<<<<<< HEAD
// ------------  Import Statements ------------------
import  { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
=======

import React, { useState, useEffect } from 'react';
>>>>>>> origin/main
import axios from 'axios';
import button_icon from '../icons/Vector.svg';
import button_icon1 from "../icons/findimage.svg";
import Modal_1 from '../modals for main page/Modal_1';
import PriceModal_1 from '../modals for main page/PriceModal_1';
import SpaceModal_1 from '../modals for main page/SpaceModal_1';
import StatusModal_1 from '../modals for main page/StatusModa_1';
import './HomePage.css'
// const initialCenter = {
//   lat: 41.7151,
//   lng: 44.8271
// };

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



// ---------------------------------------------------------------------------------------------------------------------

export default function Map({selectedLanguage}) {
  const [complexes, setComplexes] = useState([]);
  // const [selectedLanguage, setSelectedLanguage] = useState('en');
  // const [selectedComplex, setSelectedComplex] = useState(null);
  const [locations , setLocations ] = useState([]);

  const [modalContent , setModalContent] = useState('');
  const [isModalOpen , setIsModalOpen] = useState(false);

  const [selectedCity , setSelectedCity] = useState('');

  const [selectedPharentDistricts ,  setSelectedPharentDistricts] = useState([]);
  const [selectedDistricts , setSelectedDistricts] = useState([]);

  const [minPricePerSquareMeter, setMinPricePerSquareMeter] = useState('');
  const [maxPricePerSquareMeter, setMaxPricePerSquareMeter] = useState('');

  const [minFullPrice, setMinFullPrice] = useState('');
  const [maxFullPrice, setMaxFullPrice] = useState('');

  // const [status, setStatus] = useState('');

  // const [mapCenter, setMapCenter] = useState(initialCenter);
  // const [zoomLevel, setZoomLevel] = useState(13);

  const [mapInstance, setMapInstance] = useState(null);

  const [isSpaceModalOpen, setIsSpaceModalOpen] = useState(false);
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

  const [selectedStatuses , setSelectedStatuses] = useState([])
//----------------------------------------------------------------------------------------------------

     useEffect(() => {
      const fetchComplexes = async () => {
        const cityParam = `address_${selectedLanguage}__city_${selectedLanguage}__city_${selectedLanguage}__icontains`;
        const pharentdistrictParams =  `address_${selectedLanguage}__pharentDistrict_${selectedLanguage}__pharentDistrict_${selectedLanguage}__in`;
        const districtParams = `address_${selectedLanguage}__district_${selectedLanguage}__district_${selectedLanguage}__in`;
        
        // Create a URLSearchParams object
        let queryParams = new URLSearchParams({
          [cityParam]: selectedCity,
          [pharentdistrictParams]: selectedPharentDistricts.join(','),
          [districtParams]: selectedDistricts.join(','),
          min_price_per_sq_meter: minPricePerSquareMeter,
          max_price_per_sq_meter: maxPricePerSquareMeter,
          min_full_price: minFullPrice,
          max_full_price: maxFullPrice
        });
    
        // Append each status as a separate parameter
        selectedStatuses.forEach(status => {
          queryParams.append('status', status);
        });
    
        // Construct the full URL with query parameters
        const queryString = queryParams.toString();
        const requestUrl = `${Base_URL}${selectedLanguage}/?${queryString}`;
    
        try {
          const response = await axios.get(requestUrl);
          const normalData = normalizeComplexData(response.data.results, selectedLanguage);
          setComplexes(normalData);
        } catch (error) {
          console.error('Error fetching complexes:', error);
        }
      };
    
      fetchComplexes();
    }, [selectedLanguage, selectedCity, selectedPharentDistricts, selectedDistricts, minPricePerSquareMeter,
       maxPricePerSquareMeter, minFullPrice, maxFullPrice, selectedStatuses]);
    

  
// ----------------------------------------------------------------------------------------------
//-----------------------------------fetch ionly locations --------------------------------------

const base_URL_for_location = 'http://127.0.0.1:8000/map/' 

useEffect(() => {
  const fetchLocations = async () => {
      
    try {
      const response = await axios.get(`${base_URL_for_location}${selectedLanguage}`);
      const normalisedLocationData = normalizeLocationData(response.data.results , selectedLanguage)
      setLocations(normalisedLocationData)
    } catch (error) {
      console.error("error fetching on locations =>> ", error)
    }
  }

  fetchLocations();
} , [selectedLanguage  , selectedCity]  )



// ----------------------------------------------------------------------------------------------

// ----------------------------------icon coloure and  status  change  ----------------------------------------------------------


  const statusTranslations = {
    1: { en: 'Planned', ka: 'დაგეგმილი', ru: 'Запланировано' },
    2: { en: 'Under Construction', ka: 'მშენებარე', ru: 'Строится' },
    3: { en: 'Completed', ka: 'დასრულებული', ru: 'Завершено' }
    // Add more statuses and translations if needed
  };

  const renderStatusOptions = () => {
    return Object.entries(statusTranslations).map(([value, labels]) => (
      <div className='status_chackboxes' key={value}>

          <label className="container">
          <input 
          type="checkbox"
          checked={selectedStatuses.includes(value)}
          value={value}
          onChange={(e) => handleStatusChange(e, value)}
          />
          <div className="checkmark"></div>
        </label>
        <p className='text_modal_color' >{labels[selectedLanguage]}</p>
      </div>
    ));
  };

// ---------------------------------------------------------------------------------------------------------------------

//--------------------------------------modal and logic for opening filtration window --------------------------------------

const renderModalContent = () => {
  switch (modalContent) {
    case 'cities':
      return <div>
                {locations.map((cityItem, index) => (
                  <button key={index} onClick={() => handleCityClick(cityItem.city)} className='button-19'>
                    {cityItem.city}
                  </button>
                ))}
                <button className='modal_close_button' onClick={closeModal} >close</button>
            </div>
    case "pharentdistricts":
      // Find the city object from the locations array
      const city = locations.find(loc => loc.city === selectedCity);
      if (!city) return null;

      return (
        <div className='location_modal_container' >
          {city.pharentDistricts.map((parentDistrict, index) => (
            <div key={index}>
              <div>
                <input
                  type="checkbox"
                  checked={selectedPharentDistricts.includes(parentDistrict.pharentDistrict)}
                  onChange={(e) => handleParentDistrictChange(e, parentDistrict.pharentDistrict)}
                />
                {parentDistrict.pharentDistrict}
              </div>
              <div style={{ marginLeft: '20px' }}>
                {parentDistrict.districts.map((district, districtIndex) => (
                  <div key={districtIndex}>
                    <input
                      type="checkbox"
                      checked={selectedDistricts.includes(district)}
                      onChange={(e) => handleDistrictChange(e, district)}
                    />
                    {district}
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button className='modal_close_button' onClick={closeModal}>Close</button>
        </div>
      );
      
    default:
      return null;
  }
};


const handleShowModal = () => {
  setModalContent('cities')
  setIsModalOpen(true)
  setIsSpaceModalOpen(false);
  setIsPriceModalOpen(false)
  setIsStatusModalOpen(false)
}

const handleCityClick = (city) => {
  console.log("City selected: ", city);
  setModalContent("pharentdistricts")
  setSelectedCity(city)
  setIsModalOpen(true)
}

const closeModal = () => {
  setIsModalOpen(false)
}

const handleParentDistrictChange = (e, parentDistrict) => {
  
  setSelectedPharentDistricts(prevSelected => {
    if (e.target.checked) {
      return [...prevSelected, parentDistrict];
    } else {
      return prevSelected.filter(pd => pd !== parentDistrict);
    }
  });
    // Find the city object from the locations array
    const city = locations.find(loc => loc.city === selectedCity);
    if (!city) return;
    
    // Find the specific parent district object
    const parentDistrictObj = city.pharentDistricts.find(pd => pd.pharentDistrict === parentDistrict);
    if (!parentDistrictObj) return;

    setSelectedDistricts(prevSelected => {
      if (e.target.checked) {
        // Add all districts of the parent district to the selected list
        // Ensure no duplicates are added
        const updatedDistricts = new Set([...prevSelected, ...parentDistrictObj.districts]);
        return Array.from(updatedDistricts);
      } else {
        // Remove all districts of the parent district from the selected list
        return prevSelected.filter(d => !parentDistrictObj.districts.includes(d));
      }
    });
};

const handleDistrictChange = (e, district) => {
  setSelectedDistricts(prevSelected => {
    if (e.target.checked) {
      return [...prevSelected, district];
    } else {
      return prevSelected.filter(d => d !== district);
    }
  });
};



// useEffect( () => {
//   console.log('pharentdistrict selected : ' , selectedPharentDistricts)
//   console.log("district selected : " ,selectedDistricts)
//   console.log(status)
// },[selectedPharentDistricts,selectedDistricts ] )

useEffect(() => {
  console.log("Selected Statuses:", selectedStatuses);
  // ... rest of your useEffect code ...
}, [selectedStatuses]);

// ---------------------------------------------------------------------------------------------------------------------
// ----------------------------------------logic for space and proce modal to open and close -----------------------------------------------

const handleSpaceButtonClick = () => {
  setIsSpaceModalOpen(true);
  setIsPriceModalOpen(false);
  setIsStatusModalOpen(false);
  setIsModalOpen(false);
};

const closeSpaceModal = () => {
  setIsSpaceModalOpen(false);
};

const handlePriceButtonClick = () => {
  setIsPriceModalOpen(true);
  setIsSpaceModalOpen(false);
  setIsModalOpen(false);
  setIsStatusModalOpen(false);
}

const handleClosePriceModal= () => {
  setIsPriceModalOpen(false)
}

const handleStatusButtonClick = () => {
  setIsStatusModalOpen(true);
  setIsSpaceModalOpen(false);
  setIsPriceModalOpen(false);
  setIsModalOpen(false);
}

const handleCloseStatusModal = () => {
  setIsStatusModalOpen(false);
}


// ---------------------------------------------------------------------------------------------------------------------


// --------------------------function for selecting status for filtration -----------------------------------------------

const handleStatusChange = (e, value) => {
  setSelectedStatuses((prevSelectedStatuses) => {
    const newSelectedStatuses = e.target.checked 
      ? [...prevSelectedStatuses, value] 
      : prevSelectedStatuses.filter((status) => status !== value);

    console.log("Updated Selected Statuses:", newSelectedStatuses); // Log the new state
    return newSelectedStatuses;
  });
};

// -----------------------------------------------------------------------------------------------------------------------------
// --------ffunction for changing status button content language change and also select city button language change -------------

const handleStatusButtonLanguageChange = (lang) => {
  var languageInfo = {
    statusInfoLanguage : "en" ,
    cityButtonLanguage : "Select City ",
    spaceButtonLanguage : "Space",
    priceButtonLanguage: "Price",
    allStatusLanguage: "All"
  } 

  switch (lang) {
    case "en" :
      languageInfo.statusInfoLanguage = "Select Status"
      languageInfo.cityButtonLanguage = "Location"
      languageInfo.spaceButtonLanguage = "Space"
      languageInfo.priceButtonLanguage = "Price"
      languageInfo.allStatusLanguage = "All"
      break;

    case "ka" :
      languageInfo.statusInfoLanguage = "აირჩიე სტატუსი"
      languageInfo.cityButtonLanguage = "მდებარეობა"
      languageInfo.spaceButtonLanguage = "ფართი"
      languageInfo.priceButtonLanguage = "ფასი"
      languageInfo.allStatusLanguage = "ყველა"
      break

    case "ru" :
      languageInfo.statusInfoLanguage = "выберите статус"
      languageInfo.cityButtonLanguage = "Местоположение"
      languageInfo.spaceButtonLanguage = "Площадь"
      languageInfo.priceButtonLanguage = "Цена"
      languageInfo.allStatusLanguage = "Все"
      break
  }
  return languageInfo
}
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------function for zooming in on clicking any marker-------------------------------------------
const handleMarkerClick = (complex) => {
  setSelectedComplex(complex);
  setZoomLevel(17); // Zoom in more when a marker is clicked
  setMapCenter({ lat: complex.address.latitude, lng: complex.address.longitude }); 
};

const handleZoomChanged = () => {
  if (mapInstance) {
    setZoomLevel(mapInstance.getZoom());
  }
};

const handleLoad = (map) => {
  setMapInstance(map); // Store the map instance
};

// ---------------------------------------------------------------------------------------------------------------------
  return (
    <div className='main_map main_foto'>
      <h1 className='adgilicomportistvis'>ადგილი შენი კომფორტისთვის</h1>
                    {/* axali divebi butonebis magivrad filtraciistvis */}
                  <div className='filter_cont'>

                      {/* button for filtering space */}
                      <div className="button-modal-container">
                            <div onClick={handleSpaceButtonClick}  className='space_button'  >
                              {handleStatusButtonLanguageChange(selectedLanguage).spaceButtonLanguage}
                              <img src={button_icon} alt="button dropdown icon" className='dropdown' />
                            </div> 

                            <SpaceModal_1 isOpen={isSpaceModalOpen} close={closeSpaceModal}>
                              <div>
                                        <input
                                      type="number"
                                      placeholder='Min Price Per Square Meter'
                                      value={minPricePerSquareMeter}
                                      onChange={(e) => setMinPricePerSquareMeter(e.target.value)}
                                  />
                                  
                                    <input
                                      type="number"
                                      placeholder='Max Price Per Square Meter'
                                      value={maxPricePerSquareMeter}
                                      onChange={(e) => setMaxPricePerSquareMeter(e.target.value)}
                                  />
                                  <p>otaxebis filtraciac unda iyos aq</p>
                              </div>
                            <button className='modal_close_button' onClick={closeSpaceModal}>Close</button>
                            </SpaceModal_1>

                      </div>

                      {/* button for filtering price  */}
                      <div className="button-modal-container">
                            <div onClick={handlePriceButtonClick}  className='space_button'  >
                              {handleStatusButtonLanguageChange(selectedLanguage).priceButtonLanguage}
                              <img src={button_icon} alt="button dropdown icon" className='dropdown' />
                            </div> 
                            <PriceModal_1 isOpen={isPriceModalOpen} close={handleClosePriceModal} >
                            <div>
                                  <input
                                      type="number"
                                      placeholder='Min Price Per Square Meter'
                                      value={minPricePerSquareMeter}
                                      onChange={(e) => setMinPricePerSquareMeter(e.target.value)}
                                  />

                                  <input
                                      type="number"
                                      placeholder='Max Price Per Square Meter'
                                      value={maxPricePerSquareMeter}
                                      onChange={(e) => setMaxPricePerSquareMeter(e.target.value)}
                                  />
                                 
                                  <input
                                    type="number"
                                    placeholder='Min Full Price'
                                    value={minFullPrice}
                                    onChange={(e) => setMinFullPrice(e.target.value)}
                                  />

                                  <input
                                    type="number"
                                    placeholder='Max Full Price'
                                    value={maxFullPrice}
                                    onChange={(e) => setMaxFullPrice(e.target.value)}
                                  />                            
                            </div>
                            <button className='modal_close_button' onClick={handleClosePriceModal}>Close</button>
                            </PriceModal_1>
                        </div>

                      {/* button for locations */}
                      <div className="button-modal-container" >
                            <div onClick={handleShowModal} className='lacation_button'   >
                            {handleStatusButtonLanguageChange(selectedLanguage).cityButtonLanguage}
                              <img src={button_icon} alt="button dropdown icon" className='dropdown' />
                            </div>
                            <Modal_1 isOpen={isModalOpen} >
                              {renderModalContent()}
                            </Modal_1>
                      </div>

                        {/* button for status */}
                      <div className="button-modal-container" >
                            <div onClick={handleStatusButtonClick} className='lacation_button'   >
                            {handleStatusButtonLanguageChange(selectedLanguage).statusInfoLanguage}
                              <img src={button_icon} alt="button dropdown icon" className='dropdown' />
                            </div>
                            <StatusModal_1 isOpen={isStatusModalOpen} close={handleCloseStatusModal} >
                            {renderStatusOptions()}
                            <button className='modal_close_button' onClick={handleCloseStatusModal}>Close</button>
                            </StatusModal_1>
                      </div>
                      <div className="button-modal-container" >
                            <div onClick={handleStatusButtonClick} className='find_word'   >
                            {handleStatusButtonLanguageChange(selectedLanguage).statusInfoLanguage}
                              <img src={button_icon1} alt="find_image" className='dropdown' />
                            </div>
                      </div>
                  </div>


                
      </div>

  );
}


//127.0.0.1:8000/complex/en/?address_en__city_en__city_en=&
// address_en__city_en__city_en__icontains=&
// address_en__pharentDistrict_en__pharentDistrict_en=&
// address_en__pharentDistrict_en__pharentDistrict_en__icontains=isani-samgori&
// address_en__pharentDistrict_en__pharentDistrict_en__in=&
// address_en__district_en__district_en=&address_en__district_en__district_en__icontains=&
// address_en__district_en__district_en__in=lisi





//127.0.0.1:8000/complex/en/?
// address_en__city_en__city_en=&
// address_en__city_en__city_en__icontains=&
// min_price_per_sq_meter=&
// max_price_per_sq_meter=&
// max_full_price=&min_full_price=&
// status=2



