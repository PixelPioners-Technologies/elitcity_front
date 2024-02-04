/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import './Storkhome.css'
import CompanyLogo from '../assets/LogoOfStorkhome.svg';
// import Call_Modal from '../Modals_for_stokhome_plus/Call_Modal'
import headphone_icon from '../icons/headphones.png'
import { motion } from 'framer-motion';



export default function Storkhome({
  selectedLanguage,
  handleCallButtonClick,

}) {





  const LanguageChangeForStorkhomePage = (lang) => {
    var languageInfo = {
      header: "For more comfort",
    }

    switch (lang) {
      case "en":
        languageInfo.header = "For more comfort"

        break;

      case "ka":
        languageInfo.header = "ტოპ დეველუპერული კომპანიები"

        break

      case "ru":
        languageInfo.header = "Для большего комфорта"

        break
    }
    return languageInfo
  }




  return (
    <div className='main_storkhome_container' >

      <div className='storkhome_plus_container' >
        <h1 className='sotkhome_plus' >Storkhome +</h1>
        <h2 className='storkhome_plus_translatable' > {LanguageChangeForStorkhomePage(selectedLanguage).header}</h2>
      </div>

      <div className='storkhome_cards_container' >

        {/* first card */}
        <div className="storkhome_cards">
          <p className='kit' >Starter Kit  </p>
          <div className='card_logo_and_plus' >
            <img src={CompanyLogo} rel='company logo' />
            <p className='logo_plus' >+</p>
          </div>
          <p> T : +995 111 222 333 </p>
        </div>

        {/* first card */}
        <div className="storkhome_cards">
          <p className='kit' >Regular Kit</p>
          <div className='card_logo_and_plus' >
            <img src={CompanyLogo} rel='company logo' />
            <p className='logo_plus' >+</p>
          </div>
          <p> T : +995 111 222 333 </p>
        </div>

        {/* first card */}
        <div className="storkhome_cards">
          <p className='kit' >Premium Kit</p>
          <div className='card_logo_and_plus' >
            <img src={CompanyLogo} rel='company logo' />
            <p className='logo_plus' >+</p>
          </div>
          <p> T : +995 111 222 333 </p>
        </div>

      </div>

      <div className='card_kit_settings_container' >
        <div className='kit_settings_cont' >
          <p className='kit_settings' >imformaciistvis velodebit damkvets</p>
          <p className='kit_settings' >imformaciistvis velodebit damkvets</p>
          <p className='kit_settings' >imformaciistvis velodebit damkvets</p>
          <p className='kit_settings' >imformaciistvis velodebit damkvets</p>
          <p className='kit_settings' >imformaciistvis velodebit damkvets</p>
          <p className='kit_settings' >imformaciistvis velodebit damkvets</p>
          <p className='kit_settings' >imformaciistvis velodebit damkvets</p>
          <p className='kit_settings' >imformaciistvis velodebit damkvets</p>
          <p className='kit_settings' >imformaciistvis velodebit damkvets</p>
        </div>

        <div className='kit_settings_cont' >
          <p className='kit_settings' >imformaciistvis velodebit damkvets</p>
          <p className='kit_settings' >imformaciistvis velodebit damkvets</p>
          <p className='kit_settings' >imformaciistvis velodebit damkvets</p>
          <p className='kit_settings' >imformaciistvis velodebit damkvets</p>
          <p className='kit_settings' >imformaciistvis velodebit damkvets</p>
          <p className='kit_settings' >imformaciistvis velodebit damkvets</p>
          <p className='kit_settings' >imformaciistvis velodebit damkvets</p>
          <p className='kit_settings' >imformaciistvis velodebit damkvets</p>
          <p className='kit_settings' >imformaciistvis velodebit damkvets</p>
          <p className='kit_settings' >imformaciistvis velodebit damkvets</p>
          <p className='kit_settings' >imformaciistvis velodebit damkvets</p>
          <p className='kit_settings' >imformaciistvis velodebit damkvets</p>
          <p className='kit_settings' >imformaciistvis velodebit damkvets</p>
        </div>

        <div className='kit_settings_cont' >
          <p className='kit_settings' >imformaciistvis velodebit damkvets</p>
          <p className='kit_settings' >imformaciistvis velodebit damkvets</p>
          <p className='kit_settings' >imformaciistvis velodebit damkvets</p>
          <p className='kit_settings' >imformaciistvis velodebit damkvets</p>
          <p className='kit_settings' >imformaciistvis velodebit damkvets</p>
          <p className='kit_settings' >imformaciistvis velodebit damkvets</p>
          <p className='kit_settings' >imformaciistvis velodebit damkvets</p>
          <p className='kit_settings' >imformaciistvis velodebit damkvets</p>
          <p className='kit_settings' >imformaciistvis velodebit damkvets</p>
        </div>

      </div>
      <motion.div
        className="textButtonContainer"
        whileHover={{ scale: 1.05 }}
        // whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className='big_call_cont' onClick={handleCallButtonClick} >
          <div className="make_call">
            <img className='hedaphone_icon' src={headphone_icon} rel='headphone icon' />
            <p className='call' > zaris motxovna </p>
          </div>
        </div>
      </motion.div>


    </div>
  )
}







































































// export default function Storkhome() {
//   return (
//     <div>
//         <div className="App" style={{backgroundColor: 'white',  height:"300px" }} >
//             <form method="POST" action="https://script.google.com/macros/s/AKfycbwCaX01serIYtJpx2NIY94Di-OY5XNPBsNWIUprCsCgiTYnmpC329mQexaDLlJeSA--/exec">
//               <input name="Email" type="email" placeholder="Email" required />
//               <input name="Name" type="text" placeholder="Name" required />
//               <input name="Floor" type='number' placeholder='Floor' required />
//               <button type="submit">Send</button>
//             </form>
//         </div>
//     </div>
//   )
// }



// const Storkhome = () => {
//   const [formData, setFormData] = useState({ Email: '', Name: '', Floor: '' });
//   const [message, setMessage] = useState('');

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const submitForm = () => {
//     const requestOptions = {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(formData)
//     };

//     fetch('https://script.google.com/macros/s/AKfycbwf4KpTKWPmkSKBC9SOviNg1AxsDH6oMdqMnCBhLC3Wb6h2TOrZ-PHagqksL5h0MRg1/exec', requestOptions)
//       .then(response => response.json())
//       .then(data => {
//         // Handle the response data
//         if (data.result === 'success') {
//           setMessage('Form submitted successfully!');
//         } else {
//           setMessage('Error: ' + data.error);
//         }
//       })
//       .catch(error => {
//         console.error('Error:', error);
//         setMessage('Error submitting form. Please try again.');
//       });
//   };

//   return (
//     <div>
//       <form>
//         {/* Your form fields go here  */}
//         <label>
//           Email:
//           <input type="text" name="Email" value={formData.Email} onChange={handleInputChange} />
//         </label>
//         <label>
//           Name:
//           <input type="text" name="Name" value={formData.Name} onChange={handleInputChange} />
//         </label>
//         <label>
//           Floor:
//           <input type="text" name="Floor" value={formData.Floor} onChange={handleInputChange} />
//         </label>
//         <button type="button" onClick={submitForm}>Send</button>
//       </form>

//       {/* Display the message */}
//       {message && <div>{message}</div>}
//     </div>
//   );
// };

// export default Storkhome;