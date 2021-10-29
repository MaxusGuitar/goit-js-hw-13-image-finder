import './sass/main.scss';
import ApiService from './apiService';
import photos from './templates/photos.hbs'

const refs = {
    searchform: document.querySelector('.search'),
    loadBut: document.querySelector('.show'),
    photosCard: document.querySelector('.gallery')
}
const apiService = new ApiService()

refs.searchform.addEventListener('submit', onSearch)
refs.loadBut.addEventListener('click', onLoad)

function onSearch(e) {
    e.preventDefault()

    apiService.query = e.currentTarget.elements.query.value
    apiService.resetPage()
    apiService.fetchArticles()
        .then(addPhotos) 
}

function onLoad() {
    apiService.fetchArticles()
        .then(addPhotos)
}

function addPhotos(hits) {
    refs.photosCard.insertAdjacentHTML('beforeend', photos(hits))
}