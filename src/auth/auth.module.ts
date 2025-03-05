import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthSerivce } from './auth.service';
import { UserModule } from 'src/users/user.module';
import { JwtModule } from '@nestjs/jwt';
import { authConstant } from './auth.constant';
import { JwtStrategy } from './jwt-strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: authConstant.secret,
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  providers: [AuthSerivce, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthSerivce],
})
export class AuthModule {}
