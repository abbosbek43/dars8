
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../users/users.module';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: 'jwt-secret-key', 
      signOptions: { expiresIn: '1h' },
      global:true
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
