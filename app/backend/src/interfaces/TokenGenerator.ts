import IUser, { IUserPayload } from './users/IUser';

export interface TokenGenerator {
  generate(user: IUser): string;
  validate(token: string): IUserPayload | null;
}
