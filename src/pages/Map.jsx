
import React, { useState, useEffect } from 'react';
import axios, { all } from 'axios';
import './Map.css';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

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
    internalComplexName: item.internal_complex_name[`internal_complex_name`],
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
      complexLevel: item.complex_level,
      finishMonth: item.finish_month,
      finishYear: item.finish_year,
      isFinished: item.finished,
      floorNumber: item.floor_number,
      numberOfApartments: item.number_of_apartments,
      numberOfFloors: item.number_of_floors,
      numberOfHouses: item.number_of_houses,
      phoneNumber: item.phone_number,
      plotArea: item.plot_area,
      pricePerSqMeter: item.price_per_sq_meter,
      space: item.space,
      isVipComplex: item.vipComplex,
      isVisible: item.visibiliti,
    }
  }));
};

// ---------------------------------------------------------------------------------------------------------------------

export default function Map() {
  const [complexes, setComplexes] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedComplex, setSelectedComplex] = useState(null);


// --------------------------------------axios  for complexes --------------------------------------
  useEffect(() => {
    const fetchComplexes = async () => {
      try {
        const response = await axios.get(`${Base_URL}${selectedLanguage}/`);
        console.log('response',response.data)
        const normalData = normalizeComplexData(response.data.results , selectedLanguage)
        setComplexes(normalData);
      } catch (error) {
        console.error('Error fetching complexes:', error);
      }
    };

    fetchComplexes();
  }, [selectedLanguage]); 

// ----------------------------------------------------------------------------------------------
useEffect(() => {
  console.log('This is normalized data', complexes.map(loc => {
    return loc
  }));
}, [complexes]);

// -------------------------------function for language to change--------------------------------------
  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

// ---------------------------------------------------------------------------------------------------------------------


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
                return (
                  <Marker
                    key={complex.id}
                    position={{
                      lat: Number(complex.address.latitude),
                      lng: Number(complex.address.longitude),
                    }}
                    onClick={ () => setSelectedComplex(complex)}
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
                  {/* Check if the images array exists and has at least one image */}
                  {selectedComplex.images && selectedComplex.images.length > 0 && (
                    <img src={selectedComplex.images[0]} alt={selectedComplex.complexName} className='infowindow_img' />
                  )}
                  {/* Additional details can be added here */}
                </div>
              </InfoWindow>
            )}




          </GoogleMap>
        </LoadScript>
      </div> 
    </div>
  );
}
