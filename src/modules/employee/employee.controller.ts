import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import {
  CreateEmployeeDto,
  EmployeeIdParamDto,
  GetEmployeesQueryDto,
  UpdateEmployeeDto,
} from './dto/employee.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  getEmployees(@Query() query: GetEmployeesQueryDto) {
    return this.employeeService.findAll(query.office);
  }

  @Get(':id')
  getEmployeeById(@Param() params: EmployeeIdParamDto) {
    return this.employeeService.findById(params.id);
  }

  @Post()
  createEmployee(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Delete()
  deleteAllEmployees() {
    return this.employeeService.deleteAllEmployees();
  }

  @Delete(':id')
  deleteEmployee(@Param() params: EmployeeIdParamDto) {
    return this.employeeService.deleteEmployee(params.id);
  }

  @Put(':id')
  updateEmployee(
    @Param() params: EmployeeIdParamDto,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeeService.updateEmployee(params.id, updateEmployeeDto);
  }
}
