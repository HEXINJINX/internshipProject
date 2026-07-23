export default function getAlphacodes() {
    let alpha_3 = JSON.parse(localStorage.getItem('alpha_3')) || {}

    if (Object.keys(alpha_3).length === 0) {
        const countryData = JSON.parse(localStorage.getItem('countryData'))
    
        for (const region of Object.values(countryData)) {
            for (const country of region.data.objects) {
                alpha_3[country.codes['alpha_3']] = country.names.common
            }
        }
    
        localStorage.setItem('alpha_3', JSON.stringify(alpha_3))
    }
}
