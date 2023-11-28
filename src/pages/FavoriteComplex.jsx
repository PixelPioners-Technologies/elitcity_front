// აქ ეს diseibleee იმიტო დავწერე, რომ map-ზე error-ს მიგდებდა tsx-ის გამო რო იქ რაღაცაა ისეთი გაწერილი რომ მიგდებს ამას
/* eslint-disable react/prop-types */
// import React from 'react'

// eslint-disable-next-line react/prop-types
export default function FavoriteComplex({savedComplexes}) {
  return (
    <div>
     {/* Test for favorite */}
     
     {savedComplexes && savedComplexes.map((complex, index, ) => (
          <div className='card' key={index}>

            {/* აქ image გავთიშე, რადგან ხო ცალკე api–ით მომქონდა complex–ის page–ზე რაც axios–ზე მაქვს გაწერილი
            ხოლო აქ მხოლოდ complex–ების api–ზეა წვდომა ისე მაქ კოდი გაწერილი .. მაშინ დამჭირდება image-ებიც ავიტანო App-ში */}

            {/* <img src={images[index]?.image} alt='photo of complex' style={styles.imageStyles} /> */}

            <p style={styles.companyTitle}>{complex.name}</p>
            <div className='textInfo'>
              <p style={styles.complexInfo}>{complex.address}</p>
              <p style={styles.complexInfo}>{complex.price_per_sq_meter}</p>
              <p style={styles.complexFinished} >თარიღი...</p>
            </div>
          </div>
        ))}

    </div>
  )
}


const styles = {
  imageStyles: {
    width: '278px',
    height: '229px',
    overflow: 'hidden',
    borderRadius: '20px',
  },
  companyTitle: {
    // position: 'absolute',
    // top: '262px',
    // paddingLeft: '20px'
  },
  complexInfo: {
    color: '#000000',
  },
  complexFinished: {
    color: '#515050',
  },
};