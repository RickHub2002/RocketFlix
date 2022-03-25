import {
  API_KEY, BASE_URL,
  IMG_URL,
  language,
} from './api.js'

const randomNumber = (min, max) => {
  const rN = Math.floor(Math.random() * (max - min + 1)) + min
  return rN
}

const imgUrl = IMG_URL;
const movieImg = document.createElement('img')

function getMovies(url) {
  axios.get(url)
  .then(response => {
    showMovie(response)
    const responseStatus = response.status
  })
  .catch(err => {
    showMovieError(err)
  })
};

function showMovie(res) {
  const data = res.data

  if(res.status === 200) {
    movieImg.src = imgUrl + data.poster_path
    movieImg.classList.add('movie-img')
    movieTitle.textContent = data.original_title
    movieDesc.textContent = data.overview

    console.log(res.status)

    const movieContainer = document.querySelector('#movieContainer')
    movieContainer.prepend(movieImg)
  }
};

function showMovieError(err) {
  console.log('Not found' + ' ' + err)
  movieTitle.innerHTML = ''
  movieDesc.innerHTML = "Oops, today is not the day to watch a movie. Let's code!"
  movieImg.src = './assets/images/poster.png'
} 

function generateRandomMovie() {
  shuffleButton.addEventListener('click', () => {
    const url = `https://api.themoviedb.org/3/movie/${randomNumber(1,1300)}?api_key=153f5e6ffb852ee0f8f2852d55bdd1eb`;
    getMovies(url)
  });
};

generateRandomMovie();

