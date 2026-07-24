//import country from './country.js'
import getCountry from '../services/countryAPI.js'
import getNews from '../services/newsAPI.js'
import news from './news.js'
import currency from './currency.js'
import getAlphacodes from './createAlpha_3Codes.js'
import getCurrencyCodes from './createCurrencyCodes.js'
import getExchangeRate from '../services/currencyAPI.js'
import getCategories from '../services/categoriesAPI.js'
import getLocation from '../services/getLocationAPI.js'



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
    const region = document.getElementById('region')

    if (Object.keys(countryData).length === 0) {
        countryData = await getCountry()
        localStorage.setItem('countryData', JSON.stringify(countryData))
    }
    
    let currencyRates = await getExchangeRate()
    let currencyCode = getCurrencyCodes()
    getAlphacodes()

    countryClass.active(true, countryData)

    countryButton.checked = true
    countryClass.drawCards("", list)
    document.getElementById('nav').addEventListener('change', async (e) => {
        if (e.target.id == 'country') {
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

            if ((options)) {
                searchDiv.removeChild(options)
            }
            
            
        } else if (e.target.id == 'weather') {
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

            if ((options)) {
                searchDiv.removeChild(options)
            }
            
            


        } else if (e.target.id == 'news') {
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

            if (options) {
                searchDiv.removeChild(options)
            }
            
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
            let searchDiv = document.getElementById('search')
            let options = document.getElementById('options')

            if ((options)) {
                searchDiv.removeChild(options)
            }
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

            currencyClass.requiredInfo(currencyRates, currencyCode)
            currencyClass.drawField()
            
            await countryClass.drawCards(searchInput.value, listOne)
            await countryClass.drawCards(searchInput.value, listTwo)
            
        }
    })

    info.addEventListener('click', (e) => {
        if (e.target.parentElement.id == 'listOne') {
            let currentExchange = JSON.parse(sessionStorage.getItem('currentExchange')) || []
            let otherEmpty = false

            if (currentExchange.length == 0 || currentExchange[0] == '-') {
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

            currencyClass.currencyField(exchangeFrom, exchangeTo, 'straight')
        } else if (e.target.parentElement.id == 'listTwo') {
            let currentExchange = JSON.parse(sessionStorage.getItem('currentExchange')) || []
            let otherEmpty = false

            if (currentExchange.length == 0 || currentExchange[1] == '-') {
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

            currencyClass.currencyField(exchangeFrom, exchangeTo, 'straight')

            
        }
    })

    list.addEventListener('input', (e) => {
        if (e.target.id == 'exchangeFrom') {
            let exchangeFrom = document.getElementById('exchangeFrom')
            let exchangeTo = document.getElementById('exchangeTo')
            currencyClass.currencyField(exchangeFrom, exchangeTo, 'straight')
        } else if (e.target.id == 'exchangeTo') {
            let exchangeFrom = document.getElementById('exchangeFrom')
            let exchangeTo = document.getElementById('exchangeTo')
            currencyClass.currencyField(exchangeTo, exchangeFrom, 'reverse')
        }
    })

    

    searchInput.addEventListener('input', async (e) => {
        if (countryButton.checked || newsButton.checked) {
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
            while (Array.from(searchDiv.children).some(child => child.id == 'options')) {
                searchDiv.removeChild(options)
            }

            if (!locations) {
                return
            }
            

            options = document.createElement('div')
            options.id = 'options'

            searchDiv.appendChild(options)

            
            
            
            for (const location in locations) {
                
                let option = document.createElement('div')
                option.classList.add('optionCard')
                option.id = locations[location]
                option.innerText = location

                options.appendChild(option)
            }

            searchDiv.appendChild(options)
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

})