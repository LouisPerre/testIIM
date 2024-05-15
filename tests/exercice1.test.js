import { exercice1 } from "../src/exercice1.js";
import * as fs from "fs";
import request from "supertest";
import express from "express";

jest.mock("fs");

// Configurer un serveur Express pour les tests
const app = express();
app.use(express.json());

app.get("/exercice1/success", (req, res) => {
  try {
    const result = exercice1("/fake/path/to/jsonfile.json");
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

describe("exercice1", () => {
  const fakeFilePath = "/fake/path/to/jsonfile.json";
  const jsonContent = JSON.stringify({
    reservation1: "aaaaaaaaaaa",
    reservation2: "bbbbbbbbb",
    reservation3: "ccccccccccc",
  });
  const emptyJsonContent = JSON.stringify({});

  beforeEach(() => {
    fs.readFileSync.mockReturnValue(jsonContent);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("devrait convertir JSON en tableau d'objets avec les clés et valeurs correctes", async () => {
    const expected = [
      { key: "reservation1", value: "aaaaaaaaaaa" },
      { key: "reservation2", value: "bbbbbbbbb" },
      { key: "reservation3", value: "ccccccccccc" },
    ];
    const result = exercice1(fakeFilePath);

    expect(result).toEqual(expect.arrayContaining(expected));
    expect(result).toHaveLength(expected.length);

    const res = await request(app).get("/exercice1/success");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.arrayContaining(expected));
  });

  it('chaque objet dans le tableau doit contenir les clés "key" et "value"', () => {
    const result = exercice1(fakeFilePath);
    result.forEach((entry) => {
      expect(entry).toHaveProperty("key");
      expect(entry).toHaveProperty("value");
    });
  });

  it("devrait lever une erreur si aucun élément n'est présent", async () => {
    fs.readFileSync.mockReturnValue(emptyJsonContent);
    expect(() => exercice1(fakeFilePath)).toThrow("Aucun hôtels disponible");

    const res = await request(app).get("/exercice1/success");
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("message", "Aucun hôtels disponible");
  });
});
