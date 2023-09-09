import { Body, Controller, Get, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { UpdateUserDto } from './dto/update-user-dto.dto';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  me(@ActiveUserId() userId: string) {
    return this.usersService.getUserById(userId);
  }
  @Put()
  updateUser(
    @ActiveUserId() userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUserById(userId, updateUserDto);
  }
}
