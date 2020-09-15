import React, { Component } from 'react';

const imagePosterPathBaseUrl = "http://image.tmdb.org/t/p/w300";
var movieBoxKey = 0; // needed a key for the map() method to stop warning me... T_T

class MovieBox extends Component {
  render() {
    // const fetchMovieBaseUrl = "https://api.themoviedb.org/3/movie/";
    // const fetchMovieApiKey = "?api_key=fb80ed66f8635a5862c804e276096e03&language=en-US"; // Oh boy, this is secure!

    return(
      this.props.movieBoxArr.map(item => (
        <div 
          className="movie-box" 
          key={movieBoxKey++}
          onClick={e => {console.log(item['id'])}}>
          <img src={`${imagePosterPathBaseUrl}${item.poster_path}`} alt={item.title} />
          <h2 className="movie-title">{item.title}</h2>
        </div>
      ))
    )
  }
}

export default MovieBox;