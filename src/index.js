import './sass/main.scss';

const refs = {
    searchform: document.querySelector('.search')
}

refs.searchform.addEventListener('submit', onSearch)
function onSearch(e) {
    e.preventDefault()

    const querySearch = e.currentTarget.elements.query.value

    fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${querySearch}&page=1&per_page=12&key=24079663-849aadf309a059b421030ae2f`)
    .then(a => a.json())
    .then(console.log)
}

