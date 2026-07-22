export default class country {
  active(isActive, countryData) {
    this.isActive = isActive;
    this.countryData = countryData
  }

  constructor() {
    this.searchInput = document.getElementById('searchInput')
    this.list = document.getElementById('list')
    this.alpha_3 = {
    "AFG": "Afghanistan",
    "ALB": "Albania",
    "DZA": "Algeria",
    "ASM": "American Samoa",
    "AND": "Andorra",
    "AGO": "Angola",
    "AIA": "Anguilla",
    "ATA": "Antarctica",
    "ATG": "Antigua and Barbuda",
    "ARG": "Argentina",
    "ARM": "Armenia",
    "ABW": "Aruba",
    "AUS": "Australia",
    "AUT": "Austria",
    "AZE": "Azerbaijan",
    "BHS": "Bahamas",
    "BHR": "Bahrain",
    "BGD": "Bangladesh",
    "BRB": "Barbados",
    "BLR": "Belarus",
    "BEL": "Belgium",
    "BLZ": "Belize",
    "BEN": "Benin",
    "BMU": "Bermuda",
    "BTN": "Bhutan",
    "BOL": "Bolivia",
    "BES": "Bonaire, Sint Eustatius and Saba",
    "BIH": "Bosnia and Herzegovina",
    "BWA": "Botswana",
    "BVT": "Bouvet Island",
    "BRA": "Brazil",
    "IOT": "British Indian Ocean Territory",
    "BRN": "Brunei Darussalam",
    "BGR": "Bulgaria",
    "BFA": "Burkina Faso",
    "BDI": "Burundi",
    "CPV": "Cabo Verde",
    "KHM": "Cambodia",
    "CMR": "Cameroon",
    "CAN": "Canada",
    "CYM": "Cayman Islands",
    "CAF": "Central African Republic",
    "TCD": "Chad",
    "CHL": "Chile",
    "CHN": "China",
    "CXR": "Christmas Island",
    "CCK": "Cocos (Keeling) Islands",
    "COL": "Colombia",
    "COM": "Comoros",
    "COG": "Congo",
    "COD": "Congo, Democratic Republic of the",
    "COK": "Cook Islands",
    "CRI": "Costa Rica",
    "HRV": "Croatia",
    "CUB": "Cuba",
    "CUW": "Curaçao",
    "CYP": "Cyprus",
    "CZE": "Czechia",
    "CIV": "Côte d'Ivoire",
    "DNK": "Denmark",
    "DJI": "Djibouti",
    "DMA": "Dominica",
    "DOM": "Dominican Republic",
    "ECU": "Ecuador",
    "EGY": "Egypt",
    "SLV": "El Salvador",
    "GNQ": "Equatorial Guinea",
    "ERI": "Eritrea",
    "EST": "Estonia",
    "SWZ": "Eswatini",
    "ETH": "Ethiopia",
    "FLK": "Falkland Islands",
    "FRO": "Faroe Islands",
    "FJI": "Fiji",
    "FIN": "Finland",
    "FRA": "France",
    "GUF": "French Guiana",
    "PYF": "French Polynesia",
    "ATF": "French Southern Territories",
    "GAB": "Gabon",
    "GMB": "Gambia",
    "GEO": "Georgia",
    "DEU": "Germany",
    "GHA": "Ghana",
    "GIB": "Gibraltar",
    "GRC": "Greece",
    "GRL": "Greenland",
    "GRD": "Grenada",
    "GLP": "Guadeloupe",
    "GUM": "Guam",
    "GTM": "Guatemala",
    "GGY": "Guernsey",
    "GIN": "Guinea",
    "GNB": "Guinea-Bissau",
    "GUY": "Guyana",
    "HTI": "Haiti",
    "HMD": "Heard Island and McDonald Islands",
    "VAT": "Holy See",
    "HND": "Honduras",
    "HKG": "Hong Kong",
    "HUN": "Hungary",
    "ISL": "Iceland",
    "IND": "India",
    "IDN": "Indonesia",
    "IRN": "Iran",
    "IRQ": "Iraq",
    "IRL": "Ireland",
    "IMN": "Isle of Man",
    "ISR": "Israel",
    "ITA": "Italy",
    "JAM": "Jamaica",
    "JPN": "Japan",
    "JJE": "Jersey",
    "JOR": "Jordan",
    "KAZ": "Kazakhstan",
    "KEN": "Kenya",
    "KIR": "Kiribati",
    "PRK": "Korea, Democratic People's Republic of",
    "KOR": "Korea, Republic of",
    "KWT": "Kuwait",
    "KGZ": "Kyrgyzstan",
    "LAO": "Lao People's Democratic Republic",
    "LVA": "Latvia",
    "LBN": "Lebanon",
    "LSO": "Lesotho",
    "LBR": "Liberia",
    "LBY": "Libya",
    "LIE": "Liechtenstein",
    "LTU": "Lithuania",
    "LUX": "Luxembourg",
    "MAC": "Macao",
    "MDG": "Madagascar",
    "MWI": "Malawi",
    "MYS": "Malaysia",
    "MDV": "Maldives",
    "MLI": "Mali",
    "MLT": "Malta",
    "MHL": "Marshall Islands",
    "MTQ": "Martinique",
    "MRT": "Mauritania",
    "MUS": "Mauritius",
    "MYT": "Mayotte",
    "MEX": "Mexico",
    "FSM": "Micronesia",
    "MDA": "Moldova",
    "MCO": "Monaco",
    "MNG": "Mongolia",
    "MNE": "Montenegro",
    "MSR": "Montserrat",
    "MAR": "Morocco",
    "MOZ": "Mozambique",
    "MMR": "Myanmar",
    "NAM": "Namibia",
    "NRU": "Nauru",
    "NPL": "Nepal",
    "NLD": "Netherlands",
    "NCL": "New Caledonia",
    "NZL": "New Zealand",
    "NIC": "Nicaragua",
    "NER": "Niger",
    "NGA": "Nigeria",
    "NIU": "Niue",
    "NFK": "Norfolk Island",
    "MKD": "North Macedonia",
    "MNP": "Northern Mariana Islands",
    "NOR": "Norway",
    "OMN": "Oman",
    "PAK": "Pakistan",
    "PLW": "Palau",
    "PSE": "Palestine, State of",
    "PAN": "Panama",
    "PNG": "Papua New Guinea",
    "PRY": "Paraguay",
    "PER": "Peru",
    "PHL": "Philippines",
    "PCN": "Pitcairn",
    "POL": "Poland",
    "PRT": "Portugal",
    "PRI": "Puerto Rico",
    "QAT": "Qatar",
    "ROU": "Romania",
    "RUS": "Russian Federation",
    "RWA": "Rwanda",
    "REU": "Réunion",
    "BLM": "Saint Barthélemy",
    "SHN": "Saint Helena, Ascension and Tristan da Cunha",
    "KNA": "Saint Kitts and Nevis",
    "LCA": "Saint Lucia",
    "MAF": "Saint Martin (French part)",
    "SPM": "Saint Pierre and Miquelon",
    "VCT": "Saint Vincent and the Grenadines",
    "WSM": "Samoa",
    "SMR": "San Marino",
    "STP": "Sao Tome and Principe",
    "SAU": "Saudi Arabia",
    "SEN": "Senegal",
    "SRB": "Serbia",
    "SYC": "Seychelles",
    "SLE": "Sierra Leone",
    "SGP": "Singapore",
    "SXM": "Sint Maarten (Dutch part)",
    "SVK": "Slovakia",
    "SVN": "Slovenia",
    "SLB": "Solomon Islands",
    "SOM": "Somalia",
    "ZAF": "South Africa",
    "SGS": "South Georgia and the South Sandwich Islands",
    "SSD": "South Sudan",
    "ESP": "Spain",
    "LKA": "Sri Lanka",
    "SDN": "Sudan",
    "SUR": "Suriname",
    "SJM": "Svalbard and Jan Mayen",
    "SWE": "Sweden",
    "CHE": "Switzerland",
    "SYR": "Syrian Arab Republic",
    "TWN": "Taiwan",
    "TJK": "Tajikistan",
    "TZA": "Tanzania, United Republic of",
    "THA": "Thailand",
    "TLS": "Timor-Leste",
    "TGO": "Togo",
    "TKL": "Tokelau",
    "TON": "Tonga",
    "TTO": "Trinidad and Tobago",
    "TUN": "Tunisia",
    "TKM": "Turkmenistan",
    "TCA": "Turks and Caicos Islands",
    "TUV": "Tuvalu",
    "TUR": "Türkiye",
    "UGA": "Uganda",
    "UKR": "Ukraine",
    "ARE": "United Arab Emirates",
    "GBR": "United Kingdom",
    "UMI": "United States Minor Outlying Islands",
    "USA": "United States of America",
    "URY": "Uruguay",
    "UZB": "Uzbekistan",
    "VUT": "Vanuatu",
    "VEN": "Venezuela",
    "VNM": "Viet Nam",
    "VGB": "Virgin Islands (British)",
    "VIR": "Virgin Islands (U.S.)",
    "WLF": "Wallis and Futuna",
    "ESH": "Western Sahara",
    "YEM": "Yemen",
    "ZMB": "Zambia",
    "ZWE": "Zimbabwe",
    "UNK": "Kosovo"
    };
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
      h1.innerText = search
      h1.id = 'searchInfo'

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
          if (!(names.some(name => name.toLowerCase().includes(search)))) {
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
