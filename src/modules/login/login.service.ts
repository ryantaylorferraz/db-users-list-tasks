import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { PrismaService } from '../../../prisma/prisma.service';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}
  public async login({ email, password }: CreateLoginDto) {
    const foundUser = await this.prisma.user.findFirst({
      where: { email },
    });

    if (!foundUser) {
      throw new NotFoundException('Invalid credentials');
    }

    console.log(foundUser)
    console.log(password)
    const passwordMath = await compare(password, foundUser.password);

    if (!passwordMath) {
      throw new NotFoundException('Invalid credentials');
    }

    const token = await this.jwtService.signAsync({
      sub: foundUser.id,
      email: foundUser.email,
    });

    return { access_token: token }
  }
}
