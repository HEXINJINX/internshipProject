export default class news {
    drawCards(newsData) {
        for (const newsPacket of newsData) {

            const img = document.createElement('img')
            img.classList.add('newsImg')

            let imgURL = newsPacket.urlToImage
            if (imgURL == null) {
                imgURL = `https://plus.unsplash.com/premium_photo-1707080369554-359143c6aa0b?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`
            }

            img.src = imgURL

            const newsCard = document.createElement('div')
            newsCard.classList.add('newsCard')

            const newsInfo = document.createElement('span')
            newsInfo.classList.add('newsInfo')

            const h1 = document.createElement('h1')
            h1.classList.add('newsTitle')
            h1.innerText = newsPacket.title

            const p = document.createElement('p')
            p.classList.add('newsAbout')
            p.innerText = (newsPacket.description)

            const credits = document.createElement('span')
            credits.classList.add('credits')

            const link = document.createElement('a')
            link.classList.add('link')
            link.href = newsPacket.url
            link.innerText = newsPacket.source.name

            const author = document.createElement('p')
            author.classList.add('author')
            author.innerText = newsPacket.author

            credits.appendChild(link)
            credits.appendChild(author)

            newsInfo.appendChild(h1)
            newsInfo.appendChild(p)
            newsInfo.appendChild(credits)

            newsCard.appendChild(img)
            newsCard.appendChild(newsInfo)

            newsContainer.appendChild(newsCard)
        };
        

    }
}