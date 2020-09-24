import React, { useState, useEffect } from 'react';
import { FaGreaterThan, FaLessThan, FaWindowClose } from 'react-icons/fa';
import '../css/App.css';

const App = () => {

  // State variables for page traversal
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPageNumber, setTotalPageNumber] = useState(2); // default set to 2 for testing "next page" button disable functionality
  // State variables used to populate movie data
  const [movieData, setMovieData] = useState([]);
  const [movieTitle, setMovieTitle] = useState("");
  const [movieImage, setMovieImage] = useState("");
  const [movieOverview, setMovieOverview] = useState("");
  // State variables used for CSS-related events
  const [detailView, setDetailView] = useState("");
  const [blurry, setBlurry] = useState("");

  // URL prefixes for data fetch and movie poster images
  const fetchBaseUrl = "https://api.themoviedb.org/3/movie/popular?api_key=fb80ed66f8635a5862c804e276096e03&language=en-US&page=";
  const imagePosterPathBaseUrl = "http://image.tmdb.org/t/p/w300";

  /**************************************************************************
   * This useEffect() hook fetches the initial page of movies.
   * Every time the user clicks on the "prev page" and "next page" icons, 
   * the "pageNumber" state prop is decremented or incremented, respectively, 
   * then fetches the new page of movies.
   */
  useEffect( () => { 
    const fetchMovieData = () => {
      let fetchFullUrl = fetchBaseUrl + pageNumber;
      fetch(fetchFullUrl)
        .then( response => response.json() )
        .then( result => { 
          // console.log(result);
          setPageNumber(result['page']);
          setMovieData(result['results']);
          setTotalPageNumber(result['total_pages']);
        });
    }
    fetchMovieData();
  }, [pageNumber]);

  /************************************************************************
   * After the user clicks on a movie poster in the list, the movie's
   * title, the URL for the movie's poster, and the movie's overview
   * is passed into this function so the state values can be populated
   * with movie data and, in turn, populate the Movie Details modal window
   * with details about the selected movie.
   */
  function populateMovieDetails(title, imagePath, description) {
    setMovieTitle(title);
    setMovieImage(imagePosterPathBaseUrl + imagePath);
    setMovieOverview(description);
  }

  /************************************************************************
   * This function is triggered when a user clicks on a movie poster to 
   * reveal the movie's details.
   * setDetailView() adds the "show-details" class name to the
   * "movie-details-box" DIV to switch the "display" CSS property
   * from "none" to "block".
   * setBlurry() adds the "blurred-out" class name to the "app-container"
   * DIV to blur out the app while the modal window is visible.
   * 
   * The makeDetailsHidden() function below toggles the "show-details"
   * visibility and the background blur.
   */
  function makeDetailsVisible() {
    setDetailView("show-details");
    setBlurry("blurred-out");
  }

  function makeDetailsHidden() {
    setDetailView("");
    setBlurry("");
  }

  /************************************************************************
   * pageCountDown() and pageCountUp() are functions used to increment
   * and decrement, respectively, the page number used in the query URL.
   * When the user clicks on the "<" or ">" buttons, the pageNumber state
   * value changes, and the app fetches the list of movies for the page.
   */
  function pageCountDown() {
    let newPageNumber = pageNumber - 1;
    // console.log(newPageNumber)
    setPageNumber(newPageNumber);
  }

  function pageCountUp() {
    let newPageNumber = pageNumber + 1;
    // console.log(newPageNumber);
    return setPageNumber(newPageNumber);
  }

  /***********************************************************************
   * Render block
   * 
   * TO DO: Cleanup the page sections into separate component files.
   *        (Header, MovieDetailsBox, PageNavigation, MovieBox, Footer)
   */
  return (
    <>
      <div className={`movie-details-box ${detailView}`}
        onClick={() => { detailView === "" ? makeDetailsVisible() : makeDetailsHidden(); }}>
        <div className="movie-details">
          <img src={movieImage} alt={movieTitle} />
          <div className="movie-details-desc">
            <button>
              <FaWindowClose />
            </button>
            <h2>{movieTitle}</h2>
            <p>{movieOverview}</p>
          </div>
        </div>
      </div>
      <div className={`app-container ${blurry}`}>
        <header>
          <h1>Welcome to<br />MovieCheck</h1>
          <p>Check out the details on the latest, most popular movie releases available in theaters, on digital release, and more!</p>
        </header>
        <div className="page-nav">
          <button onClick={() => { pageCountDown(); }} disabled={pageNumber === 1 ? true : false}><FaLessThan /></button>
          &nbsp;&nbsp;<span>Page {pageNumber}</span>&nbsp;&nbsp;
          <button onClick={() => { pageCountUp(); }} disabled={pageNumber === totalPageNumber ? true : false}><FaGreaterThan /></button>
        </div>
        <div className="poster-box-grid">
          {movieData.map(item => { return(
          <div className="poster-box" key={item.id} onClick={() => {
              populateMovieDetails(item.title, item.poster_path, item.overview);
              makeDetailsVisible();}}>
            <img src={`${imagePosterPathBaseUrl}${item.poster_path}`} alt={item.title} title={item.title} />
            <h2>{item.title}</h2>
            {/* <p>{item.overview}</p> */}
          </div>
          )})}
        </div>
        <div className="page-nav">
          <button onClick={() => { pageCountDown(); }} disabled={pageNumber === 1 ? true : false}><FaLessThan /></button>
          &nbsp;&nbsp;<span>Page {pageNumber}</span>&nbsp;&nbsp;
          <button onClick={() => { pageCountUp(); }}><FaGreaterThan /></button>
        </div>
        <footer>
          <p>Powered by The Movie Database &ndash; <a href="https://themoviedb.org">TheMovieDB.org</a></p>
        </footer>
      </div>
    </>
  )

};

export default App;
