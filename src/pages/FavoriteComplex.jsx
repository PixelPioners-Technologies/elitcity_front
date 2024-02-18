// აქ ეს diseibleee იმიტო დავწერე, რომ map-ზე error-ს მიგდებდა tsx-ის გამო რო იქ რაღაცაა ისეთი გაწერილი რომ მიგდებს ამას
/* eslint-disable react/prop-types */
// import React from 'react'
// import { useEffect, useState } from "react";
// eslint-disable-next-line react/prop-types
import heartIcon from "../assets/starLogo.svg";
import "./FavoriteComplex.css";
import { useNavigate } from "react-router-dom";
import heartIconEmpty from "../assets/emptyStarLogo.svg";
import { useEffect } from "react";




export default function FavoriteComplex({
  selectedLanguage,
  favorites,
  favoritesPhysical,
  favoritesLots,
  favoriteHandler,
  favoriteHandlerLots,
  favoriteHandlerPhysical,
  favoriteApartment,
  favorite_apartment_handler,
}) {
  const navigate = useNavigate();

  const handleHouseClick = (complexId) => {
    navigate(`/eachComplex/${complexId}`, { state: { complexId } });
  };

  const handleLotsClick = (prev_apartments) => {
    navigate(`/eachground/${prev_apartments}`, { state: { prev_apartments } });
  };

  const handleprivateAppartmentClick = (p_apartment_id) => {
    navigate(`/eachprivateappartment/${p_apartment_id}`, { state: { p_apartment_id }, });
  };


  const handleAppartmentClick = (apartmentId) => {
    navigate(`/eachapartment/${apartmentId}`, { state: { apartmentId } });
  };


  useEffect(() => {
    console.log('fav complex ', favorites)
    console.log('fav phisical ', favoritesPhysical)
    console.log('fav ground ', favoritesLots)
    console.log('fav apartments ', favoriteApartment)

  }, [favorites, favoritesPhysical, favoritesLots, favoriteApartment])



  const get_complex_StatusTranslation = (status, selectedLanguage) => {
    const statusTranslations = {
      1: { en: "Planned", ka: "დაგეგმილი", ru: "Запланировано" },
      2: { en: "Under Construction", ka: "მშენებარე", ru: "Строится" },
      3: { en: "Completed", ka: "დასრულებული", ru: "Завершено" },
    };

    const translation = statusTranslations[status]?.[selectedLanguage] || 'Status Unknown';

    return translation;
  };



  const get_private_apartment_StatusTranslation = (status, selectedLanguage) => {
    const statusTranslations = {
      1: { en: "Newly renovated", ka: "ახალი რემონტი", ru: "Недавно отремонтированный" },
      2: { en: "With old repairs", ka: "ძველი რემონტით", ru: "Со старым ремонтом" },
      3: { en: "To be repaired", ka: "სარემონტო", ru: "Требует ремонта" },
    };

    const translation = statusTranslations[status]?.[selectedLanguage] || 'Status Unknown';

    return translation;
  };



  const get_ground_StatusTranslation = (status, selectedLanguage) => {
    const statusTranslations = {
      1: { en: "Agricultural", ka: "სასოფლო-სამეურნეო", ru: "Сельскохозяйственный" },
      2: { en: "Land for settlement", ka: "სამოსახლო", ru: "Земля для поселения" },
      3: { en: "Commercial", ka: "კომერციული", ru: "Коммерческий" },
    };

    const translation = statusTranslations[status]?.[selectedLanguage] || 'Status Unknown';

    return translation;
  };



  const language_chage = (lang) => {
    var languageInfo = {
      complexes: "Complexes",
      private_apartments: "Private Appartments",
      minPrice: "From m²",
      maxPrice: "To m²",
      meterPriceHomePage: "The price of m²",
      dan: "from",
      mde: "to",
      ground: "Land"

    };

    switch (lang) {
      case "en":
        languageInfo.complexes = "Complexes";
        languageInfo.private_apartments = "Private Appartments";
        languageInfo.minPrice = "From m²";
        languageInfo.maxPrice = "To m²";
        languageInfo.meterPriceHomePage = "The price of m²";
        languageInfo.dan = "from";
        languageInfo.mde = "to";
        languageInfo.ground = "Land";


        break;

      case "ka":
        languageInfo.complexes = "კომპლექსები";
        languageInfo.private_apartments = "კერძო ბინები";
        languageInfo.minPrice = "დან მ²";
        languageInfo.maxPrice = "მდე მ²";
        languageInfo.meterPriceHomePage = "მ²- ის ფასი";
        languageInfo.dan = "დან";
        languageInfo.mde = "მდე";
        languageInfo.ground = "ნაკვეთები";


        break;

      case "ru":
        languageInfo.complexes = "Комплексы";
        languageInfo.private_apartments = "Частные апартаменты";
        languageInfo.minPrice = "из м²";
        languageInfo.maxPrice = "до м²";
        languageInfo.meterPriceHomePage = "Цена м²";
        languageInfo.dan = "из";
        languageInfo.mde = "до";
        languageInfo.ground = "Земля";


        break;
    }
    return languageInfo;
  };







  return (
    <div>
      <div className="ComplexBoxInFavoritesPages">
        {/* =================================   complex   ============================================== */}

        {favorites && favorites.length > 0 && (
          <div>
            <h1 className="item_header" > {language_chage(selectedLanguage).complexes}</h1>
            <div className="same_items"  >

              {/* for Complex */}
              {favorites && favorites.map((complex, index) => (
                <div className="card" key={index}  >
                  {/* ----------- */}
                  <button
                    onClick={() => favoriteHandler(complex)}
                    key={complex.id}
                    className="heartButtons_f"
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
                  {/* ----------- */}
                  <img
                    onClick={() => handleHouseClick(complex.id)}
                    // src={ complex?.images[0] !== undefined ?  complex?.images[0] :  complex?.complexImages[0]  }
                    src={complex?.images?.length > 0 ? complex.images[0] : complex?.complexImages?.length > 0 ? complex.complexImages[0] : defaultImage}
                    alt={complex.name}
                    style={styles.imageStyles}
                  />

                  <p className="complex_title_f" >{complex?.complexName}</p>
                  <div className="textInfo_f" >
                    <p className="complex_addres_f"  >
                      {complex?.images?.length > 0 ? complex.address.city : complex?.complexImages?.length > 0 ? complex.complexAddress.city : "city"} {"  ,  "}
                      {complex?.images?.length > 0 ? complex.address.street : complex?.complexImages?.length > 0 ? complex.complexAddress.address : "city"}
                    </p>
                    <p className="complex_square_price_f"  >{language_chage(selectedLanguage).meterPriceHomePage}{"  :  "}
                      {complex?.images?.length > 0 ? complex.complexDetails?.pricePerSqMeter : complex?.complexImages?.length > 0 ? complex.pricePerSqMeter : "..."}
                    </p>

                    <div className="complex_status_and_rank_container_f">
                      <p className="complex_status_f" > {get_complex_StatusTranslation(complex?.images?.length > 0 ? complex.complexDetails?.isFinished :
                        complex?.complexImages?.length > 0 ? complex?.status : "...", selectedLanguage)}</p>


                      <p className="complex_rank_f" >
                        {/* {complex.complexDetails?.rank} */}
                        {complex?.images?.length > 0 ? complex.complexDetails?.rank : complex?.complexImages?.length > 0 ? complex.rank : "..."}

                      </p>

                    </div>
                  </div>
                </div>
              ))}


            </div>
          </div>
        )}
        {/* ======================================   private apartments    ======================================================== */}

        {favoritesPhysical && favoritesPhysical.length > 0 && (
          <div>
            <h1 className="item_header" > {language_chage(selectedLanguage).private_apartments} </h1>
            <div className="same_items" >
              {/* for physical */}
              {favoritesPhysical &&
                favoritesPhysical.map((complex, index) => (
                  <div className="card" key={index}>
                    {/* ----------- */}
                    <button
                      onClick={() => favoriteHandlerPhysical(complex)}
                      key={complex.id}
                      className="heartButtons_f"
                    >
                      {favoritesPhysical.some((fav) => fav.id === complex.id) ? (
                        <img src={heartIcon} alt="Logo of heart" />
                      ) : (
                        <img
                          src={heartIconEmpty}
                          alt="Logo of empty heart"
                          style={{ width: "30px", height: "30px" }}
                        />
                      )}
                    </button>
                    {/* ----------- */}

                    <img
                      onClick={() => handleprivateAppartmentClick(complex.id)}
                      src={complex?.images[0]}
                      // src={complex?.images?.length > 0 ? complex.images[0] : complex?.complexImages?.length > 0 ? complex.complexImages[0] : defaultImage}
                      alt={complex.name}
                      style={styles.imageStyles}
                    />
                    <p className="p_apartment_title_f">{complex.privateApartmentName}</p>
                    <div className="textInfo_f">
                      <p className="p_apartment_addres_f"  >{complex?.address?.city}{"  ,  "} {complex.address?.address}</p>

                      <p className="P_apartment_squateproce_f"   >{language_chage(selectedLanguage).meterPriceHomePage}{"  :  "} {complex?.squarePrice}</p>
                      <div className="complex_status_and_rank_container_f">
                        <p className="p_apartment_status_f"  >{get_private_apartment_StatusTranslation(complex?.status, selectedLanguage)}</p>
                        <p className="p_apartment_rank_f"  >{complex?.rank}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
        {/* ==========================================     grounds      ============================================= */}

        {favoritesLots && favoritesLots.length > 0 && (
          <div>
            <h1 className="item_header" > {language_chage(selectedLanguage).ground}  </h1>
            <div className="same_items"  >
              {/* for Lots */}
              {favoritesLots &&
                favoritesLots.map((complex, index) => (
                  <div className="card" key={index}>
                    <button
                      onClick={() => favoriteHandlerLots(complex)}
                      key={complex.id}
                      className="heartButtons_f"
                    >
                      {favoritesLots.some((fav) => fav.id === complex.id) ? (
                        <img src={heartIcon} alt="Logo of heart" />
                      ) : (
                        <img
                          src={heartIconEmpty}
                          alt="Logo of empty heart"
                          style={{ width: "30px", height: "30px" }}
                        />
                      )}
                    </button>
                    {/* ----------- */}
                    <img
                      onClick={() => handleLotsClick(complex.id)}
                      src={complex?.images[0]}
                      alt={complex.name}
                      style={styles.imageStyles}
                    />
                    <p className="ground_title_f" >{complex?.groundName}</p>
                    <div className="textInfo_f">
                      <p className="ground_address_f" >{complex.address.city}{"  ,  "}  {complex.address.address} </p>
                      <p className="ground_squareprice_f" > {language_chage(selectedLanguage).meterPriceHomePage}{"  :  "} {complex.squarePrice} </p>
                      <div className="complex_status_and_rank_container_f">
                        <p className="ground_status_f" >{get_ground_StatusTranslation(complex.status, selectedLanguage)}</p>
                        <p className="ground_rank_f" >{complex.rank}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
        {/* ========================================    apartments    =============================================== */}

        {favoriteApartment && favoriteApartment.length > 0 && (
          <div>
            <h1 className="item_header" > apartments</h1>
            <div className="same_items"  >
              {/* for Lots */}
              {favoriteApartment &&
                favoriteApartment.map((complex, index) => (
                  <div className="card" key={index}>
                    <button
                      onClick={() => favorite_apartment_handler(complex)}
                      key={complex.id}
                      className="heartButtons_f"
                    >
                      {favoriteApartment.some((fav) => fav.id === complex.id) ? (
                        <img src={heartIcon} alt="Logo of heart" />
                      ) : (
                        <img
                          src={heartIconEmpty}
                          alt="Logo of empty heart"
                          style={{ width: "30px", height: "30px" }}
                        />
                      )}
                    </button>
                    {/* ----------- */}
                    <img
                      onClick={() => handleAppartmentClick(complex.id)}
                      src={complex?.images?.length > 0 ? complex.images[0] : complex?.apartmentImages?.length > 0 ? complex.apartmentImages[0] : "fwefwefwfew"}
                      alt={complex.name}
                      style={styles.imageStyles}
                    />
                    <p className="apartment_title_f" >{complex?.images?.length > 0 ? complex?.apartmentName : complex?.apartmentImages?.length > 0 ? complex.appartment_name : "fwefwefwfew"}</p>
                    <div className="textInfo_f">
                      <p className="apartment_adres_f" >
                        {complex?.images?.length > 0 ? complex.address?.city : complex?.apartmentImages?.length > 0 ? complex?.apartmentAddress?.city : "fwefwefwfew"}
                        {complex?.images?.length > 0 ? complex.address?.address : complex?.apartmentImages?.length > 0 ? complex.apartmentAddress?.address : "fwefwefwfew"}
                      </p>
                      <p className="apartment_squareproce_f"  > {language_chage(selectedLanguage).meterPriceHomePage}{"  :  "}
                        {complex?.images?.length > 0 ? complex.internalApartmentName?.square_price : complex?.apartmentImages?.length > 0 ? complex.internalApartmentDetails?.squarePrice : "fwefwefwfew"}
                      </p>
                      <div className="complex_status_and_rank_container_f" >
                        <p className="apartment_status_f" >{get_complex_StatusTranslation(complex?.images?.length > 0 ? complex.internalApartmentName?.status : complex?.apartmentImages?.length > 0 ? complex.internalApartmentDetails?.status : "fwefwefwfew", selectedLanguage)}
                        </p>
                        <p className="apartment_rank_f" >{complex?.images?.length > 0 ? complex.internalApartmentName?.rank : complex?.apartmentImages?.length > 0 ? complex.internalApartmentDetails?.rank : "fwefwefwfew"}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ======================================================================================================== */}




      </div>
    </div>
  );
}

const styles = {
  imageStyles: {
    width: "278px",
    height: "229px",
    overflow: "hidden",
    color: 'white'
    // borderRadius: "20px",
  },
  companyTitle: {
    // position: 'absolute',
    // top: '262px',
    // paddingLeft: '20px'
  },
  complexInfo: {
    color: "#000000",
  },
  complexFinished: {
    color: "#515050",
  },
};
