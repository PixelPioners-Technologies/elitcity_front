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
import FavoriteComplex from './pages/FavoriteComplex';
import ApartmentList from './pages/ApartmentList';


function App() {
  // const [favorites, setFavorites] = useState([]);

  // const addToFavorites = (item) => {
  //   setFavorites([...favorites, item]);
  // };




  // favorites infos State
  const [favorites, setfavorites] = useState([]);


  // favorites functionality
  const favoriteHandler = (complex) => {
    const isAlreadySaved = favorites.some((c) => c.id === complex.id);

    if (isAlreadySaved) {
      const updatedComplexes = favorites.filter((c) => c.id !== complex.id);
      setfavorites(updatedComplexes);
    } else {
      setfavorites([...favorites, complex]);
    }
  };

  console.log('favorites: -- ', favorites)

  

  return (
    <div>
      <Header />
    
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='complex'>
          <Route index={true} element={<Complex favoriteHandler={favoriteHandler} />} />
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
