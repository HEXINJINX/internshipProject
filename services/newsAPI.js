export default async function getNews(content = null) {

    let newsBundle;
    let q = content
    let newsStorage = JSON.parse(localStorage.getItem('newsData')) || {}

    if (content == null || content == "") {
        q = 'everything'
    }

    if (Array.isArray(content)) {
        let n = content.length
        let randomNumber = Math.floor(Math.random() * n)
        q = content[randomNumber]
        console.log(q)
    }

    

    if (!(newsStorage[q.toLowerCase()])) {
        newsBundle = await fetchData(q)
        let currentTime = Date.now()
        newsStorage[q.toLowerCase()] = [currentTime, newsBundle]
        localStorage.setItem('newsData', JSON.stringify(newsStorage))
        return newsBundle
    } else {
        let newsData = newsStorage[q.toLowerCase()]
        let currentTime = Date.now()
        let newsAge = currentTime - Number(newsData[0])
        if (newsAge > 86400000) {
            let newNewsData = await fetchData(q)
            newsBundle = newNewsData
            newsStorage[q.toLowerCase()] = [currentTime, newNewsData]

            localStorage.setItem('newsData', JSON.stringify(newsStorage))
            
            return newsBundle
        } 

        newsBundle = newsData[1]
        const successEvent = new CustomEvent('operationSuccess', {
            detail: { message: 'Data Retrieved successfully!', timestamp: Date.now() }
        });
    
        document.dispatchEvent(successEvent);
        return newsBundle
    }
}

async function fetchData(query) {
    let newsBundle;
    try {
        const response = await fetch(
            `https://newsapi.org/v2/everything?q=${query}`,
            { headers: { 'Authorization': 'Bearer a76831ded9f04691b3a9964802dd0a7e' } }
        )
    
        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }
        newsBundle = await response.json()
        newsBundle = newsBundle.articles

    } catch(error) {
        console.error("Failed to fetch news: ", error)
    }

    return newsBundle
}