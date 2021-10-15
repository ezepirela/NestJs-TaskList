import { Controller, Get, Body, Post, Param, Delete, Patch, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, taskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}

    @Get()
    getTasks(@Query() filterDto: GetTaskFilterDto): Task[]{
        if(Object.keys(filterDto).length){
            return this.tasksService.getTasksWithFilters(filterDto);
        }else {
            return this.tasksService.getAllTasks();
        }
        
    }
    @Get(":id")
    getTaskById(@Param("id") id: string): Task{
        return this.tasksService.getTaskById(id);
    }
    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Task{
        return this.tasksService.createTask(createTaskDto);
    }
    @Patch(":id/status")
    updateStatus(@Param("id") id: string, @Body('status') status: taskStatus): Task{
        console.log(status)
        return this.tasksService.updateTaskStatus(id, status)
    }
    @Delete(":id")
    deleteTask(@Param("id") id: string): string{
        this.tasksService.deleteTask(id);
        return 'Task deleted'
    }
}

