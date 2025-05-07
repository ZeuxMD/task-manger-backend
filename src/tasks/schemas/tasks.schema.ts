import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TaskDocument = Task & Document; // Define a type for the Task document

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, default: false })
  isCompleted: boolean;

  @Prop()
  description?: string; // Optional description

  @Prop()
  dueDate?: Date; // Optional due date

  @Prop({ default: 'All' })
  category?: string; // Optional category

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: Types.ObjectId; // Store the ObjectId of the user who owns the task
}

export const TaskSchema = SchemaFactory.createForClass(Task);
