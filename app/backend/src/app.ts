import * as express from 'express';
import * as cors from 'cors';
import router from './routes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();
    this.cors();
    this.routes();

    // Não remover essa ROTA
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.get('*', (req, res) => res.status(404).json({ message: 'Not found' }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  private cors(): void {
    this.app.use(cors());
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}! 🚀`));
  }

  private routes(): void {
    this.app.use(router);
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
