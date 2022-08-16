import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Appbar from "../../components/Appbar";
import Custominput from "../../components/Custominput";
import TrendingComponent from "../../components/TrendingComponent";
import RecommendedComponent from "../../components/RecommendedComponent";
import SearchResult from "../../components/SearchResult";

import Loader from "../../assets/Loader";

import { movieContext } from "../../context/DataContext";
import { auth } from "../../helpers/firebase";

import { useAuthUser } from "@react-query-firebase/auth";

function HomePage() {
  const [data] = useContext(movieContext);
  const [resolution, setResolution] = useState(window.innerWidth);
  const [searching, setSearching] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const moviesCategory = data.filter((item) => item.isTrending === false);
  const isTrendingMovies = data.filter((item) => item.isTrending === true);

  const userData = useAuthUser(["user"], auth, {
    onSuccess: (user) => {
      return user;
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    // check for window resize
    window.addEventListener("resize", (event) => {
      setResolution(event.target.innerWidth);
    });
  }, [resolution]);

  const handleChange = async (event) => {
    event.preventDefault();
    setSearch(event.target.value);

    if (event.target.value === "") {
      setSearching(false);
      setSearchResult([]);
    } else {
      setSearching(true);
      const result = await data.filter((item) =>
        item.title.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setSearchResult(result);
    }
  };

  if (!userData.data || userData.isIdle) {
    navigate("/login", { replace: true });
  }

  if (userData.isLoading) {
    return (
      <div className=' flex h-screen flex-col items-center justify-center'>
        <Loader />
      </div>
    );
  }

  if (userData.isError) {
    return <div>Error</div>;
  }

  return (
    <div className='moviespage_wrapper'>
      {resolution > 768 ? <Sidebar /> : <Appbar />}
      <div className='moviespage_content'>
        <Custominput
          handleChange={handleChange}
          placeholder='Search for movies or TV series'
        />
        {searching ? (
          <SearchResult
            searchresult={searchResult}
            numbersofresult={searchResult.length}
            search={search}
          />
        ) : (
          <>
            <TrendingComponent data={isTrendingMovies} title='Trending' />
            <RecommendedComponent
              data={moviesCategory}
              title='Recommended for you'
            />
          </>
        )}
      </div>
    </div>
  );
}

export default HomePage;
