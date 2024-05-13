import * as fs from 'fs'

export const exercice1 = (filePath) => {
    // Lire le fichier de manière synchrone
    const data = fs.readFileSync(filePath, 'utf8');
    const jsonObject = JSON.parse(data);

    // Créer un tableau pour stocker les résultats
    let resultArray = [];

    // Parcourir l'objet JSON et ajouter chaque paire clé-valeur sous forme d'objet au tableau
    for (const key in jsonObject) {
        if (jsonObject.hasOwnProperty(key)) {
            // Créer un objet pour chaque paire clé-valeur
            let entry = {
                key: key,
                value: jsonObject[key]
            };
            // Ajouter l'objet au tableau
            resultArray.push(entry);
        }
    }

    if (resultArray.length === 0) {
        throw new Error("Aucun hôtels disponible")
    }

    // Retourner le tableau résultant
    return resultArray;
}
