import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { taskStatus } from './task-status.enum';
@Entity()
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  status: taskStatus;
  @ManyToOne(_type => User, user => user.task, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User
}
