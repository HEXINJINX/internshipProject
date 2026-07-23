export default class country {
  active(isActive, countryData) {
    this.isActive = isActive;
    this.countryData = countryData
  }

  constructor() {
    this.searchInput = document.getElementById('searchInput')
    this.list = document.getElementById('list')
    this.alpha_3 = JSON.parse(localStorage.getItem('alpha_3'))
    this.selectedRegion = document.getElementById('region')
    this.info = document.getElementById('info')
  }

  async drawCards(search = "") {
    if (!this.isActive) {
      return
    }
    document.getElementById('list').innerText = ''
    if (document.getElementById('news').checked) {
      const card = document.createElement('div')
      card.classList.add('card')
      card.classList.add('searchInfo')

      const h1 = document.createElement('h1')
      h1.innerText = search.length > 0? `‎ Search For: ${search}`: ''
      h1.classList.add('searchInfo')

      card.appendChild(h1)
      document.getElementById('list').appendChild(card)
    }

    let countryDataInUse = this.countryData

    if (!(this.selectedRegion.value == "" || this.selectedRegion.value.toLowerCase() == "all")) {
      countryDataInUse = {region: this.countryData[this.selectedRegion.value]}
    }

    for (const regions of Object.values(countryDataInUse)) {
      for (const [index, countryId] of Object.entries(regions.data.objects)) {
        if (search.length > 0) {
          const names = [...countryId.names.alternates, countryId.names.official, countryId.names.common]
          if (!(names.some(name => name.toLowerCase().includes(search.toLowerCase())))) {
            continue
          }
        }
      
        const card = document.createElement('div')
        card.classList.add('card')
        card.classList.add(countryId.region)
        card.classList.add(index)


        const img = document.createElement('img')
        img.src = countryId.flag.url_png

        const p = document.createElement('p')
        p.classList.add('name')
        p.innerText = countryId.names.common

        card.appendChild(img)
        card.appendChild(p)

        this.list.appendChild(card)
      }
    }
  } 

  displayInfo(region, country) {
    if (!this.isActive) {
      return
    }
    const displayData = {
      location: {
        region: this.countryData[region].data.objects[country].region,
        subregion: this.countryData[region].data.objects[country].subregion,
        capital: this.countryData[region].data.objects[country].capitals[0].name,
        coordinates: Object.entries(this.countryData[region].data.objects[country].coordinates).map(([key, entry]) => `${key}: ${entry}`).join(', '),
        capitalCoords: Object.entries(this.countryData[region].data.objects[country].capitals[0].coordinates).map(([key, entry]) => `${key}: ${entry}`).join(', ')
      },
      size: {
        areaKm: this.countryData[region].data.objects[country].area.kilometers,
        areaMiles: this.countryData[region].data.objects[country].area.miles,
        population: this.countryData[region].data.objects[country].population.toLocaleString(),
        landlocked: this.countryData[region].data.objects[country].landlocked
      },
      people: {
        demonym: this.countryData[region].data.objects[country].demonyms.eng.m,
        demonymF: this.countryData[region].data.objects[country].demonyms.eng.f,
        languages: this.countryData[region].data.objects[country].languages.map(obj => obj.name)
      },
      government: {
        type: this.countryData[region].data.objects[country].government_type,
        unMember: this.countryData[region].data.objects[country].classification.un_member,
        sovereign: this.countryData[region].data.objects[country].classification.sovereign,
      },
      economy: {
        currency: this.countryData[region].data.objects[country].currencies[0].name,
      },
      comms: {
        callingCode: this.countryData[region].data.objects[country].calling_codes[0],
        tlds: this.countryData[region].data.objects[country].tlds,
        timezone: this.countryData[region].data.objects[country].timezones[0]
      },
      transport: {
        drivingSide: this.countryData[region].data.objects[country].cars.driving_side,
        carSigns: this.countryData[region].data.objects[country].cars.signs
      },
      neighbors: {
        borders: this.countryData[region].data.objects[country].borders.map(str => this.alpha_3[str])
      }
    };

    info.innerHTML = '' 

    const otherInfo = document.createElement('div')
    otherInfo.id = 'otherInfo'

    const h1 = document.createElement('h1')
    h1.innerText = `${this.countryData[region].data.objects[country].names.common} (${this.countryData[region].data.objects[country].names.official})${this.countryData[region].data.objects[country].flag.emoji}`

    const flagInfo = document.createElement('div')
    flagInfo.classList.add('flagInfo')

    const img = document.createElement('img')
    img.classList.add('infoImage')
    img.src = this.countryData[region].data.objects[country].flag.url_png

    flagInfo.appendChild(img)
    flagInfo.appendChild(h1)

    this.info.appendChild(flagInfo)

    for (const section in displayData) {
      const span = document.createElement('span')
      const sectionName = document.createElement('h2')
      span.appendChild(sectionName)
      sectionName.innerText = section
      for (const subSection in displayData[section]) {
        const h5 = document.createElement('h5')
        h5.innerText = `${subSection}: ${displayData[section][subSection]}`
        span.appendChild(h5)
      }
      otherInfo.appendChild(span)
    }

    info.appendChild(otherInfo)
  }
}
