import  { useState } from 'react';
import './EachComplex.css';

import img1 from '../assets/ComplexesPhotos/0zzz.jpg';
import img2 from '../assets/ComplexesPhotos/1zz.jpg';
import img3 from '../assets/ComplexesPhotos/2zz.jpg';
import img4 from '../assets/ComplexesPhotos/3zz.jpg';
// import img5 from '../assets/ComplexesPhotos/4zz.jpg';
// import img6 from '../assets/ComplexesPhotos/5zz.jpg';

export default function EachComplex() {
  const sliderImages = [
    { id: 1, value: img1 },
    { id: 2, value: img2 },
    { id: 3, value: img3 },
    { id: 4, value: img4 },
    // { id: 5, value: img5 },
    // { id: 6, value: img6 },
  ];

  const [wordData, setWordData] = useState(sliderImages[0]);
  const [val, setVal] = useState(0);
  const [clickedIndex, setClickedIndex] = useState(null);


  const handleClick = (index) => {
    setClickedIndex(index);
    console.log(index);
    setVal(index);
    const wordSlider = sliderImages[index];
    setWordData(wordSlider);
  };

  const handleNext = () => {
    let index = val < sliderImages.length - 1 ? val + 1 : val;
    setVal(index);
    const wordSlider = sliderImages[index];
    setWordData(wordSlider);
  };

  const handlePrevious = () => {
    let index = val <= sliderImages.length - 1 && val > 0 ? val - 1 : val;
    setVal(index);
    const wordSlider = sliderImages[index];
    setWordData(wordSlider);
  };

  return (
    <div className="each-complex">
      <div className='imageSliderBox'>
        <div className='bigImageBox'>
          <button className='btns' onClick={handlePrevious}>P</button>
          <img
            src={wordData.value}
            alt={`Complex ${wordData.id}`}
            height="450"
            width="711"
            className={clickedIndex !== null ? "clicked" : ""}
          />
          <button className='btns' onClick={handleNext}>N</button>
        </div>
        <div className='miniImagesBox'>
          {sliderImages.map((data, i) => (
            <div className="thumbnail" key={i}>
              <img
                className={`${wordData.id === data.id ? "clicked" : ""} ${clickedIndex === i ? "enlarge" : ""}`}
                src={data.value}
                alt={`Complex ${data.id}`}
                onClick={() => handleClick(i)}
                height="70"
                width="100"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}