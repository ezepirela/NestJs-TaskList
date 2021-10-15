import { Injectable } from '@nestjs/common';
import { Task, taskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid'
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];
    getAllTasks(): Task[]{
        return this.tasks;
    }

    createTask(createTaskDto: CreateTaskDto): Task{
        const { title, description } = createTaskDto;
        console.log(taskStatus.OPEN)
        const task: Task = {
            id: uuidv4(),
            title,
            description,
            status: taskStatus.OPEN
        }
        this.tasks.push(task);
        return task;
    }
    getTasksWithFilters(filterDto: GetTaskFilterDto): Task[]{
        const { status, search } = filterDto;
        let tasks = this.getAllTasks();
        if(status) tasks = tasks.filter(task => task.status === status);
        if(search) {
            tasks = tasks.filter(task => {
                if(task.title.includes(search) || task.description.includes(search)){
                    return true;
                }
                return false
            })
        }
        console.log(tasks)
        return tasks
    }
    getTaskById(id: string): Task{
        return this.tasks.find(task => task.id === id);
    }
    updateTaskStatus(id: string, status: taskStatus): Task{
        let task = this.getTaskById(id);
        task.status = status;
        return task;
    }
    deleteTask(id: string): void{
        this.tasks = this.tasks.filter(task => task.id !== id);
    }
}
