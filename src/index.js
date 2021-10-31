import './sass/main.scss';
import ApiService from './apiService';
import photos from './templates/photos.hbs'
import LoadMoreBtn from './loadmore.js'

const refs = {
    searchform: document.querySelector('.search'),
    photosCard: document.querySelector('.gallery')
}
const apiService = new ApiService()
const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true,
})

refs.searchform.addEventListener('submit', onSearch)
//refs.loadBut.addEventListener('click', onLoad)
loadMoreBtn.refs.button.addEventListener('click', onLoad)

function onSearch(e) {
    e.preventDefault()

    loadMoreBtn.show() // показывается текст загрузки кнопки
    loadMoreBtn.disable() //кнопка неактивна
    
    apiService.query = e.currentTarget.elements.query.value
    apiService.resetPage()
    apiService.fetchArticles()
        .then(f => {
            clearPhotoCard() // очищает стр после каждого нового запроса
            addPhotos(f)
        })
    loadMoreBtn.enable() // после результата запроса кнопка снова активна
}

function onLoad() {
    loadMoreBtn.disable() //кнопка неактивна
    apiService.fetchArticles()
        .then(f => {
            addPhotos(f)
            loadMoreBtn.enable() // после результата запроса кнопка снова активна
        })
    
}

function addPhotos(hits) {
    refs.photosCard.insertAdjacentHTML('beforeend', photos(hits))
}

function clearPhotoCard() {
    refs.photosCard.innerHTML = '' // для очищения результата запроса на стр
}