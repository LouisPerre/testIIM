import { exercice4 } from "../src/exercice4";
import * as fs from 'fs';

jest.mock('fs');

describe('exercice4', () => {
    const fakeFilePath = '/fake/path/to/exercice4.json'
    // Test pour vérifier le comportement lorsque aucune réservation n'est présente
    it('doit lever une erreur si aucune réservation n\'est présente', () => {
        // Définir un JSON simulé sans réservations
        const jsonData = JSON.stringify({
            hotel1: [],
            hotel2: []
        });
        fs.readFileSync.mockReturnValue(jsonData);

        // Exécuter la fonction et vérifier qu'elle lance une erreur
        expect(() => exercice4(fakeFilePath)).toThrow("Vous n'avez fait aucune réservation");
    });

    // Test pour s'assurer que le tableau renvoyé n'est pas vide lorsque des réservations sont présentes
    it('ne doit pas renvoyer un tableau vide quand des hôtels sont réservés', () => {
        // Définir un JSON simulé avec des réservations
        const jsonData = JSON.stringify({
            hotel1: [{ name: "Hotel A", book: "true" }],
            hotel2: [{ name: "Hotel B", book: "true" }]
        });
        fs.readFileSync.mockReturnValue(jsonData);

        // Exécuter la fonction et stocker le résultat
        const result = exercice4(fakeFilePath);
        // Vérifier que le tableau résultant n'est pas vide
        expect(result.length).toBeGreaterThan(0);
    });

    // Test pour vérifier que chaque hôtel réservé a une clé `book` avec la valeur `"true"`
    it('doit s\'assurer que chaque hôtel renvoyé a une clé `book` à `"true"`', () => {
        // Définir un JSON simulé avec des réservations correctes
        const jsonData = JSON.stringify({
            hotel1: [{ name: "Hotel A", book: "true" }],
            hotel2: [{ name: "Hotel B", book: "true" }]
        });
        fs.readFileSync.mockReturnValue(jsonData);

        // Exécuter la fonction et stocker le résultat
        const result = exercice4(fakeFilePath);
        // Vérifier que chaque élément du tableau a une clé `book` à `"true"`
        result.forEach(hotel => {
            expect(hotel).toHaveProperty('book', 'true');
        });
    });
});

