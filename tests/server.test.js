// server.test.js
import request from "supertest";
import app from "../src/server";

describe("API Endpoints", () => {
  it("should return 200 status and correct payload on /success", async () => {
    const res = await request(app).get("/success");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Success");
  });

  it("should return 204 status on /health without response content", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toEqual(204);
    expect(res.text).toBe(""); // No content
  });

  it("should return 404 status and correct error message on /not-found", async () => {
    const res = await request(app).get("/not-found");
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("message", "Not Found");
  });

  it("should return 403 status and correct error message on /forbidden", async () => {
    const res = await request(app).get("/forbidden");
    expect(res.statusCode).toEqual(403);
    expect(res.body).toHaveProperty("message", "Forbidden");
  });

  it("should return 404 status and error message for unknown endpoint", async () => {
    const res = await request(app).get("/unknown-endpoint");
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("message", expect.any(String));
  });
});
