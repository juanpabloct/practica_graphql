import { EncryptPaswordService } from '../encryptPassword.service';
import { Injectable, PipeTransform } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class EncryptPasswordPipe implements PipeTransform {
	constructor(private readonly encrypt: EncryptPaswordService) {}
	transform(value: User) {
		const encryptPassword = this.encrypt.encryptPassword(value.password);
		value.password = encryptPassword;
		return value;
	}
}
