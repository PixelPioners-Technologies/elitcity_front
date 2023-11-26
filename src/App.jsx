import './App.css'
import Header from './Components/Header/Header'
import { Route, Routes } from "react-router-dom";
import { useState } from 'react';
import HomePage from './pages/HomePage';
import Complex from './pages/Complex';
import Lots from './pages/Lots';
import Developers from './pages/Developers';
import Map from './pages/Map';
import Sales from './pages/Sales';
import Plans from './pages/Plans';
import FavoriteComplex from './pages/FavoriteComplex';


function App() {

  
  const [savedComplexes, setSavedComplexes] = useState([]);
  const favoriteHandler = (complex) => {
    const isAlreadySaved = savedComplexes.some((c) => c.id === complex.id);

    if (isAlreadySaved) {
      const updatedComplexes = savedComplexes.filter((c) => c.id !== complex.id);
      setSavedComplexes(updatedComplexes);
    } else {
      setSavedComplexes([...savedComplexes, complex]);
    }
  };

  console.log('savedComplexes: -- ', savedComplexes)

  

  return (
    <div>
      <Header />
    
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='complex'>
          <Route index={true} element={<Complex favoriteHandler={favoriteHandler} />} />
          <Route path='plans' element={<Plans/>} />
        </Route>
        <Route path='lots' element={<Lots />} />
        <Route path='developers' element={<Developers />} />
        <Route path='map' element={<Map />} />
        <Route path='sales' element={<Sales />} />
        <Route path='favoriteComplex' element={<FavoriteComplex savedComplexes={savedComplexes} />} />
      </Routes>
    </div>
  )
}

export default App
