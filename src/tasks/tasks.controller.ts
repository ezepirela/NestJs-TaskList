import {
  Controller,
  Get,
  Body,
  Post,
  Param,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { taskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TaskEntity } from './dto/task.entity';
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

    @Get()
    getTasks(@Query() filterDto: GetTaskFilterDto): Promise<TaskEntity[]> {
      return this.tasksService.getTasks(filterDto);
  }

    @Get(':id')
    getTaskById(@Param('id') id: string): Promise<TaskEntity>{
      return this.tasksService.getTaskById(id)
    }

    @Post()
    async createTask(@Body() createTaskDto: CreateTaskDto): Promise<TaskEntity> {
      return this.tasksService.createTask(createTaskDto);
    }
  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<TaskEntity> {
      const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id, status);
  }
  @Delete(':id')
  deleteTask(@Param('id') id: string){
    return this.tasksService.deleteTask(id);
  }
}
