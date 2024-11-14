import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Employee, EmployeeDocument } from './employee.schema';
import { CreateEmployeeDto } from './dto/employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>,
  ) {}

  findAll(office?: string) {
    const filter = office ? { office } : {};
    return this.employeeModel.find(filter).exec();
  }

  async findById(id: string) {
    if (!isValidObjectId(id)) {
      return this.throwBadRequest(id);
    }
    const employee = await this.employeeModel.findById(id).exec();
    if (!employee) {
      return this.throwNotFound(id);
    }
    return employee;
  }

  create(createEmployeeDto: CreateEmployeeDto) {
    const newEmployee = new this.employeeModel(createEmployeeDto);
    return newEmployee.save();
  }

  deleteAllEmployees() {
    return this.employeeModel.deleteMany().exec();
  }

  async deleteEmployee(id: string) {
    if (!isValidObjectId(id)) {
      return this.throwBadRequest(id);
    }
    const result = await this.employeeModel.findByIdAndDelete(id).exec();
    if (!result) {
      return this.throwNotFound(id);
    }
  }

  async updateEmployee(
    id: string,
    updateEmployeeDto: {
      firstName?: string;
      lastName?: string;
      office?: string;
      phoneNumber?: string;
      tags?: string[];
    },
  ) {
    if (!isValidObjectId(id)) {
      return this.throwBadRequest(id);
    }
    const employee = await this.employeeModel
      .findByIdAndUpdate(id, updateEmployeeDto, {
        new: true,
      })
      .exec();
    if (!employee) {
      return this.throwNotFound(id);
    }
    return employee;
  }

  async removeTagFromEmployees(tagName: string) {
    await this.employeeModel
      .updateMany({ tags: tagName }, { $pull: { tags: tagName } })
      .exec();
  }

  private throwNotFound(id: string): never {
    throw new HttpException(
      `Employee with ID ${id} not found.`,
      HttpStatus.NOT_FOUND,
    );
  }

  private throwBadRequest(id: string): never {
    throw new HttpException(
      `Invalid ID format: ${id}.`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
