import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");
import { app } from "../app";
import SequelizeTeam from "../database/models/SequelizeTeam";
import {
  allLeaderboard,
  awayLeaderboard,
  homeLeaderboard,
  matches,
  teams,
} from "./mocks/Leaderboard.mocks";
import SequelizeMatch from "../database/models/SequelizeMatch";

chai.use(chaiHttp);

const { expect } = chai;

describe("Testes da rota /leaderboard", () => {
  describe("GET", () => {
    describe("/leaderboard/home", () => {
      it("Deve retornar status 200 e um array com a classificação dos times jogando em casa", async () => {
        sinon.stub(SequelizeTeam, "findAll").resolves(teams);
        sinon.stub(SequelizeMatch, "findAll").resolves(matches);

        const response = await chai.request(app).get("/leaderboard/home");

        expect(response.status).to.be.eq(200);
        expect(response.body).to.be.deep.eq(homeLeaderboard);
      });
    });

    describe("/leaderboard/away", () => {
      it("Deve retornar status 200 e um array com a classificação dos times jogando fora de casa", async () => {
        sinon.stub(SequelizeTeam, "findAll").resolves(teams);
        sinon.stub(SequelizeMatch, "findAll").resolves(matches);

        const response = await chai.request(app).get("/leaderboard/away");

        expect(response.status).to.be.eq(200);
        expect(response.body).to.be.deep.eq(awayLeaderboard);
      });
    });

    describe("/leaderboard/", () => {
      it("Deve retornar status 200 e um array com a classificação dos times em todos os jogos", async () => {
        sinon.stub(SequelizeTeam, "findAll").resolves(teams);
        sinon.stub(SequelizeMatch, "findAll").resolves(matches);

        const response = await chai.request(app).get("/leaderboard/");

        console.log(response.body);
        

        expect(response.status).to.be.eq(200);
        expect(response.body).to.be.deep.eq(allLeaderboard);
      });
    })
  });

  afterEach(sinon.restore)
});
