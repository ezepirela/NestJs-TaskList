import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./create-task.dto";
import { TaskEntity } from "./task.entity";
import { taskStatus } from "../task-status.enum";
import { GetTaskFilterDto } from "./get-task-filter.dto";
@EntityRepository(TaskEntity)
export class TasksRepository extends Repository<TaskEntity>{

    async getTasks(filterDto: GetTaskFilterDto): Promise<TaskEntity[]>{
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('task');
        if(status) query.andWhere('task.status = :status', { status });
        if(search){
            query.andWhere(
                'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)', { search: `%${search}%`},
            )
        }
        const tasks = await query.getMany();
        return tasks;
    }
    
    async createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity>{
        const { title, description } = createTaskDto;
        const task = this.create({
            title, 
            description,
            status: taskStatus.OPEN,
        })
        await this.save(task);
        return task;
    }
}