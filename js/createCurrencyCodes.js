export default function getCurrencyCodes() {
    let currencyCode = JSON.parse(localStorage.getItem('currencyCodes')) || {}

    if (Object.keys(currencyCode).length === 0) {
        const countryData = JSON.parse(localStorage.getItem('countryData'))

        for (const region in countryData) {
            for (const country in countryData[region].data.objects) {
                let name = [countryData[region].data.objects[country].currencies[0].code, countryData[region].data.objects[country].names.common, countryData[region].data.objects[country].currencies[0].name, countryData[region].data.objects[country].currencies[0].symbol, countryData[region].data.objects[country].names.common, ...countryData[region].data.objects[country].names.alternates].join('|')
                currencyCode[name] = `${region}|${country}`
            }
        }
    }

    localStorage.setItem('currencyCodes', JSON.stringify(currencyCode))

    return currencyCode
}
