import {
  Injectable,
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
    await this.usersRepository.save(newUser);

    const payload: JwtPayload = {
      userId: newUser.id,
      email: newUser.email,
    };

    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOne(id);
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

  update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = bcrypt.hashSync(
        updateUserDto.password,
        bcrypt.genSaltSync(10),
      );
    }

    const updatedUser = this.usersRepository.update(id, updateUserDto);

    return updatedUser;
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOne(id);
    if (!user) throw new NotFoundException('No users found with the given id');
    this.usersRepository.remove(user);
    return 'User deleted successfully';
  }
}
