export default async function getNews(country = 'everything', categories) {

    let newsBundle;
    let n = categories.length
    let randomNumber = Math.floor(Math.random() * n)
    let category = categories[randomNumber]
    let q = country

    if (country == null || country == "") {
        let q = 'everything'
    }

    try {
        const response = await fetch(
            `https://newsapi.org/v2/everything?q=${q}&content=${category}`,
            { headers: { 'Authorization': 'Bearer a76831ded9f04691b3a9964802dd0a7e' } }
        )

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }
        newsBundle = await response.json()

    } catch(error) {
        console.error("Failed to fetch news: ", error)
    }

    return newsBundle
}