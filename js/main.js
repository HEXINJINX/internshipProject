import country from './country.js'
import getCountry from '../services/countryAPI.js'
import getNews from '../services/newsAPI.js'
import news from './news.js'
import currency from './currency.js'
import getAlphacodes from './createAlpha_3Codes.js'
import getCurrencyCodes from './createCurrencyCodes.js'
import getExchangeRate from '../services/currencyAPI.js'
import getCategories from '../services/categoriesAPI.js'
import getLocation from '../services/getLocationAPI.js'
import getWeather from '../services/weatherAPI.js'
import weather from './weather.js'



window.addEventListener('load', async (e) => {
    const newsClass = new news()
    const countryClass = new country()
    const currencyClass = new currency()
    const weatherClass = new weather()
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
    const searchInput = document.getElementById('searchInput')
    let currencyCounter = 0
    let categories;
    const region = document.getElementById('region')

    if (Object.keys(countryData).length === 0) {
        countryData = await getCountry()
        localStorage.setItem('countryData', JSON.stringify(countryData))
    }
    
    let currencyRates = await getExchangeRate()
    let currencyCode = getCurrencyCodes()
    getAlphacodes()

    countryClass.active(true, countryData)

    document.querySelector('.theme').addEventListener('click', (e) => {
        const html = document.documentElement
        const currentTheme = html.getAttribute('data-theme')
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
        
        html.setAttribute('data-theme', newTheme)
    })

    countryButton.checked = true
    countryClass.drawCards("", list)
    document.getElementById('nav').addEventListener('change', async (e) => {
        if (e.target.id == 'country') {
            searchInput.value = ''
            info.innerText = ''
            weatherButton.checked = false
            exchangeButton.checked = false
            newsButton.checked = false
            countryClass.active(true, countryData)
            countryClass.drawCards("", list)
            container.classList.remove('news')
            region.style.display = 'flex'
            let searchDiv = document.getElementById('search')
            let options = document.getElementById('options')
            searchInput.placeholder = 'Search For Country'
        
            
        } else if (e.target.id == 'weather') {
            searchInput.value = ''
            info.innerText = ''
            list.innerText = ''
            newsButton.checked = false
            countryButton.checked = false
            exchangeButton.checked = false
            countryClass.active(false, countryData)
            container.classList.remove('news')
            region.style.display = 'none'
            let searchDiv = document.getElementById('search')
            let options = document.getElementById('options')

            let weatherDisplay = document.createElement('div')
            weatherDisplay.id = 'weatherDisplay'
            info.appendChild(weatherDisplay)
            searchInput.placeholder = 'Search For City'


        } else if (e.target.id == 'news') {
            searchInput.value = ''
            info.innerText = ''
            list.innerText = ''
            countryClass.active(true, countryData)
            countryClass.drawCards("", list)
            countryButton.checked = false
            weatherButton.checked = false
            exchangeButton.checked = false
            container.classList.add('news')
            region.style.display = 'flex'
            let searchDiv = document.getElementById('search')
            let options = document.getElementById('options')
            searchInput.placeholder = 'Search For Topic'


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
            searchInput.value = ''
            info.innerText = ''
            list.innerText = ''
            let searchDiv = document.getElementById('search')
            let options = document.getElementById('options')

            region.style.display = 'flex'
            let htmlString = `
                <div id="countryLists">
                    <div id="listOne">

                    </div>
                    <div id="listTwo">

                    </div>
                </div>`
            info.insertAdjacentHTML('beforeend', htmlString)
            const listOne = document.getElementById('listOne')
            const listTwo = document.getElementById('listTwo')
            container.classList.remove('news')
            countryClass.active(true, countryData)
            countryButton.checked = false
            weatherButton.checked = false
            newsButton.checked = false            
            
            currencyClass.drawField()
            
            await countryClass.drawCards(searchInput.value, listOne)
            await countryClass.drawCards(searchInput.value, listTwo)
            
            searchInput.placeholder = 'Search For Country/Currency'

        }
    })

    searchInput.addEventListener('change', (e) => {
        if ((newsButton.checked)) {
            let loading = document.getElementById('loadingMore')
            let newsContainer = document.getElementById('newsContainer') 
            newsContainer.innerHTML = ''
            newsContainer.appendChild(loading)
            categories = e.target.value
            observer.unobserve(loading)
            observer.observe(loading)
        }
            
    })

    info.addEventListener('click', async (e) => {
        if (e.target.parentElement.id == 'listOne') {
            let currentExchange = JSON.parse(sessionStorage.getItem('currentExchange')) || []
            let otherEmpty = false

            if (currentExchange.length == 0 || currentExchange[1] == '-') {
                otherEmpty = true
                currentExchange = ['-', '-', '-']
            }
            
            currentExchange[0] = countryData[e.target.classList[1]].data.objects[e.target.classList[2]].currencies[0].code

            if (!(otherEmpty)) {
                currentExchange[2] = currencyRates[currentExchange[1]] / currencyRates[currentExchange[0]]
            }

            sessionStorage.setItem('currentExchange', JSON.stringify(currentExchange))

            let exchangeFrom = document.getElementById('exchangeFrom')
            let exchangeTo = document.getElementById('exchangeTo')

            currencyClass.currencyField(exchangeFrom, exchangeTo, 'straight', currencyCode)
        } else if (e.target.parentElement.id == 'listTwo') {
            let currentExchange = JSON.parse(sessionStorage.getItem('currentExchange')) || []
            let otherEmpty = false

            if (currentExchange.length == 0 || currentExchange[0] == '-') {
                currentExchange = ['-', '-', '-']
                otherEmpty = true
            }

            currentExchange[1] = countryData[e.target.classList[1]].data.objects[e.target.classList[2]].currencies[0].code

            if (!(otherEmpty)) {
                currentExchange[2] = currencyRates[currentExchange[1]] / currencyRates[currentExchange[0]]
            }

            sessionStorage.setItem('currentExchange', JSON.stringify(currentExchange))

            let exchangeFrom = document.getElementById('exchangeFrom')
            let exchangeTo = document.getElementById('exchangeTo')

            currencyClass.currencyField(exchangeFrom, exchangeTo, 'straight', currencyCode)
        }  else if (e.target.classList.contains('weatherCard')) {
            weatherClass.displayForcastDetails(e.target.id)
        } else if (e.target.classList.contains('weatherImg')) {
            weatherClass.displayForcastDetails(e.target.parentNode.id)

        }
    })

    search.addEventListener('click', async (e) => {
        if ((e.target.classList.contains('optionCard'))) {
            let searchDiv = document.getElementById('search')
            let options = document.getElementById('options')
            options.innerText = ''
            
            let cardData = String(e.target.id).split('|')
            let n = cardData.length

            let weatherData = await getWeather(cardData[n - 2], cardData[n - 1])
            weatherClass.drawWeatherCards(weatherData)
        }
    })

    list.addEventListener('input', (e) => {
        if (e.target.id == 'exchangeFrom') {
            let exchangeFrom = document.getElementById('exchangeFrom')
            let exchangeTo = document.getElementById('exchangeTo')
            currencyClass.currencyField(exchangeFrom, exchangeTo, 'straight', currencyCode)
        } else if (e.target.id == 'exchangeTo') {
            let exchangeFrom = document.getElementById('exchangeFrom')
            let exchangeTo = document.getElementById('exchangeTo')
            currencyClass.currencyField(exchangeTo, exchangeFrom, 'reverse', currencyCode)
        }
    })

    

    searchInput.addEventListener('input', async (e) => {
        if (countryButton.checked) {
            countryClass.drawCards(searchInput.value, list)
        } else if (exchangeButton.checked) {
            let listOne = document.getElementById('listOne')
            let listTwo = document.getElementById('listTwo')

            countryClass.drawCards(searchInput.value, listOne)
            countryClass.drawCards(searchInput.value, listTwo)
        } else if (weatherButton.checked) {
            let searchDiv = document.getElementById('search')
            let options = document.getElementById('options')
            let locations = await getLocation(e.target.value)
            if (!locations) {
                options.innerHTML = ''
                return
            }

            options.innerHTML = ''
            for (const location in locations) {
                let option = document.createElement('li')
                option.classList.add('optionCard')
                option.id = locations[location]
                option.innerText = location

                options.appendChild(option)
            }

        }
    })
    

    let countryGetNews = 'everything';
    let newsData;

    list.addEventListener('click', (e) => {
        if (e.target.classList.contains('card') && countryButton.checked) {
            const cardData = e.target.classList
            countryClass.displayInfo(cardData[1], cardData[2])
        } else if (e.target.id == 'switch') {
            let rateList = JSON.parse(sessionStorage.getItem('currentExchange'))
            rateList = [rateList[1], rateList[0], rateList[2]**-1]

            sessionStorage.setItem('currentExchange', JSON.stringify(rateList))
            let exchangeFrom = document.getElementById('exchangeFrom')
            let exchangeTo = document.getElementById('exchangeTo')

            currencyClass.currencyField(exchangeFrom, exchangeTo, 'straight', currencyCode)
        }
    })

    selectedRegion.addEventListener('change', (e) => {
        if (countryButton.checked || newsButton.checked){
            countryClass.drawCards(searchInput.value, list)
        } else if (exchangeButton.checked) {
            let listOne = document.getElementById('listOne')
            let listTwo = document.getElementById('listTwo')

            countryClass.drawCards(searchInput.value, listOne)
            countryClass.drawCards(searchInput.value, listTwo)
        }
        
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
                loadNews();                
            }
        });
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(target);

    window.addEventListener('error', (e) => {
        let notification = document.getElementById('notification')
        let htmlString = `<div class="notiCard">
            Error: ${e.message}
        </div>`

        notification.insertAdjacentHTML('afterbegin', htmlString)
            
    })

    window.addEventListener('operationSuccess', (e) => {
        let notification = document.getElementById('notification')
        let htmlString = `<div class="notiCard">
            Success: ${e.message}
        </div>`

        notification.insertAdjacentHTML('afterbegin', htmlString)
        
    })
})