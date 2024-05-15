import { exercice4 } from "../src/exercice4";
import * as fs from "fs";
import request from "supertest";
import express from "express";

jest.mock("fs");

// Configurer un serveur Express pour les tests
const app = express();
app.use(express.json());

app.get("/exercice4/success", (req, res) => {
  try {
    const result = exercice4("/fake/path/to/exercice4.json");
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

describe("exercice4", () => {
  const fakeFilePath = "/fake/path/to/exercice4.json";

  it("doit lever une erreur si aucune réservation n'est présente", async () => {
    const jsonData = JSON.stringify({
      hotel1: [],
      hotel2: [],
    });
    fs.readFileSync.mockReturnValue(jsonData);

    expect(() => exercice4(fakeFilePath)).toThrow(
      "Vous n'avez fait aucune réservation"
    );

    const res = await request(app).get("/exercice4/success");
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty(
      "message",
      "Vous n'avez fait aucune réservation"
    );
  });

  it("ne doit pas renvoyer un tableau vide quand des hôtels sont réservés", async () => {
    const jsonData = JSON.stringify({
      hotel1: [{ name: "Hotel A", book: "true" }],
      hotel2: [{ name: "Hotel B", book: "true" }],
    });
    fs.readFileSync.mockReturnValue(jsonData);

    const result = exercice4(fakeFilePath);
    expect(result.length).toBeGreaterThan(0);

    const res = await request(app).get("/exercice4/success");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('doit s\'assurer que chaque hôtel renvoyé a une clé `book` à `"true"`', async () => {
    const jsonData = JSON.stringify({
      hotel1: [{ name: "Hotel A", book: "true" }],
      hotel2: [{ name: "Hotel B", book: "true" }],
    });
    fs.readFileSync.mockReturnValue(jsonData);

    const result = exercice4(fakeFilePath);
    result.forEach((hotel) => {
      expect(hotel).toHaveProperty("book", "true");
    });

    const res = await request(app).get("/exercice4/success");
    expect(res.statusCode).toEqual(200);
    res.body.forEach((hotel) => {
      expect(hotel).toHaveProperty("book", "true");
    });
  });
});
