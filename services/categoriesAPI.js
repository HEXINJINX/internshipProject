export default async function getCategories(current = false) {
    if (current) {
        return ['current']
    }
    let categoryToGet;
    let category = []

    try {
        const responseCategory = await fetch(
            `https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffeeds.twit.tv%2Fbrickhouse.xml`
        )

        if (!responseCategory.ok) {
            throw new Error(`Error: ${responseCategory.status}`)
        }

        categoryToGet = await responseCategory.json()

        for (const item of categoryToGet.items) {
            if (item.categories) {
                for (const categoryItem of item.categories) {
                    category.push(categoryItem.replace(" ", "%20"))
                }
            }
        }
    }catch (error) {
        console.error('Failed to load categories')
    }


    let newsBundle;
    let categoryFallBack = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology']

    let finalCategory = [...category, ...categoryFallBack]

    return finalCategory
}