export default async function getWeather(lat, lon) {
    let weather = await fetchData(lat, lon)

    let weatherData = {}

    weather['list'].forEach(element => {
        if (!weatherData[element['dt_txt'].split(' ')[0]]) {
            weatherData[element['dt_txt'].split(' ')[0]] = []
        }

        weatherData[element['dt_txt'].split(' ')[0]].push(element)
    });

    let weatherDataAverage = {}

    const averageData = Object.keys(weatherData).map(date => {
        const entries = weatherData[date]

        let averageTemp = entries.reduce((acc, curr) => acc + curr.main.temp, 0) / entries.length

        let averageHumidity = entries.reduce((acc, curr) => acc + curr.main.humidity, 0) / entries.length

        let averagePressure = entries.reduce((acc, curr) => acc + curr.main.pressure, 0) / entries.length

        let averageWindSpeed = entries.reduce((acc, curr) => acc + curr.wind.speed, 0) / entries.length

        let tempMin = entries.reduce((acc, curr) => acc < curr.main.temp_min? acc : curr.main.temp_min, Infinity)

        let tempMax = entries.reduce((acc, curr) => acc > curr.main.temp_max? acc : curr.main.temp_max, -Infinity)

        let cloudState = entries.reduce((acc, curr) => acc[0] < curr.clouds.all? [curr.clouds.all, curr.weather[0].description, curr.weather[0].icon] : acc, [-Infinity, "", ""])

        return {
            date: date,
            temp: averageTemp,
            humidity: averageHumidity,
            pressure: averagePressure,
            windSpeed: averageWindSpeed,
            tempMin: tempMin,
            tempMax: tempMax,
            clouds: cloudState[1],
            icon: cloudState[2],
            sunrise: weather.city.sunrise,
            sunset: weather.city.sunset,
            city: weather.city.name
        }
    })

    return averageData
    
}

async function fetchData(lat, lon) {
    let APIkey = '0c0ec3905debc1e711d0019b8be9bff3'
    let api = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric`
    let weatherData;
    try {
        weatherData = await fetch(api)

        if (!weatherData.ok) {
            throw new Error(`Could not get information from API: ${weatherData.error}`)
        }

        weatherData = await weatherData.json()
    } catch (error) {
        console.error(`Cannot Retrieve Weather Data: ${error}`)
    }

    const successEvent = new CustomEvent('operationSuccess', {
        detail: { message: 'Data Retrieved successfully!', timestamp: Date.now() }
    });

    document.dispatchEvent(successEvent);

    return weatherData
}