import {
  Body,
  Controller,
  Post,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../../entity/user.entity';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {
  }

  @Post('/create')
  @ApiOperation({ title: 'Create User' })
  async create(@Res() res, @Body() user: User) {
    await this.userService.createUser(user);
    return res.status(HttpStatus.OK).send();
  }

  @Post('/login')
  @ApiOperation({ title: 'Login' })
  async login(@Res() res, @Body() user: User) {
    const token = await this.userService.login(user);
    return res.status(HttpStatus.OK).send(token);
  }
}
