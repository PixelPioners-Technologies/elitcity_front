
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Map.css';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import green from  '../location_icons/icon-green.png' 
import red from  '../location_icons/icon-red.png'
import yelow from  '../location_icons/icon-yelow.png'
import Modal from './Modal';

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



// ---------------------------------------------------------------------------------------------------------------------

export default function Map() {
  const [complexes, setComplexes] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedComplex, setSelectedComplex] = useState(null);
  const [locations , setLocations ] = useState([])

  const [modalContent , setModalContent] = useState('')
  const [isModalOpen , setIsModalOpen] = useState(false)

  const [selectedCity , setSelectedCity] = useState('')

// --------------------------------------axios  for complexes --------------------------------------
  useEffect(() => {
    const fetchComplexes = async () => {
      try {
        const response = await axios.get(`${Base_URL}${selectedLanguage}/`);

        const normalData = normalizeComplexData(response.data.results , selectedLanguage)
        setComplexes(normalData);
      } catch (error) {
        console.error('Error fetching complexes:', error);
      }
    };

    fetchComplexes();
  }, [selectedLanguage]); 

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
} , [selectedLanguage]  )



// ----------------------------------------------------------------------------------------------

useEffect(() => {
  console.log('This is normalized data', locations.map(loc => {
    return loc
  }
  ));
}, [complexes]);

// -------------------------------function for language to change--------------------------------------
  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

// ---------------------------------------------------------------------------------------------------------------------

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

  return statusTexts[lang][status] || "Unknown Status";
};

// ---------------------------------------------------------------------------------------------------------------------



const renderModalContent = () => {
  switch (modalContent) {
    case 'cities':
      return locations.map((cityItem, index) => (
        <button key={index} onClick={() => handleCityClick(cityItem.cityName)} className='button-19'>
          {cityItem.city}
        </button>
      ));
    default:
      return null;
  }
};


const handleShowModal = () => {
  setModalContent('cities')
  setIsModalOpen(true)
}

const handleCityClick = (city) => {
  // setModalContent("pharentdistricts")
  setSelectedCity(city)
  setIsModalOpen(true)
  console.log(selectedCity)
}

  return (
    <div className='main_map'>
      <div className='filter_cont'>
        <div>
          <select id="language-selector" value={selectedLanguage} onChange={handleLanguageChange}>
            <option value="ka">KA</option>
            <option value="en">EN</option>
            <option value="ru">RU</option>
          </select>
        </div>
        <div>
          <button onClick={handleShowModal}> Select City</button>
        </div>
        <Modal isOpen={isModalOpen} >
          {renderModalContent()}
        </Modal>
      </div>
      <div className='for_border'></div>
      <div className='map_cont'>
        <LoadScript googleMapsApiKey="AIzaSyDxK-BSMfOM2fRtkTUMpRn5arTyUTR03r0">
          <GoogleMap
            mapContainerStyle={{ width: '1000px', height: '100vh' }}
            center={initialCenter}
            zoom={13}
            options={{
              gestureHandling: "greedy",
            }}
          >
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
                    onClick={() => setSelectedComplex(complex)}
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


          </GoogleMap>
        </LoadScript>
      </div> 
    </div>
  );
}
