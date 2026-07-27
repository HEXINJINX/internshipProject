export default async function getLocation(search) {

    if (search.length <= 2) {
        return false;
    }
    let locations = JSON.parse(localStorage.getItem('locations')) || {}


    if (Object.keys(locations).length == 0) {
        let newlocations = await fetchData(search)

        for (const location of newlocations.results) {
            locations[`${String(location.name).toLowerCase()}|${String(location.country)}|${location.admin1}`] = `${location.name}|${location.latitude}|${location.longitude}`
        }
    }

    if (!(Array.from(Object.keys(locations)).some(name => name == search.toLowerCase()))) {
        let newlocations = await fetchData(search)

        for (const location of newlocations.results) {
            locations[`${String(location.name).toLowerCase()}|${String(location.country)}|${location.admin1}`] = `${location.latitude}|${location.longitude}`
        }
    }

    let locationToSend = arrangeData(locations, search)

    if (locationToSend.length < 5) {
        let newlocations = await fetchData(search)

        for (const location of newlocations.results) {
            locations[`${String(location.name).toLowerCase()}|${String(location.country)}|${location.admin1}`] = `${location.latitude}|${location.longitude}`
        }

        locationToSend = arrangeData(locations, search)
    }

    localStorage.setItem('locations', JSON.stringify(locations))

     const successEvent = new CustomEvent('operationSuccess', {
        detail: { message: 'Data Retrieved successfully!', timestamp: Date.now() }
    });

    document.dispatchEvent(successEvent);

    return locationToSend

}

function arrangeData(array, search) {
    let locationToSend = {}
    let found = 0

    for (const location in array) {
        if (found >= 5) {
            break
        }
        if (location.toLowerCase().replace(' ', '').includes(search.replace(' ', '').toLowerCase())) {
            locationToSend[location] = array[location]
            found++ 
        }
    }

    return locationToSend
}

async function fetchData(city) {
    try {
        let getlocations = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`)

        if (!(getlocations.ok)) {
            throw new Error(`unable to retrieve location: ${getlocations.error}`)
        }

        let locations = getlocations.json()
        return locations

    } catch (error) {
        console.error(`Failed to access API: ${error}`)
    }
}