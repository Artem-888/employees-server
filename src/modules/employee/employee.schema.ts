import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmployeeDocument = Employee & Document;

@Schema()
export class Employee {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  office: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  tags: string[];
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
