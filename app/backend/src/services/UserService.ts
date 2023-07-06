import {
  ServiceResponse,
  ServiceResponseError,
} from '../interfaces/ServiceResponse';
import UserModel from '../models/UserModel';
import EncrypterBcryptService from './EncrypterBcryptService';
import TokenGeneratorJwt from './TokenGeneratorJWT';

export default class UserService {
  private _unauthorizedResponse: ServiceResponseError = {
    status: 'UNAUTHORIZED',
    data: { message: 'Invalid email or password' },
  };

  constructor(
    private userModel = new UserModel(),
    private encrypter = new EncrypterBcryptService(),
    private tokenGenerator = new TokenGeneratorJwt(),
  ) {}

  async login(
    email: string,
    password: string,
  ): Promise<ServiceResponse<{ token: string }>> {
    const user = await this.userModel.findByEmail(email);
    if (!user) return this._unauthorizedResponse;

    const isPasswordValid = await this.encrypter.compare(
      password,
      user.password,
    );
    if (!isPasswordValid) return this._unauthorizedResponse;

    const token = this.tokenGenerator.generate(user);

    return { status: 'SUCCESSFUL', data: { token } };
  }

  async getRole(token: string): Promise<ServiceResponse<{ role: string }>> {
    const userData = this.tokenGenerator.validate(token);
    if (!userData) {
      return {
        status: 'UNAUTHORIZED',
        data: { message: 'Token must be a valid token' },
      };
    }
    return { status: 'SUCCESSFUL', data: { role: userData.role } };
  }
}
