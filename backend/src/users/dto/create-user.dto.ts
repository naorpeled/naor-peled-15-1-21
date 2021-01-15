import { IsEmail, IsNotEmpty, MinLength, Matches } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(2)
  @Matches(/^[a-z\u0590-\u05fe]+$/i)
  first_name: string;

  @IsNotEmpty()
  @MinLength(2)
  @Matches(/^[a-z\u0590-\u05fe]+$/i)
  last_name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(/^(?=.*\d)(?=.*[a-z]).{8,}$/)
  @MinLength(8)
  password: string;
}
