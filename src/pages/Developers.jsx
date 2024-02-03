import React, { useEffect, useState } from 'react'
import axios from "axios"
import './Developers.css'
import { motion } from 'framer-motion';






const normalizeCompanyData = (data, lang) => {
  return data.map(item => ({
    id: item.id,
    recordId: item.record_id,
    internalName: item.internal_name,
    mobile: item.Mobile,
    mobileHome: item.Mobile_Home,
    email: item.email,
    companyWeb: item.companyweb,
    facebookPage: item.facebook_page,
    logoCompany: item.logocompany,
    backgroundImage: item.background_image,
    topCompany: item.topCompany,
    visibility: item.visibility,
    name: item[`name_${lang}`] || item.name_en, 
    address: item[`address_${lang}`] || item.address_en, 
    aboutCompany: item[`aboutcompany_${lang}`] || item.aboutcompany_en, 
  }));
};


export default function Developers({ favorites, selectedLanguage }) {
  const [developers, setDevelopers] = useState([]);





  const baseURL_Comany = "http://127.0.0.1:8000/company/"


  useEffect(() => {
    const fetchCompanies = async () => {
      const response = await axios.get(`${baseURL_Comany}${selectedLanguage}`)
      const results = response.data.results
      const normalizedData = normalizeCompanyData(results)
      setDevelopers(normalizedData)

    }
    fetchCompanies()
  }, [])


  // useEffect(() => {
  //   console.log('es aris ompaniebi ', developers)

  // }, [developers])

  const LanguageChangeForCompanyPage = (lang) => {
    var languageInfo = {
      header: "Top developer companies",
      developers: 'developer companies'
    }

    switch (lang) {
      case "en":
        languageInfo.header = "Top developer companies"
        languageInfo.developers = 'Developer companies'
        break;

      case "ka":
        languageInfo.header = "ტოპ დეველუპერული ცომპანიები"
        languageInfo.developers = 'დეველუპერული ცომპანიები'

        break

      case "ru":
        languageInfo.header = "Лучшие компании-разработчики"
        languageInfo.developers = 'Компании-разработчики'

        break
    }
    return languageInfo
  }




  return (
    <div className='developers_main_container'>

      <div className="header_container">
        <h1>{LanguageChangeForCompanyPage(selectedLanguage).header}  </h1>
      </div>

      <div className='companyes_header' >
        <h1>{LanguageChangeForCompanyPage(selectedLanguage).developers}</h1>
      </div>

      <div>
        {developers.map((developers, index) => (
          <motion.div
            // key={currentPage}
            initial={{ x: -50, opacity: 0 }}
            transition={{ duration: 1 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}

          >
            {/* ------------------this is company cards-------------------------- */}
            <motion.div
              className="textButtonContainer"
              whileHover={{ scale: 1.1 }}
              // whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className='developers' key={index} >
                <div className='developers_child_container' >
                  {/* logo container */}
                  <div>
                    <img className='company_logo' src={developers.logoCompany} rel='company logo' />
                  </div>
                  {/* settings container */}
                  <div className='settings_container' >
                    <p>{developers.name}</p>
                    <p> {developers.address}</p>
                  </div>
                </div>

                <div className="second_developers_child_container">
                  <img className='company_background_image' src={developers.backgroundImage} rel='company background image' />
                </div>
              </div>
            </motion.div>
            {/* ----------------------------------------------------------------- */}
          </motion.div>
        ))}

      </div>

    </div>
  )
}
