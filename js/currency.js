export default class currency {

    deleteOutOfView(parent) {
        let parentRect = parent.getBoundingClientRect()
        let children = parent.children
        let buffer = 700
        

        for (let i = (children.length - 1); i >= 0; i--) {
            const child = children[i]
            const rect = child.getBoundingClientRect()
            const outOfView = rect.bottom < parentRect.top - buffer || rect.top > parentRect.bottom + buffer || rect.right < parentRect.left - buffer || rect.left > parentRect.right + buffer

            if (outOfView) {
                parent.removeChild(child)
            }
        }
    }

    constructor() {
        this.mostTraded = ['USD', 'EUR', 'JPY', 'GBP', 'AUD', 'CAD', 'CHF', 'CNY', 'HKD', 'NZD', 'GHS', 'NGN'];
        this.offset = 0
    }

    drawDashboardCurrencyExchange(country, codes, currency) {
        let ratesInfo = JSON.parse(localStorage.getItem('exchangeRates'))[1]
        let rates = document.querySelector('.rates')

        let htmlString = `
                <div class="ratesCard">
                    <span class="rateOrigin">
                        ${this.mostTraded[0]} / ${String(currency).split('|')[0]}
                    </span>
                    <span class="ratesValue">
                        ${country[codes[Object.keys(codes).find((key) => key.includes(currency.split('|')[0]))].split('|')[0]].data.objects[codes[Object.keys(codes).find((key) => key.includes(currency.split('|')[0]))].split('|')[1]].currencies[0].symbol}${Number(ratesInfo[String(currency).split('|')[0]] / ratesInfo[this.mostTraded[0]]).toFixed(2)}
                    </span>
                </div>
                <div class="ratesCard">
                    <span class="rateOrigin">
                        ${this.mostTraded[1]} / ${String(currency).split('|')[0]}
                    </span>
                    <span class="ratesValue">
                        ${country[codes[Object.keys(codes).find((key) => key.includes(currency.split('|')[0]))].split('|')[0]].data.objects[codes[Object.keys(codes).find((key) => key.includes(currency.split('|')[0]))].split('|')[1]].currencies[0].symbol}${Number(ratesInfo[String(currency).split('|')[0]] / ratesInfo[this.mostTraded[1]]).toFixed(2)}
                    </span>
                </div>
                <div class="ratesCard">
                    <span class="rateOrigin">
                        ${this.mostTraded[2]} / ${String(currency).split('|')[0]}
                    </span>
                    <span class="ratesValue">
                        ${country[codes[Object.keys(codes).find((key) => key.includes(currency.split('|')[0]))].split('|')[0]].data.objects[codes[Object.keys(codes).find((key) => key.includes(currency.split('|')[0]))].split('|')[1]].currencies[0].symbol}${Number(ratesInfo[String(currency).split('|')[0]] / ratesInfo[this.mostTraded[2]]).toFixed(2)}
                    </span>
                </div>
                <div class="ratesCard">
                    <span class="rateOrigin">
                        ${this.mostTraded[3]} / ${String(currency).split('|')[0]}
                    </span>
                    <span class="ratesValue">
                        ${country[codes[Object.keys(codes).find((key) => key.includes(currency.split('|')[0]))].split('|')[0]].data.objects[codes[Object.keys(codes).find((key) => key.includes(currency.split('|')[0]))].split('|')[1]].currencies[0].symbol}${Number(ratesInfo[String(currency).split('|')[0]] / ratesInfo[this.mostTraded[3]]).toFixed(2)}
                    </span>
                </div>
                <div class="ratesCard">
                    <span class="rateOrigin">
                        ${this.mostTraded[4]} / ${String(currency).split('|')[0]}
                    </span>
                    <span class="ratesValue">
                        ${country[codes[Object.keys(codes).find((key) => key.includes(currency.split('|')[0]))].split('|')[0]].data.objects[codes[Object.keys(codes).find((key) => key.includes(currency.split('|')[0]))].split('|')[1]].currencies[0].symbol}${Number(ratesInfo[String(currency).split('|')[0]] / ratesInfo[this.mostTraded[4]]).toFixed(2)}
                    </span>
                </div>
                `

                rates.innerHTML = ''
                rates.insertAdjacentHTML('beforeend', htmlString)
                localStorage.setItem('currentExchange', JSON.stringify(String(currency).split('|')[0]))
    }

    currencyField(exchangeFrom, exchangeTo, operation, currencyCodes) {
        
        let ratesInfo = JSON.parse(sessionStorage.getItem('currentExchange'))
        let codeFrom = document.getElementById('codeFrom')
        let codeTo = document.getElementById('codeTo')
        let symbolInfo1 = currencyCodes[ratesInfo[0]].split('|')
        let symbolInfo2 = currencyCodes[ratesInfo[1]].split('|')
        let fromSymbol = document.getElementById('fromSymbol')
        let toSymbol = document.getElementById('toSymbol')
        let countries = JSON.parse(localStorage.getItem('countryData'))

        codeFrom.innerText = ratesInfo[0]
        codeTo.innerText = ratesInfo[1]

        if (operation == 'straight') {
            exchangeTo.value = Number(exchangeFrom.value) * ratesInfo[2]
        } else if (operation == 'reverse') {
            exchangeTo.value = Number(exchangeFrom.value) / ratesInfo[2]
        }

        

        fromSymbol.innerText = countries[symbolInfo1[0]].data.objects[symbolInfo1[1]].currencies[0].symbol
        toSymbol.innerText = countries[symbolInfo2[0]].data.objects[symbolInfo2[1]].currencies[0].symbol
    }

    drawField() {
        document.getElementById('list').innerHTML = `
            <div class="exchangeContainer">
                <span class="from">
                    <span class="currencyCode">
                        <h1 id="codeFrom">
                            NONE
                        </h1>
                    </span>
                    <input type="number" name="" id="exchangeFrom">
                    <h1 id="fromSymbol"></h1>
                </span>
                <svg id="switch" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M8.70711 4.70711C9.09763 4.31658 9.09763 3.68342 8.70711 3.29289C8.31658 2.90237 7.68342 2.90237 7.29289 3.29289L3.29289 7.29289C2.90237 7.68342 2.90237 8.31658 3.29289 8.70711L7.29289 12.7071C7.68342 13.0976 8.31658 13.0976 8.70711 12.7071C9.09763 12.3166 9.09763 11.6834 8.70711 11.2929L6.41421 9H16C16.5523 9 17 8.55228 17 8C17 7.44772 16.5523 7 16 7H6.41421L8.70711 4.70711ZM20.7071 15.2929L16.7071 11.2929C16.3166 10.9024 15.6834 10.9024 15.2929 11.2929C14.9024 11.6834 14.9024 12.3166 15.2929 12.7071L17.5858 15H8C7.44772 15 7 15.4477 7 16C7 16.5523 7.44772 17 8 17H17.5858L15.2929 19.2929C14.9024 19.6834 14.9024 20.3166 15.2929 20.7071C15.6834 21.0976 16.3166 21.0976 16.7071 20.7071L20.7071 16.7071C21.0976 16.3166 21.0976 15.6834 20.7071 15.2929Z" fill="#000000"></path> </g></svg>
                <span class="to">
                    <span class="currencyCode">
                        <h1 id="codeTo">
                            NONE
                        </h1>
                    </span>
                    <input type="number" name="" id="exchangeTo">
                    <h1 id="toSymbol"></h1>
                </span>
            </div>`
    }

    drawCurrencyExchange(codes, rates, value) {
        let main = document.getElementById('region').value
        let currencyList = document.querySelector('.currencyList')

        let htmlContainer = []
        htmlContainer.push(`
            <div class="currencyRow rowHeader">
                <h3>Currency</h3>
                <h3>Rate</h3>
                <h3>Inverse</h3>
                <h3>Amount</h3>
            </div>
        `)

        let mainValue;

        if (!value) {
            mainValue = 1
        } else {
            mainValue = value
        }

        for (const currency in codes) {
            console.log(Number(value))
            let htmlString = `
            <div class="currencyRow">
                <h3>${currency.split('|')[0]}</h3>
                <h3>${(rates[currency.split('|')[0]] / rates[main]).toFixed(2)}</h3>
                <h3>${(rates[main] / rates[currency.split('|')[0]]).toFixed(2)}</h3>
                <h3>${Number((rates[currency.split('|')[0]] / rates[main]).toFixed(2)) * Number(mainValue)}</h3>
            </div>`

            if (htmlContainer.includes(htmlString)) {
                continue
            }

            htmlContainer.push(htmlString)

        }
        let finalString = htmlContainer.join('')
        currencyList.innerHTML = ''
        currencyList.insertAdjacentHTML('beforeend', finalString)

    }
}