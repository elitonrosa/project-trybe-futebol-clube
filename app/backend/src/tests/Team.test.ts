import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { teams } from './mocks/Team.mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota /teams', () => {
  describe('GET /teams', () => {
    it('Deve retornar um array de times', async () => {
      const mock = SequelizeTeam.bulkBuild(teams);
      sinon.stub(SequelizeTeam, 'findAll').resolves(mock);

      const response = await chai
        .request(app)
        .get('/teams');

      expect(response.status).to.be.eq(200);
      expect(response.body).to.be.deep.eq(teams);
    })
  })

  afterEach(sinon.restore);
})