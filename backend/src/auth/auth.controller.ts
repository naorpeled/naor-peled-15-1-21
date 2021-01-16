import {
  Body,
  Controller,
  Post,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { RegistrationCredentialsDto } from './dto/registration-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  @UsePipes(ValidationPipe)
  register(
    @Res() res: Response,
    @Body() credentials: RegistrationCredentialsDto,
  ): Promise<Response> {
    return this.authService.register(res, credentials);
  }

  @Post('login')
  @UsePipes(ValidationPipe)
  login(
    @Res() res: Response,
    @Body() credentials: LoginCredentialsDto,
  ): Promise<Response> {
    return this.authService.login(res, credentials);
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ValidationPipe)
  logout(@Res() res: Response): Response {
    res.setHeader('Set-Cookie', `Authentication=; HttpOnly; Path=/; Max-Age=0`);
    return res.send('Successfully logged out');
  }
}
