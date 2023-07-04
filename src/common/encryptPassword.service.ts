import { Injectable } from '@nestjs/common';
import { hashSync, compare } from 'bcrypt';

@Injectable()
export class EncryptPaswordService {
  encryptPassword(password: string) {
    return hashSync(password, 10);
  }
  async EqualPassword(password: string, encryptPassword: string) {
    return compare(password, encryptPassword);
  }
}
