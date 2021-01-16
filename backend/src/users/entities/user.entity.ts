import { Message } from 'src/messages/entities/message.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 50 })
  first_name: string;

  @Column({ type: 'varchar', length: 50 })
  last_name: string;

  @Column({ unique: true, type: 'varchar', length: 50 })
  email: string;

  @Column({ type: 'varchar', select: false })
  password: string;

  @OneToMany(() => Message, (message) => message.sender, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  messages_sent: Message[];

  @OneToMany(() => Message, (message) => message.receiver, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  messages_received: Message[];

  @BeforeInsert()
  generatePasswordHash(): void {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
  }
}
