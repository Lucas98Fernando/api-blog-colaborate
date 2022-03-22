const request = require("supertest");
const app = require("../src/app");
const db = require("../src/database/connection");

afterAll((done) => {
  db.sequelize.close();
  done();
});

describe("Get all posts without access token", () => {
  test("Attempt to list posts without access token", async () => {
    const response = await request(app).get("/post/get-all");
    expect(response.statusCode).toBe(401);
  });
});

describe("Get posts by user without access token", () => {
  test("Attempt to list posts without access token", async () => {
    const response = await request(app).get("/post/get-by-user");
    expect(response.statusCode).toBe(401);
  });
});
