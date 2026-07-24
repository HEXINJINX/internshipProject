export default function getCurrencyCodes() {
    let currencyCode = JSON.parse(localStorage.getItem('currencyCodes')) || {}

    if (Object.keys(currencyCode).length === 0) {
        const countryData = JSON.parse(localStorage.getItem('countryData'))

        for (const region in countryData) {
            for (const country in countryData[region].data.objects) {
                    currencyCode[`${countryData[region].data.objects[country].currencies[0].code}|${countryData[region].data.objects[country].names.common}`] = `${region}|${country}`
            }
        }
    }

    localStorage.setItem('currencyCodes', JSON.stringify(currencyCode))

    return currencyCode
}
