import {
  IsArray,
  IsIn,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty({ message: 'First name is required' })
  firstName: string;

  @IsString()
  @IsNotEmpty({ message: 'Last name is required' })
  lastName: string;

  @IsString()
  @IsNotEmpty({ message: 'Office is required' })
  office: string;

  @IsString()
  @IsNotEmpty({ message: 'Phone number is required' })
  phoneNumber: string;

  @IsArray()
  @IsString({ each: true, message: 'Each tag must be a string' })
  @IsOptional()
  tags?: string[];
}

export class UpdateEmployeeDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  office?: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsArray()
  @IsString({ each: true, message: 'Each tag must be a string' })
  @IsOptional()
  tags?: string[];
}

export class EmployeeIdParamDto {
  @IsMongoId({ message: 'Invalid ID format' })
  id: string;
}

export class GetEmployeesQueryDto {
  @IsString()
  @IsOptional()
  @IsIn(['Riga', 'Tallinn', 'Vilnius'], {
    message: 'Office must be one of: Riga, Tallinn, Vilnius',
  })
  office?: string;
}
