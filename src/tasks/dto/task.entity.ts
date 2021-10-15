import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { taskStatus } from '../task-status.enum';
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
}
