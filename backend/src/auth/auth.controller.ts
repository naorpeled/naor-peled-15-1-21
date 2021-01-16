import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { RegistrationCredentialsDto } from './dto/registration-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  @UsePipes(ValidationPipe)
  register(
    @Body() credentials: RegistrationCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.register(credentials);
  }

  @Post('login')
  @UsePipes(ValidationPipe)
  login(
    @Body() credentials: LoginCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.login(credentials);
  }
}
