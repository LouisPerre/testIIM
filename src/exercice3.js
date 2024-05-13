import * as fs from 'fs'

export const exercice3 = (hotelsInput, hotelName) => {
    let hotelsJson;

    if (typeof hotelsInput === 'string') {
        const data = fs.readFileSync(hotelsInput, 'utf8')
        hotelsJson = JSON.parse(data)
    } else if (typeof hotelsInput === 'object') {
        hotelsJson = hotelsInput
    } else {
        throw new Error("Mauvais type")
    }

    for (let key in hotelsJson) {
        if (hotelsJson.hasOwnProperty(key)) {
            const hotel = hotelsJson[key].find(h => h.name === hotelName)
            if (hotel) {
                if (hotel.pictures && Object.keys(hotel.pictures).length > 0) {
                    return Object.values(hotel.pictures)
                } else {
                    return "Aucune photo pour cet hôtel"
                }
            }
        }
    }

    return []
}
