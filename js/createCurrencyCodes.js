export default function getCurrencyCodes() {
    let currencyCode = JSON.parse(localStorage.getItem('currencyCodes')) || {}

    if (Object.keys(currencyCode).length === 0) {
        const countryData = JSON.parse(localStorage.getItem('countryData'))

        for (const region of Object.values(countryData)) {
            for (const country of region.data.objects) {
                currencyCode[country.currencies[0].code] = country.currencies[0].name
            }
        }

        localStorage.setItem('currencyCodes', JSON.stringify(currencyCode))
    }

    return currencyCode
}
