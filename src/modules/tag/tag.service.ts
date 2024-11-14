import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tag, TagDocument } from './tag.schema';
import { Model } from 'mongoose';
import { EmployeeService } from '../employee/employee.service';

@Injectable()
export class TagService {
  constructor(
    @InjectModel(Tag.name) private tagModel: Model<TagDocument>,
    private readonly employeeService: EmployeeService,
  ) {}

  async create(createTagDto: { name: string }) {
    const existingTag = await this.tagModel
      .findOne({ name: createTagDto.name })
      .exec();

    if (existingTag) {
      return this.throwNotFound('unique');
    }

    const newTag = new this.tagModel(createTagDto);
    await newTag.save();

    return this.tagModel.find().exec();
  }

  findAll() {
    return this.tagModel.find().exec();
  }

  async delete(id: string) {
    const tag = await this.tagModel.findByIdAndDelete(id).exec();
    if (!tag) {
      return this.throwNotFound(id);
    }

    await this.employeeService.removeTagFromEmployees(tag.name);

    return this.tagModel.find().exec();
  }

  deleteAll() {
    return this.tagModel.deleteMany().exec();
  }

  private throwNotFound(item: string) {
    const message =
      item === 'unique'
        ? 'Tag name must be unique.'
        : `Tag with ID ${item} not found.`;

    throw new HttpException(message, HttpStatus.NOT_FOUND);
  }
}
