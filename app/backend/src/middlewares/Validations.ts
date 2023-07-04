import { NextFunction, Request, Response } from 'express';

export default class Validations {
  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { body } = req;
    if (!body.email || !body.password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (!body.email.match(/\S+@\S+\.\S+/) || body.password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  }
}
