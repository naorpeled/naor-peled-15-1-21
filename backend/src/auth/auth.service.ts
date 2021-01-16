import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { RegistrationCredentialsDto } from './dto/registration-credentials.dto';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(
    res: Response,
    credentials: RegistrationCredentialsDto,
  ): Promise<Response> {
    const newUser = await this.usersService.create(credentials);

    const payload: JwtPayload = {
      userId: newUser.id,
      email: newUser.email,
    };
    const accessToken = this.jwtService.sign(payload);

    const cookie = this.getCookieWithJwtToken(newUser.id, newUser.email);
    res.setHeader('Set-Cookie', cookie);

    return res.send({ accessToken });
  }

  async login(
    res: Response,
    credentials: LoginCredentialsDto,
  ): Promise<Response> {
    const user = await this.usersService.findByCredentials(credentials);

    const payload: JwtPayload = {
      userId: user.id,
      email: user.email,
    };
    const accessToken = this.jwtService.sign(payload);

    const cookie = this.getCookieWithJwtToken(user.id, user.email);
    res.setHeader('Set-Cookie', cookie);

    return res.send({ accessToken });
  }

  getCookieWithJwtToken(userId: number, email: string) {
    const payload: JwtPayload = { userId, email };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=2147483647`;
  }
}
