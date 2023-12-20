import React, { useState, useEffect } from 'react';
import axios from 'axios';

const baseURL = 'https://api.storkhome.ge';

const HomePagecompanylogo = ({ selectedLanguage }) => {
  const [company, setCompany] = useState([]);

  const normalizeCompanyData = (data, lang) => {
    if (!data || !Array.isArray(data)) {
      console.error('Data is undefined or not an array.');
      return [];
    }

    return data.map(item => ({
      id: item.id,
      logo: item.logocompany
      // Add other fields as needed
    }));
  };

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await axios.get(`${baseURL}/company/${selectedLanguage}/`);
        const companyData = normalizeCompanyData(response.data.results, selectedLanguage);
        setCompany(companyData);
        console.log('Fetched Company Data:', companyData);
      } catch (error) {
        console.error('Error fetching company data:', error);
      }
    };

    fetchCompany();
  }, [selectedLanguage]);

  return (
    <>
      {Array.isArray(company) &&
        company.map(companyItem => (
          <div key={companyItem.id} className="company-mtavari">
            <div className="company-card">
              <img src={companyItem.logo} alt={`Company Logo ${companyItem.id}`} className="company-image" />
            </div>
          </div>
        ))}
    </>
  );
};

export default HomePagecompanylogo;
