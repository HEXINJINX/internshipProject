export default class news {
    deleteOutOfView(parent) {
        let parentRect = parent.getBoundingClientRect()
        let children = parent.children
        let buffer = 200
        

        for (let i = (children.length - 1); i >= 0; i--) {
            const child = children[i]
            const rect = child.getBoundingClientRect()
            const outOfView = rect.bottom < parentRect.top - buffer || rect.top > parentRect.bottom + buffer || rect.right < parentRect.left - buffer || rect.left > parentRect.right + buffer

            if (outOfView) {
                parent.removeChild(child)
            }
        }
    }

    drawDashboardCards(newsData) {
        let htmlContainer = []
        for (let i = 0; i < 9; i++) {
            let newsPacket = newsData[i]
            let htmlString = `
                <div class="miniNewsCard">
                    <a href="${newsPacket.url}}" class="link">
                        <div class="newsDis">${newsPacket.source.name}</div>
                        <div class="title">${newsPacket.title}</div>
                    </a>
                </div>`

            htmlContainer.push(htmlString)
        }

        let finalString = htmlContainer.join('')
        document.querySelector('.newsContainer').innerHTML = ''
        document.querySelector('.newsContainer').insertAdjacentHTML("beforeend", finalString)
    }

    displayFullNews(displayData) {
        let htmlString = `
        <img src="${displayData[5]}" alt="">
            <hr>
            <div class="currentCredits">${displayData[1]} ● ${displayData[0]['name']} ● ${displayData[6].split('T')[0]}</div>
            <div class="currentNewsTitle"><h1>${displayData[2]}</h1></div>
            <div class="newsDescription">
                <p>
                    ${this.cleanApiText(displayData[3])}
                </p>
            </div>
            <hr>
            <div class="content">
                <p>
                    ${this.cleanApiText(displayData[7])}
                </p>
            </div>
            <hr>
            <a class="currentLink" href="${displayData[4]}">Read more on the ${displayData[0]['name']}</a>
            `

        let currentNewsViewing = document.querySelector('.currentNewsViewing')
        currentNewsViewing.innerHTML = ''
        currentNewsViewing.insertAdjacentHTML('beforeend', htmlString)
    }

    drawCards(newsData) {
        let htmlContainer = []
        
        try {
            for (let i = Math.min(50, newsData.length - 1); i >= 0; i--) {
                let newsPacket = newsData[i]
                let imgURL = newsPacket["urlToImage"]
                if (imgURL == null) {
                    imgURL = `https://plus.unsplash.com/premium_photo-1707080369554-359143c6aa0b?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`
                }

                let dataStore = btoa(encodeURIComponent(this.cleanApiText(JSON.stringify(Object.values(newsPacket))).replace(/null/g, '"unknown"')))
                

                let htmlString = `
                    <div class="newsCard" id='${dataStore}'>
                        <div class="credits">
                            <h2>${newsPacket.source.name}</h2>
                        </div>
                        <div class="newsImg">
                            <img src="${imgURL}" alt="">
                        </div>
                        <div class="newsInfo">
                            <h1 class="newsTitle">${newsPacket.title}</h1>
                            <div class="newsAbout">
                                ${newsPacket.description}
                            </div>
                        </div>
                    </div>`

                htmlContainer.push(htmlString)
            }
        } catch (error) {
            alert(`Could Not Find Any News On The Subject: ${error}`)
        }

        let finalString = htmlContainer.join('')
        let newsContainer = document.querySelector('.newsList')
        let loading = document.getElementById('loadingMore')
        newsContainer.removeChild(loading)
        this.deleteOutOfView(newsContainer)
        newsContainer.insertAdjacentHTML('beforeend', finalString)
        newsContainer.appendChild(loading)
    }

    cleanApiText(text) {
        return text
            .replace(/<[^>]*>/g, '') 
            .replace(/\r?\n|\r/g, ' ')      
            .split(/\bby\s+[A-Z]/)[0]       
            .replace(/\s+/g, ' ')            
            .trim();                        
    }
}