// აქ ეს diseibleee იმიტო დავწერე, რომ map-ზე error-ს მიგდებდა tsx-ის გამო რო იქ რაღაცაა ისეთი გაწერილი რომ მიგდებს ამას
/* eslint-disable react/prop-types */
// import React from 'react'
// import { useEffect, useState } from "react";
// eslint-disable-next-line react/prop-types
import heartIcon from "../assets/starLogo.svg";

import heartIconEmpty from "../assets/emptyStarLogo.svg";
export default function FavoriteComplex({
  favorites,
  favoritesPhysical,
  favoritesLots,
  favoriteHandler,
  favoriteHandlerLots,
  favoriteHandlerPhysical,
}) {
  return (
    <div>
      <h1>favorite Page</h1>
      {/* for Complex */}
      {favorites &&
        favorites.map((complex, index) => (
          <div className="card" key={index}>
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
  );
}

const styles = {
  imageStyles: {
    width: "278px",
    height: "229px",
    overflow: "hidden",
    borderRadius: "20px",
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
