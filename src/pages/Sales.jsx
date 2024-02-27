/* eslint-disable react/prop-types */
// import React from 'react'
import { motion } from "framer-motion";
import "./Sales.css";
import percentImg from "../assets/percent-svgrepo-com.svg";
import giftImg from "../assets/gift-svgrepo-com (1).svg";
import istallmentImg from "../assets/time1-svgrepo-com.svg";
import percentImage from "../assets/percentRED.svg";
// import companyImage from "../assets/ARCHISVG.svg";
import navigateLogo from "../assets/navigateArrow.svg";
import microphoneLogo from "../assets/microphoneImg.svg";
import { useEffect, useState } from "react";
import { BaseURLs } from "../App";
import axios from "axios";
import SaleModal from "../Modals_for_stokhome_plus/SaleModal";
import headphone_icon from "../icons/headphones.png";
import canse_iconl from "../icons/cancel.png";
import phoneImage from "../assets/🦆 icon _phone_.svg";
import Sort from "../assets/sort.png";

const normalizePromotionData = (data, lang) => {
  return data.map((promotion) => ({
    internalPromotionName: promotion.internal_promotion_name,
    promotionName: promotion[`promotion_name_${lang}`],
    images: promotion.promotion_images.images,
    about: promotion[`about_${lang}`],
    alert: promotion[`alert_${lang}`],
    company_mobile: promotion["company_mobile"],
    company_address: promotion[`company_address_${lang}`],
    details: {
      internalPromotionName:
        promotion.internal_promotion_name_details.internal_promotion_name,
      startDate: promotion.internal_promotion_name_details.start_date,
      endDate: promotion.internal_promotion_name_details.end_date,
      company: promotion.internal_promotion_name_details.company,
      discount: promotion.internal_promotion_name_details.discount,
      gift: promotion.internal_promotion_name_details.gift,
      installment: promotion.internal_promotion_name_details.installment,
      visibility: promotion.internal_promotion_name_details.visibility,
      company_Logo: promotion.internal_promotion_name_details.company_image,
    },
  }));
};

export default function Sales({ selectedLanguage, handleCallButtonClick }) {
  const [promotions, setPromotions] = useState([]);
  const [gift, setGift] = useState("");
  const [discount, setDiscount] = useState("");
  const [installment, setInstallment] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState(null);

  const [showFullNumber, setShowFullNumber] = useState(false);

  useEffect(() => {
    const fetchPromotions = async () => {
      let queryParams = new URLSearchParams({
        ...(gift !== "" && { gift: gift }),
        ...(discount !== "" && { discount: discount }),
        ...(installment !== "" && { installment: installment }),
      });

      const queryString = queryParams.toString();
      const response = await axios.get(
        `${BaseURLs.promotion}${selectedLanguage}/?${queryString}`
      );

      const promotions = response.data;
      const normaldata = normalizePromotionData(promotions, selectedLanguage);
      setPromotions(normaldata);
    };
    fetchPromotions();
  }, [selectedLanguage, gift, discount, installment]);

  // })

  // useEffect(() => {
  //   promotions.forEach((promotion, index) => {
  //     console.log(`EndDate of promotion ${index}:`, promotion.details.endDate);
  //   });
  // }, [promotions]);

  useEffect(() => {
    console.log(selectedPromotion);
  }, [promotions, selectedPromotion]);

  const truncateText = (text, limit) => {
    if (!text) return ""; // Return an empty string if text is null or undefined
    return text.length > limit ? `${text.substring(0, limit)}...` : text;
  };

  const renderSaleArticle = (item) => (
    <div
      className="eachSaleArticleBox"
      onClick={() => handlePromotionClick(item)}
    >
      <div className="saleArticleInfoText">
        <div className="timeAndCompanyLogo">
          <div className="saleTimeBox">
            <p>
              {item.details?.startDate}--{item.details?.endDate}
            </p>
          </div>
          <div className="logoOfPercentAndCompany">
            <img className="company_logo_sales" src={percentImage} alt="Percent Discount" />
            <img
              src={item.details.company_Logo?.logocompany}
              alt="Company Logo"
              className="company_logo_sales"
            />
          </div>
        </div>
        {/* <p style={{ color: '#bba8a8' }}>{item.saleText}</p> */}
        <h3>{truncateText(item.promotionName, 20)} </h3>
        <div className="microphoneAndItsInfoText">
          <img src={microphoneLogo} alt="Microphone" />
          <p>{truncateText(item.alert, 70)}</p>
        </div>
        <div className="navigateAndItsInfoText">
          <img src={navigateLogo} alt="Navigate Arrow" />
          <p>{truncateText(item.about, 70)}</p>
        </div>
      </div>
      <div className="SaleArticleImageBox">
        <img
          src={item.images}
          alt="Sale Article Image"
          className="imageOfSaleComplex"
        />
      </div>
    </div>
  );

  const handleDiscountButtonClick = () => {
    setInstallment(false);
    setDiscount(true);
    setGift(false);
  };

  const handleGiftClick = () => {
    setInstallment(false);
    setGift(true);
    setDiscount(false);
  };

  const handleInstallmentClick = () => {
    setInstallment(true);
    setGift(false);
    setDiscount(false);
  };

  const handleClearAllClick = () => {
    setInstallment("");
    setGift("");
    setDiscount("");
  };

  const renderSaleArticles = () => {
    return (
      <div className="saleArticlesBox">
        {promotions.map((item, index) => (
          <div
            // key={`saleArticle_${index}`}
            // initial={{ x: -120, opacity: 0 }}
            // transition={{ duration: 1.5 }}
            // whileInView={{ x: 0, opacity: 1 }}
            // viewport={{ once: true }}
            className="eachSaleArticleBox2" // Ensure this matches your CSS className for individual items
          >
            {renderSaleArticle(item)}
          </div>
        ))}
      </div>
    );
  };

  // ---------------------------functions for sale modal open and close ------------------------------------

  const handlePromotionClick = (promotion) => {
    setSelectedPromotion(promotion);
    console.log(promotion);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPromotion(null); // Optionally reset the selected promotion
    setShowFullNumber(false);
  };

  // -------------------------------language chenge function -------------------------------------------

  const LanguageChangeForSales = (lang) => {
    var languageInfo = {
      header: "For more comfort",
      promotions_and_ofers: "Promotions and offers",
      all: "all",
      discount: "Discount",
      gift: "Gift",
      ganvadeba: "Installment",
      address: "Address",
      show_number: "Show Number",
      make_call: "Call request",
    };

    switch (lang) {
      case "en":
        languageInfo.header = "For more comfort";
        languageInfo.promotions_and_ofers = "Promotions and offers";
        languageInfo.all = "all";
        languageInfo.discount = "Discount";
        languageInfo.gift = "Gift";
        languageInfo.ganvadeba = "Installment";
        languageInfo.address = "Address";
        languageInfo.show_number = "Show Number";
        languageInfo.make_call = "Call request";
        break;

      case "ka":
        languageInfo.header = "უფრო მეტი კომფორტისთვის";
        languageInfo.promotions_and_ofers = "აქციები და შეთავაზებები";
        languageInfo.all = "ყველა";
        languageInfo.discount = "ფასდაკლება";
        languageInfo.gift = "საჩუქარი";
        languageInfo.ganvadeba = "განვადება";
        languageInfo.address = "მისამართი";
        languageInfo.show_number = "ნომრის ჩვენება";
        languageInfo.make_call = "ზარის მოთხოვნა";
        break;

      case "ru":
        languageInfo.header = "Для большего удобства";
        languageInfo.promotions_and_ofers = "Акции и предложения";
        languageInfo.all = "все";
        languageInfo.discount = "Скидка";
        languageInfo.gift = "Подарок";
        languageInfo.ganvadeba = "Рассрочка";
        languageInfo.address = "Адрес";
        languageInfo.show_number = "Показать номер";
        languageInfo.make_call = "Запросить звонок";
        break;
    }
    return languageInfo;
  };

  // --------------------------------nomris bolomde gamochenistvis --------------------------------
  const handleShowNumberClick = () => {
    setShowFullNumber(true); // Toggle to show the full phone number
  };

  // ---------------------------------------------------------------------------------------------------

  const [openSortComp, setOpenComp] = useState(false);

  const sortOpen = () => {
    setOpenComp(!openSortComp);
  };
  const closeSort = () => {
    if (openSortComp) {
      setOpenComp(false);
    }
  };
  return (
    <div className="SalesBox" onClick={closeSort}>
      {/* ეს არის ჩამონათვალი button–ები, რომ გადახვიდე კომპლექსებზე, გეგმარებებზე, რუკაზე, სორტირება და დასაკელება და counter-ი ... */}
      <div
        // initial={{ y: -50, opacity: 0 }}
        // transition={{ duration: 1 }}
        // whileInView={{ y: 0, opacity: 1 }}
        // viewport={{ once: true }}
      >
        {/* Sale page Nav bar */}
        <div className="forPaddingOfsalesNavBar">
          <div className="infoFieldOfSalesAndSoOn">
            <div className="boxOftitleOfActionAndOffers">
              <p className="titleOfActionAndOffers">
                {LanguageChangeForSales(selectedLanguage).promotions_and_ofers}{" "}
              </p>
            </div>
            <div className="sort_icon_for_complex_mob" onClick={sortOpen}>
              <img
                src={Sort}
                style={{ width: "20px", height: "25px" }}
                alt="/"
              />
            </div>
            {/*  */}
            <div
              className={openSortComp ? "allSaleGiftAndInstallmentBox" : "clos"}
            >
              <div className="eachSectionBox">
                <button
                  className="buttonOfEachSection"
                  onClick={() => handleClearAllClick()}
                >
                  {LanguageChangeForSales(selectedLanguage).all}
                </button>
              </div>
              <div className="eachSectionBox">
                <img
                  src={percentImg}
                  className="percentIstallmentImg"
                  alt="photo of percent"
                />
                <button
                  className="buttonOfEachSection"
                  onClick={() => handleDiscountButtonClick()}
                >
                  {LanguageChangeForSales(selectedLanguage).discount}
                </button>
              </div>
              <div className="eachSectionBox">
                <img src={giftImg} className="giftImg" alt="photo of gift" />
                <button
                  className="buttonOfEachSection"
                  onClick={() => handleGiftClick()}
                >
                  {LanguageChangeForSales(selectedLanguage).gift}
                </button>
              </div>
              <div className="eachSectionBox">
                <img
                  src={istallmentImg}
                  className="giftImg"
                  alt="photo of oClock"
                />
                <button
                  className="buttonOfEachSection"
                  onClick={() => handleInstallmentClick()}
                >
                  {LanguageChangeForSales(selectedLanguage).ganvadeba}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {renderSaleArticles()}

      {/* // ------------------------------------------------------------------------------------ */}
      <SaleModal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div style={{ color: "white" }} className="sale_modal_container_main">
          <div className="close_sale_modal">
            <img
              src={canse_iconl}
              alt=""
              className="close_icon_sale"
              onClick={handleCloseModal}
            />
          </div>
          {selectedPromotion && (
            <div className="whole_sale_omdal_content">
              <div className="image_container_for_sale_modal">
                <img
                  src={selectedPromotion.images}
                  alt=""
                  className="image_for_sale_modal"
                />
              </div>
              <div className="sale_settings_and_companylogo">
                <div className="column">
                  <div className="microfon_logo_and_alert">
                    <img src={microphoneLogo} alt="Microphone" />
                    <p className="selected_promotion_alert">
                      {selectedPromotion.alert}
                    </p>
                  </div>
                  <div className="microfon_logo_and_alert">
                    <img src={navigateLogo} alt="Microphone" />
                    <p className="selected_promotion_alert">
                      {selectedPromotion.alert}
                    </p>
                  </div>
                  <div className="address_and_address">
                    <p className="selected_promotion_alert">
                      {LanguageChangeForSales(selectedLanguage).address}:
                    </p>
                    <p>{selectedPromotion.company_address}</p>
                  </div>
                </div>

                <div className="company_image_little_container">
                  <img
                    src={selectedPromotion.details.company_Logo?.logocompany}
                    className="image_company_for_sale_modal"
                  />
                </div>
              </div>
              <div className="all_call_modal_buttons">
                <div className="call_and_number_on_saleModal">
                  <div
                    className="show_number_sale_modal"
                    onClick={() => handleShowNumberClick()}
                  >
                    <img src={phoneImage} alt="phone icon" />
                    <p>
                      {showFullNumber
                        ? selectedPromotion.company_mobile
                        : truncateText(selectedPromotion.company_mobile, 10)}
                    </p>
                    {!showFullNumber && (
                      <p className="call_sale_modal">
                        {LanguageChangeForSales(selectedLanguage).show_number}
                      </p>
                    )}
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div
                      className="make_call_Sale_modal"
                      onClick={handleCallButtonClick}
                    >
                      <img
                        className="hedaphone_ico_sale_modaln"
                        src={headphone_icon}
                        rel="headphone icon"
                      />
                      <p className="call_sale_modal">
                        {" "}
                        {
                          LanguageChangeForSales(selectedLanguage).make_call
                        }{" "}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          )}
        </div>
      </SaleModal>
    </div>
  );
}
