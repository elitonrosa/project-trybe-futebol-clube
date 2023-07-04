import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");
import { app } from "../app";
import SequelizeUser from "../database/models/SequelizeUser";
import {
  invalidEmailLogin,
  invalidPasswordLogin,
  loginWithoutEmail,
  token,
  user,
  validLogin,
} from "./mocks/Login.mocks";

chai.use(chaiHttp);

const { expect } = chai;

describe("Testes da rota /login", () => {
  describe("POST", () => {
    describe("/login", () => {
      it("Deve retornar o status 200 e um token caso o usuário seja valido", async () => {
        const userMock = SequelizeUser.build(user);
        sinon.stub(SequelizeUser, "findOne").resolves(userMock);

        const response = await chai
          .request(app)
          .post("/login")
          .send(validLogin);

        expect(response.status).to.be.eq(200);
        expect(response.body).to.contains.keys("token");
      });

      it("Deve retornar o status 400 e uma mensagem de erro caso o email não seja informado", async () => {
        const response = await chai
          .request(app)
          .post("/login")
          .send(loginWithoutEmail);

        expect(response.status).to.be.eq(400);
        expect(response.body).to.be.deep.eq({
          message: "All fields must be filled",
        });
      });

      it("Deve retornar o status 400 e uma mensagem de erro caso a senha não seja informada", async () => {
        const response = await chai
          .request(app)
          .post("/login")
          .send(loginWithoutEmail);

        expect(response.status).to.be.eq(400);
        expect(response.body).to.be.deep.eq({
          message: "All fields must be filled",
        });
      });

      it("Deve retornar o status 401 e uma mensagem de erro caso o email não exista", async () => {
        sinon.stub(SequelizeUser, "findOne").resolves(null);

        const response = await chai
          .request(app)
          .post("/login")
          .send(invalidEmailLogin);

        expect(response.status).to.be.eq(401);
        expect(response.body).to.be.deep.eq({
          message: "Invalid email or password",
        });
      });

      it("Deve retornar o status 401 e uma mensagem de erro caso a senha esteja incorreta", async () => {
        const userMock = SequelizeUser.build(user);
        sinon.stub(SequelizeUser, "findOne").resolves(userMock);

        const response = await chai
          .request(app)
          .post("/login")
          .send(invalidPasswordLogin);

        expect(response.status).to.be.eq(401);
        expect(response.body).to.be.deep.eq({
          message: "Invalid email or password",
        });
      });

      it("Deve retornar o status 400 e uma mensagem de erro caso o email seja inválido", async () => {
        const response = await chai
          .request(app)
          .post("/login")
          .send({ ...validLogin, email: "invalid_email" });

        expect(response.status).to.be.eq(401);
        expect(response.body).to.be.deep.eq({
          message: "Invalid email or password",
        });
      });

      it("Deve retornar o status 400 e uma mensagem de erro caso a senha seja inválida", async () => {
        const response = await chai
          .request(app)
          .post("/login")
          .send({ ...validLogin, password: "123" });

        expect(response.status).to.be.eq(401);
        expect(response.body).to.be.deep.eq({
          message: "Invalid email or password",
        });
      });
    });
  });

  describe("GET", () => {
    describe("/login/role", () => {
      it("Deve retornar o status 200 e o role do usuário", async () => {
        const response = await chai
          .request(app)
          .get("/login/role")
          .set("Authorization", token);

        expect(response.status).to.be.eq(200);
        expect(response.body).to.be.deep.eq({ role: "user" });
      });

      it("Deve retornar o status 401 e uma mensagem de erro caso o token não seja informado", async () => {
        const response = await chai.request(app).get("/login/role");

        expect(response.status).to.be.eq(401);
        expect(response.body).to.be.deep.eq({ message: "Token not found" });
      });

      it("Deve retornar o status 401 e uma mensagem de erro caso o token seja inválido", async () => {
        const response = await chai
          .request(app)
          .get("/login/role")
          .set("Authorization", "invalid_token");

        expect(response.status).to.be.eq(401);
        expect(response.body).to.be.deep.eq({
          message: "Token must be a valid token",
        });
      });
    });
  });

  afterEach(sinon.restore);
});
