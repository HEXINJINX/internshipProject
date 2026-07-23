import country from './country.js'
import getCountry from '../services/countryAPI.js'
import getNews from '../services/newsAPI.js'
import news from './news.js'
import currency from './currency.js'
import getAlphacodes from './createAlpha_3Codes.js'
import getCurrencyCodes from './createCurrencyCodes.js'
import getExchangeRate from '../services/currencyAPI.js'
import getCategories from '../services/categoriesAPI.js'


window.addEventListener('load', async (e) => {

    const newsClass = new news()
    const countryClass = new country()
    const currencyClass = new currency()
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
    let currencyCounter = 0
    let categories;

    if (Object.keys(countryData).length === 0) {
        countryData = await getCountry()
        localStorage.setItem('countryData', JSON.stringify(countryData))
        getAlphacodes()
    }
    countryClass.active(true, countryData)

    countryButton.checked = true
    countryClass.drawCards("")
    document.getElementById('nav').addEventListener('change', async (e) => {
        if (e.target.id == 'country') {
            info.innerText = ''
            weatherButton.checked = false
            exchangeButton.checked = false
            newsButton.checked = false
            countryClass.active(true, countryData)
            countryClass.drawCards("")
            container.classList.remove('news')
            
        } else if (e.target.id == 'weather') {
            info.innerText = ''
            list.innerText = ''
            newsButton.checked = false
            countryButton.checked = false
            exchangeButton.checked = false
            countryClass.active(false, countryData)
            container.classList.remove('news')
            


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
            newsContainer = document.getElementById('newsContainer')

            if (!loading) {
                loading = document.createElement('div')
                loading.id = 'loadingMore' 
                loading.innerText = '-----Loading-----'
                loading.style.width = '100%'
                loading.style.textAlign = 'center'
                newsContainer.appendChild(loading)
            }

            categories = await getCategories()

            observer.observe(loading);


        } else if (e.target.id == 'exchange') {
            info.innerText = ''
            list.innerText = ''
            container.classList.remove('news')
            countryClass.active(false, countryData)
            countryButton.checked = false
            weatherButton.checked = false
            newsButton.checked = false
            let ratesContainer = document.createElement('div')
            ratesContainer.id = 'ratesContainer'

            info.appendChild(ratesContainer)

            ratesContainer = document.getElementById('ratesContainer')

            let relativeRates = document.createElement('div')
            relativeRates.id = 'relativeRates'

            ratesContainer.appendChild(relativeRates)

            let loading = document.createElement('div')
            relativeRates
            loading.id = 'loadingMore' 
            loading.innerText = '-----Loading-----'
            loading.style.width = '100%'
            loading.style.textAlign = 'center'
            relativeRates.appendChild(loading)

            let currencyRates = await getExchangeRate()
            let currencyCode = getCurrencyCodes()

            currencyClass.requiredInfo(currencyRates, currencyCode)
            currencyClass.drawCurrencyLists()

            observer.observe(loading);



        }
    })

    searchInput.addEventListener('input', (e) => {
        if (countryButton.checked || newsButton.checked) {
            countryClass.drawCards(searchInput.value)
        } else if (exchangeButton.checked) {
            relativeRates.innerText = ''
            currencyClass.drawCurrencyLists(searchInput.value)

        } 
    })
    

    let countryGetNews = 'everything';
    let newsData;

    list.addEventListener('click', (e) => {
        if (e.target.classList.contains('card') && countryButton.checked) {
            const cardData = e.target.classList
            countryClass.displayInfo(cardData[1], cardData[2])
        } else if ((e.target.classList.contains('card') && newsButton.checked)) {
            let loading = document.getElementById('loadingMore')
            let newsContainer = document.getElementById('newsContainer') 
            newsContainer.innerHTML = ''
            newsContainer.appendChild(loading)
            if (e.target.classList.contains('searchInfo')) {
                categories = (e.target.textContent).replace('‎ Search For: ', '').replace(' ', '')
                observer.unobserve(loading)
                observer.observe(loading)
            } else {
                categories = countryData[e.target.classList[1]].data.objects[e.target.classList[2]].names.common.toLowerCase().replace(' ', '')
                observer.unobserve(loading)
                observer.observe(loading)
            }
        }
    })

    selectedRegion.addEventListener('change', (e) => {
        countryClass.drawCards(searchInput.value)
    })

    const target = document.getElementById('loadingMore');


    const options = {
      root: info,
      rootMargin: '200px',
      threshold: 0
    };

    const callback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {

                const loadNews = async () => {
                    try {
                        const response = await getNews(categories);
                        if (response) {
                            newsData = response
                        }


                        newsClass.drawCards(newsData);
                    } catch (error) {
                        console.error("Error fetching news:", error);
                    }
                }

                if (exchangeButton.checked) {
                    currencyClass.drawCurrencyLists()
                } else {
                    loadNews();
                }

                
            }
        });
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(target);

})