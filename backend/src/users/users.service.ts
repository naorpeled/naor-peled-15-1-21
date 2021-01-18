import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { LoginCredentialsDto } from 'src/auth/dto/login-credentials.dto';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = this.usersRepository.create(createUserDto);
    try {
      await this.usersRepository.save(newUser);
    } catch (error) {
      if (error?.errno === 1062) {
        throw new ConflictException('A user with this email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
    return newUser;
  }

  fineOne(userId: number) {
    return this.usersRepository.findOne(userId);
  }

  async findByCredentials(credentials: LoginCredentialsDto): Promise<User> {
    const { email, password } = credentials;
    const user = await this.usersRepository
      .createQueryBuilder('u')
      .addSelect('u.password')
      .where('email = :userEmail')
      .setParameter('userEmail', email)
      .getOne();

    if (!user) {
      throw new UnauthorizedException('Invalid credentials, please try again');
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials, please try again');
    }

    return user;
  }

  findAllIdsAndNames() {
    return this.usersRepository.find({
      select: ['id', 'first_name', 'last_name'],
    });
  }
}
