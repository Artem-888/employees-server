import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TagModule } from './modules/tag/tag.modules';
import { EmployeeModule } from './modules/employee/employee.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/employees'),
    TagModule,
    EmployeeModule,
  ],
})
export class AppModule {}
