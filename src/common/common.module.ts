import { Module } from '@nestjs/common';
import { EncryptPaswordService } from './encryptPassword.service';
import { EncryptPasswordPipe } from './encript-password/encrypt-password.pipe';

@Module({
  providers: [EncryptPasswordPipe, EncryptPaswordService],
  imports: [],
  exports: [EncryptPaswordService, EncryptPasswordPipe],
})
export class CommonModule {}
