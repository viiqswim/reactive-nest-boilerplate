import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'The first name of the user',
  })
  firstName: string;

  @ApiProperty({
    description: 'The last name of the user',
  })
  lastName: string;
}
