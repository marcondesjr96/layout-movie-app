const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=031882455b536e6b463bb54b6a11c9bd&page=1'

const API_URL_NEXT_PAGE = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=031882455b536e6b463bb54b6a11c9bd&page='

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'

const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=031882455b536e6b463bb54b6a11c9bd&query="'

const form = document.getElementById('form');
const main = document.getElementById('main');
const search = document.getElementById('search');
const next_page = document.getElementById('next-page')



getMovies(API_URL)

async function getMovies(url){
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
}

function showMovies(movies){
    main.innerHTML = ''

    movies.forEach((movie) => {
        const {title, poster_path, vote_average, overview} = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = ` 
        <img src="${IMG_PATH + poster_path}" alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
            <h3>Overview</h3>
            ${overviewExist(overview)}
        </div>        
        `

        main.appendChild(movieEl)

        
    });    

}

function getClassByRate(vote){
    if(vote >= 8){
        return 'green'
    }else if (vote >= 5){
        return 'orange'
    }else{
        return 'red'
    }
}

function overviewExist(over){
    if(over){
        return over
    }else{
        return 'Overview not available'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if(searchTerm && searchTerm !== ''){
        getMovies(SEARCH_API + searchTerm)

        search.value = ''
    } else {

        window.location.reload()
    }
})

next_page.addEventListener('click', () =>{
    
    getMovies(API_URL + 1)
        
})