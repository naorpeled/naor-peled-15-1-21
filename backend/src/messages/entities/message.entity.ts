import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Column,
} from 'typeorm';

@Entity({ name: 'messages' })
export class Message {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.messages_sent, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  sender: User;

  @ManyToOne(() => User, (user) => user.messages_received, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  receiver: User;

  @Column({ type: 'varchar' })
  subject: string;

  @Column({ type: 'varchar' })
  content: string;
}
