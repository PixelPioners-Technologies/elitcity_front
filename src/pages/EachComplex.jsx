import  { useState } from 'react';
import './EachComplex.css';
import DATA from '../EachComplexDATA.json';
import { motion } from "framer-motion";
import lari from '../assets/lari-svgrepo-com.svg';
import dollar from '../assets/dollar-svgrepo-com.svg';
import star from '../assets/Star for Each Complex Page.svg';
import share from '../assets/ShareImage.svg';




import img1 from '../assets/ComplexesPhotos/0zzz.jpg';
import img2 from '../assets/ComplexesPhotos/1zz.jpg';
import img3 from '../assets/ComplexesPhotos/2zz.jpg';
import img4 from '../assets/ComplexesPhotos/3zz.jpg';
// import img5 from '../assets/ComplexesPhotos/4zz.jpg';
// import img6 from '../assets/ComplexesPhotos/5zz.jpg';

export default function EachComplex() {
  const sliderImages = [
    { id: 1, value: img1 },
    { id: 2, value: img2 },
    { id: 3, value: img3 },
    { id: 4, value: img4 },
    // { id: 5, value: img5 },
    // { id: 6, value: img6 },
  ];

  const [wordData, setWordData] = useState(sliderImages[0]);
  const [val, setVal] = useState(0);
  const [clickedIndex, setClickedIndex] = useState(null);


  const handleClick = (index) => {
    setClickedIndex(index);
    console.log(index);
    setVal(index);
    const wordSlider = sliderImages[index];
    setWordData(wordSlider);
  };

  const handleNext = () => {
    let index = val < sliderImages.length - 1 ? val + 1 : val;
    setVal(index);
    const wordSlider = sliderImages[index];
    setWordData(wordSlider);
  };

  const handlePrevious = () => {
    let index = val <= sliderImages.length - 1 && val > 0 ? val - 1 : val;
    setVal(index);
    const wordSlider = sliderImages[index];
    setWordData(wordSlider);
  };


  // for toggle DOllar AND LARI ---==---(START)
  const [isOn, setIsOn] = useState(false);
  const toggleSwitch = () => setIsOn(!isOn);
  // -----===--------(END)


  return (
    <div className="eachComplexBox">
      <div className='imageAndTextInfos'>

      {/* Complexes photos info */}
      <div className='imageSliderBox'>
        <div className='bigImageBox'>
          <button className='btns' onClick={handlePrevious}>P</button>
          <img
            src={wordData.value}
            alt={`Complex ${wordData.id}`}
            height="450"
            width="711"
            className={clickedIndex !== null ? "clicked" : ""}
          />
          <button className='btns' onClick={handleNext}>N</button>
        </div>
        <div className='miniImagesBox'>
          {sliderImages.map((data, i) => (
            <div className="thumbnail" key={i}>
              <img
                className={`${wordData.id === data.id ? "clicked" : ""} ${clickedIndex === i ? "enlarge" : ""}`}
                src={data.value}
                alt={`Complex ${data.id}`}
                onClick={() => handleClick(i)}
                height="70"
                width="100"
              />
            </div>
          ))}
        </div>
      </div>
        {/* --------- */}

      {/* complex text info */}
      
      {DATA.map((complex, index) => (
        <div key={index} className='complexTextsBox'>
          <div className='seenIdFavouriteAndOthersBox'>
            <div className='seenAndIdBox'>
              <p style={{color: '#838282'}} >Seen: {complex.seen}</p>
              <p style={{color: '#838282'}}>ID: {complex.ID}</p>
            </div>
            
            <div className='favouriteDollarAndShareBox'>
              {/* Star favourite box */}
                <button className='heartButtons' >
                  <img src={star} style={{ width: '30px', height: '30px', }} />
                </button>
               {/* ----Dollar and Lari Toggle button */}
               <div className='currencyBox'>
                  <div className="switch" data-ison={isOn} onClick={toggleSwitch}>
                    <motion.div className="handle" layout transition={spring}>
                      <img
                        src={lari}
                        alt="Lari Sign"
                        className={`currency-sign ${isOn ? "active" : ""}`}
                        />
                      <img
                        src={dollar}
                        alt="Dollar Sign"
                        className={`currency-sign ${!isOn ? "active" : ""}`}
                        />
                    </motion.div>
                  </div>
                </div>
                {/* Share Button */}
                <button className='heartButtons' >
                  <img src={share} style={{ width: '30px', height: '30px', }} />
                </button>
            </div>
            
          </div>


            <p style={{color: '#ccc', fontSize: '20px'}}> {complex.title}</p>
            <p style={{color: '#838289'}}> {complex.city}</p>
            <p style={{color: '#838282'}}> {complex.adress}</p>
            <p style={{color: '#ccc', fontSize: '20px'}}>m²-ის ფასი {complex.price}$-დან</p>

            <div className='chabarebaPartebiKorpusebi'>
              <div className='eachTextOnListTexts'>
                <p style={{color: '#838289'}}> ჩაბარება</p>
                <p style={{color: '#838289'}}> ფართები{complex.city}</p>
                <p style={{color: '#838289'}}> ბინების რ-ობა{complex.city}</p>
                <p style={{color: '#838289'}}> კორპუსები{complex.city}</p>
                <p style={{color: '#838289'}}> სართულიანობა{complex.city}</p>
              </div>

              <div className='eachTextOnListTextsTwo'>
                <p style={{color: '#ccc'}}> {complex.city}</p>
                
              </div>
            </div>

        </div>
      ))}
        {/* ---------- */}

      </div>
    </div>
  );
}


const spring = {
  type: "spring",
  stiffness: 100,
  damping: 30,
};
