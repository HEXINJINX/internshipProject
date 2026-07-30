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

    drawDashboardForcast(place, data) {
        let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

        let htmlString = `
                <div class="title">
                    <h2>Current Weather</h2>
                    <div class="position">
                        ${place[0]}, ${place[1]}
                    </div>
                </div>
                <div class="currentWeatherDisplay">
                    <img src="https://openweathermap.org/payload/api/media/file/${data[0].icon}.png" alt="">
                    <div class="currentWeatherValues">
                        <h2>${Number(data[0].temp).toFixed(0)}°C</h2>
                        <p>${data[0].clouds}</p>
                    </div>
                    <span>
                        <p>Humidity: ${Number(data[0].humidity).toFixed(0)}%</p>
                        <p>WindSpeed: ${Number(data[0].windSpeed).toFixed(0)}m/s</p>
                        <p>FeelsLike: ${Number(data[0].feelsLike).toFixed(0)}°C</p>
                    </span>
                </div>
                <div class="dailyWeather">
                    <div class="dailyWeatherCard active" id="${data[0].icon}|${data[0].humidity}|${data[0].windSpeed}|${data[0].feelsLike}|${data[0].temp}|${data[0].clouds}">
                        <p>${days[(new Date(data[0].date)).getDay()]}</p>
                        <img src="https://openweathermap.org/payload/api/media/file/${data[0].icon}.png" alt="">
                        <p>${Number(data[0].tempMin).toFixed(0)}°C/${Number(data[0].tempMax).toFixed(0)}°C</p>
                    </div>
                    <div class="dailyWeatherCard" id="${data[1].icon}|${data[1].humidity}|${data[1].windSpeed}|${data[1].feelsLike}|${data[1].temp}|${data[1].clouds}">
                        <p>${days[(new Date(data[1].date)).getDay()]}</p>
                        <img src="https://openweathermap.org/payload/api/media/file/${data[1].icon}.png" alt="">
                        <p>${Number(data[1].tempMin).toFixed(0)}°C/${Number(data[1].tempMax).toFixed(0)}°C</p>
                    </div>
                    <div class="dailyWeatherCard" id="${data[2].icon}|${data[2].humidity}|${data[2].windSpeed}|${data[2].feelsLike}|${data[2].temp}|${data[2].clouds}">
                        <p>${days[(new Date(data[2].date)).getDay()]}</p>
                        <img src="https://openweathermap.org/payload/api/media/file/${data[2].icon}.png" alt="">
                        <p>${Number(data[2].tempMin).toFixed(0)}°C/${Number(data[2].tempMax).toFixed(0)}°C</p>
                    </div>
                    <div class="dailyWeatherCard" id="${data[3].icon}|${data[3].humidity}|${data[3].windSpeed}|${data[3].feelsLike}|${data[3].temp}|${data[3].clouds}">
                        <p>${days[(new Date(data[3].date)).getDay()]}</p>
                        <img src="https://openweathermap.org/payload/api/media/file/${data[3].icon}.png" alt="">
                        <p>${Number(data[3].tempMin).toFixed(0)}°C/${Number(data[3].tempMax).toFixed(0)}°C</p>
                    </div>
                    <div class="dailyWeatherCard" id="${data[4].icon}|${data[4].humidity}|${data[4].windSpeed}|${data[4].feelsLike}|${data[4].temp}|${data[4].clouds}">
                        <p>${days[(new Date(data[4].date)).getDay()]}</p>
                        <img src="https://openweathermap.org/payload/api/media/file/${data[4].icon}.png" alt="">
                        <p>${Number(data[4].tempMin).toFixed(0)}°C/${Number(data[4].tempMax).toFixed(0)}°C</p>
                    </div>
                </div>`

        let dashboardWeather = document.getElementById('currentWeather')
        dashboardWeather.innerHTML = ''
        dashboardWeather.insertAdjacentHTML('beforeend', htmlString)
        let map = document.querySelector('.map')
        let all = map.querySelectorAll('path')

        all.forEach((e) => {
            e.style.fill = 'var(--text-primary)'

        })
        let countryName = place[1].toLowerCase().replace(' ', '').replace('north', '').replace('west', '').replace('south', '').replace('east', '')
        let country = document.querySelectorAll(`.${countryName}`)
        country.forEach((e) => {
            e.style.fill = 'var(--accent-wheat)'
        })

        document.querySelector('.weatherDisplay').innerText = `${Number(data[0].temp).toFixed(0)}°C`
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