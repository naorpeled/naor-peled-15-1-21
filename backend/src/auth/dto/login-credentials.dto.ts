import { PickType } from '@nestjs/mapped-types';
import { RegistrationCredentialsDto } from './registration-credentials.dto';

export class LoginCredentialsDto extends PickType(RegistrationCredentialsDto, [
  'email',
  'password',
] as const) {}
