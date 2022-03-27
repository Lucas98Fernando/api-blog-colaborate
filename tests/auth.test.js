const request = require("supertest");
const app = require("../src/app");
const db = require("../src/database/connection");

// User mockups
const userRegister = {
  name: "Lucas test",
  idUserType: 2,
  email: "lucas@jest.com",
  password: "123456",
};

const userLogin = {
  email: "lucas@jest.com",
  password: "123456",
};

const userLoginNonExistent = {
  email: "lucas@fake.com",
  password: "123456",
};

// Close database connection after running tests
afterAll((done) => {
  db.sequelize.close();
  done();
});

describe("User registration with existing email", () => {
  test("Check the user registration attempt with an already registered email", async () => {
    const response = await request(app)
      .post("/auth/register")
      .send(userRegister);
    expect(response.statusCode).toBe(400);
  });
});

describe("User login", () => {
  test("Check if user login is working properly", async () => {
    const response = await request(app).post("/auth/login").send(userLogin);
    expect(response.statusCode).toBe(200);
  });
});

describe("User login with unregistered email", () => {
  test("Check if user login is working properly", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send(userLoginNonExistent);
    expect(response.statusCode).toBe(400);
  });
});
