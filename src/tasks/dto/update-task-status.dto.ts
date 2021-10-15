 import { taskStatus } from './task-status.enum';
 import { IsEnum } from 'class-validator';

 export class UpdateTaskStatusDto {
    @IsEnum(taskStatus)
    status: taskStatus
 }