import { exercice3 } from "../src/exercice3";
import * as fs from 'fs';

// Simuler le module fs
jest.mock('fs');

describe('exercice3', () => {
    // Données de test
    const sampleJson = {
        "hotel1": [
            {
                "name": "Hotel A",
                "pictures": {
                    "photo1": "photoA1.png",
                    "photo2": "photoA2.png"
                }
            }
        ],
        "hotel2": [
            {
                "name": "Hotel B",
                "pictures": {
                    "photo1": "photoB1.png",
                    "photo2": "photoB2.png"
                }
            }
        ],
        "hotel3": [
            {
                "name": "Hotel C",
            }
        ]
    };

    const filePath = '/fake/path/to/hotels.json';
    const jsonString = JSON.stringify(sampleJson);

    it('should return an array of photo filenames from a JSON object', () => {
        const result = exercice3(sampleJson, "Hotel A");
        expect(result).toEqual(["photoA1.png", "photoA2.png"]);
    });

    it('should return an array of photo filenames from a JSON file path', () => {
        // Permet la simulation de lecture d'un fichier JSON
        fs.readFileSync.mockImplementation(() => jsonString);
        const result = exercice3(filePath, "Hotel B");
        expect(result).toEqual(["photoB1.png", "photoB2.png"]);
    });

    it('should return an empty array if no matching hotel is found', () => {
        const result = exercice3(sampleJson, "Hotel D");
        expect(result).toHaveLength(0);
    });

    it('should throw an error if the input is neither a string nor an object', () => {
        expect(() => exercice3(123, "Hotel A")).toThrow("Mauvais type");
    });

    it('should return "Aucune photo pour cet hôtel" if no pictures are available', () => {
        const result = exercice3(sampleJson, "Hotel C");
        expect(result).toBe("Aucune photo pour cet hôtel");
    });
});
