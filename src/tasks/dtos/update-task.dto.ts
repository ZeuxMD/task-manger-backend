import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';

// make all the fields of CreateTaskDto optional
export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
