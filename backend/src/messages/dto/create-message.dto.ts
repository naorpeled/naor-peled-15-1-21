import { IsNumber } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class CreateMessageDto {
  @IsNumber()
  sender: User;

  @IsNumber()
  receiver: User;

  subject: string;

  content: string;
}
