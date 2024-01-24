// import React from 'react'

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
import React, { useState } from 'react';



const Storkhome = () => {
  const [formData, setFormData] = useState({ Email: '', Name: '', Floor: '' });
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const submitForm = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    };

    fetch('https://script.google.com/macros/s/AKfycbwf4KpTKWPmkSKBC9SOviNg1AxsDH6oMdqMnCBhLC3Wb6h2TOrZ-PHagqksL5h0MRg1/exec', requestOptions)
      .then(response => response.json())
      .then(data => {
        // Handle the response data
        if (data.result === 'success') {
          setMessage('Form submitted successfully!');
        } else {
          setMessage('Error: ' + data.error);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setMessage('Error submitting form. Please try again.');
      });
  };

  return (
    <div>
      <form>
        {/* Your form fields go here  */}
        <label>
          Email:
          <input type="text" name="Email" value={formData.Email} onChange={handleInputChange} />
        </label>
        <label>
          Name:
          <input type="text" name="Name" value={formData.Name} onChange={handleInputChange} />
        </label>
        <label>
          Floor:
          <input type="text" name="Floor" value={formData.Floor} onChange={handleInputChange} />
        </label>
        <button type="button" onClick={submitForm}>Send</button>
      </form>

      {/* Display the message */}
      {message && <div>{message}</div>}
    </div>
  );
};

export default Storkhome;