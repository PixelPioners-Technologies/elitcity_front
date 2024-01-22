import  { useState } from "react";
import './EachComplex.css';
import img1 from '../assets/ComplexesPhotos/0zzz.jpg';
import img2 from '../assets/ComplexesPhotos/1zz.jpg';
import img3 from '../assets/ComplexesPhotos/2zz.jpg';
import img4 from '../assets/ComplexesPhotos/3zz.jpg';
import img5 from '../assets/ComplexesPhotos/4zz.jpg';
import img6 from '../assets/ComplexesPhotos/5zz.jpg';

export default function EachComplex() {
  const [currentIndex, setCurrentIndex] = useState(0);

const handleNext = () => {
  console.log('Next button clicked');
  setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
};

const handlePrev = () => {
  console.log('Prev button clicked');
  setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
};


  const slides = [
    { image: img1, name: 'LUNDEV', description: 'Tinh ru anh di chay pho, chua kip chay pho thi anhchay mat tieu' },
    { image: img2, name: 'Another Name 1', description: 'Another description 1' },
    { image: img3, name: 'Another Name 2', description: 'Another description 2' },
    { image: img4, name: 'Another Name 3', description: 'Another description 3' },
    { image: img5, name: 'Another Name 4', description: 'Another description 4' },
    { image: img6, name: 'Another Name 5', description: 'Another description 5' },
  ];

  return (
    <div style={{ backgroundColor: 'white', height: '100vh' }}>
      <div className="container">
        <div id="slide">
        {slides.map((slide, index) => (
  <div key={index} className={`item ${currentIndex === index ? 'active' : ''}`} style={{ backgroundImage: `url(${slide.image})` }}>
  <div className="content">
                <div className="name">{slide.name}</div>
                <div className="des">{slide.description}</div>
                <button>See more</button>
              </div>
            </div>
          ))}
        </div>
        <div className="buttons">
        <button onClick={() => { console.log('Prev button clicked'); handlePrev(); }}>
  <i className="fa-solid fa-angle-left"></i>
</button>
<button onClick={() => { console.log('Next button clicked'); handleNext(); }}>
  <i className="fa-solid fa-angle-right"></i>
</button>
        </div>
      </div>
    </div>
  );
}
