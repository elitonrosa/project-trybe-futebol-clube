import * as bcrypt from 'bcryptjs';
import { Encrypter } from '../interfaces/Encrypter';

export default class EncrypterBcryptService implements Encrypter {
  private bcrypt = bcrypt;

  async compare(password: string, hash: string): Promise<boolean> {
    const isValid = await this.bcrypt.compare(password, hash);
    return isValid;
  }
}
