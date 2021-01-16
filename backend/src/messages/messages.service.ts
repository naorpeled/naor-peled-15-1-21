import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}

  async create(senderId: any, createMessageDto: CreateMessageDto) {
    const newMessage = this.messagesRepository.create({
      sender: senderId,
      ...createMessageDto,
    });

    try {
      await this.messagesRepository.save(newMessage);
    } catch (error) {
      if (error?.errno === 1452) {
        throw new NotFoundException(
          'The recipient of this message was not found',
        );
      } else {
        throw new InternalServerErrorException();
      }
    }
    return newMessage;
  }

  findAll() {
    return this.messagesRepository.find();
  }

  findOne(id: number) {
    return this.messagesRepository.findOne(id);
  }

  async update(id: number, updateMessageDto: UpdateMessageDto) {
    const updatedMessage = await this.messagesRepository.update(
      id,
      updateMessageDto,
    );
    return updatedMessage.affected > 0
      ? 'Updated successfully'
      : 'Could not update this message';
  }

  async remove(id: number) {
    const message = await this.messagesRepository.findOne(id);
    if (!message)
      throw new NotFoundException('No messages found with the given id');
    this.messagesRepository.remove(message);
    return 'Message deleted successfully';
  }
}
