// import React from 'react'
import { motion } from "framer-motion";
import './Sales.css';
import percentImg from '../assets/percent-svgrepo-com.svg';
import giftImg from '../assets/gift-svgrepo-com (1).svg';
import istallmentImg from '../assets/time1-svgrepo-com.svg';
import percentImage from '../assets/percentRED.svg';
import companyImage from '../assets/ARCHISVG.svg';
import navigateLogo from '../assets/navigateArrow.svg';
import microphoneLogo from '../assets/microphoneImg.svg';
import { useEffect, useState } from "react";
import { BaseURLs } from "../App";
import axios from "axios";



const normalizePromotionData = (data, lang) => {
  return data.map(promotion => ({
    internalPromotionName: promotion.internal_promotion_name,
    promotionName: promotion[`promotion_name_${lang}`],
    images: promotion.promotion_images.images,
    about: promotion[`about_${lang}`],
    alert: promotion[`alert_${lang}`],
    
    details: {
      internalPromotionName: promotion.internal_promotion_name_details.internal_promotion_name,
      startDate: promotion.internal_promotion_name_details.start_date,
      endDate: promotion.internal_promotion_name_details.end_date,
      company: promotion.internal_promotion_name_details.company,
      discount: promotion.internal_promotion_name_details.discount,
      gift: promotion.internal_promotion_name_details.gift,
      installment: promotion.internal_promotion_name_details.installment,
      visibility: promotion.internal_promotion_name_details.visibility,
      company_Logo : promotion.internal_promotion_name_details.company_image,
    }
  }));
};




export default function Sales({ selectedLanguage }) {
  const [promotions, setPromotions] = useState([]);
  const [gift, setGift] = useState('');
  const [discount, setDiscount] = useState('');
  const [installment, setInstallment] = useState('');


  useEffect(() => {
    const fetchPromotions = async () => {

      let queryParams = new URLSearchParams({
        ...(gift !== '' && { gift: gift }),
        ...(discount !== '' && { discount: discount }),
        ...(installment !== '' && { installment: installment }),
      });


      const queryString = queryParams.toString();
      const response = await axios.get(`${BaseURLs.promotion}${selectedLanguage}/?${queryString}`)

      const promotions = response.data.results
      const normaldata = normalizePromotionData(promotions, selectedLanguage)
      setPromotions(normaldata)
    }
    fetchPromotions()
  }, [selectedLanguage, gift, discount, installment])



  // useEffect(()=> {
  //   const fetchCompany = async  () => {
  //     const response = await axios.get(`${BaseURLs.company}${selectedLanguage}/`)
  //     const company = 
  //   }



  // })

  // useEffect(() => {
  //   promotions.forEach((promotion, index) => {
  //     console.log(`EndDate of promotion ${index}:`, promotion.details.endDate);
  //   });
  // }, [promotions]);


  useEffect(() => {
    console.log(promotions)
  }, [promotions])



  const truncateText = (text, limit) => {
    if (!text) return ''; // Return an empty string if text is null or undefined
    return text.length > limit ? `${text.substring(0, limit)}...` : text;
  };

  const renderSaleArticle = (item) => (
    <div className="eachSaleArticleBox" >
      <div className="saleArticleInfoText">
        <div className="timeAndCompanyLogo">
          <div className="saleTimeBox">
            <p>{item.details?.startDate}--{item.details?.endDate}</p>

          </div>
          <div className="logoOfPercentAndCompany">
            <img src={percentImage} alt="Percent Discount" />
            <img  src={item.details.company_Logo?.logocompany} alt="Company Logo" className="company_logo" />
          </div>
        </div>
        {/* <p style={{ color: '#bba8a8' }}>{item.saleText}</p> */}
        <h3>{truncateText(item.promotionName, 20)}  </h3>
        <div className="microphoneAndItsInfoText">
          <img src={microphoneLogo} alt="Microphone" />
          <p>{truncateText(item.about, 70)}</p>

        </div>
        <div className="navigateAndItsInfoText">
          <img src={navigateLogo} alt="Navigate Arrow" />
          <p>{truncateText(item.about, 70)}</p>
        </div>
      </div>
      <div className="SaleArticleImageBox">

        <img src={item.images} alt="Sale Article Image" className="imageOfSaleComplex" />
      </div>
    </div>
  );








  const handleDiscountButtonClick = () => {
    setInstallment(false)
    setDiscount(true)
    setGift(false)
  }

  const handleGiftClick = () => {
    setInstallment(false)
    setGift(true)
    setDiscount(false)
  }

  const handleInstallmentClick = () => {
    setInstallment(true)
    setGift(false)
    setDiscount(false)
  }

  const handleClearAllClick = () => {
    setInstallment('')
    setGift('')
    setDiscount('')
  }

  // const renderSaleArticles = () => {
  //   return promotions.map((item, index) => (
  //     <div className="saleArticlesBox" key={`saleArticle_${index}`}>
  //       <motion.div
  //         initial={{ x: -120, opacity: 0 }}
  //         transition={{ duration: 1.5 }}
  //         whileInView={{ x: 0, opacity: 1 }}
  //         viewport={{ once: true }}
  //       >
  //         {renderSaleArticle(item)}
  //       </motion.div>
  //       <motion.div
  //         initial={{ x: 120, opacity: 0 }}
  //         transition={{ duration: 1.5 }}
  //         whileInView={{ x: 0, opacity: 1 }}
  //         viewport={{ once: true }}
  //       >
  //         {renderSaleArticle(item)}
  //       </motion.div>
  //     </div>
  //   ));
  // };


  const renderSaleArticles = () => {
    return (
      <div className="saleArticlesBox">
        {promotions.map((item, index) => (
          <motion.div
            key={`saleArticle_${index}`}
            initial={{ x: -120, opacity: 0 }}
            transition={{ duration: 1.5 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="eachSaleArticleBox2" // Ensure this matches your CSS className for individual items
          >
            {renderSaleArticle(item)}
          </motion.div>
        ))}
      </div>
    );
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
                <button className="buttonOfEachSection" onClick={() => handleClearAllClick()}  >ყველა</button>
              </div>
              <div className="eachSectionBox">
                <img src={percentImg} className="percentIstallmentImg" alt="photo of percent" />
                <button className="buttonOfEachSection" onClick={() => handleDiscountButtonClick()} >ფასდაკლება</button>
              </div>
              <div className="eachSectionBox">
                <img src={giftImg} className="giftImg" alt="photo of gift" />
                <button className="buttonOfEachSection" onClick={() => handleGiftClick()} >საჩუქარი</button>
              </div>
              <div className="eachSectionBox">
                <img src={istallmentImg} className="giftImg" alt="photo of oClock" />
                <button className="buttonOfEachSection" onClick={() => handleInstallmentClick()} >განვადება</button>
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
