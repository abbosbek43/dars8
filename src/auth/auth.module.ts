
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UserModule,
    PassportModule,
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
