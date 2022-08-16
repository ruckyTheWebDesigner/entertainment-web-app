import { useEffect, useState, useContext } from "react";
import Sidebar from "../../components/Sidebar";
import Appbar from "../../components/Appbar";
import Custominput from "../../components/Custominput";
import RecommendedComponent from "../../components/RecommendedComponent";
import SearchResult from "../../components/SearchResult";
import Loader from "../../assets/Loader";
import { useNavigate } from "react-router-dom";

import { movieContext } from "../../context/DataContext";

import { auth } from "../../helpers/firebase";

import { useAuthUser } from "@react-query-firebase/auth";

function BookMark() {
  const [data] = useContext(movieContext);

  const allBookMarked = data.filter((item) => item.isBookmarked === true);
  const bookmarkedMovies = data.filter(
    (item) => item.category === "Movie" && item.isBookmarked
  );
  const bookmarkedTvSeries = data.filter(
    (item) => item.category === "TV Series" && item.isBookmarked
  );

  const [resolution, setResolution] = useState(window.innerWidth);
  const [searching, setSearching] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const userData = useAuthUser(["user"], auth, {
    onSuccess: (user) => {
      return user;
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    // check for window resize
    window.addEventListener("resize", (event) => {
      setResolution(event.target.innerWidth);
    });
  }, [resolution]);

  const navigate = useNavigate();

  const handleChange = async (event) => {
    event.preventDefault();
    setSearch(event.target.value);

    if (event.target.value === "") {
      setSearching(false);
      setSearchResult([]);
    } else {
      setSearching(true);
      const result = await allBookMarked.filter((item) =>
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
    <div>
      {" "}
      <div className='moviespage_wrapper'>
        {resolution > 768 ? <Sidebar /> : <Appbar />}
        <div className='moviespage_content'>
          <Custominput
            handleChange={handleChange}
            placeholder='Search for bookmarked shows'
          />
          {searching ? (
            <SearchResult
              searchresult={searchResult}
              numbersofresult={searchResult.length}
              search={search}
            />
          ) : (
            <>
              <RecommendedComponent
                title='Bookmarked Movies'
                data={bookmarkedMovies}
              />
              <RecommendedComponent
                title='Bookmarked TV Series'
                data={bookmarkedTvSeries}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookMark;
