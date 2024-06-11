import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { UserService } from '../user/user.service';
import { jwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '2h'},
    })
  ],
  controllers: [LoginController],
  providers: [LoginService, UserService, jwtStrategy, PrismaService],
})
export class LoginModule {}
  