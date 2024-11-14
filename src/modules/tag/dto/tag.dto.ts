import {
  IsMongoId,
  IsString,
  Length,
  Matches,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'NoWhitespace', async: false })
export class NoWhitespace implements ValidatorConstraintInterface {
  validate(text: string): boolean {
    return text.trim().length > 0;
  }

  defaultMessage(): string {
    return 'Name should not contain only whitespace';
  }
}

export class CreateTagDto {
  @IsString({ message: 'Name should be a string' })
  @Length(1, 30, { message: 'Name should be between 1 and 30 characters' })
  @Matches(/^\S.*$/, { message: 'Name cannot start with whitespace' })
  @Validate(NoWhitespace)
  name: string;
}

export class DeleteTagParamDto {
  @IsMongoId({ message: 'Invalid ID format' })
  id: string;
}
