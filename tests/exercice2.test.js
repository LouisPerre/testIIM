import { exercice2 } from "../src/exercice2";
import * as fs from 'fs'

jest.mock('fs')

// Bloc qui contient plusieurs test liés
describe('exercice2', () => {
    // Faux chemin de fichier pour notre fonction
    const fakeFilePath = '/fake/path/to/jsonfile.json';
    // Faux Json content
    const jsonContent = JSON.stringify({
        reservation1: "aaaaaaaaaaa",
        reservation2: "bbbbbbbbb",
        reservation3: "ccccccccccc"
    });

    // Avant chaque test, readFileSync doit retourner
    beforeEach(() => {
        fs.readFileSync.mockReturnValue(jsonContent);
    });

    // Après chaque test, reset
    afterEach(() => {
        jest.resetAllMocks();
    });

    // Test pour verifier que le JSON est bien convertit en objet
    it('devrait convertir JSON en tableau d\'objets avec les clés et valeurs correctes', () => {
        // La valeur attendu
        const expected = [
            { key: 'reservation1', value: 'aaaaaaaaaaa' },
            { key: 'reservation2', value: 'bbbbbbbbb' },
            { key: 'reservation3', value: 'ccccccccccc' }
        ];
        // Recuperation du resultat
        const result = exercice2(fakeFilePath);

        expect(result).toEqual(expect.arrayContaining(expected));
        expect(result).toHaveLength(expected.length);
    });

    // Test pour verifier que l'objet contient bien une cle "key" et une cle "value"
    it('chaque objet dans le tableau doit contenir les clés "key" et "value"', () => {
        const result = exercice2(fakeFilePath);
        result.forEach(entry => {
            expect(entry).toHaveProperty('key');
            expect(entry).toHaveProperty('value');
        });
    });
});

