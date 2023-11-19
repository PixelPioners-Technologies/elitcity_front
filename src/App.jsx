import './App.css'
import Header from './Components/Header/Header'
import { Route, Routes } from "react-router-dom";
import HomePage from './pages/HomePage';
import Complex from './pages/Complex';
import Lots from './pages/Lots';
import Developers from './pages/Developers';
import Map from './pages/Map';
import Sales from './pages/Sales';


function App() {

  return (
    <div>
      <Header />

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='complex' element={<Complex />} />
        <Route path='lots' element={<Lots />} />
        <Route path='developers' element={<Developers />} />
        <Route path='map' element={<Map />} />
        <Route path='sales' element={<Sales />} />
      </Routes>
    </div>
  )
}

export default App
