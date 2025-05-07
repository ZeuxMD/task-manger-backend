import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateTaskDto } from './dtos/create-task.dto';
import { TasksService } from './tasks.service';
import { UpdateTaskDto } from './dtos/update-task.dto';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }
  @Post()
  create(
    @Body() createTaskDto: CreateTaskDto,
    @Request() req: { user: { userId: string } },
  ) {
    return this.tasksService
      .create(createTaskDto, req.user.userId)
      .then((task) => ({
        id: task._id,
        title: task.title,
        description: task.description,
        category: task.category,
        dueDate: task.dueDate,
        isCompleted: task.isCompleted,
      }));
  }
  @Get()
  findAll(@Request() req: { user: { userId: string } }) {
    const tasks = this.tasksService.findAll(req.user.userId);
    return tasks.then((tasks) =>
      tasks.map((task) => ({
        id: task._id,
        title: task.title,
        description: task.description,
        category: task.category,
        dueDate: task.dueDate,
        isCompleted: task.isCompleted,
      })),
    );
  }
  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Request() req: { user: { userId: string } },
  ) {
    const task = this.tasksService
      .findOne(id, req.user.userId)
      .then((task) => ({
        id: task._id,
        title: task.title,
        description: task.description,
        category: task.category,
        dueDate: task.dueDate,
        isCompleted: task.isCompleted,
      }));
    return task;
  }
  @Delete(':id')
  delete(
    @Param('id') id: string,
    @Request() req: { user: { userId: string } },
  ) {
    return this.tasksService.remove(id, req.user.userId);
  }
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Request() req: { user: { userId: string } },
  ) {
    return this.tasksService
      .update(id, req.user.userId, updateTaskDto)
      .then((task) => ({
        id: task._id,
        title: task.title,
        description: task.description,
        category: task.category,
        dueDate: task.dueDate,
        isCompleted: task.isCompleted,
      }));
  }
}
