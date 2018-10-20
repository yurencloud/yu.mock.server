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

@Catch()
@Controller('user')
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
}
