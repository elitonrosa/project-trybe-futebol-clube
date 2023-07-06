import { Request, Response } from 'express';
import UserService from '../services/UserService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class UserController {
  constructor(private userService = new UserService()) {}

  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const { data, status } = await this.userService.login(email, password);
    return res.status(mapStatusHTTP(status)).json(data);
  }

  async getRole(req: Request, res: Response): Promise<Response> {
    const { authorization } = req.headers;
    const { data, status } = await this.userService.getRole(authorization as string);
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
