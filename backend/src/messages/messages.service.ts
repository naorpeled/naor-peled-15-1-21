import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
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

  findSentMessagesForUser(id: number) {
    return this.messagesRepository.find({
      relations: ['sender', 'receiver'],
      where: { sender: id },
    });
  }

  findReceivedMessagesForUser(id: number) {
    return this.messagesRepository.find({
      relations: ['sender', 'receiver'],
      where: { receiver: id },
    });
  }

  async remove(executorId: number, messageId: number) {
    const message = await this.messagesRepository.findOne({
      relations: ['sender'],
      where: { id: messageId },
    });
    if (!message)
      throw new NotFoundException('No messages found with the given id');
    if (message.sender.id !== executorId) throw new UnauthorizedException();
    this.messagesRepository.remove(message);
    return 'Message deleted successfully';
  }
}
