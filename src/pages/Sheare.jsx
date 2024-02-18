import React, { useState } from 'react';
import share from "../assets/ShareImage.svg";
import "./Sheare.css"



const ShareButton = ( {selectedLanguage} ) => {

  const sheare_translation  = (lang) => {
    var languageInfo = {
      sheare: "The link has been copied",
    };
    switch (lang) {
      case "en":
        languageInfo.sheare = "The link has been copied";
        break;
      case "ka":
        languageInfo.sheare = "ლინკი დაკოპირებულია";
        break;
      case "ru":
        languageInfo.sheare = "Ссылка скопирована";
        break;
    }
    return languageInfo;
  };

  const [showPopup, setShowPopup] = useState(false);

  const handleClick = async () => {
    try {

      await navigator.clipboard.writeText(window.location.href);
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div>
      <button className="heartButtons" onClick={handleClick}>
        <img src={share} style={{ width: "30px", height: "30px" }} alt="Share" />
      </button>
      {showPopup && <div className='sheare__button'  >{sheare_translation(selectedLanguage).sheare} </div>}
    </div>
  );
};

export default ShareButton;
