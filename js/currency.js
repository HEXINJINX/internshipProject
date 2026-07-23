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

    
    
    drawCurrencyLists(search = "") {
        let htmlContainer = []
        let finalList = [this.mostTraded, Object.keys(this.currencyCodes)]
        let listUsed;
        
        for (let i = ((12 * (1 + this.offset)) - 1); i >= (12 * this.offset); i--) {
            if ((12 * (1 + this.offset)) > 144) {
                listUsed = finalList[1]
            } else {
                listUsed = finalList[0]
            }
            let exchangeFrom = listUsed[i % (listUsed.length + 1)]
            let exchangeTo = listUsed[Math.floor((1/(listUsed.length + 1)) * i)]
            let exchangeRate = (this.currencyRates[listUsed[Math.floor((1/(listUsed.length + 1)) * i)]] / this.currencyRates[listUsed[i % (listUsed.length + 1)]]).toFixed(5)

            if (!(exchangeFrom) || !(exchangeTo) || !(exchangeRate)) continue;
            
            let htmlString = `
                <div class="ratesCard">
                    <div class="currencyExchangeCodes">
                        <h1>${exchangeFrom} / ${exchangeTo}</h1>
                    </div>
                    <div class="currencyExchangeRates">
                        ${exchangeRate}
                    </div>
                </div>`
            
            htmlContainer.push(htmlString)
        }

        let finalString = htmlContainer.join('')
        let relativeRates = document.getElementById('relativeRates')
        let loading = document.getElementById('loadingMore')
        relativeRates.removeChild(loading)
        this.deleteOutOfView(relativeRates)
        relativeRates.insertAdjacentHTML('beforeend', finalString)
        relativeRates.appendChild(loading)
        this.offset++
    }
}