import { Injectable, NotFoundException } from '@nestjs/common';
import { taskStatus } from './dto/task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TasksRepository } from './dto/tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './dto/task.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository) private taskRespository: TasksRepository,
  ) {}

  getTasks(filterDto: GetTaskFilterDto, user: User): Promise<TaskEntity[]> {
    return this.taskRespository.getTasks(filterDto, user);
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<TaskEntity> {
    return this.taskRespository.createTask(createTaskDto, user);
  }

  async getTaskById(id: string, user: User): Promise<TaskEntity> {
    const task = await this.taskRespository.findOne({ where: { id, user } });
    if (!task) throw new NotFoundException('task not found');
    return task;
  }

  async updateTaskStatus(
    id: string,
    status: taskStatus,
    user: User,
  ): Promise<TaskEntity> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await this.taskRespository.save(task);
    return task;
  }

  async deleteTask(id: string, user: User): Promise<void> {
    const result = await this.taskRespository.delete({ id, user });
    if (result.affected === 0) throw new NotFoundException('task not found');
  }
}
