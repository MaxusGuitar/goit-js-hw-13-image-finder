import './sass/main.scss';
import ApiService from './apiService';

const refs = {
    searchform: document.querySelector('.search'),
    loadBut: document.querySelector('.show')
}
const apiService = new ApiService()

refs.searchform.addEventListener('submit', onSearch)
refs.loadBut.addEventListener('click', onLoad)

function onSearch(e) {
    e.preventDefault()

    apiService.query = e.currentTarget.elements.query.value
    apiService.fetchArticles()
}

function onLoad() {
    apiService.fetchArticles()
}
