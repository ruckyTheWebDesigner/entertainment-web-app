import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import DataContext from "./context/DataContext";
import "./App.css";

import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import MoviePage from "./pages/movies/MoviePage";
import TvSeries from "./pages/tvseries/TvSeries";
import BookMark from "./pages/bookmarked/BookMark";

function App() {
  return (
    <DataContext>
      <Router>
        <Routes>
          <Route path='/' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/movies' element={<MoviePage />} />
          <Route path='/tvseries' element={<TvSeries />} />
          <Route path='/bookmarked' element={<BookMark />} />
        </Routes>
      </Router>
    </DataContext>
  );
}

export default App;
