import { Injectable, NotFoundException } from '@nestjs/common';
import { taskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TasksRepository } from './dto/tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './dto/task.entity';


@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TasksRepository) private taskRespository: TasksRepository
    ){}

    getTasks(filterDto: GetTaskFilterDto): Promise<TaskEntity[]>{
        return this.taskRespository.getTasks(filterDto)
    }

    createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity>{
        return this.taskRespository.createTask(createTaskDto);
    }

    async getTaskById(id: string): Promise<TaskEntity> {
        const task = await this.taskRespository.findOne(id);
        if(!task) throw new NotFoundException('task not found');
        return task
    }

    async updateTaskStatus(id: string, status: taskStatus): Promise<TaskEntity>{
        const task = await this.getTaskById(id);
        task.status = status;
        await this.taskRespository.save(task);
        return task;
    }

    async deleteTask(id: string): Promise<void>{
        const result = await this.taskRespository.delete(id)
        if(result.affected === 0) throw new NotFoundException('task not found')
    }
}
