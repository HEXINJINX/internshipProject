import country from './country.js'
import getCountry from '../services/countryAPI.js'
import getNews from '../services/newsAPI.js'
import news from './news.js'
import getCategories from '../services/categoriesAPI.js'
import getExchangeRate from '../services/currencyAPI.js'

window.addEventListener('load', async (e) => {

    const newsClass = new news()
    const countryClass = new country()
    const selectedRegion = document.getElementById('region')
    let countryData =  JSON.parse(localStorage.getItem('countryData')) || {}
    const search = document.getElementById('search')
    const container = document.getElementById('container')
    const weatherButton = document.getElementById('weather')
    const info = document.getElementById('info')
    const list = document.getElementById('list')
    const newsButton = document.getElementById('news')
    const countryButton = document.getElementById('country')
    const exchangeButton = document.getElementById('exchange')


    if (Object.keys(countryData).length === 0) {
      countryData = await getCountry()
      localStorage.setItem('countryData', JSON.stringify(countryData))
    }
    console.log(countryData)
    countryClass.active(true, countryData)

    countryButton.checked = true
    countryClass.drawCards("")
    document.getElementById('nav').addEventListener('change', (e) => {
        if (e.target.id == 'country') {
            info.innerText = ''
            weatherButton.checked = false
            newsButton.checked = false
            countryClass.active(true, countryData)
            countryClass.drawCards("")
            console.log('drawn')
            container.classList.remove('news')
            let loading = document.getElementById('loadingMore')
            observer.unobserve(loading);


        } else if (e.target.id == 'weather') {
            info.innerText = ''
            list.innerText = ''
            newsButton.checked = false
            countryButton.checked = false
            exchangeButton.checked = false
            countryClass.active(false, countryData)
            container.classList.remove('news')
            let loading = document.getElementById('loadingMore')
            observer.unobserve(loading);


        } else if (e.target.id == 'news') {
            info.innerText = ''
            list.innerText = ''
            countryClass.active(true, countryData)
            countryClass.drawCards("")
            countryButton.checked = false
            weatherButton.checked = false
            exchangeButton.checked = false
            container.classList.add('news')
            let newsContainer = document.getElementById('newsContainer')

            if (!newsContainer) {
                newsContainer = document.createElement('div')
                newsContainer.id = 'newsContainer' 
                info.appendChild(newsContainer)
            }

            let loading = document.getElementById('loadingMore')

            if (!loading) {
                loading = document.createElement('div')
                loading.id = 'loadingMore' 
                info.appendChild(loading)
            }

            observer.observe(loading);


        } else if (e.target.id == 'exchange') {
            info.innerText = ''
            list.innerText = ''
            container.classList.remove('news')
            countryClass.active(false, countryData)
            countryButton.checked = false
            weatherButton.checked = false
            newsButton.checked = false
        }
    })

    searchInput.addEventListener('input', (e) => {
        if (countryButton.checked || newsButton.checked) {
            countryClass.drawCards(searchInput.value)
        } 
    })

    let countryGetNews = 'everything';
    let newsData;

    list.addEventListener('click', (e) => {
        if (e.target.classList.contains('card') && countryButton.checked) {
            const cardData = e.target.classList
            console.log(cardData)
            countryClass.displayInfo(cardData[1], cardData[2])
        } else if ((e.target.classList.contains('card') && newsButton.checked)) {
            if (e.target.classList.contains('searchInfo')) {
                countryGetNews = document.getElementById('searchInfo').textContent
            } else {
                countryGetNews = countryData[e.target.classList[1]].data.objects[e.target.classList[2]].names.common.toLowerCase()
            }
            document.getElementById('newsContainer').innerText = ''
        }
    })

    selectedRegion.addEventListener('change', (e) => {
        console.log('input')
        countryClass.drawCards(searchInput.value)
    })

    const target = document.getElementById('loadingMore');

    console.log(info)
    console.log(target)

    const options = {
      root: info,
      rootMargin: '0px',
      threshold: 0
    };

    const callback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {

                if (!(newsButton.checked)) return

                const loadNews = async () => {
                    try {
                        let categories = await getCategories()
                        const response = await getNews(countryGetNews, categories);
                        if (response.articles) {
                            newsData = response.articles
                        }

                        newsClass.drawCards(newsData);
                    } catch (error) {
                        console.error("Error fetching news:", error);
                    }
                }
                loadNews();
            }
        });
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(target);

})