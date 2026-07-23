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

    drawCards(newsData) {
        let htmlContainer = []
        
        try {
            for (let i = Math.min(50, newsData.length - 1); i >= 0; i--) {
                let newsPacket = newsData[i]
                let imgURL = newsPacket["urlToImage"]
                if (imgURL == null) {
                    imgURL = `https://plus.unsplash.com/premium_photo-1707080369554-359143c6aa0b?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`
                }

                let htmlString = `
                <div class="newsCard">
                    <img class="newsImg" src="${imgURL}" loading="lazy">
                    <span class="newsInfo">
                        <h1 class="newsTitle">
                            ${newsPacket.title}
                        </h1>
                        <p class="newsAbout">
                            ${newsPacket.description}
                        </p>
                        <span class="credits">
                            <a class="link" href="${newsPacket.url}">
                                ${(newsPacket.source.name).slice(0, 20)}
                            </a>
                            <p class="author">
                                ${String(newsPacket["author"]).slice(0, 20)}
                            </p>
                        </span>
                    </span>
                </div>`

                htmlContainer.push(htmlString)
            }
        } catch (error) {
            alert(`Could Not Find Any News On The Subject: ${error}`)
        }

        let finalString = htmlContainer.join('')
        let newsContainer = document.getElementById('newsContainer')
        let loading = document.getElementById('loadingMore')
        newsContainer.removeChild(loading)
        this.deleteOutOfView(newsContainer)
        newsContainer.insertAdjacentHTML('beforeend', finalString)
        newsContainer.appendChild(loading)
    }
}