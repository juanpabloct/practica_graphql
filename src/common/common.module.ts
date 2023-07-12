import { EncryptPasswordPipe } from './encript-password/encrypt-password.pipe';
import { EncryptPaswordService } from './encryptPassword.service';
import { Module } from '@nestjs/common';

@Module({
	providers: [EncryptPasswordPipe, EncryptPaswordService],
	imports: [],
	exports: [EncryptPaswordService, EncryptPasswordPipe],
})
export class CommonModule {}
