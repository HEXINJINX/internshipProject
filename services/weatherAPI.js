export default async function getWeather(lat, lon) {
    let weather = JSON.parse(localStorage.getItem('weatherData')) || {}

    if (Array.from(weather).length == 0) {
        weather = await fetchData(lat, lon)
    }
}

async function fetchData(lat, lon) {
    try {
        let weatherData = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${'0c0ec3905debc1e711d0019b8be9bff3'}`)

        if (!weatherData.ok) {
            throw new Error(`Could not get information from API: ${weatherData.error}`)
        }

        weatherData = await weatherData.json()
    } catch (error) {
        console.error(`Cannot Retrieve Weather Data: ${error}`)
    }
}