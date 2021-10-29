export default class ApiService {
    constructor() {
        this.querySearch = '' // главная переменная для поиска
        this.page = 1 // переменная для увелечения обьектов поиска на стр
    }

    fetchArticles() {
        
        return fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.querySearch}
        &page=${this.page}&per_page=12&key=24079663-849aadf309a059b421030ae2f`)
        .then(a => a.json())
        .then(n => { 
            this.plusPage()
            return n.hits
                    })
    }

    plusPage() {
        this.page += 1 // увеличивает страницу с данными на 1 при нажатии на кнопку ЗАГРУЗИТЬ БОЛЬШЕ
    }

    resetPage() {
        this.page = 1 // для сброса стр при новом поиске
    }
    
    get query() {
    return this.querySearch
    }
    
    set query(newQuery) {
        this.querySearch = newQuery // записывается в индекс
    }
}

