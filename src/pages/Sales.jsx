// import React from 'react'
import { motion } from "framer-motion"; 
import './Sales.css';
import percentImg from '../assets/percent-svgrepo-com.svg';
import giftImg from '../assets/gift-svgrepo-com (1).svg';
import istallmentImg from '../assets/time1-svgrepo-com.svg';
import saleDATA from '../SaleDATA.json';
import percentImage from '../assets/percentRED.svg';
import companyImage from '../assets/ARCHISVG.svg';
import navigateLogo from '../assets/navigateArrow.svg';
import microphoneLogo from '../assets/microphoneImg.svg';




export default function Sales() {

  const truncateText = (text, limit) => {
    return text.length > limit ? `${text.substring(0, limit)}...` : text;
  };

  const renderSaleArticle = (item) => (
    <div className="eachSaleArticleBox" >
      <div className="saleArticleInfoText">
        <div className="timeAndCompanyLogo">
          <div className="saleTimeBox">
            <p>{item.time1}--{item.time2}</p>
          </div>
          <div className="logoOfPercentAndCompany">
            <img src={percentImage} alt="Percent Discount" />
            <img src={companyImage} alt="Company Logo" />
          </div>
        </div>
        <p style={{color: '#bba8a8'}}>{item.saleText}</p>
        <div className="microphoneAndItsInfoText">
          <img src={microphoneLogo} alt="Microphone" />
          <p>{truncateText(item.firstText, 50)}</p>
        </div>
        <div className="navigateAndItsInfoText">
          <img src={navigateLogo} alt="Navigate Arrow" />
          <p>{truncateText(item.secondText, 70)}</p>
        </div>
      </div>
      <div className="SaleArticleImageBox">
        <img src={item.image} alt="Sale Article Image" className="imageOfSaleComplex" />
      </div>
    </div>
  );

  const renderSaleArticles = () => {
    return saleDATA.map((item, index) => (
      <div className="saleArticlesBox" key={`saleArticle_${index}`}>
        {renderSaleArticle(item)}
        {/* Render the second eachSaleArticleBox */}
        {renderSaleArticle(item)}
      </div>
    ));
  };

  return (
    <div className="SalesBox">
        {/* ეს არის ჩამონათვალი button–ები, რომ გადახვიდე კომპლექსებზე, გეგმარებებზე, რუკაზე, სორტირება და დასაკელება და counter-ი ... */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        transition={{ duration: 1 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
      >
          {/* Sale page Nav bar */}
        <div className='forPaddingOfsalesNavBar'>
          <div className='infoFieldOfSalesAndSoOn'>
            <div className='boxOftitleOfActionAndOffers'>
              <p className="titleOfActionAndOffers">აქციები და შეთავაზებები </p>
            </div>
            <div className="allSaleGiftAndInstallmentBox" >
              <div className="eachSectionBox">
                <button className="buttonOfEachSection">ყველა</button>
              </div>
              <div className="eachSectionBox">
                <img src={percentImg} className="percentIstallmentImg" alt="photo of percent" />
                <button className="buttonOfEachSection">ფასდაკლება</button>
              </div>
              <div className="eachSectionBox">
                <img src={giftImg} className="giftImg" alt="photo of gift" />
                <button className="buttonOfEachSection">საჩუქარი</button>
              </div>
              <div className="eachSectionBox">
                <img src={istallmentImg} className="giftImg" alt="photo of oClock" />
                <button className="buttonOfEachSection">განვადება</button>
              </div>
            </div>

          </div>

        </div>
      </motion.div>

      {renderSaleArticles()}



{/* // ------------------------------------------------------------------------------------ */}

    </div>
  )
}
