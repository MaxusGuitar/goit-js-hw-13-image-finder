import './sass/main.scss';
import ApiService from './apiService';
import photos from './templates/photos.hbs'
import LoadMoreBtn from './loadmore.js'
import { Notify } from 'notiflix';

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
loadMoreBtn.refs.button.addEventListener('click', btnDisEn)

async function onSearch(e) {
    e.preventDefault()
    apiService.query = e.currentTarget.elements.query.value

    const good = await apiService.fetchArticles()
    const totalHits = good.data.totalHits
    const hitsLength = good.data.hits.length
    
    
    if (totalHits < 1) {
        Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        return;
    }
    else if (apiService.query === '') {
        Notify.warning('Enter your serch query, please :)');
        return;
    } else {
        Notify.success(`We found ${totalHits} images.`);
        clearPhotoCard() // очищает стр после каждого нового запроса
    }

   // loadMoreBtn.show() // показывается текст загрузки кнопки
    apiService.resetPage()
    apiService.fetchArticles().then(photos)
    loadMoreBtn.show()
    loadMoreBtn.enable()

     if (hitsLength < 40) {
        loadMoreBtn.hide();
        Notify.info("We're sorry, but you've reached the end of search results.");
    }
   // clearPhotoCard() // очищает стр после каждого нового запроса
    //btnDisEn()
}

function btnDisEn() {
    loadMoreBtn.disable() //кнопка неактивна
    apiService.fetchArticles()
        .then(f => {
            addPhotos(f)
            loadMoreBtn.enable() // после результата запроса кнопка снова активна
            Notify.success(`Everything works!`)
        }).catch(() => {
            Notify.failure(`We're sorry, but you've reached the end of search results.`)
        })
}

function addPhotos(hits) {
    refs.photosCard.insertAdjacentHTML('beforeend', photos(hits))
}

function clearPhotoCard() {
    refs.photosCard.innerHTML = '' // для очищения результата запроса на стр
}

