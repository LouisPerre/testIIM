import { exercice3 } from "../src/exercice3";
import * as fs from "fs";
import request from "supertest";
import express from "express";

// Simuler le module fs
jest.mock("fs");

// Configurer un serveur Express pour les tests
const app = express();
app.use(express.json());

app.get("/exercice3/success/:hotelName", (req, res) => {
  const result = exercice3("/fake/path/to/hotels.json", req.params.hotelName);
  res.status(result.status).json(result.data || { message: result.data });
});

describe("exercice3", () => {
  const sampleJson = {
    hotel1: [
      {
        name: "Hotel A",
        pictures: {
          photo1: "photoA1.png",
          photo2: "photoA2.png",
        },
      },
    ],
    hotel2: [
      {
        name: "Hotel B",
        pictures: {
          photo1: "photoB1.png",
          photo2: "photoB2.png",
        },
      },
    ],
    hotel3: [
      {
        name: "Hotel C",
      },
    ],
  };

  const filePath = "/fake/path/to/hotels.json";
  const jsonString = JSON.stringify(sampleJson);

  beforeEach(() => {
    fs.readFileSync.mockReturnValue(jsonString);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return an array of photo filenames from a JSON object", async () => {
    const result = exercice3(sampleJson, "Hotel A");
    expect(result).toEqual({
      status: 200,
      data: ["photoA1.png", "photoA2.png"],
    });

    const res = await request(app).get("/exercice3/success/Hotel A");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(["photoA1.png", "photoA2.png"]);
  });

  it("should return an array of photo filenames from a JSON file path", async () => {
    fs.readFileSync.mockImplementation(() => jsonString);
    const result = exercice3(filePath, "Hotel B");
    expect(result).toEqual({
      status: 200,
      data: ["photoB1.png", "photoB2.png"],
    });

    const res = await request(app).get("/exercice3/success/Hotel B");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(["photoB1.png", "photoB2.png"]);
  });

  it("should return an empty array if no matching hotel is found", async () => {
    const result = exercice3(sampleJson, "Hotel D");
    expect(result).toEqual({ status: 404, data: "Hôtel non trouvé" });

    const res = await request(app).get("/exercice3/success/Hotel D");
    expect(res.statusCode).toEqual(404);
    expect(result).toEqual({ status: 404, data: "Hôtel non trouvé" });
  });

  it("should throw an error if the input is neither a string nor an object", () => {
    expect(() => exercice3(123, "Hotel A")).toThrow("Mauvais type");
  });

  it("should return 204 status if no pictures are available", async () => {
    const result = exercice3(sampleJson, "Hotel C");
    expect(result).toEqual({ status: 204, data: null });

    const res = await request(app).get("/exercice3/success/Hotel C");
    expect(res.statusCode).toEqual(204);
    expect(res.text).toBe("");
  });
});
