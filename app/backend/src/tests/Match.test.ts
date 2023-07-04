import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");
import { app } from "../app";
import SequelizeMatch from "../database/models/SequelizeMatch";
import {
  createMatch,
  createMatchWithConflict,
  createMatchWithInvalid,
  match,
  matchUpdate,
  matchUpdated,
  matches,
  matchesFinished,
  matchesInProgess,
  token,
} from "./mocks/Match.mocks";
import { Sequelize } from "sequelize";

chai.use(chaiHttp);
const { expect } = chai;

describe("Testes da rota /matches", () => {
  describe("GET", () => {
    describe("/matches", () => {
      it("Deve retornar status 200 e um array de partidas", async () => {
        const matchesMock = SequelizeMatch.bulkBuild(matches);
        sinon.stub(SequelizeMatch, "findAll").resolves(matchesMock);

        const response = await chai.request(app).get("/matches");

        expect(response.status).to.be.eq(200);
        expect(response.body).to.be.deep.eq(matches);
      });
    });

    describe("/matches?inProgress=true", () => {
      it("Deve retornar status 200 e um array de partidas em andamento", async () => {
        const matchesMock = SequelizeMatch.bulkBuild(matchesInProgess);
        sinon.stub(SequelizeMatch, "findAll").resolves(matchesMock);

        const response = await chai
          .request(app)
          .get("/matches?inProgress=true");

        expect(response.status).to.be.eq(200);
        expect(response.body).to.be.deep.eq(matchesInProgess);
      });
    });

    describe("/matches?inProgress=false", () => {
      it("Deve retornar status 200 e um array de partidas finalizadas", async () => {
        const matchesMock = SequelizeMatch.bulkBuild(matchesFinished);
        sinon.stub(SequelizeMatch, "findAll").resolves(matchesMock);

        const response = await chai
          .request(app)
          .get("/matches?inProgress=false");

        expect(response.status).to.be.eq(200);
        expect(response.body).to.be.deep.eq(matchesFinished);
      });
    });
  });

  describe("PATCH", () => {
    describe("/matches/:id/finish", () => {
      it("Deve retornar status 200 e uma mensagem de sucesso", async () => {
        sinon.stub(SequelizeMatch, "update").resolves([1]);

        const response = await chai
          .request(app)
          .patch("/matches/1/finish")
          .set("Authorization", token);

        expect(response.status).to.be.eq(200);
        expect(response.body).to.be.deep.eq({ message: "Finished" });
      });

      it("Deve retornar status 404 e uma mensagem de erro caso a partida não exista", async () => {
        sinon.stub(SequelizeMatch, "findByPk").resolves(null);

        const response = await chai
          .request(app)
          .patch("/matches/1000/finish")
          .set("Authorization", token);

        expect(response.status).to.be.eq(404);
        expect(response.body).to.be.deep.eq({ message: "Not found" });
      });

      it("Deve retornar status 401 e uma mensagem de erro caso o token não seja informado", async () => {
        const response = await chai.request(app).patch("/matches/1/finish");

        expect(response.status).to.be.eq(401);
        expect(response.body).to.be.deep.eq({ message: "Token not found" });
      });

      it("Deve retornar status 401 e uma mensagem de erro caso o token seja inválido", async () => {
        const response = await chai
          .request(app)
          .patch("/matches/1/finish")
          .set("Authorization", "invalid-token");

        expect(response.status).to.be.eq(401);
        expect(response.body).to.be.deep.eq({
          message: "Token must be a valid token",
        });
      });
    });

    describe("/matches/:id", () => {
      it("Deve retornar status 200 e uma mensagem de sucesso caso seja possível atualizar uma partida", async () => {
        const matchUpdatedMock = SequelizeMatch.build(matchUpdated);
        sinon.stub(SequelizeMatch, "update").resolves([1]);
        sinon.stub(SequelizeMatch, "findByPk").resolves(matchUpdatedMock);

        const response = await chai
          .request(app)
          .patch("/matches/1")
          .set("Authorization", token)
          .send(matchUpdate);

        expect(response.status).to.be.eq(200);
        expect(response.body).to.be.deep.eq(matchUpdated);
      });

      it("Deve retornar status 404 e uma mensagem de erro caso a partida não exista", async () => {
        sinon.stub(SequelizeMatch, "update").resolves([0]);

        const response = await chai
          .request(app)
          .patch("/matches/1000")
          .set("Authorization", token)
          .send(matchUpdate);

        expect(response.status).to.be.eq(404);
        expect(response.body).to.be.deep.eq({ message: "Not found" });
      });

      it("Deve retornar status 401 e uma mensagem de erro caso o token não seja informado", async () => {
        const response = await chai
          .request(app)
          .patch("/matches/1")
          .send(matchUpdate);

        expect(response.status).to.be.eq(401);
        expect(response.body).to.be.deep.eq({ message: "Token not found" });
      });

      it("Deve retornar status 401 e uma mensagem de erro caso o token seja inválido", async () => {
        const response = await chai
          .request(app)
          .patch("/matches/1")
          .set("Authorization", "invalid-token")
          .send(matchUpdate);

        expect(response.status).to.be.eq(401);
        expect(response.body).to.be.deep.eq({
          message: "Token must be a valid token",
        });
      });
    });
  });

  describe("POST", () => {
    describe("/matches", () => {
      it("Deve retornar status 201 e uma mensagem de sucesso caso seja possível criar uma partida", async () => {
        const matchMock = SequelizeMatch.build(match);
        sinon.stub(SequelizeMatch, "create").resolves(matchMock);

        const response = await chai
          .request(app)
          .post("/matches")
          .set("Authorization", token)
          .send(createMatch);

        expect(response.status).to.be.eq(201);
        expect(response.body).to.be.deep.eq(match);
      });

      it("Deve retornar status 401 e uma mensagem de erro caso o token não seja informado", async () => {
        const response = await chai
          .request(app)
          .post("/matches")
          .send(createMatch);

        expect(response.status).to.be.eq(401);
        expect(response.body).to.be.deep.eq({ message: "Token not found" });
      });

      it("Deve retornar status 401 e uma mensagem de erro caso o token seja inválido", async () => {
        const response = await chai
          .request(app)
          .post("/matches")
          .set("Authorization", "invalid-token")
          .send(createMatch);

        expect(response.status).to.be.eq(401);
        expect(response.body).to.be.deep.eq({
          message: "Token must be a valid token",
        });
      });

      it("Deve retornar status 422 e uma mensagem de erro caso os times sejam iguais", async () => {
        const response = await chai
          .request(app)
          .post("/matches")
          .set("Authorization", token)
          .send(createMatchWithConflict);

        expect(response.status).to.be.eq(422);
        expect(response.body).to.be.deep.eq({
          message: "It is not possible to create a match with two equal teams",
        });
      });

      it("Deve retornar status 404 e uma mensagem de erro caso algum time não exista", async () => {
        const error = new Error();
        error.name = "SequelizeForeignKeyConstraintError";
        sinon.stub(SequelizeMatch, "create").rejects(error);

        const response = await chai
          .request(app)
          .post("/matches")
          .set("Authorization", token)
          .send(createMatchWithInvalid);

        expect(response.status).to.be.eq(404);
        expect(response.body).to.be.deep.eq({
          message: "There is no team with such id!",
        });
      });
    });
  });

  afterEach(sinon.restore);
});
