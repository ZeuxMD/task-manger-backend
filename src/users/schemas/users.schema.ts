import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string; // Hashed password

  @Prop()
  linkedinUrl: string;

  @Prop({ required: true, unique: false })
  username: string;

  @Prop()
  photo: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
