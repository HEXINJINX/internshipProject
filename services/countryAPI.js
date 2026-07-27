export default async function getCountry() {
    let final = {"Europe": {}, "Africa": {}, "Americas": {}, "Asia": {}, "Oceania": {}}
    for (const key in final) {
        try {
            const response = await fetch(
              `https://api.restcountries.com/countries/v5?region=${key}&limit=100`,
              { headers: { 'Authorization': 'Bearer rc_live_ccf1b682d3f14917a614c3c7a056bbeb' } }
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

     const successEvent = new CustomEvent('operationSuccess', {
        detail: { message: 'Data Retrieved successfully!', timestamp: Date.now() }
    });

    document.dispatchEvent(successEvent);

    return final
  }