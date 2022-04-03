const cityInput = document.getElementById('city-input')

const apiKey = '647f0516a1695a8f5d4ad6b936f6d301'

async function getWeather() {
    const getCoord = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityInput.value}&appid=${apiKey}`)

    const coord = await getCoord.json()

    const getWeatherData = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coord[0].lat}&lon=${coord[0].lon}&units=metric&appid=${apiKey}`)

    const { main, weather, name } = await getWeatherData.json()

    addCard(name, main, weather)
}

const card = document.getElementById('card')

const addCard = (location, temperature, info) => {

    const cardContent = `
            <div class="city">
                <h2>${location}</h2>
            </div>
            <div class="temp">
                <h3 class="temp-main">${temperature.temp} &#176;C</h3>
                <h4 class="temp-feels-like">Real Feel: ${temperature.feels_like} &#176;C</h4>
            </div>
            <div class="weather-conditions">
                <p class="weather-description">${info[0].description}</p>
            </div>`

    card.innerHTML = cardContent
    card.classList.add('active')


}

const submit = document.getElementById('submit-btn')

submit.addEventListener('click', () => { getWeather() })