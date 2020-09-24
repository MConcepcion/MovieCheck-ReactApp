This project was built, using software specifications from a code challenge posted by the host of the "Frontend Developers of North NJ" Meetup.com group, in September 2020.

Submitted to the host's GitHub repo: https://github.com/bellagrunt/interview/tree/master/Frontend/mconcepcion

This project was started using the [Create React App](https://github.com/facebook/create-react-app) Node.js package.

## Overview

The "MovieCheck" app loads a list of popular movies from the [Movie Database API](https://www.themoviedb.org/) for users to interact with.

Clicking on a movie poster in the list will bring up the selected movie's details in a modal window. Clicking anywhere in the viewport will close the modal for the user to view the movie list.

Users are also able to click on the "<" (previous page) and ">" (next page) on the top and the bottom of the list to refresh the list with the previous or next 20 movies in the list. Users cannot click on the "previous page" button if the movie list is currently showing the first page of hits. The "next page" button is disabled if the user is viewing the last page in the list (the default page limit is set to 500).

## Original Project Requirements

Taken from the "README.md" file from the code challenge repo:

### Project

Build a small web app using the Movie Database API (https://developers.themoviedb.org).

### Minimum viable product

When first loaded, the user should see a list of the most popular movies (see https://developers.themoviedb.org/3/movies/get-popular-movies). A user can click on any movie in the list and view more details for the movie.

### Requirements

This app should query the Movie DB API and return the results to the user. Develop your UI using your frontend technologies of choice. UX Polish. This is not a design exercise, but your app should demonstrate mastery of your frontend toolset. Include a README.md with step-by-step instructions for running the app.

