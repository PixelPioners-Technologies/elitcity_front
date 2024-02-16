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
  favorites,
  favoritesPhysical,
  favoritesLots,
  favoriteHandler,
  favoriteHandlerLots,
  favoriteHandlerPhysical,
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
    console.log('fav ground handler', favoriteHandlerLots)



  }, [favorites, favoritesPhysical, favoritesLots])




  return (
    <div>
      <div className="ComplexBoxInFavoritesPages">
        {favorites && favorites.length > 0 && (
          <div>
            <h1 className="item_header" > complexes   </h1>
            <div className="same_items"  >

              {/* for Complex */}
              {favorites && favorites.map((complex, index) => (
                <div className="card" key={index}  >
                  {/* ----------- */}
                  <button
                    onClick={() => favoriteHandler(complex)}
                    key={complex.id}
                    className="heartButtons"
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
                    src={complex.images[0]}
                    alt={complex.name}
                    style={styles.imageStyles}
                  />
                  <p style={styles.companyTitle}>{complex.complexName}</p>
                  <div className="textInfo" >
                    <p style={styles.complexInfo}>
                      {complex.address.city}, {complex.address.street}
                    </p>
                    <p style={styles.complexInfo}>
                      Price per sq meter: {complex.price_per_sq_meter}
                    </p>
                    <p style={styles.complexFinished}>Date: ...</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {favoritesPhysical && favoritesPhysical.length > 0 && (
          <div>
            <h1 className="item_header" > private apartments </h1>
            <div className="same_items"  >
              {/* for physical */}
              {favoritesPhysical &&
                favoritesPhysical.map((complex, index) => (
                  <div className="card" key={index}>
                    {/* ----------- */}
                    <button
                      onClick={() => favoriteHandlerPhysical(complex)}
                      key={complex.id}
                      className="heartButtons"
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
                      onClick={handleprivateAppartmentClick(complex.id)}
                      src={complex.images[0]}
                      alt={complex.name}
                      style={styles.imageStyles}
                    />
                    <p style={styles.companyTitle}>{complex.name}</p>
                    <div className="textInfo">
                      <p style={styles.complexInfo}>
                        {complex.address.city}, {complex.address.street}
                      </p>
                      <p style={styles.complexInfo}>
                        Price per sq meter: {complex.price_per_sq_meter}
                      </p>
                      <p style={styles.complexFinished}>Date: ...</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}


        {favoritesLots && favoritesLots.length > 0 && (
          <div>
            <h1 className="item_header" > grounds  </h1>
            <div className="same_items"  >
              {/* for Lots */}
              {favoritesLots &&
                favoritesLots.map((complex, index) => (
                  <div className="card" key={index}>
                    <button
                      onClick={() => favoriteHandlerLots(complex)}
                      key={complex.id}
                      className="heartButtons"
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
                      onClick={handleLotsClick(complex.id)}
                      src={complex.images[0]}
                      alt={complex.name}
                      style={styles.imageStyles}
                    />
                    <p style={styles.companyTitle}>{complex.name}</p>
                    <div className="textInfo">
                      <p style={styles.complexInfo}>
                        {complex.address.city}, {complex.address.street}
                      </p>
                      <p style={styles.complexInfo}>
                        Price per sq meter: {complex.price_per_sq_meter}
                      </p>
                      <p style={styles.complexFinished}>Date: ...</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
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
