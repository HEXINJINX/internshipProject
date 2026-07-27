export default async function getExchangeRate() {
    let exchangeRate = JSON.parse(localStorage.getItem('exchangeRates')) || false

    if (!(exchangeRate)) {
        fetchData()
    } else if (Number(exchangeRate[0]) - Date.now > 86400000) {
        fetchData()
    }

     const successEvent = new CustomEvent('operationSuccess', {
        detail: { message: 'Data Retrieved successfully!', timestamp: Date.now() }
    });

    document.dispatchEvent(successEvent);

    return exchangeRate[1]
}

async function fetchData() {
    try {
        let response = await fetch(
            `https://v6.exchangerate-api.com/v6/cb01a88ef9c8b2a9860d09eb/latest/USD`
        )

        if (!(response.ok)) {
            throw new Error(`Failed to retrieve API Data: ${response.error}`)
        }

        let currencyRates = await response.json()

        let currencyRatesUSD = [Date.now(), currencyRates['conversion_rates']]
        localStorage.setItem('exchangeRates', JSON.stringify(currencyRatesUSD))

        return currencyRatesUSD[1]

    } catch (error) {
        console.error(`Failed to get Exchange Rates`)
    }
}