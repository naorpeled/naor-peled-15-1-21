import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  Query,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserData } from 'src/auth/decorators/get-user.decorator';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ValidationPipe)
  create(
    @UserData('userId') userId: number,
    @Body() createMessageDto: CreateMessageDto,
  ) {
    return this.messagesService.create(userId, createMessageDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findMessagesForUser(
    @UserData('userId') userId: number,
    @Query('type') type: string,
  ) {
    return type === 'received'
      ? this.messagesService.findReceivedMessagesForUser(userId)
      : this.messagesService.findSentMessagesForUser(userId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(
    @UserData('userId') executorId: number,
    @Param('id', ParseIntPipe) messageId: number,
  ) {
    return this.messagesService.remove(executorId, messageId);
  }
}
