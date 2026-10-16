import { Injectable } from '@nestjs/common';
import { SignInDto } from './dto/sing-in.dto';
import { PrismaService } from '../config/db/prisma.service';
import { RpcException } from '@nestjs/microservices';
import { compare } from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService
  ) { }

  async signin(signInDto: SignInDto) {
    const { username, password } = signInDto;

    const user: any = await this.prisma.user.findFirst({ where: { username } })
    const isMatchedPass = await compare(user?.password ? user.password : '', password)
    if (isMatchedPass) throw new RpcException({
      statusCode: 404,
      message: 'Username or password is invalid'
    })

    const payload = {
      id: user.id,
      role: user.role
    }
    const token = await this.jwt.signAsync(payload, { secret: 'kalit', expiresIn: '15m' },)
    return { token };
  }


}
