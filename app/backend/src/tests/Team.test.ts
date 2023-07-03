import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { team, teams } from './mocks/Team.mocks';

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

  describe('GET /teams/:id', () => {
    it('Deve retornar o status 200 e o time com o id informado', async () => {
      const mock = SequelizeTeam.build(team);
      sinon.stub(SequelizeTeam, 'findByPk').resolves(mock);

      const response = await chai
        .request(app)
        .get('/teams/1');

      expect(response.status).to.be.eq(200);
      expect(response.body).to.be.deep.eq(team);
    })
    it('Deve retornar o status 404 e uma mensagem de erro caso o time não exista', async () => {
      sinon.stub(SequelizeTeam, 'findByPk').resolves(null);

      const response = await chai
        .request(app)
        .get('/teams/1000');

      expect(response.status).to.be.eq(404);
      expect(response.body).to.be.deep.eq({ message: 'Not found' });
    })
  })

  afterEach(sinon.restore);
})