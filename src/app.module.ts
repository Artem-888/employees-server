import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TagModule } from './modules/tag/tag.modules';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/employees'), TagModule],
})
export class AppModule {}
