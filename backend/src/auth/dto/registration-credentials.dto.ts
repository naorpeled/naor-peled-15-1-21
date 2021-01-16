import { IsEmail, IsNotEmpty, MinLength, Matches } from 'class-validator';

export class RegistrationCredentialsDto {
  @IsNotEmpty()
  @Matches(/^[a-z\u0590-\u05fe]+$/i)
  first_name: string;

  @IsNotEmpty()
  @Matches(/^[a-z\u0590-\u05fe]+$/i)
  last_name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
