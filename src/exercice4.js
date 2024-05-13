import * as fs from 'fs';

export const exercice4 = (filePath) => {
    const data = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(data);

    let bookedHotels = [];
    Object.keys(jsonData).forEach(hotelKey => {
        jsonData[hotelKey].forEach(hotel => {
            if (hotel.book === "true") {
                bookedHotels.push(hotel);
            }
        });
    });

    if (bookedHotels.length === 0) {
        throw new Error("Vous n'avez fait aucune réservation");
    }

    return bookedHotels;
}
