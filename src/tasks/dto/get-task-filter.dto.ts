import { IsEnum, IsOptional, IsString } from "class-validator";
import { taskStatus } from "../task.model";

export class GetTaskFilterDto {
    @IsEnum(taskStatus)
    @IsOptional()
    status: taskStatus;
    @IsOptional()
    @IsString()
    search: string;
}