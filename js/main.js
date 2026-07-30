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
    const container = document.getElementById('container')
    const weatherButton = document.getElementById('weather')
    const newsButton = document.getElementById('news')
    const dashboardButton = document.getElementById('dashboard')
    const countryButton = document.getElementById('country')
    const exchangeButton = document.getElementById('exchange')
    const searchInput = document.getElementById('searchInput')
    let currencyCounter = 0
    let categories = await getCategories()
    const region = document.getElementById('region')
    let dailyCards = document.querySelector('.dailyWeather')
    let newsViewMore = document.querySelector('.viewMore')
    let cancelExternalView = document.getElementById('cancelView')
    let externalView = document.getElementById('externalView')
    let target;
    let newsList
    let newsData
    let searchCurrency = document.getElementById('searchCurrency')
    let exchangeNumber = document.getElementById('exchangeNumber')
    let main = document.getElementById('region')
    let searchDiv = document.getElementById('search')
    let optionContainer = document.getElementById('options')

    window.addEventListener('click', (e) => {
        if (e.target.closest('#search')) {
            return
        }
        optionContainer.innerHTML = ''
    })


    if (Object.keys(countryData).length === 0) {
        countryData = await getCountry()
        localStorage.setItem('countryData', JSON.stringify(countryData))
    }
    
    let currencyRates = await getExchangeRate()
    let currencyCode = getCurrencyCodes()
    getAlphacodes()

    countryClass.active(true, countryData)

    let theme = JSON.parse(localStorage.getItem('theme'))
    if (theme) {
        let html = document.documentElement
        html.setAttribute('data-theme', theme)
    }

    document.querySelector('.theme').addEventListener('click', (e) => {
        let html = document.documentElement
        const currentTheme = html.getAttribute('data-theme')
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
        
        html.setAttribute('data-theme', newTheme)
        localStorage.setItem('theme', JSON.stringify(newTheme))
    })

    function dailyCardFunc(e) {
        let weatherDisplay = document.querySelector('.currentWeatherDisplay')
        let card = e.target.closest('.dailyWeatherCard')
        let cardId = card.id
        let cardData = cardId.split('|')
        let htmlString = `
            <img src="https://openweathermap.org/payload/api/media/file/${cardData[0]}.png" alt="">
            <div class="currentWeatherValues">
                <h2>${Number(cardData[4]).toFixed(0)}°C</h2>
                <p>${cardData[5]}</p>
            </div>
            <span>
                <p>Humidity: ${Number(cardData[1]).toFixed(0)}%</p>
                <p>WindSpeed: ${Number(cardData[2]).toFixed(0)}m/s</p>
                <p>FeelsLike: ${Number(cardData[3]).toFixed(0)}°C</p>
            </span>`

        weatherDisplay.innerText = ''
        weatherDisplay.insertAdjacentHTML('beforeend', htmlString)

        let active = document.querySelector('.active')
        active.classList.remove('active')

        card.classList.add('active')
    }

    externalView.addEventListener('click', (e) => {
        let card = e.target.closest('.newsCard')
        if (card.classList.contains('newsCard')) {
            let dataStore = decodeURIComponent(atob(String(card.id)))
            let displayData = JSON.parse(dataStore)
            newsClass.displayFullNews(displayData)
        }
    })

    newsViewMore.addEventListener('click', (e) => {
        externalView.classList.add('fullView')
        let currentNewsViewing = document.createElement('div')
        currentNewsViewing.classList.add('currentNewsViewing')

        newsList = document.createElement('div')
        newsList.classList.add('newsList')

        let viewingArea = document.getElementById('viewingArea')

        viewingArea.appendChild(currentNewsViewing)
        viewingArea.appendChild(newsList)

        target = document.createElement('div')
        target.id = 'loadingMore'

        newsList.appendChild(target)
        observer.observe(target)
    })

    document.getElementById('viewAllExchange').addEventListener('click', async (e) => {
        externalView.classList.add('fullView')
        let viewArea = document.getElementById('viewingArea')

        let currentMain = JSON.parse(localStorage.getItem('currentExchange'))

        if (!currentMain) {
            currentMain = USD
            localStorage.setItem('currentExchange', JSON.stringify(currentMain))
        }

        let htmlContainer = []
        htmlContainer.push('<section><select id="region">')

        for (const currency of Object.keys(currencyCode)) {
            let leadingHTML = `
                <option value="${currency.split('|')[0]}">${currency.split('|')[0]}</option>`
            if (htmlContainer.includes(leadingHTML)) {
                continue
            }
            htmlContainer.push(leadingHTML)
        }

        htmlContainer.push('</select></section>')
        let finalString = htmlContainer.join('')

        let htmlString = `
            <div id="currencyArea">
                <div class="inputArea">
                    <input type="text" name="" id="searchCurrency" class="currencyInputs">
                    <input type="number" name="" id="exchangeNumber" class="currencyInputs" value="1">
                </div>
                <div>
                    Current Exchange: ${finalString}
                </div>
                <div class="currencyList">
                </div>
            </div>`
        viewArea.innerHTML = ''
        viewArea.insertAdjacentHTML('beforeend', htmlString)
        
        currencyClass.drawCurrencyExchange(currencyCode, currencyRates)
        searchCurrency = document.getElementById('searchCurrency')
        exchangeNumber = document.getElementById('exchangeNumber')
        main = document.getElementById('region')

        main.addEventListener('change', listenInputExchange)
        searchCurrency.addEventListener('input', listenInputExchange)
        exchangeNumber.addEventListener('input', listenInputExchange)
    })

    function listenInputExchange(e){
        let newCodes = {}
        for (const currencyName of Object.keys(currencyCode)) {
            if (currencyName.toLowerCase().includes(searchCurrency.value.toLowerCase())) {
                newCodes[currencyName] = currencyCode[currencyName]
            }
        }

        currencyClass.drawCurrencyExchange(newCodes, currencyRates, exchangeNumber.value)
    }

    cancelExternalView.addEventListener('click', (e) => {
        let viewingArea = document.getElementById('viewingArea')
        viewingArea.innerHTML = ''
        externalView.classList.remove('fullView')
        observer.unobserve(target)
    })




    let amountOfCountries = 0
    for (const region of Object.values(countryData)) {
        amountOfCountries += Object.values(region.data.objects).length
    }

    let countryDisplay = document.querySelector('.countryDisplay')
    countryDisplay.innerText = amountOfCountries

    let response = await getNews(categories);
    let newNewsData = response
    
    newsClass.drawDashboardCards(newNewsData);

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

    //info.addEventListener('click', async (e) => {
    //    if (e.target.parentElement.id == 'listOne') {
    //        let currentExchange = JSON.parse(sessionStorage.getItem('currentExchange')) || []
    //        let otherEmpty = false
//
    //        if (currentExchange.length == 0 || currentExchange[1] == '-') {
    //            otherEmpty = true
    //            currentExchange = ['-', '-', '-']
    //        }
    //        
    //        currentExchange[0] = countryData[e.target.classList[1]].data.objects[e.target.classList[2]].currencies[0].code
//
    //        if (!(otherEmpty)) {
    //            currentExchange[2] = currencyRates[currentExchange[1]] / currencyRates[currentExchange[0]]
    //        }
//
    //        sessionStorage.setItem('currentExchange', JSON.stringify(currentExchange))
//
    //        let exchangeFrom = document.getElementById('exchangeFrom')
    //        let exchangeTo = document.getElementById('exchangeTo')
//
    //        currencyClass.currencyField(exchangeFrom, exchangeTo, 'straight', currencyCode)
    //    } else if (e.target.parentElement.id == 'listTwo') {
    //        let currentExchange = JSON.parse(sessionStorage.getItem('currentExchange')) || []
    //        let otherEmpty = false
//
    //        if (currentExchange.length == 0 || currentExchange[0] == '-') {
    //            currentExchange = ['-', '-', '-']
    //            otherEmpty = true
    //        }
//
    //        currentExchange[1] = countryData[e.target.classList[1]].data.objects[e.target.classList[2]].currencies[0].code
//
    //        if (!(otherEmpty)) {
    //            currentExchange[2] = currencyRates[currentExchange[1]] / currencyRates[currentExchange[0]]
    //        }
//
    //        sessionStorage.setItem('currentExchange', JSON.stringify(currentExchange))
//
    //        let exchangeFrom = document.getElementById('exchangeFrom')
    //        let exchangeTo = document.getElementById('exchangeTo')
//
    //        currencyClass.currencyField(exchangeFrom, exchangeTo, 'straight', currencyCode)
    //    }  else if (e.target.classList.contains('weatherCard')) {
    //        weatherClass.displayForcastDetails(e.target.id)
    //    } else if (e.target.classList.contains('weatherImg')) {
    //        weatherClass.displayForcastDetails(e.target.parentNode.id)
//
    //    }
    //})

    search.addEventListener('click', async (e) => {
        if ((e.target.classList.contains('optionCard'))) {
            searchDiv = document.getElementById('search')
            optionContainer = document.getElementById('options')
            optionContainer.innerText = ''
            
            let cardData = String(e.target.id).split('|')
            let place = e.target.textContent.split('|')
            let code = Object.keys(currencyCode).find((key) => key.split('|')[1].toLowerCase().replace(' ', '') == place[1].replace(' ', '').toLowerCase())
            let n = cardData.length
            let dataPosition = currencyCode[code].split('|')
            let weatherData = await getWeather(cardData[n - 2], cardData[n - 1])


            weatherClass.drawDashboardForcast(place, weatherData)
            dailyCards = document.querySelector('.dailyWeather')
            dailyCards.removeEventListener('click', dailyCardFunc)
            dailyCards.addEventListener('click', dailyCardFunc)
            currencyClass.drawDashboardCurrencyExchange(countryData, currencyCode, code)
            countryClass.displayInfo(dataPosition[0], dataPosition[1])
        }
    })

    //list.addEventListener('input', (e) => {
    //    if (e.target.id == 'exchangeFrom') {
    //        let exchangeFrom = document.getElementById('exchangeFrom')
    //        let exchangeTo = document.getElementById('exchangeTo')
    //        currencyClass.currencyField(exchangeFrom, exchangeTo, 'straight', currencyCode)
    //    } else if (e.target.id == 'exchangeTo') {
    //        let exchangeFrom = document.getElementById('exchangeFrom')
    //        let exchangeTo = document.getElementById('exchangeTo')
    //        currencyClass.currencyField(exchangeTo, exchangeFrom, 'reverse', currencyCode)
    //    }
    //})
//
    

    searchInput.addEventListener('input', async (e) => {
        
            let locations = await getLocation(e.target.value.replace(' ', ''))
            optionContainer.innerHTML = ''
            if (e.target.value.length < 3) {
                return
            }
            

            let countries = {}

            for (const region of Object.values(countryData)) {
                for (const country of region.data.objects) {
                    let countryLocataion = `${country.subregion}|${country.names.common}`
                    if (!(String(countryLocataion.toLowerCase()).includes(e.target.value.toLowerCase()))) {
                        continue
                    }
                    countries[countryLocataion] = Object.values(country.coordinates)
                }
            }

            let searchLocations = [...Object.keys(countries), ...Object.keys(locations)]
            for (const location of searchLocations) {
                let option = document.createElement('li')
                option.classList.add('optionCard')
                let verifiedId = locations[location] 
                if (!(verifiedId)) {
                    option.id = countries[location].join('|')
                } else {
                    option.id = verifiedId
                }
                option.innerText = location

                optionContainer.appendChild(option)
            }

    })
    

    let countryGetNews = 'everything';

    //list.addEventListener('click', (e) => {
    //    if (e.target.classList.contains('card') && countryButton.checked) {
    //        const cardData = e.target.classList
    //        countryClass.displayInfo(cardData[1], cardData[2])
    //    } else if (e.target.id == 'switch') {
    //        let rateList = JSON.parse(sessionStorage.getItem('currentExchange'))
    //        rateList = [rateList[1], rateList[0], rateList[2]**-1]
//
    //        sessionStorage.setItem('currentExchange', JSON.stringify(rateList))
    //        let exchangeFrom = document.getElementById('exchangeFrom')
    //        let exchangeTo = document.getElementById('exchangeTo')
//
    //        currencyClass.currencyField(exchangeFrom, exchangeTo, 'straight', currencyCode)
    //    }
    //})

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


    const options = {
      root: newsList,
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
//
    const observer = new IntersectionObserver(callback, options);

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