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
import { LoggingInterceptor } from '../../common/interceptors/logging.interceptor';
import { TransformInterceptor } from '../../common/interceptors/transform.interceptor';
import { ParseIntPipe } from '../../common/pipes/parse-int.pipe';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interfaces/cat.interface';
import { AccessGuard } from '../../common/guards/access.guard';
import { UserRole } from '../../entity/userRole.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiOperation, ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('cats')
@ApiBearerAuth()
@Catch()
@Controller('cats')
@UseGuards(AccessGuard)
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    @InjectRepository(UserRole) private readonly userRoleRepository: Repository<UserRole>,
  ) {
  }

  @Get('/test')
  async test(): Promise<any> {
    const data = await this.userRoleRepository
      .createQueryBuilder('user_role')
      .leftJoinAndMapMany('user_role.roles', 'role', 'role', 'role.id = user_role.roleId')
      .where('user_role.userId = :id', { id: 1 })
      .getOne();
    return data;
  }

  @Post()

  @ApiOperation({ title: 'create cat' })
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  @Roles('USER', 'ADMIN')
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseIntPipe())
      id,
  ) {
    // logic
  }
}
