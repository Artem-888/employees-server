import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Tag, TagSchema } from './tag.schema';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { EmployeeModule } from '../employee/employee.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tag.name, schema: TagSchema }]),
    EmployeeModule,
  ],
  providers: [TagService],
  controllers: [TagController],
})
export class TagModule {}
