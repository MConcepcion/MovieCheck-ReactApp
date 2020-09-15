import React, { Component } from 'react';
import MovieBox from "./_MovieBox";
import '../css/App.css';

const fetchBaseUrl = "https://api.themoviedb.org/3/movie/popular?api_key=fb80ed66f8635a5862c804e276096e03&language=en-US&page=";
var pageNumber = 1;
var fetchFullUrl = `${fetchBaseUrl}${pageNumber}`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      movieBoxArr: [],
      movieTitle: '',
      movieRelDate: '',
      movieDesc: '',
      movieVoteAvg: 0,
    };
  }

  /* ****************************************************************
   * TO DO: I was aware that it would be better to pass the movie
   *        details through the component, but for expediency,
   *        I currently have the method just use the movie ID
   *        and remap the movieBoxArr[].
   *        I will pass the necessary data through the method later.
   */
  showMovieDetails( movieId ) {
          // App.setState({
          //   movieTitle: data['title'],
          //   movieRelDate: data['release_date'],
          //   movieDesc: data['overview'],
          //   movieVoteAvg: data['vote_average']
        // })
      // });
    console.log( movieId + " Clicked!");
  }

  /* ***************************************************************
   * componentDidMount method fetches first page of MovieDB data
   * upon loading the page
   */
  componentDidMount() {
    fetch(`${fetchFullUrl}`)
      .then(response => response.json())
      .then(data => {
        const movies = data['results'].map(item => { return item; })
        this.setState({movieBoxArr: movies});
        pageNumber = data['page'];
        console.log(`Page number: ${pageNumber}`);
    });
  }

  render() {
    return (
      <div className="app-container">
        <header>
          <h1>Welcome to<br />MovieCheck</h1>
        </header>
        {/* TO DO: This is supposed to be the div where the movie details should have ended up.
          *        The div was supposed to be loaded as invisible and floating above the
          *        Movie Box Grid, and populates the state properties on-click, then displays
          *        the content.
          */}
        <div className="movie-details-display">
          <p>
            {this.state.movieTitle}<br />
            {this.state.movieRelDate}<br />
            {this.state.movieDesc}<br />
            {this.state.movieVoteAvg}
          </p>
        </div>
        <div className="movie-box-grid">
          <MovieBox 
            movieBoxArr={this.state.movieBoxArr} 
          />
        </div>
        <footer>
          <p>Powered by The Movie Database &ndash; <a href="https://themoviedb.org">TheMovieDB.org</a></p>
        </footer>
      </div>
    )
  }
};

export default App;
