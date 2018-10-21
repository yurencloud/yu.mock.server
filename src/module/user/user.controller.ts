import {
  Body,
  Catch,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { LoggingInterceptor } from '../../common/interceptors/logging.interceptor';
import { TransformInterceptor } from '../../common/interceptors/transform.interceptor';
import { ParseIntPipe } from '../../common/pipes/parse-int.pipe';
import { UserService } from './user.service';
import { User } from '../../entity/user.entity';
import { BaseResponse } from '../../dto/base.response';
import { Logger } from '../../common/log/logger.log';

@Catch()
@Controller('user')
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  private readonly log: Logger = new Logger();

  @Get('/test')
  async test(): Promise<User[]> {
    this.log.error('some log %s %n', 'hello world', 23);
    return this.userService.findAll();
  }

  @Get('/all')
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post('/create')
  async create(@Body() body): Promise<BaseResponse> {
    return await this.userService.createUser(body);
  }

  @Post('/login')
  async login(@Body() body): Promise<BaseResponse> {
    return await this.userService.login(body);
  }
}
