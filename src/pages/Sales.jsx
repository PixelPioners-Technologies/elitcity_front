// import React from 'react'
import { motion } from "framer-motion"; 
import './Sales.css';
import percentImg from '../assets/percent-svgrepo-com.svg';
import giftImg from '../assets/gift-svgrepo-com (1).svg';
import istallmentImg from '../assets/time1-svgrepo-com.svg';
import saleDATA from '../SaleDATA.json';

export default function Sales() {
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

      {
  saleDATA.map((item) => (
    <div className="saleArticlesBox" key={item.id}>
      <div className="eachSaleArticleBox">
        <div className="saleArticleInfoText">
          <div className="timeAndCompanyLogo">
            <p>{item.time1}--{item.time2}</p>
            <img src={item.percentImage} alt="Percent Discount" />
            <img src={item.companyImage} alt="Company Logo" />
          </div>
          <p>{item.saleText}</p>
          <p>{item.firstText}</p>
          <p>{item.secondText}</p>
          <div>
            <img src={item.microphoneLogo} alt="Microphone" />
            <p>{item.firstText}</p>
          </div>
          <div>
            <img src={item.navigateLogo} alt="Navigate Arrow" />
            <p>{item.secondText}</p>
          </div>
        </div>
        <div className="SaleArticleImageBox">
          <img src={item.image} alt="Sale Article Image" />
        </div>
      </div>
    </div>
  ))
}


{/* // ------------------------------------------------------------------------------------ */}

    </div>
  )
}
