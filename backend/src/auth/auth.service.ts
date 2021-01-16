import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { RegistrationCredentialsDto } from './dto/registration-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(
    credentials: RegistrationCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return await this.usersService.create(credentials);
  }

  async login(
    credentials: LoginCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const user = await this.usersService.findByCredentials(credentials);

    const payload: JwtPayload = {
      userId: user.id,
      email: user.email,
    };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
