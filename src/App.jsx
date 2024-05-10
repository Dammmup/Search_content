import { useState } from 'react'
import Searchbar from "./components/SearchBar";
import { Routes, Route } from "react-router-dom";
import { MainPage } from './MainPage';
import { SearchFilm } from './pages/SearchFilm';
import { SearchMusic } from './pages/SearchMusic';
import { SearchBook } from './pages/SearchBook';
import { SearchGif } from './pages/SearchGif';
import { SearchImage } from './pages/SearchImage';
import { RickAndMorty } from './pages/RickAndMorty';
import { InterestingDays } from './pages/InterestingDays';
import { Favorites } from './pages/Favorites';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Searchbar/>
     <div>
      <Routes>
        <Route path="/favorites" element={<Favorites />} /> 
        <Route path="/" element={<MainPage />} />
        <Route path="/movies" element={<SearchFilm/>} />
        <Route path="/music" element={<SearchMusic/>} />
        <Route path="/book" element={<SearchBook/>} />
        <Route path="/gif" element={<SearchGif/>} />
        <Route path="/image" element={<SearchImage/>} />
        <Route path="/ram" element={<RickAndMorty/>} />
        <Route path="/numbers" element={<InterestingDays/>} />
      </Routes>
    </div>
    </>
  )
}

export default App
