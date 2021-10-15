import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TaskEntity } from 'src/tasks/dto/task.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ unique: true })
  username: string;
  @Column()
  password: string;
  // eager means when we fetch the user will retrieve the tasks that belongs to this user
  @OneToMany((_type) => TaskEntity, (task) => task.user, { eager: true })
  task: TaskEntity[];
}
