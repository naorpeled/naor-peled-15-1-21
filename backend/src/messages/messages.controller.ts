import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Patch,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
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

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  findMessagesForUser(
    @UserData('userId') userId: number,
    @Query('type') type: string,
  ) {
    return type === 'received'
      ? this.messagesService.findReceivedMessagesForUser(userId)
      : this.messagesService.findSentMessagesForUser(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.messagesService.findOne(id);
  }

  @Get()
  findAll() {
    return this.messagesService.findAll();
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMessageDto: UpdateMessageDto,
  ) {
    return this.messagesService.update(id, updateMessageDto);
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
