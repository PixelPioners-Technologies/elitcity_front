import  { useState } from 'react';
import './EachComplex.css';
import DATA from '../EachComplexDATA.json';
import { motion } from "framer-motion";
import lari from '../assets/lari-svgrepo-com.svg';
import dollar from '../assets/dollar-svgrepo-com.svg';
import star from '../assets/Star for Each Complex Page.svg';
import share from '../assets/ShareImage.svg';
import phoneImage from '../assets/🦆 icon _phone_.svg'
import headSetImage from '../assets/🦆 icon _headset_.svg';




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
            {/* აქ არის პირველი ზედა ტექსტები, არქი, მისამართი, ქუჩა, მ2-ის ფასი */}
              <div className='companyAdressPriceTextBox'>
                <p style={{color: '#ccc', fontSize: '20px'}}> {complex.title}</p>
                <p style={{color: '#838289'}}> {complex.city}</p>
                <p style={{color: '#838282'}}> {complex.adress}</p>
                <p style={{color: '#ccc', fontSize: '20px'}}>m²-ის ფასი {complex.price}$-დან</p>
              </div>

              <div className='chabarebaPartebiKorpusebi'>
              {/* ქვედა, მეორე ტექსტია.. ჩაბარება, Fართები... სართულიანობა */}
                <div className='eachTextOnListTexts'>
                  <p style={{color: '#C2BFBF'}}> ჩაბარება </p>
                  <p style={{color: '#C2BFBF'}}> ფართები</p>
                  <p style={{color: '#C2BFBF'}}> ბინების რ-ობა</p>
                  <p style={{color: '#C2BFBF'}}> კორპუსები</p>
                  <p style={{color: '#C2BFBF'}}> სართულიანობა</p>
                </div>

                <div className='eachTextOnListTextsTwo'>
                  <p style={{color: '#FFFFFF'}}> {complex.city}</p>
                  <p style={{color: '#FFFFFF'}}> {complex.city}</p>
                  <p style={{color: '#FFFFFF'}}> {complex.city}</p>
                  <p style={{color: '#FFFFFF'}}> {complex.city}</p>
                  <p style={{color: '#FFFFFF'}}> {complex.city}</p>
                </div>
              </div>
              {/* დარეკვისა და ნომრის ჩვენების სექცია */}
              <div className='numberAndCallRequestBox'>
                <div className='numberBox'>
                  <img src={phoneImage} style={{width: '40px'}} alt='phone'/>
                  <p style={{color: '#FFFFFF'}}>032 22 23 **</p>
                  <button className='numberSHowButton'>ნომრის<br /> ჩვენება</button>

                </div>
                <div className='callRequestBox'>
                <img src={headSetImage} style={{width: '40px'}} alt='headset'/>
                <button className='numberSHowButton'>ზარის<br /> მოთხოვნა</button>
                </div>
              </div>

          </div>
        ))}
      </div>
        {/* ---------- */}

        {/* ბინების და გეგმარებების ცამოსაშლელი ბოქსი */}
        <div className='binebiDaGegmarebaFullBox'>
          {/* ბინები და ყველა აპარტამენტის ტექსტი და ბათონი */}
          <div className='firstBoxOfBinebi'>
            <p style={{color: '#FFFFFF'}}>ბინები და გეგმარება</p>
            <button className='numberSHowButton'>All appartments(12) </button>
          </div>
          {/* ფილტრაცია (start) */}
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



          {/* ---------- (end ფილტრაცია ბოქსი) */}


        </div>


    </div>
  );
}


const spring = {
  type: "spring",
  stiffness: 100,
  damping: 30,
};
