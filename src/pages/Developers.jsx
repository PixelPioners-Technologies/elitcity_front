import React, { useEffect, useState } from 'react'
import axios from "axios"
import './Developers.css'
import { motion } from 'framer-motion';
import loupe from '../icons/loupe.png'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { BaseURLs } from '../App';


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
  const [stringFilterValue, setStringFilterValue] = useState('')

  const [totalPageCount, setTotalPageCount] = useState(0)
  const [currentPage, setCorrentPage] = useState(0)




  // --------------------------------------function for fetching company data-------------------------------------------


  useEffect(() => {
    const fetchCompanies = async () => {

      const limit = 12; // Define the limit or make it dynamic as per your requirement
      const offset = (currentPage - 1) * limit;


      let queryParams = new URLSearchParams({
        limit: limit,
        offset: offset,
        search: stringFilterValue,
      });

      const querystring = queryParams.toString();
      const requestUrl = `${BaseURLs.company}${selectedLanguage}/?${querystring}`;


      const response = await axios.get(requestUrl);
      setTotalPageCount(response.data.total_pages)
      setCorrentPage(response.data.current_page)
      const results = response.data.results;
      const normalizedData = normalizeCompanyData(results, selectedLanguage);
      setDevelopers(normalizedData);

    }
    fetchCompanies()
  }, [selectedLanguage, stringFilterValue])


  // useEffect(() => {
  //   console.log('es aris ompaniebi ', developers)

  // }, [developers, stringFilterValue])

  // -------------------------------------------------------------------------------------------------------------------------------------

  // --------------------------------------function for changind static text languages -------------------------------------------
  const LanguageChangeForCompanyPage = (lang) => {
    var languageInfo = {
      header: "Top developer companies",
      developers: 'developer companies',
      search_by_string: "Search by word",
    }

    switch (lang) {
      case "en":
        languageInfo.header = "Top developer companies"
        languageInfo.developers = 'Developer companies'
        languageInfo.search_by_string = "Search by word"
        break;

      case "ka":
        languageInfo.header = "ტოპ დეველუპერული ცომპანიები"
        languageInfo.developers = 'დეველუპერული ცომპანიები'
        languageInfo.search_by_string = "იპოვე სიტყვით"
        break

      case "ru":
        languageInfo.header = "Лучшие компании-разработчики"
        languageInfo.developers = 'Компании-разработчики'
        languageInfo.search_by_string = "Поиск по слову"
        break
    }
    return languageInfo
  }
  // -------------------------------------------------------------------------------------------------------------------------------------


  const pagiHandler = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  console.log(stringFilterValue)

  const topCompanies = developers.filter(developer => developer.topCompany);
  const otherCompanies = developers.filter(developer => !developer.topCompany);



  return (
    <div className='developers_main_container'>
      <div>
        <div className="header_container">
          <h1>{LanguageChangeForCompanyPage(selectedLanguage).header}  </h1>
        </div>
        {topCompanies.map((developers, index) => (
          <div className='big_container_for_key' key={index}  >
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
                whileHover={{ scale: 1.05 }}
                // whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <div className='developers' >

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
            </motion.div>
          </div>
        ))}
      </div>


      <div className='companyes_header' >
        <h1>{LanguageChangeForCompanyPage(selectedLanguage).developers}</h1>

        {/* for searching with string*/}
        <div className="button-modal-container" >
          <div className='lacation_button'   >
            <input
              className='string_filter_input'
              type='text'
              placeholder={LanguageChangeForCompanyPage(selectedLanguage).search_by_string}
              value={stringFilterValue}
              onChange={(e) => { setStringFilterValue(e.target.value) }}
            />
            <img src={loupe} alt="button loupe icon" className='dropdown' />
          </div>

        </div>
      </div>

      <div>
        {otherCompanies.map((developers, index) => (
          <div className='big_container_for_key' key={index}  >
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
                whileHover={{ scale: 1.05 }}
                // whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <div className='developers' >
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
            </motion.div>
          </div>
        ))}
        {/* ----------------------------------------------------------------- */}
        <div className='pagination'>
          <Stack spacing={2}>
            <Pagination
              count={totalPageCount}
              shape="rounded"
              page={currentPage}
              onChange={(event, value) => setCorrentPage(Number(value))}
              onClick={pagiHandler}
              sx={{
                '& .MuiPaginationItem-root': {
                  color: '#fff !important', // White text color for unselected items, with increased specificity
                  margin: '3px !important', // Removes margin between buttons, with increased specificity
                  padding: '0 !important', // Removes padding inside buttons, with increased specificity
                  '&:hover': {
                    backgroundColor: '#f0f0f0 !important', // Background color on hover for unselected items, with increased specificity
                    color: '#000 !important', // Text color on hover for unselected items, with increased specificity
                  },
                },
                '& .Mui-selected': {
                  backgroundColor: '#fff !important', // White background color for the selected item, with increased specificity
                  color: '#000 !important', // Black text color for the selected item, with increased specificity
                  '&:hover': {
                    backgroundColor: '#fff !important', // Keep the background color on hover for selected item, with increased specificity
                    color: '#000 !important', // Keep the text color on hover for selected item, with increased specificity
                  },
                },
                '& .MuiPaginationItem-ellipsis': {
                  color: '#fff !important', // Color of the ellipsis, with increased specificity
                  margin: '0 !important', // Removes margin around the ellipsis, with increased specificity
                  padding: '0 !important', // Removes padding around the ellipsis, with increased specificity
                },
                '.MuiPagination-ul': {
                  justifyContent: 'center !important', // Centers the pagination items, with increased specificity
                  flexWrap: 'nowrap !important', // Prevents the pagination items from wrapping, with increased specificity
                }
              }}
            />
          </Stack>
        </div>
      </div>

    </div>
  )
}
