import './App.css'
import Header from './Components/Header/Header'
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import Complex from './pages/Complex';
import Lots from './pages/Lots';
import Developers from './pages/Developers';
import Map from './pages/Map';
import Sales from './pages/Sales';
import FavoriteComplex from './pages/FavoriteComplex';
import ApartmentList from './pages/ApartmentList';


function App() {
  
  
  // favorites infos State (and favorite functionality with local storage)
  // START (favorite functionality)
  const [favorites, setFavorites] = useState([]);

  // Retrieve saved favorites from localStorage on initial render
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites'));
    if (savedFavorites) {
      setFavorites(savedFavorites);
    }
  }, []);
  
  // Load favorites from localStorage on initial render
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // favorites functionality
  const favoriteHandler = (complex) => {
    const isAlreadySaved = favorites.some((c) => c.id === complex.id);

    if (isAlreadySaved) {
      const updatedComplexes = favorites.filter((c) => c.id !== complex.id);
      setFavorites(updatedComplexes);
      localStorage.setItem('favorites', JSON.stringify(updatedComplexes)); // Update localStorage
      
    } else {
      const updatedFavorites = [...favorites, complex];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Update localStorage
    }
  };
    // END (favorite functionality)





  // console.log('favorites: -- ', favorites)

  

  return (
    <div>
      <Header favorites={favorites} />
    
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='complex'>
          <Route index={true} element={<Complex favoriteHandler={favoriteHandler} favorites={favorites} />} />
          <Route path='apartmentList' element={<ApartmentList favoriteHandler={favoriteHandler} />} />
        </Route>
        <Route path='lots' element={<Lots />} />
        <Route path='developers' element={<Developers />} />
        <Route path='map' element={<Map />} />
        <Route path='sales' element={<Sales />} />
        <Route path='favoriteComplex' element={<FavoriteComplex favorites={favorites} />} />
      </Routes>
    </div>
  )
}

export default App
