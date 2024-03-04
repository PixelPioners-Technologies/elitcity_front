import "./Each_Developer.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { BaseURLs } from "../App";
import { useLocation } from "react-router-dom";
import website_logo from "../icons/earth.png";
import email_logo from "../icons/email.png";
import phone_logo from "../icons/phone.png";
import { motion } from "framer-motion";
import heartIcon from "../assets/starLogo.svg";
import dollar_black from "../assets/dollar-svgrepo-com.svg";
import lari_black from "../assets/lari-svgrepo-com.svg";
import dollar from "../assets/dollar-whitee.svg";
import lari from "../assets/lari-white.svg";

import heartIconEmpty from "../assets/emptyStarLogo.svg";
import { useNavigate } from "react-router-dom";

function normalizeCompanyData(company, lang) {
  return {
    id: company.id,
    name: company[`name_${lang}`],
    internalName: company.internal_name.internal_name,
    mobile: company.internal_name.Mobile,
    mobileHome: company.internal_name.Mobile_Home,
    email: company.internal_name.email,
    website: company.internal_name.companyweb,
    facebookPage: company.internal_name.facebook_page,
    logo: company.internal_name.logocompany,
    backgroundImage: company.internal_name.background_image,
    topCompany: company.internal_name.topCompany,
    visibility: company.internal_name.visibility,
    address: company[`address_${lang}`],
    aboutCompany: company[`aboutcompany_${lang}`],
    complexes: company.complexes.map((complex) => ({
      id: complex.internal_complex_name.id,
      createdAt: complex.internal_complex_name.created_at,
      internalComplexName: complex.internal_complex_name.internal_complex_name,
      fullPrice: complex.internal_complex_name.full_price,
      pricePerSqMeter: complex.internal_complex_name.price_per_sq_meter,
      finishYear: complex.internal_complex_name.finish_year,
      finishMonth: complex.internal_complex_name.finish_month,
      status: complex.internal_complex_name.status,
      visibility: complex.internal_complex_name.visibiliti,
      vipComplex: complex.internal_complex_name.vipComplex,
      floorNumber: complex.internal_complex_name.floor_number,
      space: complex.internal_complex_name.space,
      numberOfApartments: complex.internal_complex_name.number_of_apartments,
      numberOfFloors: complex.internal_complex_name.number_of_floors,
      phoneNumber: complex.internal_complex_name.phone_number,
      numberOfBuildings: complex.internal_complex_name.number_of_buildings,
      flooring: complex.internal_complex_name.flooring,
      parkingQuantity: complex.internal_complex_name.parking_quantity,
      roomsQuantity: complex.internal_complex_name.rooms_quantity,
      lightPercentage: complex.internal_complex_name.light_percentage,
      humidityPercentage: complex.internal_complex_name.humidity_percentage,
      areaSquareness: complex.internal_complex_name.area_squareness,
      ceilingHeightMeters: complex.internal_complex_name.ceiling_height_meters,
      cateringFacility: complex.internal_complex_name.catering_facility,
      elevatorType: complex.internal_complex_name.elevator_type,
      schlangbaum: complex.internal_complex_name.schlangbaum,
      conciergeService: complex.internal_complex_name.concierge_service,
      yardDescription: complex.internal_complex_name.yard_description,
      plotArea: complex.internal_complex_name.plot_area,
      rank: complex.internal_complex_name.rank,
      metro: complex.internal_complex_name.metro,
      pharmacy: complex.internal_complex_name.pharmacy,
      supermarket: complex.internal_complex_name.supermarket,
      square: complex.internal_complex_name.square,
      complexImages: complex.complex_images,
      complexName: complex[`complex_name_${lang}`],
      address: {
        city: complex[`address_${lang}`][`city_${lang}`],
        parentDistrict: complex[`address_${lang}`][`pharentDistrict_${lang}`],
        district: complex[`address_${lang}`][`district_${lang}`],
        streetName: complex[`address_${lang}`][`street_name_${lang}`],
        address: complex[`address_${lang}`][`address_${lang}`],
        longitude: complex[`address_${lang}`].longitude,
        latitude: complex[`address_${lang}`].latitude,
      },
      typeOfRoof: complex[`type_of_roof_${lang}`],
      constructionType: complex[`construction_type_${lang}`],
      submissionType: complex[`submission_type_${lang}`],
      protectionType: complex[`protection_type_${lang}`],
      description: complex[`description_${lang}`],
    })),
  };
}

export default function Each_Developer({
  selectedLanguage,
  favoriteHandler,
  favorites,
  handleCallButtonClick,
  getCorrencyRate,
  HandleStateChange,
  currenceChangeState,
  isOn,
  toggleSwitch,
}) {
  const [company, setCompany] = useState({});
  const [complexes_in_company, setComplexes_in_company] = useState([]);

  const navigate = useNavigate();
  // Assuming `complex` is an object representing each house
  const handleLotsClick = (complexId) => {
    navigate(`/eachComplex/${complexId}`, { state: { complexId } });
  };

  useEffect(() => {
    console.log(complexes_in_company);
  }, [complexes_in_company]);

  // ---------------------------------  id  --------------------------------------------------
  const location = useLocation();
  const { companyID } = location.state || {}; // Ensure fallback to prevent errors if state is undefined
  // ---------------------- ----------------------------------------------------------------

  useEffect(() => {
    const fetchCompanies = async () => {
      const requestUrl = `${BaseURLs.company_and_complex}${selectedLanguage}/${companyID}`;
      const response = await axios.get(requestUrl);
      const normaldata = normalizeCompanyData(response.data, selectedLanguage);

      setCompany(normaldata);
      setComplexes_in_company(normaldata.complexes);
      console.log(complexes_in_company);
    };
    fetchCompanies();
  }, [selectedLanguage]);

  useEffect(() => {
    console.log(complexes_in_company);
  }, [complexes_in_company]);

  // --------------------------------------function for changind static text languages -------------------------------------------
  const language_change_for_each_companyPage = (lang) => {
    var languageInfo = {
      about: "About company",
      price_per_meter: "      Price per m²",
      company_complexes: "Company projects",
    };

    switch (lang) {
      case "en":
        languageInfo.about = "About company";
        languageInfo.price_per_meter = "    Price per m²";
        languageInfo.company_complexes = "Company projects";

        break;

      case "ka":
        languageInfo.about = "კომპანიის შესახებ";
        languageInfo.price_per_meter = "     მ² - ის ფასი";
        languageInfo.company_complexes = "კომპანიის პროექტები";

        break;

      case "ru":
        languageInfo.about = "О компании";
        languageInfo.price_per_meter = "    Цена м²";
        languageInfo.company_complexes = "Проекты компании";

        break;
    }
    return languageInfo;
  };

  // ----------------------------------------------------------------------------------------------
  const handleHouseClick = (complexId) => {
    navigate(`/eachComplex/${complexId}`, { state: { complexId } });
  };

  return (
    <div className="company_page">
      <div className="company_main_page">
        <div className="company_background_image_container">
          <img
            src={company.backgroundImage}
            alt="company background image"
            className="company_background_image_big"
          />
        </div>
        {/* logo */}
        <div className='responsive_logo'>
          <img src={company.logo} rel='company logo' className="company_logo_round" />
        </div>
        {/* name container  */}
        <div className="colo_name_and_others">
          <div className="cpmpany_name_and_settings">
            <div className="all_settings_company_1">
              <h1 className="company_name_each">{company.name}</h1>
              <h2 className="company_adddresss"> {company.address}</h2>
            </div>

            <div className="mobile_website_phone socials_box" >
              {/* email  */}
              <div className="email_and_website_container margin_left_for_settings ">
                <img
                  src={email_logo}
                  alt="email logo"
                  className="company_all_logos"
                />
                <p>{company.email}</p>
              </div>
              {/* phone  */}
              <div className="email_and_website_container">
                <img
                  src={phone_logo}
                  alt="email logo"
                  className="company_all_logos"
                />
                <p>{company.mobile}</p>
              </div>
              {/* website  */}
              <div className="email_and_website_container">
                <img
                  src={website_logo}
                  alt="email logo"
                  className="company_all_logos"
                />
                <p>{company.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="about_each_company">
        <p className="about_company_header">
          {language_change_for_each_companyPage(selectedLanguage).about}
        </p>
        <div className="about_company_container">
          <p> {company.aboutCompany} </p>
        </div>

        <div className="currency_and_allcomplex_header">
          <p className="company_complexes_header">
            {
              language_change_for_each_companyPage(selectedLanguage)
                .company_complexes
            }
          </p>
          {/* ----Dollar and Lari Toggle button */}
          <div
            className="valutis_cvlilebis_konteineri"
            data-ison={isOn}
            onClick={() => {
              toggleSwitch();
              HandleStateChange();
            }}
          >
            <div className={`same_stiles_corrency  ${isOn ? `chartuli` : "centrshi"}   `}   >
              <img src={isOn ? dollar_black : dollar}
                alt="dollar signe"
                className="valutis_nishnebi" />
            </div>

            <div className={`same_stiles_corrency  ${!isOn ? `chartuli` : "centrshi"}   `}   >
              <img src={!isOn ? lari_black : lari}
                alt="dollar signe"
                className="valutis_nishnebi" />
            </div>
          </div>
          {/* ---------------- */}
        </div>
      </div>
      <div className="companys_complexes_container">
        <div className="allCards_each_company">
          {complexes_in_company.map((complex, index) => (
            <div className="card" key={complex.id}>
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                transition={{ duration: 1 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
              >
                <div className="heartbuttonAndImageBox_each_company">
                  <div className="heartButtonBox_each_company">
                    <button
                      onClick={() => favoriteHandler(complex)}
                      key={complex.id}
                      className="heartButtons_each_company"
                    >
                      {favorites.some((fav) => fav.id === complex.id) ? (
                        <img src={heartIcon} alt="Logo of heart" />
                      ) : (
                        <img
                          src={heartIconEmpty}
                          alt="Logo of empty heart"
                          style={{ width: "30px", height: "30px" }}
                        />
                      )}
                    </button>
                  </div>
                  <img
                    src={complex.complexImages[0]}
                    alt={complex.name}
                    style={styles.imageStyles}
                    onClick={() => handleHouseClick(complex.id)}
                  />
                </div>
                <p style={styles.companyTitle}>{complex.name}</p>
                <div
                  className="textInfo_each_company"
                  onClick={() => handleHouseClick(complex.id)}
                >
                  <p style={styles.complexInfo}>{complex.address.city}</p>
                  <p style={styles.complexInfo}>
                    {currenceChangeState
                      ? new Intl.NumberFormat('en-US', {
                        style: 'decimal',
                        useGrouping: true,
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                      }).format(Number(complex.pricePerSqMeter) * getCorrencyRate).replace(/,/g, ' ')
                      : new Intl.NumberFormat('en-US', {
                        style: 'decimal',
                        useGrouping: true,
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                      }).format(Number(complex.pricePerSqMeter)).replace(/,/g, ' ')} {" "}
                    {isOn ? "  $  " : "  ₾  "}
                    {language_change_for_each_companyPage(selectedLanguage).price_per_meter}
                  </p>
                  <p style={styles.complexFinished}>{complex.finishYear}</p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  imageStyles: {
    width: "278px",
    height: "229px",
    overflow: "hidden",
    // borderRadius: "20px",
  },
  companyTitle: {
    // position: 'absolute',
    // top: '262px',
    // paddingLeft: '20px'
  },
  complexInfo: {
    color: "white",
  },
  complexFinished: {
    color: "white",
  },
};

const spring = {
  type: "spring",
  stiffness: 100,
  damping: 30,
};
