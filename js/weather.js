export default class weather {
    drawWeatherCards(weatherData) {
        let htmlContainer = []
        weatherData.forEach(element => {
            const id = Object.values(element).join('|')
            let htmlString = `
            <div class="weatherCard" id="${id}">
                <img src="https://openweathermap.org/payload/api/media/file/${String(element.icon).replace('n', 'd')}.png" class="weatherImg" alt="">
                <p class="city">${element.city}</p>
                <p class="clouds">${element.clouds}</p>
                <p class="date">${element.date}</p>
            </div>
            `

            htmlContainer.push(htmlString)
        });
        let weatherDiv = document.getElementById('weatherDisplay')
            

        htmlContainer = htmlContainer.join('')
        weatherDiv.innerText = ''

        weatherDiv.insertAdjacentHTML('beforeend', htmlContainer)
    }

    displayForcastDetails(cardData) {
        let list = document.getElementById('list')
        let forcastData = cardData.split('|')

        list.innerHTML = ''

        let htmlString = `
            <div class="weatherInfo">
                <h3>${forcastData[0]}</h3>
                <ul class="weatherDetails">
                    <li class="forcastData">Temperature: <span>${Number(forcastData[1]).toFixed(3)}°C</span></li>
                    <li class="forcastData">High: <span>${Number(forcastData[6]).toFixed(3)}°C</span></li>
                    <li class="forcastData">Low: <span>${Number(forcastData[5]).toFixed(3)}°C</span></li>
                    <li class="forcastData">Humidity: <span>${Number(forcastData[2]).toFixed(3)}%</span></li>
                    <li class="forcastData">Wind Speed: <span>${Number(forcastData[4]).toFixed(3)}m/s</span></li>
                    <li class="forcastData">Weather: <span>${forcastData[7]}</span></li>
                    <li class="forcastData">Sunrise: <span>${(new Date(forcastData[9] * 1000)).toLocaleTimeString()}</span></li>
                    <li class="forcastData">Sunset: <span>${(new Date(forcastData[10] * 1000)).toLocaleTimeString()}</span></li>
                </ul>
            </div>`

        list.insertAdjacentHTML('beforeend', htmlString)
    }
}