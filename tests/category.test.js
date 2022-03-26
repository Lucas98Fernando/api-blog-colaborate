const request = require("supertest");
const app = require("@/app");
const db = require("@database/connection");

afterAll((done) => {
  db.sequelize.close();
  done();
});

describe("Get all categories without access token", () => {
  test("Attempt to list categories without access token", async () => {
    const response = await request(app).get("/category/get-all");
    expect(response.statusCode).toBe(401);
  });
});
