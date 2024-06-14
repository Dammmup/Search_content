import { Routes, Route } from "react-router-dom";
import { MainPage } from './MainPage';
import { SearchFilm } from './UI/pages/SearchFilm';
import { SearchMusic } from './UI/pages/SearchMusic';
import { SearchImage } from './UI/pages/SearchImage';
import { RickAndMorty } from './UI/pages/RickAndMorty';
import { NumbersFact } from './UI/pages/NumbersFact';
import { Favorites } from './UI/pages/Favorites';
import { Empty } from './UI/pages/Empty';
import { Profile } from './UI/pages/Profile';
function App() {

  return (
    <>

     <div>
      <Routes>
        <Route path="/favorites" element={<Favorites />} /> 
        <Route path="/" element={<MainPage />} />
        <Route path="/movies" element={<SearchFilm/>} />
        <Route path="/music" element={<SearchMusic/>} />
        <Route path="/image" element={<SearchImage/>} />
        <Route path="/ram" element={<RickAndMorty/>} />
        <Route path="/numbers" element={<NumbersFact/>} />
        <Route path="/empty" element={<Empty />}/>
        <Route path="/profile" element ={<Profile/>}/>
      </Routes>
    </div>
    </>
  )
}

export default App
