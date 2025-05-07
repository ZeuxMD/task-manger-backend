import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './schemas/tasks.schema';
import { Model, Types } from 'mongoose';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { CreateTaskDto } from './dtos/create-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) { }

  async create(
    createTaskDto: CreateTaskDto,
    userId: string,
  ): Promise<TaskDocument> {
    const createdTask = new this.taskModel({
      ...createTaskDto,
      user: new Types.ObjectId(userId),
    });
    return createdTask.save();
  }

  async findAll(userId: string): Promise<TaskDocument[]> {
    return this.taskModel.find({ user: new Types.ObjectId(userId) }).exec();
  }

  async findOne(id: string, userId: string): Promise<TaskDocument> {
    const task = await this.taskModel
      .findOne({
        _id: new Types.ObjectId(id),
        user: new Types.ObjectId(userId),
      })
      .exec();
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async update(
    id: string,
    userId: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<TaskDocument> {
    const updatedTask = await this.taskModel
      .findOneAndUpdate(
        { _id: new Types.ObjectId(id), user: new Types.ObjectId(userId) }, //find the task
        updateTaskDto, // new data
        {
          new: true, // return the updated task
        },
      )
      .exec();

    if (!updatedTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return updatedTask;
  }

  async remove(id: string, userId: string): Promise<any> {
    const result = await this.taskModel.deleteOne({
      _id: new Types.ObjectId(id),
      user: new Types.ObjectId(userId),
    });

    if (result.deletedCount === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return result;
  }
}
