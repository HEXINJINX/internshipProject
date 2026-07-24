export default class currency {
    requiredInfo(currencyRates, currencyCodes) {
        this.currencyRates = currencyRates
        this.currencyCodes = currencyCodes
    }

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

    currencyField(exchangeFrom, exchangeTo, operation) {
        let ratesInfo = JSON.parse(sessionStorage.getItem('currentExchange'))
        let codeFrom = document.getElementById('codeFrom')
        let codeTo = document.getElementById('codeTo')
        let symbolInfo1 = this.currencyCodes[ratesInfo[0]].split('|')
        let symbolInfo2 = this.currencyCodes[ratesInfo[1]].split('|')
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
}