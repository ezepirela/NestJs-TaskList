 import { taskStatus } from '../task.model';
 import { IsEnum } from 'class-validator';

 export class UpdateTaskStatusDto {
    @IsEnum(taskStatus)
    status: taskStatus
 }