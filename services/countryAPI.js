export default async function getCountry() {
    let final = {"Europe": {}, "Africa": {}, "Americas": {}, "Asia": {}, "Oceania": {}}
    for (const key in final) {
        try {
            const response = await fetch(
              `https://api.restcountries.com/countries/v5?region=${key}&limit=100`,
              { headers: { 'Authorization': 'Bearer rc_live_0f2ba9d467ef4ff6af5729ba1bf9b3c8' } }
            )

            if (!response.ok) {
                throw new Error(`API Error: ${response.status} ${response.statusText}`);
            }

            final[key] = await response.json()

        } catch (error) {
            console.error("Failed to fetch Countries: ", error)
            continue
        }
    }

    return final
  }