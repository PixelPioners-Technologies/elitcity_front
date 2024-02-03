/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import './Map.css';
import { GoogleMap, Marker, InfoWindow , useJsApiLoader} from '@react-google-maps/api';
import green from  '../location_icons/icon-green.png' 
import red from  '../location_icons/icon-red.png'
import yelow from  '../location_icons/icon-yelow.png'
import Modal from '../modals for page map/Modal'
import apartment_market from '../location_icons/private_apartment2.png'
import SpaceModal from '../modals for page map/SpaceModal';
import PriceModal from '../modals for page map/PriceModal';
import StatusModal from '../modals for page map/StatusModa';
import button_icon from '../icons/Vector.svg'
import ground_marker from '../location_icons/ground_location_icon.png'
import { motion } from "framer-motion";
import FilterChangeModal from '../modals for page map/FilterChangeModal'
import G_Modal from '../modals for ground filters/G_Modal';
import G_PriceModal from '../modals for ground filters/G_PriceModal';
import G_SpaceModal from '../modals for ground filters/G_SpaceModal';
import G_StatusModal from '../modals for ground filters/G_StatusModa';



const initialCenter = {
  lat: 41.7151,
  lng: 44.8271
};

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


const normalizePrivateApartmentData = (data, lang) => {
  return data.map(item => ({
    id: item.id,
    internalName: item.internal_private_apartment_name.internal_private_apartment_name,
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
      pharentDistrict: item[`private_apartment_address_${lang}`].pharentDistrict_en,
      district: item[`private_apartment_address_${lang}`].district_en,
      streetName: item[`private_apartment_address_${lang}`].street_name_en,
      address: item[`private_apartment_address_${lang}`].address_en,
      latitude: item[`private_apartment_address_${lang}`].latitude,
      longitude: item[`private_apartment_address_${lang}`].longitude,
    },
    images: item.private_apartment_images,
    privateApartmentName: item[`private_apartment_name_${lang}`],
    testPrivateField: item[`test_private_field_${lang}`]
  }));
};

const normalizeGroundData = (data, lang) => {
  return data.map(item => ({
    id: item.id,
    internalName: item.internal_ground_name.internal_ground_name,
    area: item.internal_ground_name.area,
    fullPrice: item.internal_ground_name.full_price,
    squarePrice: item.internal_ground_name.square_price,
    status: item.internal_ground_name.status,
    rank: item.internal_ground_name.rank,
    isAvailable: item.internal_ground_name.is_available,
    visibility: item.internal_ground_name.visibiliti,
    address: {
      city: item[`ground_address_${lang}`].city_en,
      parentDistrict: item[`ground_address_${lang}`].pharentDistrict_en,
      district: item[`ground_address_${lang}`].district_en,
      streetName: item[`ground_address_${lang}`].street_name_en,
      address: item[`ground_address_${lang}`].address_en,
      latitude: item[`ground_address_${lang}`].latitude,
      longitude: item[`ground_address_${lang}`].longitude,
    },
    images: item.ground_images,
    groundName: item[`ground_name_${lang}`]
  }));
};



// ---------------------------------------------------------------------------------------------------------------------

export default function Map({selectedLanguage}) {
  const [complexes, setComplexes] = useState([]);
  const [selectedComplex, setSelectedComplex] = useState(null);
  const [locations , setLocations ] = useState([]);

  const [modalContent , setModalContent] = useState('');
  const [isModalOpen , setIsModalOpen] = useState(false);

  const [selectedCity , setSelectedCity] = useState('');

  const [selectedPharentDistricts ,  setSelectedPharentDistricts] = useState([]);
  const [selectedDistricts , setSelectedDistricts] = useState([]);

  const [minPricePerSquareMeter, setMinPricePerSquareMeter] = useState('');
  const [maxPricePerSquareMeter, setMaxPricePerSquareMeter] = useState('');

  const [min_space, setMin_space] = useState('');
  const [max_space, setMax_space] = useState('');

  const [minFullPrice, setMinFullPrice] = useState('');
  const [maxFullPrice, setMaxFullPrice] = useState('');

  const [status, setStatus] = useState('');

  const [mapCenter, setMapCenter] = useState(initialCenter);
  const [zoomLevel, setZoomLevel] = useState(11);

  const [mapInstance, setMapInstance] = useState(null);

  const [isSpaceModalOpen, setIsSpaceModalOpen] = useState(false);
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState([])
  const [isfilterChangeModalOpen, setIsfilterChangeModalOpen] = useState(false);


  
  const [ascendentPrice, setAscendentPrice] = useState('');

  // ეს არის სთეიტი ფილტრაციების შეცვლისთვისკომპლექსებიდან კერძო აპარტამენტებზე
  const [filterType, setFilterType] = useState('complexes'); 
  // -------------------------private apartment states-----------------------
  const [privateApartments, setPrivateApartments] = useState([]);
  const [selectedPrivateApartments, setSelectedPrivateApartments] = useState(null);
  const [min_square_price, setMin_square_price] = useState('');
  const [max_square_price, setMax_square_price] = useState('');
  const [min_area, setMin_area] = useState('');
  const [max_area, setMax_area] = useState('');
  const [max_P_FullPrice, setMax_P_FullPrice] = useState('');
  const [min_P_FullPrice, setMin_P_FullPrice] = useState('');
  const [selectedStatuses_For_P, setSelectedStatuses_For_P] = useState([])
  // const [resendAxios , setResendAxios] = useState(false)

  // this states are for grounds-----------------------------------
  const [grounds, setGrounds] = useState('');
  const [selectedGrounds, setSelectedGrounds] = useState('');

  const [min_ground_area, setMin_ground_area] = useState('');
  const [max_ground_area, setMax_ground_area] = useState('');

  const [min_graund_full_price, setMin_graund_full_price] = useState('');
  const [max_ground_fill_price, setMax_ground_fill_price] = useState('');

  const [min_graund_square_price, setMin_graund_square_price] = useState('');
  const [max_ground_square_price, setMax_ground_square_price] = useState('');

  const [graundStatus, setGraundStatus] = useState([]);


// --------------------------------------------------------------------------

  useEffect(() =>{
    setSelectedCity('')
    setSelectedPharentDistricts([])
    setSelectedDistricts([])
    setMin_space('')
    setMax_space('')
    setMinFullPrice('')
    setMaxFullPrice('')
    setMaxPricePerSquareMeter('')  
    setMinPricePerSquareMeter('')
    setSelectedStatuses([])
    setSelectedCity('')
    setSelectedPharentDistricts([])
    setSelectedDistricts([])
    setMinPricePerSquareMeter('')
    setMaxPricePerSquareMeter('')
    setMin_space('')
    setMax_space('')
    setMinFullPrice('')
    setMaxFullPrice('')
    setStatus('')
    setSelectedStatuses([])
    setSelectedStatuses_For_P([])
  },[selectedLanguage])
  
  
//----------------------------------------------------------------------------------------------------
  //127.0.0.1:8000/complex/en/?address_en__city_en__city_en=& 
    //  address_en__city_en__city_en__icontains=& 
    //    address_en__pharentDistrict_en__pharentDistrict_en=&   
    //    address_en__pharentDistrict_en__pharentDistrict_en__icontains=& 
    //      address_en__pharentDistrict_en__pharentDistrict_en__in=& 
    //        address_en__district_en__district_en=&  
    //        address_en__district_en__district_en__icontains=&  
    //         address_en__district_en__district_en__in=saburtalo


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
          max_full_price: maxFullPrice,
          min_space : min_space, 
          max_space : max_space,
          ordering: ascendentPrice
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
       maxPricePerSquareMeter, minFullPrice, maxFullPrice, selectedStatuses, ascendentPrice, max_space , min_space /*,resendAxios]*/ ]);
    

  
// ----------------------------------------------------------------------------------------------
//-----------------------------------fetch ionly locations --------------------------------------

const base_URL_for_location = 'http://127.0.0.1:8000/map/' 

useEffect(() => {
  const fetchLocations = async () => {
      
    try {
      const response = await axios.get(`${base_URL_for_location}${selectedLanguage}`);
      const normalisedLocationData = normalizeLocationData(response.data , selectedLanguage)
      setLocations(normalisedLocationData)
    } catch (error) {
      console.error("error fetching on locations =>> ", error)
    }
  }

  fetchLocations();
} , [selectedLanguage  , selectedCity]  )



// ----------------------------------------------------------------------------------------------

const BaseURL_Private = 'http://127.0.0.1:8000/privateapartments/'

useEffect(() => {
  const fetcPrivateApartments = async () => {

    // const cityParam = `address_${selectedLanguage}__city_${selectedLanguage}__city_${selectedLanguage}__icontains`;
    // const pharentdistrictParams =  `address_${selectedLanguage}__pharentDistrict_${selectedLanguage}__pharentDistrict_${selectedLanguage}__in`;
    // const districtParams = `address_${selectedLanguage}__district_${selectedLanguage}__district_${selectedLanguage}__in`;

    const cityParam = `city`;
    const pharentdistrictParams =  `parent_districts`;
    const districtParams = `districts`;

    let queryParams = new URLSearchParams({
      [cityParam]: selectedCity,
      [pharentdistrictParams]: selectedPharentDistricts.join(','),
      [districtParams]: selectedDistricts.join(','),
      min_square_price: min_square_price,
      max_square_price: max_square_price,
      min_full_price: minFullPrice,
      max_full_price: maxFullPrice,
      min_area : min_area, 
      max_area : max_area,
      // ordering: ascendentPrice
    });

    selectedStatuses_For_P.forEach(status => {
      queryParams.append('status', status);
    });


    const queryString = queryParams.toString();
    const requestUrl = `${BaseURL_Private}${selectedLanguage}/?${queryString}`;

    const response = await axios.get(requestUrl)
    const data = response.data.results
    const normalised_Data = normalizePrivateApartmentData(data, selectedLanguage)
    setPrivateApartments(normalised_Data)
    // console.log(privateApartments)
  }
  fetcPrivateApartments();
},[selectedLanguage, selectedCity, selectedPharentDistricts, selectedDistricts, min_square_price,
  max_square_price, minFullPrice, maxFullPrice, selectedStatuses, max_area , min_area, selectedStatuses_For_P])

// ----------------------------------------------------------------------------------------------
// ------------------------------------axios for fetching ground----------------------------------------------------------

const Ground_baseURL = 'http://127.0.0.1:8000/ground/'

useEffect(() => {
  const fetchGrounds = async () => {

    const cityParam = `city`;
    const pharentdistrictParams =  `parent_districts`;
    const districtParams = `districts`;

    let queryParams = new URLSearchParams({
      [cityParam]: selectedCity,
      [pharentdistrictParams]: selectedPharentDistricts.join(','),
      [districtParams]: selectedDistricts.join(','),
      min_square_price: min_graund_square_price,
      max_square_price: max_ground_square_price,
      min_full_price: min_graund_full_price,
      max_full_price: max_ground_fill_price,
      min_area : min_ground_area, 
      max_area : max_ground_area,
    });

    graundStatus.forEach(status => {
      queryParams.append('status', status);
    });

    const queryString = queryParams.toString();
    const requestUrl = `${Ground_baseURL}${selectedLanguage}/?${queryString}`;

    const response = await axios.get(requestUrl)
    const data = response.data.results
    const normalised_Data = normalizeGroundData(data, selectedLanguage)
    setGrounds(normalised_Data)
  }
  fetchGrounds()
} ,[selectedLanguage,selectedCity,selectedPharentDistricts,selectedDistricts,min_ground_area, max_ground_area ,
  min_graund_full_price, max_ground_fill_price,min_graund_square_price, max_ground_square_price, graundStatus] )

// ----------------------------------------------------------------------------------------------


// ----------------------------------icon coloure and  status  change  ----------------------------------------------------------

const getStatusInfo = (status) => {
  let statusInfo = {
    text: "Unknown Status",
    iconUrl: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png' ,// default icon
    scaledSize: new window.google.maps.Size(40, 40)
  };
  // /home/guro/Desktop/ELIT CITY FRONT/elitcity_front/src/location_icons
  switch (status) {
    case 1: // Planned
      statusInfo.text = "Planned";
      statusInfo.iconUrl = red ;
      break;
    case 2: // Under Construction
      statusInfo.text = "Under Construction";
      statusInfo.iconUrl = yelow;
      break;
    case 3: // Completed
      statusInfo.text = "Completed";
      statusInfo.iconUrl = green;
      break;
    default:
      // Keep default values
      break;
  }

  return statusInfo;
};


const getStatusText = (status, lang) => {
  const statusTexts = {
    en: {
      1: "Planned",
      2: "Under Construction",
      3: "Completed"
    },
    ka: {
      1: "დაგეგმილი",
      2: "მშენებარე",
      3: "დასრულებული"
    },
    ru: {
      1: "Запланировано",
      2: "Строится",
      3: "Завершено"
    }
  };

  return statusTexts[lang][status] || `unknown status`;
};

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




  const getStatusTextfor_P = (status, lang) => {
    const statusTexts = {
      en: {
        1: "Newly renovated",
        2: "With old repairs",
        3: "To be repairedd"
      },
      ka: {
        1: "ახალ გარემონტებული",
        2: "ძველი რემონტით",
        3: "გაურემონტებელი"
      },
      ru: {
        1: "Недавно отремонтированный",
        2: "Со старым ремонтом",
        3: "Подлежит ремонту"
      }
    };
  
    return statusTexts[lang][status] || `unknown status`;
  };
  


  const statusTranslations_For_P = {
    1: { en: 'Newly renovated', ka: 'ახალ გარემონტებული', ru: 'Недавно отремонтированный' },
    2: { en: 'With old repairs', ka: 'ძველი რემონტით', ru: 'Со старым ремонтом' },
    3: { en: 'To be repairedd', ka: 'გაურემონტებელი', ru: 'Подлежит ремонту' }
    // Add more statuses and translations if needed
  };

  // ("1" , 'Newly renovated'),
  // ('2' , 'with old repairs'),
  // ('3', 'to be repaired'),

  const renderStatusOptions_For_P = () => {
    return Object.entries(statusTranslations_For_P).map(([value, labels]) => (
      <div className='status_chackboxes' key={value}>
          <label className="container">
          <input 
            type="checkbox"
            checked={selectedStatuses_For_P.includes(value)}
            value={value}
            onChange={(e) => handleStatusChange_For_P(e, value)}
          />
          <div className="checkmark"></div>
        </label>
        <p className='text_modal_color' >{labels[selectedLanguage]}</p>
      </div>
    ));
  };



  const statusTranslationFor_Ground = {
    1: { en: 'Agricultural', ka: 'სასოფლო-სამეურნეო', ru: 'Сельскохозяйственный' },
    2: { en: 'Land for settlement', ka: 'სამოსახლო', ru: 'Земля для поселения' },
    3: { en: 'Commercial', ka: 'კომერციული', ru: 'Коммерческий' }
  };
  const render_Ground_StatusOption = () => {
    return Object.entries(statusTranslationFor_Ground).map(([value, labels]) => (
      <div className='status_chackboxes' key={value}>
          <label className="container">
          <input 
            type="checkbox"
            checked={graundStatus.includes(value)}
            value={value}
            onChange={(e) => handleStatusChangeForGround(e, value)}
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
                  <button key={index} onClick={() => handleCityClick(cityItem.city)} className='city_button'>
                    <span>{cityItem.city}</span> 
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
          <div className='districts_and_pharentdostricts'> 
                {city.pharentDistricts.map((parentDistrict, index) => (
                  <ul key={index} >

                    <div className='pharent_district_chackmarks' >
                          <label className="container">
                            <input
                              type="checkbox"
                              checked={selectedPharentDistricts.includes(parentDistrict.pharentDistrict)}
                              onChange={(e) => handleParentDistrictChange(e, parentDistrict.pharentDistrict)}
                            />
                          <div className="checkmark"></div>
                          </label>
                          <p>{parentDistrict.pharentDistrict}</p>
                    </div>

                    <div className='district_checkmarks' >
                        {parentDistrict.districts.map((district, districtIndex) => (
                          <li key={districtIndex} className='child_district_checkmarks' >
                            <label className="container">
                              <input
                                type="checkbox"
                                checked={selectedDistricts.includes(district)}
                                onChange={(e) => handleDistrictChange(e, district)}
                              />
                            <div className="checkmark"></div>
                            </label>
                            
                            <p>{district}</p>
                          </li>
                        ))}
                    </div>
                  </ul>
                ))}
          </div>
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
  setIsfilterChangeModalOpen(false)
}

const handleCityClick = (city) => {
  console.log("City selected: ", city);
  setModalContent("pharentdistricts")
  setSelectedCity(city)
  setIsModalOpen(true)
}
// a b c d e
// A B C D E

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




// ---------------------------------------------------------------------------------------------------------------------
// ----------------------------------------logic for space and proce modal to open and close -----------------------------------------------

const handleFilterChangeModalClick= ()=> {
  setIsfilterChangeModalOpen(true)
  setIsSpaceModalOpen(false);
  setIsPriceModalOpen(false);
  setIsStatusModalOpen(false);
  setIsModalOpen(false);

}


const closeFilterChangeModal = ()=> {
  setIsfilterChangeModalOpen(false)
}



const handleSpaceButtonClick = () => {
  setIsSpaceModalOpen(true);
  setIsPriceModalOpen(false);
  setIsStatusModalOpen(false);
  setIsModalOpen(false);
  setIsfilterChangeModalOpen(false)
};

const closeSpaceModal = () => {
  setIsSpaceModalOpen(false);
};

const handlePriceButtonClick = () => {
  setIsPriceModalOpen(true);
  setIsSpaceModalOpen(false);
  setIsModalOpen(false);
  setIsStatusModalOpen(false);
  setIsfilterChangeModalOpen(false)

}

const handleClosePriceModal= () => {
  setIsPriceModalOpen(false)
}

const handleStatusButtonClick = () => {
  setIsStatusModalOpen(true);
  setIsSpaceModalOpen(false);
  setIsPriceModalOpen(false);
  setIsModalOpen(false);
  setIsfilterChangeModalOpen(false)

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
    return newSelectedStatuses;
  });
};

const handleStatusChange_For_P = (e, value) => {
  setSelectedStatuses_For_P((prevSelectedStatuses) => {
    const newSelectedStatuses = e.target.checked 
      ? [...prevSelectedStatuses, value] 
      : prevSelectedStatuses.filter((status) => status !== value);

    console.log("Updated Selected Statuses:", newSelectedStatuses); // Log the new state
    return newSelectedStatuses;
  });
};

const handleStatusChangeForGround = (e, value) => {
  setGraundStatus((prevSelectedStatuses) => {
    const newSelectedStatuses = e.target.checked 
      ? [...prevSelectedStatuses, value] 
      : prevSelectedStatuses.filter((status) => status !== value);

    console.log("Updated Selected Statuses:", newSelectedStatuses); // Log the new state
    return newSelectedStatuses;
  });
};


// -----------------------------------------------------------------------------------------------------------------------------
// ----------------------------------function for input placeholder language change---------------------------------------------

const handleInputLanguageChange = (lang) => {
  var inputLanguage = {
    min_space: 'Min Space',
    max_space: 'Max Space',
    min_price_per_sq_meter: 'Min price per square meter',
    max_price_per_sq_meter: 'Max price per square meter',
    min_full_price: 'Min full price',
    max_full_price: 'Max full price',
  }

  switch (lang){
    case 'en':
      inputLanguage.min_space = 'Min Space'
      inputLanguage.max_space = 'Max Space'
      inputLanguage.min_price_per_sq_meter = 'Min price per square meter'
      inputLanguage.max_price_per_sq_meter = 'Max price per square meter'
      inputLanguage.min_full_price = 'Min full price'
      inputLanguage.max_full_price = 'Max full price'
      break;

    case "ka":
      inputLanguage.min_space = 'მინიმალური ფართი'
      inputLanguage.max_space = 'მაქსიმალური ფართი'
      inputLanguage.min_price_per_sq_meter = 'მინიმალური კვადრატული ფასი'
      inputLanguage.max_price_per_sq_meter = 'მაქსიმალური კვადრატული ფასი'
      inputLanguage.min_full_price = 'მინიმალური მთლიანი ფასი'
      inputLanguage.max_full_price = 'მაქსიმალური მთლიანი ფასი'
      break;

    case "ru":
      inputLanguage.min_space = 'Минимальное пространство'
      inputLanguage.max_space = 'максимальное пространство'
      inputLanguage.min_price_per_sq_meter = 'Минимальная цена за квадратный метр'
      inputLanguage.max_price_per_sq_meter = 'Максимальная цена за квадратный метр'
      inputLanguage.min_full_price = 'Минимальная общая стоимость'
      inputLanguage.max_full_price = 'Максимальная общая стоимость'
      break;
    
  }
  return inputLanguage
}




// -----------------------------------------------------------------------------------------------------------------------------







// --------ffunction for changing status button content language change and also select city button language change -------------

const handleStatusButtonLanguageChange = (lang) => {
  var languageInfo = {
    statusInfoLanguage : "en" ,
    cityButtonLanguage : "Select City ",
    spaceButtonLanguage : "Space",
    priceButtonLanguage: "Price",
    allStatusLanguage: "All",
    legendUnderPlanning : "Under Planning",
    legendUnderConstructioin : "Under Construction",
    legendComplited : "Complited",
    privateApartmebt : "Private appartment",
    groundMarkers :"Grounds",
    categoryLanguage : "Category" ,
    complexes : "Complexes",
    private_apartments : "Private Appartments",
    lands : "Lands",
    show_all : "Show All"
  }

  switch (lang) {
    case "en" :
      languageInfo.statusInfoLanguage = "Select Status"
      languageInfo.cityButtonLanguage = "Location"
      languageInfo.spaceButtonLanguage = "Space"
      languageInfo.priceButtonLanguage = "Price"
      languageInfo.allStatusLanguage = "All"
      languageInfo.legendUnderPlanning = "Under Planning"
      languageInfo.legendUnderConstructioin = "Under Construction"
      languageInfo.legendComplited = "Complited"
      languageInfo.privateApartmebt = "Private appartment"
      languageInfo.groundMarkers = "Grounds"
      languageInfo.categoryLanguage = "Category"
      languageInfo.complexes = "Complexes"
      languageInfo.private_apartments = "Private Appartments"
      languageInfo.lands = "Lands"
      languageInfo.show_all = "Show All"
      break;

    case "ka" :
      languageInfo.statusInfoLanguage = "აირჩიე სტატუსი"
      languageInfo.cityButtonLanguage = "მდებარეობა"
      languageInfo.spaceButtonLanguage = "ფართი"
      languageInfo.priceButtonLanguage = "ფასი"
      languageInfo.allStatusLanguage = "ყველა"
      languageInfo.legendUnderPlanning = "დაგეგმვის პროცესში"
      languageInfo.legendUnderConstructioin = "მშენებარე"
      languageInfo.legendComplited = "დასრულებული"
      languageInfo.privateApartmebt = "კერძო ბინები"
      languageInfo.groundMarkers = "ნაკვეთები"
      languageInfo.categoryLanguage = "კატეგორია"
      languageInfo.complexes = "კომპლექსები"
      languageInfo.private_apartments = "კერძო ბინები"
      languageInfo.lands = "ნაკვეთები"
      languageInfo.show_all = "აჩვენე ყველა"
      break
      
    case "ru" :
      languageInfo.statusInfoLanguage = "выберите статус"
      languageInfo.cityButtonLanguage = "Местоположение"
      languageInfo.spaceButtonLanguage = "Площадь"
      languageInfo.priceButtonLanguage = "Цена"
      languageInfo.allStatusLanguage = "Все"
      languageInfo.legendUnderPlanning = "На стадии планирования"
      languageInfo.legendUnderConstructioin = "На стадии строительства"
      languageInfo.legendComplited = "Завершено"
      languageInfo.privateApartmebt = "частные апартаменты"
      languageInfo.groundMarkers = "Участки"
      languageInfo.categoryLanguage = "Категория"
      languageInfo.complexes = "Комплексы"
      languageInfo.private_apartments = "Частные апартаменты"
      languageInfo.lands = "Участки"
      languageInfo.show_all = "Показать все"
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

const handle_P_MarkerClick = (private_apartment) => {
  setSelectedPrivateApartments(private_apartment);
  setZoomLevel(17); // Zoom in more when a marker is clicked
  setMapCenter({ lat: private_apartment.address.latitude, lng: private_apartment.address.longitude }); 
}

const handle_ground_MarkerClick = (ground) => {
  setSelectedGrounds(ground);
  setZoomLevel(17); // Zoom in more when a marker is clicked
  setMapCenter({ lat: ground.address.latitude, lng: ground.address.longitude }); 
}



const handleZoomChanged = () => {
  if (mapInstance) {
    setZoomLevel(mapInstance.getZoom());
  }
};

const handleLoad = (map) => {
  setMapInstance(map); // Store the map instance
};




// --------------------------changing filtation methods-----------------------------------------
// -------------------------------
const renderFilterMethods = () => {
  return (
    <>
                      {/* pirveli chekboxi kompleqsebistvis */}
                      <div className='filter_chackboxes' >
                          <div>
                            <label className="container">
                                    <input type="checkbox" value="complexes"  checked={filterType === 'complexes'}  onChange={(event) => {
                                      handleCheckboxChange(event);
                                      handleReset_PApartmentStates(event);
                                    }} />
                                    <div className="checkmark"></div>
                            </label>
                          </div>
                              <h1 className='filter_mark'  >{handleStatusButtonLanguageChange(selectedLanguage).complexes}</h1>
                        </div>

                    {/* meore chekboxi kerdzo apartamentebistvis */}
                      <div className='filter_chackboxes'>
                        <div>
                          <label className="container">
                                  <input type="checkbox" value="privateApartments"  checked={filterType === 'privateApartments'}  onChange={(event) => {
                                  handleCheckboxChange(event);
                                  handleResetComplexStates(event);
                                  }}/>
                                  <div className="checkmark"></div>
                                </label>
                          </div>
                                <h1 className='filter_mark'  >{handleStatusButtonLanguageChange(selectedLanguage).private_apartments}</h1>
                        </div>

                        {/* mesame chekboxi miwebistvis */}
                      <div className='filter_chackboxes'>
                        <div>
                          <label className="container">
                                  <input type="checkbox" value="grounds"  checked={filterType === 'grounds'}  onChange={(event) => {
                                  handleCheckboxChange(event);
                                  handleReset_complex_and_pApartmentStates(event);
                                  }}/>
                                  <div className="checkmark"></div>
                                </label>
                          </div>
                                <h1 className='filter_mark'  >{handleStatusButtonLanguageChange(selectedLanguage).lands}</h1>
                        </div>


                         {/*chekboxi yvelas chvenebistvis */}
                      <div className='filter_chackboxes'>
                        <div>
                          <label className="container">
                                  <input type="checkbox" value="all"  checked={filterType === 'all'} onChange={(event) => {
                                  handleCheckboxChange(event);
                                  HandleResetAllStates(event);
                                  }} />
                                  <div className="checkmark"></div>
                                </label>
                          </div>
                                <h1 className='filter_mark'  >{handleStatusButtonLanguageChange(selectedLanguage).show_all}</h1>
                        </div>
    </>
  )
}

// -----------------------------------------------------------------------------------------

// ---------------------------------logika filtraciis cvlilebistvis-----------------------------------------

const handleCheckboxChange = (event) => {
  setFilterType(event.target.value);
};

const renderFilterUI = () => {
  switch (filterType) {
    case 'complexes':
      return (
      <div>
         {/* axali divebi butonebis magivrad filtraciistvis */}
         <motion.div
                      key={filterType}
                      initial={{ y: 100, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 1 }}
                    >

                  <div className='filter_cont ' id='filter_cont_2' >


                      {/* button for filtering space */}
                      <div className="button-modal-container ">
                            <div onClick={handleSpaceButtonClick}  className='space_button'  >
                              {handleStatusButtonLanguageChange(selectedLanguage).spaceButtonLanguage}
                              <img src={button_icon} alt="button dropdown icon" className='dropdown' />
                            </div> 

                            <SpaceModal isOpen={isSpaceModalOpen} close={closeSpaceModal}>
                              <div className='filter_little_container'   >
                                  <input
                                      type="number"
                                      className='filter_inputs'
                                      placeholder={handleInputLanguageChange(selectedLanguage).min_space}
                                      value={min_space}
                                      onChange={(e) => setMin_space(e.target.value)}
                                  />
                                  
                                    <input
                                      type="number"
                                      className='filter_inputs'
                                      placeholder={handleInputLanguageChange(selectedLanguage).max_space}
                                      value={max_space}
                                      onChange={(e) => setMax_space(e.target.value)}
                                  />
                                  <p>otaxebis filtraciac unda iyos aq</p>
                              </div>
                            <button className='modal_close_button' onClick={closeSpaceModal}>Close</button>
                            </SpaceModal>
                      </div>

                      {/* button for filtering price  */}
                      <div className="button-modal-container">
                            <div onClick={handlePriceButtonClick}  className='space_button'  >
                              {handleStatusButtonLanguageChange(selectedLanguage).priceButtonLanguage}
                              <img src={button_icon} alt="button dropdown icon" className='dropdown' />
                            </div> 
                            <PriceModal isOpen={isPriceModalOpen} close={handleClosePriceModal} >
                            <div>
                                  <input
                                      type="number"
                                      className='filter_inputs'
                                      placeholder={handleInputLanguageChange(selectedLanguage).min_price_per_sq_meter}
                                      value={minPricePerSquareMeter}
                                      onChange={(e) => setMinPricePerSquareMeter(e.target.value)}
                                      />

                                  <input
                                      type="number"
                                      className='filter_inputs'
                                      placeholder={handleInputLanguageChange(selectedLanguage).max_price_per_sq_meter}
                                      value={maxPricePerSquareMeter}
                                      onChange={(e) => setMaxPricePerSquareMeter(e.target.value)}
                                  />
                                 
                                  <input
                                    type="number"
                                    className='filter_inputs'
                                    placeholder={handleInputLanguageChange(selectedLanguage).min_full_price}
                                    value={minFullPrice}
                                    onChange={(e) => setMinFullPrice(e.target.value)}
                                  />

                                  <input
                                    type="number"
                                    className='filter_inputs'
                                    placeholder={handleInputLanguageChange(selectedLanguage).max_full_price}
                                    value={maxFullPrice}
                                    onChange={(e) => setMaxFullPrice(e.target.value)}
                                  />                            
                            </div>
                            <button className='modal_close_button' onClick={handleClosePriceModal}>Close</button>
                            </PriceModal>
                        </div>

                      {/* button for locations */}
                      <div className="button-modal-container" >
                            <div onClick={handleShowModal} className='lacation_button'   >
                            {handleStatusButtonLanguageChange(selectedLanguage).cityButtonLanguage}
                              <img src={button_icon} alt="button dropdown icon" className='dropdown' />
                            </div>
                            <Modal isOpen={isModalOpen} >
                              {renderModalContent()}
                            </Modal>
                      </div>

                        {/* button for status */}
                      <div className="button-modal-container" >
                            <div onClick={handleStatusButtonClick} className='lacation_button'   >
                            {handleStatusButtonLanguageChange(selectedLanguage).statusInfoLanguage}
                              <img src={button_icon} alt="button dropdown icon" className='dropdown' />
                            </div>
                            <StatusModal isOpen={isStatusModalOpen} close={handleCloseStatusModal} >
                            {renderStatusOptions()}
                            <button className='modal_close_button' onClick={handleCloseStatusModal}>Close</button>
                            </StatusModal>
                      </div>
                  </div>
                  </motion.div>
      </div>
    ); case 'privateApartments' : 
    return (
      <motion.div
           key={filterType}
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className='filter_cont' >
                 {/* container for filtering space */}
                 <div className="button-modal-container ">
                            <div onClick={handleSpaceButtonClick}  className='space_button'  >
                              {handleStatusButtonLanguageChange(selectedLanguage).spaceButtonLanguage}
                              <img src={button_icon} alt="button dropdown icon" className='dropdown' />
                            </div> 
                            <SpaceModal isOpen={isSpaceModalOpen} close={closeSpaceModal}>
                              <div>
                                  <input
                                      type="number"
                                      className='filter_inputs'
                                      placeholder={handleInputLanguageChange(selectedLanguage).min_space}
                                      value={min_area}
                                      onChange={(e) => setMin_area(e.target.value)}
                                  />
                                  
                                    <input
                                      type="number"
                                      className='filter_inputs'
                                      placeholder={handleInputLanguageChange(selectedLanguage).max_space}
                                      value={max_area}
                                      onChange={(e) => setMax_area(e.target.value)}
                                  />
                                  <p>otaxebis filtraciac unda iyos aq</p>
                              </div>
                            <button className='modal_close_button' onClick={closeSpaceModal}>Close</button>
                            </SpaceModal>
                      </div>

                  {/* container for filtering price  */}
                  <div className="button-modal-container">
                            <div onClick={handlePriceButtonClick}  className='space_button'  >
                              {handleStatusButtonLanguageChange(selectedLanguage).priceButtonLanguage}
                              <img src={button_icon} alt="button dropdown icon" className='dropdown' />
                            </div> 
                            <PriceModal isOpen={isPriceModalOpen} close={handleClosePriceModal} >
                            <div>
                                  <input
                                      type="number"
                                      className='filter_inputs'
                                      placeholder={handleInputLanguageChange(selectedLanguage).min_price_per_sq_meter}
                                      value={min_square_price}
                                      onChange={(e) => setMin_square_price(e.target.value)}
                                      />

                                  <input
                                      type="number"
                                      className='filter_inputs'
                                      placeholder={handleInputLanguageChange(selectedLanguage).max_price_per_sq_meter}
                                      value={max_square_price}
                                      onChange={(e) => setMax_square_price(e.target.value)}
                                  />
                                 
                                 <input
                                   type="number"
                                   className='filter_inputs'
                                   placeholder={handleInputLanguageChange(selectedLanguage).min_full_price}
                                   value={min_P_FullPrice}
                                   onChange={(e) => setMin_P_FullPrice(e.target.value)}
                                 />              

                                  <input
                                    type="number"
                                    className='filter_inputs'
                                    placeholder={handleInputLanguageChange(selectedLanguage).max_full_price}
                                    value={max_P_FullPrice}
                                    onChange={(e) => setMax_P_FullPrice(e.target.value)}
                                  />

                            </div>
                            <button className='modal_close_button' onClick={handleClosePriceModal}>Close</button>
                            </PriceModal>
                        </div>

                        {/* button for locations */}
                      <div className="button-modal-container" >
                            <div onClick={handleShowModal} className='lacation_button'   >
                            {handleStatusButtonLanguageChange(selectedLanguage).cityButtonLanguage}
                              <img src={button_icon} alt="button dropdown icon" className='dropdown' />
                            </div>
                            <Modal isOpen={isModalOpen} >
                              {renderModalContent()}
                            </Modal>
                      </div>

                      {/* button for status */}
                      <div className="button-modal-container" >
                            <div onClick={handleStatusButtonClick} className='lacation_button'   >
                            {handleStatusButtonLanguageChange(selectedLanguage).statusInfoLanguage}
                              <img src={button_icon} alt="button dropdown icon" className='dropdown' />
                            </div>
                            <StatusModal isOpen={isStatusModalOpen} close={handleCloseStatusModal} >
                            {renderStatusOptions_For_P()}
                            <button className='modal_close_button' onClick={handleCloseStatusModal}>Close</button>
                            </StatusModal>
                      </div>
          </div>
          </motion.div>
    );case 'grounds' : 
    return (
      <motion.div
          key={filterType}
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className='filter_cont' >
                 {/* container for filtering space */}
                 <div className="button-modal-container ">
                            <div onClick={handleSpaceButtonClick}  className='space_button'  >
                              {handleStatusButtonLanguageChange(selectedLanguage).spaceButtonLanguage}
                              <img src={button_icon} alt="button dropdown icon" className='dropdown' />
                            </div> 
                            <G_SpaceModal isOpen={isSpaceModalOpen} close={closeSpaceModal}>
                              <div>
                                  <input
                                      type="number"
                                      className='filter_inputs'
                                      placeholder={handleInputLanguageChange(selectedLanguage).min_space}
                                      value={min_ground_area}
                                      onChange={(e) => setMin_ground_area(e.target.value)}
                                  />
                                  
                                    <input
                                      type="number"
                                      className='filter_inputs'
                                      placeholder={handleInputLanguageChange(selectedLanguage).max_space}
                                      value={max_ground_area}
                                      onChange={(e) => setMax_ground_area(e.target.value)}
                                  />
                              </div>
                            <button className='modal_close_button' onClick={closeSpaceModal}>Close</button>
                            </G_SpaceModal>
                      </div>

                  {/* container for filtering price  */}
                  <div className="button-modal-container">
                            <div onClick={handlePriceButtonClick}  className='space_button'  >
                              {handleStatusButtonLanguageChange(selectedLanguage).priceButtonLanguage}
                              <img src={button_icon} alt="button dropdown icon" className='dropdown' />
                            </div> 
                            <G_PriceModal isOpen={isPriceModalOpen} close={handleClosePriceModal} >
                            <div>
                                  <input
                                      type="number"
                                      className='filter_inputs'
                                      placeholder={handleInputLanguageChange(selectedLanguage).min_price_per_sq_meter}
                                      value={min_graund_square_price}
                                      onChange={(e) => setMin_graund_square_price(e.target.value)}
                                      />

                                  <input
                                      type="number"
                                      className='filter_inputs'
                                      placeholder={handleInputLanguageChange(selectedLanguage).max_price_per_sq_meter}
                                      value={max_ground_square_price}
                                      onChange={(e) => setMax_ground_square_price(e.target.value)}
                                  />
                                 
                                 <input
                                   type="number"
                                   placeholder={handleInputLanguageChange(selectedLanguage).min_full_price}
                                   className='filter_inputs'
                                   value={min_graund_full_price}
                                   onChange={(e) => setMin_graund_full_price(e.target.value)}
                                 />              

                                  <input
                                    type="number"
                                    className='filter_inputs'
                                    placeholder={handleInputLanguageChange(selectedLanguage).max_full_price}
                                    value={max_ground_fill_price}
                                    onChange={(e) => setMax_ground_fill_price(e.target.value)}
                                  />

                            </div>
                            <button className='modal_close_button' onClick={handleClosePriceModal}>Close</button>
                            </G_PriceModal>
                        </div>

                        {/* button for locations */}
                      <div className="button-modal-container" >
                            <div onClick={handleShowModal} className='lacation_button'   >
                            {handleStatusButtonLanguageChange(selectedLanguage).cityButtonLanguage}
                              <img src={button_icon} alt="button dropdown icon" className='dropdown' />
                            </div>
                            <G_Modal isOpen={isModalOpen} >
                              {renderModalContent()}
                            </G_Modal>
                      </div>

                      {/* button for status */}
                      <div className="button-modal-container" >
                            <div onClick={handleStatusButtonClick} className='lacation_button'   >
                            {handleStatusButtonLanguageChange(selectedLanguage).statusInfoLanguage}
                              <img src={button_icon} alt="button dropdown icon" className='dropdown' />
                            </div>
                            <G_StatusModal isOpen={isStatusModalOpen} close={handleCloseStatusModal} >
                            {render_Ground_StatusOption()}
                            <button className='modal_close_button' onClick={handleCloseStatusModal}>Close</button>
                            </G_StatusModal>
                      </div>
          </div>
          </motion.div>
    );
  }
};

const renderMarkers = () => {
  switch (filterType) {
    case "complexes":
      return (
        <>
          {/* map complexes */}
          {complexes.map(complex => {
                            if (complex.address && complex.address.latitude && complex.address.longitude) {
                              const statusInfo = getStatusInfo(complex.complexDetails.isFinished);
                              
                              return (
                                <Marker
                                key={complex.id}
                                  position={{
                                    lat: complex.address.latitude,
                                    lng: complex.address.longitude,
                                  }}
                                  icon={{
                                    url: statusInfo.iconUrl,
                                    scaledSize: statusInfo.scaledSize
                                  }}
                                  onClick={() => handleMarkerClick(complex)}
                                />
                                
                              );
                            }
                            return null;
                          })}
                          {selectedComplex && (
                            <InfoWindow
                            position={{
                              lat: Number(selectedComplex.address.latitude),
                                lng: Number(selectedComplex.address.longitude),
                              }}
                              onCloseClick={() => setSelectedComplex(null)}
                              >
                              <div>
                                <h2>{selectedComplex.complexName}</h2>
                                <p>{getStatusText(selectedComplex.complexDetails.isFinished, selectedLanguage)}</p> 
                                {/* Add more details and the image if available */}
                                {selectedComplex.images && selectedComplex.images.length > 0 && (
                                  <img src={selectedComplex.images[0]} alt={selectedComplex.complexName} className='infowindow_img' />
                                  )}
                              </div>
                            </InfoWindow>
                          )} 
        </>
      );
    case "privateApartments":
      return (
        <>
        {privateApartments.map(p_apartments => {
          if (privateApartments&& p_apartments.address.latitude && p_apartments.address.longitude){
            return (
              <Marker 
              key={p_apartments.id}
              position={{
                lat: p_apartments.address.latitude,
                lng: p_apartments.address.longitude,
              }}
              icon={{
                url: apartment_market,
                scaledSize: new window.google.maps.Size(40, 40),
              }}
              onClick={() => handle_P_MarkerClick(p_apartments)}
              />
            )
          }
           })};
            {selectedPrivateApartments && (
                <InfoWindow
                className='infowindoe_itself'
                position={{
                    lat: Number(selectedPrivateApartments.address.latitude),
                    lng: Number(selectedPrivateApartments.address.longitude),
                  }}
                  onCloseClick={() => setSelectedPrivateApartments(null)}
                  >
                  <div className='infowindow_container'  >
                    <h2>{selectedPrivateApartments.privateApartmentName}</h2>
                    <p>{getStatusTextfor_P(selectedPrivateApartments.status, selectedLanguage)}</p> 
                    {/* Add more details and the image if available */}
                    {selectedPrivateApartments.images && selectedPrivateApartments.images.length > 0 && (
                      <img src={selectedPrivateApartments.images[0]} alt={selectedPrivateApartments.privateApartmentName} className='infowindow_img' />
                      )}
                  </div>
                </InfoWindow>
              )} 

        </>
      );
      case "grounds":
        return (
          <>
          {grounds.map(ground => {
            if (privateApartments&& ground.address.latitude && ground.address.longitude){
              return (
                <Marker 
                key={ground.id}
                position={{
                  lat: ground.address.latitude,
                  lng: ground.address.longitude,
                }}
                icon={{
                  url: ground_marker,
                  scaledSize: new window.google.maps.Size(40, 40),
                }}
                onClick={() => handle_ground_MarkerClick(ground)}
                />
              )
            }
             })};
             {selectedGrounds && (
                  <InfoWindow
                  className='infowindoe_itself'
                  position={{
                      lat: Number(selectedGrounds.address.latitude),
                      lng: Number(selectedGrounds.address.longitude),
                    }}
                    onCloseClick={() => setSelectedGrounds(null)}
                    >
                    <div className='infowindow_container'  >
                      <h2>{selectedGrounds.privateApartmentName}</h2>
                      <p>{getStatusTextfor_P(selectedGrounds.status, selectedLanguage)}</p>  
                      {/* Add more details and the image if available */}
                       {selectedGrounds.images && selectedGrounds.images.length > 0 && (
                        <img src={selectedGrounds.images[0]} alt={selectedGrounds.privateApartmentName} className='infowindow_img' />
                        )}
                    </div>
                  </InfoWindow>
                )}  
  
          </>
        );
    case "all":
    default:
      
      return (
        <>
          {/* map complexes */}
          {complexes.map(complex => {
                  if (complex.address && complex.address.latitude && complex.address.longitude) {
                    const statusInfo = getStatusInfo(complex.complexDetails.isFinished);
                    
                    return (
                      <Marker
                      key={complex.id}
                        position={{
                          lat: complex.address.latitude,
                          lng: complex.address.longitude,
                        }}
                        icon={{
                          url: statusInfo.iconUrl,
                          scaledSize: statusInfo.scaledSize
                        }}
                        onClick={() => handleMarkerClick(complex)}
                      />
                      
                    );
                  }
                  return null;
                })}
                {selectedComplex && (
                  <InfoWindow
                  position={{
                    lat: Number(selectedComplex.address.latitude),
                      lng: Number(selectedComplex.address.longitude),
                    }}
                    onCloseClick={() => setSelectedComplex(null)}
                    >
                    <div>
                      <h2>{selectedComplex.complexName}</h2>
                      <p>{getStatusText(selectedComplex.complexDetails.isFinished, selectedLanguage)}</p> 
                      {/* Add more details and the image if available */}
                      {selectedComplex.images && selectedComplex.images.length > 0 && (
                        <img src={selectedComplex.images[0]} alt={selectedComplex.complexName} className='infowindow_img' />
                        )}
                    </div>
                  </InfoWindow>
                )} 
            {/* marketebis damapva kerdzo pirebis binebistvis */}
          {privateApartments.map(p_apartments => {
          if (privateApartments&& p_apartments.address.latitude && p_apartments.address.longitude){
            return (
              <Marker 
              key={p_apartments.id}
              position={{
                lat: p_apartments.address.latitude,
                lng: p_apartments.address.longitude,
              }}
              icon={{
                url: apartment_market,
                scaledSize: new window.google.maps.Size(40, 40),
              }}
              onClick={() => handle_P_MarkerClick(p_apartments)}
              />
            )
          }
           })};
            {selectedPrivateApartments && (
                <InfoWindow
                className='infowindoe_itself'
                position={{
                    lat: Number(selectedPrivateApartments.address.latitude),
                    lng: Number(selectedPrivateApartments.address.longitude),
                  }}
                  onCloseClick={() => setSelectedPrivateApartments(null)}
                  >
                  <div className='infowindow_container'  >
                    <h2>{selectedPrivateApartments.privateApartmentName}</h2>
                    <p>{getStatusTextfor_P(selectedPrivateApartments.status, selectedLanguage)}</p> 
                    {/* Add more details and the image if available */}
                    {selectedPrivateApartments.images && selectedPrivateApartments.images.length > 0 && (
                      <img src={selectedPrivateApartments.images[0]} alt={selectedPrivateApartments.privateApartmentName} className='infowindow_img' />
                      )}
                  </div>
                </InfoWindow>
              )} 
          {/* marketebis damapva miwebistvis */}
            {grounds.map(ground => {
            if (privateApartments&& ground.address.latitude && ground.address.longitude){
              return (
                <Marker 
                key={ground.id}
                position={{
                  lat: ground.address.latitude,
                  lng: ground.address.longitude,
                }}
                icon={{
                  url: ground_marker,
                  scaledSize: new window.google.maps.Size(40, 40),
                }}
                onClick={() => handle_ground_MarkerClick(ground)}
                />
              )
            }
             })};
             {selectedGrounds && (
                  <InfoWindow
                  className='infowindoe_itself'
                  position={{
                      lat: Number(selectedGrounds.address.latitude),
                      lng: Number(selectedGrounds.address.longitude),
                    }}
                    onCloseClick={() => setSelectedGrounds(null)}
                    >
                    <div className='infowindow_container'  >
                      <h2>{selectedGrounds.privateApartmentName}</h2>
                      <p>{getStatusTextfor_P(selectedGrounds.status, selectedLanguage)}</p>  
                      {/* Add more details and the image if available */}
                       {selectedGrounds.images && selectedGrounds.images.length > 0 && (
                        <img src={selectedGrounds.images[0]} alt={selectedGrounds.privateApartmentName} className='infowindow_img' />
                        )}
                    </div>
                  </InfoWindow>
                )}  
           
        </>
      );
  }
};


const handleResetComplexStates  = () =>{
  setSelectedCity('')
  setSelectedPharentDistricts([])
  setSelectedDistricts([])
  setMinPricePerSquareMeter('')
  setMaxPricePerSquareMeter('')
  setMin_space('')
  setMax_space('')
  setMinFullPrice('')
  setMaxFullPrice('')
  setStatus('')
  setSelectedStatuses([])
}


const handleReset_PApartmentStates = () => {
  setSelectedCity('')
  setSelectedPharentDistricts([])
  setSelectedDistricts([])
  setMin_space('')
  setMax_space('')
  setMinFullPrice('')
  setMaxFullPrice('')
  setMaxPricePerSquareMeter('')  
  setMinPricePerSquareMeter('')
  setSelectedStatuses_For_P([])
}

const handleReset_complex_and_pApartmentStates = () =>{
  setSelectedCity('')
  setSelectedPharentDistricts([])
  setSelectedDistricts([])
  setGraundStatus([])
  setMin_ground_area('')
  setMax_ground_area('')
  setMin_graund_full_price('')
  setMax_ground_fill_price('')
  setMin_graund_square_price('')
  setMax_ground_square_price('')
}


const HandleResetAllStates = () => {
  setSelectedCity('')
  setSelectedPharentDistricts([])
  setSelectedDistricts([])
  setMin_space('')
  setMax_space('')
  setMinFullPrice('')
  setMaxFullPrice('')
  setMaxPricePerSquareMeter('')  
  setMinPricePerSquareMeter('')
  setSelectedStatuses([])
  setSelectedCity('')
  setSelectedPharentDistricts([])
  setSelectedDistricts([])
  setMinPricePerSquareMeter('')
  setMaxPricePerSquareMeter('')
  setMin_space('')
  setMax_space('')
  setMinFullPrice('')
  setMaxFullPrice('')
  setStatus('')
  setSelectedStatuses([])
  setSelectedStatuses_For_P([])
  setSelectedCity('')
  setSelectedPharentDistricts([])
  setSelectedDistricts([])
  setGraundStatus([])
  setMin_ground_area('')
  setMax_ground_area('')
  setMin_graund_full_price('')
  setMax_ground_fill_price('')
  setMin_graund_square_price('')
  setMax_ground_square_price('')
}
// ---------------------------------functions for clicking legend icons and filtering it ----------------------------------

const handle_red_markerClick = () => {
  setFilterType('complexes')
  setSelectedStatuses(['1'])
  setSelectedCity('')
  setSelectedPharentDistricts([])
  setSelectedDistricts([])
  setMin_space('')
  setMax_space('')
  setMinFullPrice('')
  setMaxFullPrice('')
  setMaxPricePerSquareMeter('')  
  setMinPricePerSquareMeter('')
  // setSelectedStatuses([])
  setSelectedCity('')
  setSelectedPharentDistricts([])
  setSelectedDistricts([])
  setMinPricePerSquareMeter('')
  setMaxPricePerSquareMeter('')
  setMin_space('')
  setMax_space('')
  setMinFullPrice('')
  setMaxFullPrice('')
  setStatus('')
  setSelectedStatuses_For_P([])
  setSelectedCity('')
  setSelectedPharentDistricts([])
  setSelectedDistricts([])
  setGraundStatus([])
  setMin_ground_area('')
  setMax_ground_area('')
  setMin_graund_full_price('')
  setMax_ground_fill_price('')
  setMin_graund_square_price('')
  setMax_ground_square_price('')
}

const handle_yelow_markerClick = () => {
  setFilterType('complexes')
  setSelectedStatuses(['2'])
  setSelectedCity('')
  setSelectedPharentDistricts([])
  setSelectedDistricts([])
  setMin_space('')
  setMax_space('')
  setMinFullPrice('')
  setMaxFullPrice('')
  setMaxPricePerSquareMeter('')  
  setMinPricePerSquareMeter('')
  // setSelectedStatuses([])
  setSelectedCity('')
  setSelectedPharentDistricts([])
  setSelectedDistricts([])
  setMinPricePerSquareMeter('')
  setMaxPricePerSquareMeter('')
  setMin_space('')
  setMax_space('')
  setMinFullPrice('')
  setMaxFullPrice('')
  setStatus('')
  setSelectedStatuses_For_P([])
  setSelectedCity('')
  setSelectedPharentDistricts([])
  setSelectedDistricts([])
  setGraundStatus([])
  setMin_ground_area('')
  setMax_ground_area('')
  setMin_graund_full_price('')
  setMax_ground_fill_price('')
  setMin_graund_square_price('')
  setMax_ground_square_price('')
  
}

const handle_green_markerClick = () => {
  setFilterType('complexes')
  setSelectedStatuses(['3'])
  setSelectedCity('')
  setSelectedPharentDistricts([])
  setSelectedDistricts([])
  setMin_space('')
  setMax_space('')
  setMinFullPrice('')
  setMaxFullPrice('')
  setMaxPricePerSquareMeter('')  
  setMinPricePerSquareMeter('')
  // setSelectedStatuses([])
  setSelectedCity('')
  setSelectedPharentDistricts([])
  setSelectedDistricts([])
  setMinPricePerSquareMeter('')
  setMaxPricePerSquareMeter('')
  setMin_space('')
  setMax_space('')
  setMinFullPrice('')
  setMaxFullPrice('')
  setStatus('')
  setSelectedStatuses_For_P([])
  setSelectedCity('')
  setSelectedPharentDistricts([])
  setSelectedDistricts([])
  setGraundStatus([])
  setMin_ground_area('')
  setMax_ground_area('')
  setMin_graund_full_price('')
  setMax_ground_fill_price('')
  setMin_graund_square_price('')
  setMax_ground_square_price('')
}

const handle_PApartmentMarkerClick = () => {
  setFilterType('privateApartments')
  setSelectedCity('')
  setSelectedPharentDistricts([])
  setSelectedDistricts([])
  setMin_space('')
  setMax_space('')
  setMinFullPrice('')
  setMaxFullPrice('')
  setMaxPricePerSquareMeter('')  
  setMinPricePerSquareMeter('')
  setSelectedStatuses([])
  setSelectedCity('')
  setSelectedPharentDistricts([])
  setSelectedDistricts([])
  setMinPricePerSquareMeter('')
  setMaxPricePerSquareMeter('')
  setMin_space('')
  setMax_space('')
  setMinFullPrice('')
  setMaxFullPrice('')
  setStatus('')
  // setSelectedStatuses_For_P([])
  setSelectedCity('')
  setSelectedPharentDistricts([])
  setSelectedDistricts([])
  setGraundStatus([])
  setMin_ground_area('')
  setMax_ground_area('')
  setMin_graund_full_price('')
  setMax_ground_fill_price('')
  setMin_graund_square_price('')
  setMax_ground_square_price('')
}

const handle_Ground_MarkerClick = () => {
  setFilterType('grounds')
  setSelectedCity('')
  setSelectedPharentDistricts([])
  setSelectedDistricts([])
  setMin_space('')
  setMax_space('')
  setMinFullPrice('')
  setMaxFullPrice('')
  setMaxPricePerSquareMeter('')  
  setMinPricePerSquareMeter('')
  // setSelectedStatuses([])
  setSelectedCity('')
  setSelectedPharentDistricts([])
  setSelectedDistricts([])
  setMinPricePerSquareMeter('')
  setMaxPricePerSquareMeter('')
  setMin_space('')
  setMax_space('')
  setMinFullPrice('')
  setMaxFullPrice('')
  setStatus('')
  setSelectedStatuses_For_P([])
  setSelectedCity('')
  setSelectedPharentDistricts([])
  setSelectedDistricts([])
  setGraundStatus([])
  setMin_ground_area('')
  setMax_ground_area('')
  setMin_graund_full_price('')
  setMax_ground_fill_price('')
  setMin_graund_square_price('')
  setMax_ground_square_price('')
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
// ---------------------------------------------------------------------------------------------------------------------
  return (
    <div className='main_map'>


            <motion.div
                      initial={{ y: 100, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 1 }}
                    >
                    <div className='filtetmethods_and_filters'  >
                      <div className='filter_methods_container'  >
                              {/* modal for filtering method changing */}
                              <div className="button-modal-container ">
                                <div onClick={handleFilterChangeModalClick}  className='space_button'  >
                                  {handleStatusButtonLanguageChange(selectedLanguage).categoryLanguage}
                                  <img src={button_icon} alt="button dropdown icon" className='dropdown' />
                                </div> 

                                <FilterChangeModal isOpen={isfilterChangeModalOpen} close={closeFilterChangeModal}>
                                    <div className='filter_little_container'>
                                          {renderFilterMethods()}
                                    </div>
                                    <button className='modal_close_button' onClick={closeFilterChangeModal}>Close</button>
                                </FilterChangeModal>
                            </div>
                      </div>
                    <div>
                      {renderFilterUI()}
                    </div>
                   </div>
                   </motion.div>

                   <div className="toggle-button-container" >
                   </div>

                    <div className='map_cont scale-up-hor-center' >
                        <GoogleMap
                          mapContainerStyle={{ width: '100%', height: '625px'  }}
                          center={mapCenter}
                          zoom={zoomLevel}
                          onLoad={handleLoad}
                          onZoomChanged={handleZoomChanged}
                          options={{
                            gestureHandling: "greedy",
                          }}
                        >
                        {renderMarkers()}
                        </GoogleMap>
                    </div> 
                    <div className='legend_contained scale-up-hor-center' >

                      <div className='child_legend_cont' onClick={handle_red_markerClick}>
                          <img src={red} alt='location icon' className='loc_icon' />
                          <p> {handleStatusButtonLanguageChange(selectedLanguage).legendUnderPlanning} </p>
                      </div>

                      <div className='child_legend_cont' onClick={handle_yelow_markerClick}  >
                          <img src={yelow} rel='location icon' className='loc_icon' />
                          <p> {handleStatusButtonLanguageChange(selectedLanguage).legendUnderConstructioin} </p>
                      </div>

                      <div className='child_legend_cont' onClick={handle_green_markerClick} >
                          <img src={green} rel='location icon' className='loc_icon'  />
                          <p> {handleStatusButtonLanguageChange(selectedLanguage).legendComplited}</p>
                      </div>

                      <div className='child_legend_cont'  onClick={handle_PApartmentMarkerClick} >
                          <img src={apartment_market} rel='location icon' className='loc_icon'  />
                          <p> {handleStatusButtonLanguageChange(selectedLanguage).privateApartmebt}</p>
                      </div>

                      <div className='child_legend_cont' onClick={handle_Ground_MarkerClick} >
                          <img src={ground_marker} rel='location icon' className='loc_icon'  />
                          <p> {handleStatusButtonLanguageChange(selectedLanguage).groundMarkers}</p>
                      </div>

                    </div>
      </div>
  );
}


















