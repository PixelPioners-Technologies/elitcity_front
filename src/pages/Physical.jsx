import axios from "axios"
import React, { useState, useEffect } from 'react';
import './Physical.css'
import P_Modal from "../modals for private page/P_Modal";
import P_PriceModal from '../modals for private page/P_PriceModal';
import P_SpaceModal from '../modals for private page/P_SpaceModal';
import P_StatusModal from '../modals for private page/P_StatusModa'
import { motion } from 'framer-motion';
import button_icon from '../icons/Vector.svg'



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



export default function Physical({selectedLanguage}) {
  const [privateApartments, setPrivateApartments] = useState([]);
  

  const [is_P_ModalOpen, setIs_P_ModalOpen] = useState('');
  const [is_P_PriceModalOpen, setIs_P_PriceModalOpen] = useState(false);
  const [is_P_SpaceModalOpen, setIs_P_SpaceModalOpen] = useState(false);
  const [is_P_StatusModalOpen, setIs_P_StatusModalOpen] = useState(false);
  const [modalContent , setModalContent] = useState('');

  const [selectedCity , setSelectedCity] = useState('');
  const [selectedPharentDistricts ,  setSelectedPharentDistricts] = useState([]);
  const [selectedDistricts , setSelectedDistricts] = useState([]);

  const [locations , setLocations ] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([])

  const [min_square_price, setMin_square_price] = useState('');
  const [max_square_price, setMax_square_price] = useState('');

  const [min_area, setMin_area] = useState('');
  const [max_area, setMax_area] = useState('');

  const [minFullPrice, setMinFullPrice] = useState('');
  const [maxFullPrice, setMaxFullPrice] = useState('');

  // const [ascendentPrice, setAscendentPrice] = useState('');

useEffect(() =>{
  setSelectedCity('')
  setSelectedPharentDistricts([])
  setSelectedDistricts([])
  setMin_area('')
  setMax_area('')
  setMinFullPrice('')
  setMaxFullPrice('')
  setMin_square_price('')  
  setMax_square_price('')
  setLocations([])
  setSelectedStatuses([])
},[selectedLanguage])


// ------------------------------------axios for fetching private apartments -----------------------------------------

  const BaseURL_Private = 'http://127.0.0.1:8000/privateapartments/'

  useEffect(() => {
    const fetcPrivateApartments = async () => {

      // const cityParam = `address_${selectedLanguage}__city_${selectedLanguage}__city_${selectedLanguage}__icontains`;
      // const pharentdistrictParams =  `address_${selectedLanguage}__pharentDistrict_${selectedLanguage}__pharentDistrict_${selectedLanguage}__in`;
      // const districtParams = `address_${selectedLanguage}__district_${selectedLanguage}__district_${selectedLanguage}__in`;

      const cityParam = `city`;
      const pharentdistrictParams =  `parent_districts`;
      const districtParams = `districts`;

      //127.0.0.1:8000/privateapartments/en/?
      // min_area=&
      // max_area=&
      // min_full_price=&
      // max_full_price=&
      // min_square_price=&
      // max_square_price=&
      // city=&
      // parent_districts=vake-saburtalo&
      // districts=vake%2Csaburtalo


     //127.0.0.1:8000/privateapartments/en/?
    //  city=tbilisi&
    //  parent_districts=isani-samgori&
    //  districts=isani%2Csamgori%2Csaburtalo%2Cvake&
    //  min_square_price=&
    //  max_square_price=&
    //  min_full_price=&
    //  max_full_price=&
    //  min_area=&
    //  max_area=



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

      if (selectedStatuses && selectedStatuses.length > 0) {
        selectedStatuses.forEach(status => {
          queryParams.append('status', status);
        })
    }
    
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
    max_square_price, minFullPrice, maxFullPrice, selectedStatuses, max_area , min_area])
  



  useEffect(() => {
    console.log(selectedPharentDistricts,selectedDistricts);
  }, [selectedLanguage, selectedCity, selectedPharentDistricts, selectedDistricts, min_square_price,
    max_square_price, minFullPrice, maxFullPrice, selectedStatuses, max_area , min_area]);



  //127.0.0.1:8000/privateapartments/ka/?
  // city=%E1%83%97%E1%83%91%E1%83%98%E1%83%9A%E1%83%98%E1%83%A1%E1%83%98&
  // parent_districts=&districtParams=%E1%83%98%E1%83%A1%E1%83%90%E1%83%9C%E1%83%98&
  // min_square_price=&max_square_price=&
  // min_full_price=&
  // max_full_price=&
  // min_area=&
  // max_area=


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
} , [selectedLanguage  , selectedCity , selectedPharentDistricts, selectedDistricts]  )



// ----------------------------------------------------------------------------------------------

  // ------------------------------------modal and logic for opening filtration window --------------------------------------

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
  

  // -------------------------------------------------------------------------------------------------------------------------------------
  
// --------------------------------------------------------selecting districts and pharentdistricts --------------------------------------

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
    const updatedSelectedDistricts = e.target.checked 
      ? [...prevSelected, district] 
      : prevSelected.filter(d => d !== district);

    // Update parent districts based on selected districts
    const updatedSelectedParentDistricts = locations.reduce((acc, cityItem) => {
      if (cityItem.city === selectedCity) {
        cityItem.pharentDistricts.forEach(pd => {
          // Check if any district of this parent district is selected
          const isAnyDistrictSelected = pd.districts.some(dist => updatedSelectedDistricts.includes(dist));

          // If any district is selected, add the parent district, else remove it
          if (isAnyDistrictSelected) {
            if (!acc.includes(pd.pharentDistrict)) {
              acc.push(pd.pharentDistrict);
            }
          } else {
            acc = acc.filter(p => p !== pd.pharentDistrict);
          }
        });
      }
      return acc;
    }, [...selectedPharentDistricts]);

    // Update selectedPharentDistricts state
    setSelectedPharentDistricts(updatedSelectedParentDistricts);

    return updatedSelectedDistricts;
  });
};

// -------------------------------------------------------------------------------------------------------------------------------------
 
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

// -----------------------------------------------------------------------------------------------------------------------------
// ----------------------------------icon coloure and  status  change  ----------------------------------------------------------


// const getStatusText = (status, lang) => {
//   const statusTexts = {
//     en: {
//       1: "Planned",
//       2: "Under Construction",
//       3: "Completed"
//     },
//     ka: {
//       1: "დაგეგმილი",
//       2: "მშენებარე",
//       3: "დასრულებული"
//     },
//     ru: {
//       1: "Запланировано",
//       2: "Строится",
//       3: "Завершено"
//     }
//   };

//   return statusTexts[lang][status] || `unknown status`;
// };

  const statusTranslations = {
    1: { en: 'Newly renovated', ka: 'ახალ გარემონტებულო', ru: 'Недавно отремонтированный' },
    2: { en: 'With old repairs', ka: 'ძველი რემონტით', ru: 'Со старым ремонтом' },
    3: { en: 'To be repairedd', ka: 'გაურემონტებელი', ru: 'To be repairedd' }
    // Add more statuses and translations if needed
  };

  // ("1" , 'Newly renovated'),
  // ('2' , 'with old repairs'),
  // ('3', 'to be repaired'),

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
// --------ffunction for changing status button content language change and also select city button language change -------------

const handle_P_StatusButtonLanguageChange = (lang) => {
  var languageInfo = {
    statusInfoLanguage : "en" ,
    cityButtonLanguage : "Select City ",
    spaceButtonLanguage : "Space",
    priceButtonLanguage: "Price",
    allStatusLanguage: "All",
    legendUnderPlanning : "Under Planning",
    legendUnderConstructioin : "Under Construction",
    legendComplited : "Complited",
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
      break
  }
  return languageInfo
}
// ---------------------------------------------------------------------------------------------------------------------
// ----------------------------------------logic for space and proce modal to open and close -----------------------------------------------
const closeModal = () => {
  setIs_P_ModalOpen(false)
}


const handleShowModal = () => {
  setModalContent('cities')
  setIs_P_ModalOpen(true)
  setIs_P_SpaceModalOpen(false);
  setIs_P_PriceModalOpen(false)
  setIs_P_StatusModalOpen(false)
}

const handleCityClick = (city) => {
  setModalContent("pharentdistricts")
  setSelectedCity(city)
  setIs_P_ModalOpen(true)
}



const handle_P_SpaceButtonClick = () => {
  setIs_P_SpaceModalOpen(true);
  setIs_P_PriceModalOpen(false);
  setIs_P_StatusModalOpen(false);
  setIs_P_ModalOpen(false);
};

const close_P_SpaceModal = () => {
  setIs_P_SpaceModalOpen(false);
};

const handle_P_PriceButtonClick = () => {
  setIs_P_PriceModalOpen(true);
  setIs_P_SpaceModalOpen(false);
  setIs_P_ModalOpen(false);
  setIs_P_StatusModalOpen(false);
}

const handleClose_P_PriceModal= () => {
  setIs_P_PriceModalOpen(false)
}

const handle_P_StatusButtonClick = () => {
  setIs_P_StatusModalOpen(true);
  setIs_P_SpaceModalOpen(false);
  setIs_P_PriceModalOpen(false);
  setIs_P_ModalOpen(false);
}

const handleClose_P_StatusModal = () => {
  setIs_P_StatusModalOpen(false);
}


// ------------

  


  return (
    <div className="main_private_container">

                <div className="private_filter_conteiner">
                    <motion.div initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}>
                    <div className='filter_cont '>
                      {/* button for filtering space */}
                      <div className="button-modal-container ">
                            <div onClick={handle_P_SpaceButtonClick}  className='space_button'  >
                              {handle_P_StatusButtonLanguageChange(selectedLanguage).spaceButtonLanguage}
                              <img src={button_icon} alt="button dropdown icon" className='dropdown' />
                            </div> 

                            <P_SpaceModal isOpen={is_P_SpaceModalOpen} close={close_P_SpaceModal}>
                              <div>
                                        <input
                                      type="number"
                                      placeholder='Min Price Per Square Meter'
                                      value={min_area}
                                      onChange={(e) => setMin_area(e.target.value)}
                                  />
                                  
                                    <input
                                      type="number"
                                      placeholder='Max Price Per Square Meter'
                                      value={max_area}
                                      onChange={(e) => setMax_area(e.target.value)}
                                  />
                                  <p>otaxebis filtraciac unda iyos aq</p>
                              </div>
                            <button className='modal_close_button' onClick={close_P_SpaceModal}>Close</button>
                            </P_SpaceModal>

                      </div>

                      {/* button for filtering price  */}
                      <div className="button-modal-container">
                            <div onClick={handle_P_PriceButtonClick}  className='space_button'  >
                              {handle_P_StatusButtonLanguageChange(selectedLanguage).priceButtonLanguage}
                              <img src={button_icon} alt="button dropdown icon" className='dropdown' />
                            </div> 
                            <P_PriceModal isOpen={is_P_PriceModalOpen} close={handleClose_P_PriceModal} >
                            <div>
                                  <input
                                      type="number"
                                      placeholder='Min Price Per Square Meter'
                                      value={min_square_price}
                                      onChange={(e) => setMin_square_price(e.target.value)}
                                      />

                                  <input
                                      type="number"
                                      placeholder='Max Price Per Square Meter'
                                      value={max_square_price}
                                      onChange={(e) => setMax_square_price(e.target.value)}
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
                            <button className='modal_close_button' onClick={handleClose_P_PriceModal}>Close</button>
                            </P_PriceModal>
                        </div>

                      {/* button for locations */}
                      <div className="button-modal-container" >
                            <div onClick={handleShowModal} className='lacation_button'   >
                            {handle_P_StatusButtonLanguageChange(selectedLanguage).cityButtonLanguage}
                              <img src={button_icon} alt="button dropdown icon" className='dropdown' />
                            </div>
                            <P_Modal isOpen={is_P_ModalOpen} >
                              {renderModalContent()}
                            </P_Modal>
                      </div>

                        {/* button for status */}
                      <div className="button-modal-container" >
                            <div onClick={handle_P_StatusButtonClick} className='lacation_button'   >
                            {handle_P_StatusButtonLanguageChange(selectedLanguage).statusInfoLanguage}
                              <img src={button_icon} alt="button dropdown icon" className='dropdown' />
                            </div>
                            <P_StatusModal isOpen={is_P_StatusModalOpen} close={handleClose_P_StatusModal} >
                            {renderStatusOptions()}
                            <button className='modal_close_button' onClick={handleClose_P_StatusModal}>Close</button>
                            </P_StatusModal>
                      </div>
                  </div>
                  </motion.div>
            </div>

            <div className='physical_cards_container' >
                {privateApartments.map(item => (
                  <div key={item.id} className="physical_card">
                    <img src={item.images} alt="apartment_image" className="apartment_image" />
                    bina {item.internalName}
                  </div>
                ))}
            </div>
    </div>
  );
}
