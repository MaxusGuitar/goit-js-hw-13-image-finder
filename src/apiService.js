import axios from "axios"

export default class ApiService {
    constructor() {
        this.querySearch = '' // главная переменная для поиска
        this.page = 1 // переменная для увелечения обьектов поиска на стр
    }

    async fetchArticles() {
        const BASE_URL = 'https://pixabay.com'
        const KEY = '24079663-849aadf309a059b421030ae2f'
        const getImage = await axios.get(`${BASE_URL}/api/?key=${KEY}&q=${this.querySearch}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`)
        this.plusPage()
        
        return getImage
    }

    plusPage() {
        this.page += 1 // увеличивает страницу с данными на 1 при нажатии на кнопку ЗАГРУЗИТЬ БОЛЬШЕ
    }

    resetPage() {
        this.page = 1 // для сброса стр при новом поиске
    }
    
    minusPage() {
        this.page -=1
    }
    
    get query() {
    return this.querySearch
    }
    
    set query(newQuery) {
        this.querySearch = newQuery // записывается в индекс
    }
}

