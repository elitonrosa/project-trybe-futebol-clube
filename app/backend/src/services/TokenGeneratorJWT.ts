import * as jwt from 'jsonwebtoken';
import { IUser } from '../interfaces';
import { TokenGenerator } from '../interfaces/TokenGenerator';
import { IUserPayload } from '../interfaces/users/IUser';

export default class TokenGeneratorJwt implements TokenGenerator {
  private jwt = jwt;
  private secret = process.env.JWT_SECRET || 'the_secret';

  generate(user: IUser): string {
    const { password, ...payload } = user;
    const token = this.jwt.sign(payload, this.secret);
    return token;
  }

  validate(token: string): IUserPayload | null {
    try {
      const payload = this.jwt.verify(token, this.secret);
      return payload as IUserPayload;
    } catch (error) {
      return null;
    }
  }
}
