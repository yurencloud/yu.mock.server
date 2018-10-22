import { Injectable } from '@nestjs/common';
import { User } from '../../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserInterface } from './interfaces/user.interface';
import { BaseResponse } from '../../dto/base.response';
import { ResponseCode } from '../../constant/response-code';
import { validate } from 'class-validator';
import { Logger } from '../../common/log/logger.log';
import * as bcrypt from 'bcrypt';
import { TokenService } from '../../common/guards/token.service';

@Injectable()
export class UserService implements UserInterface {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly log: Logger,
    private readonly tokenService: TokenService,
  ) {
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  public async createUser(body: any): Promise<BaseResponse> {
    const user = new User();
    Object.assign(user, body);

    validate(user).then(errors => {
      if (errors.length > 0) {
        this.log.error('validation failed. errors: %j', errors);
        return new BaseResponse(ResponseCode.VALIDATION_FAILED, errors);
      } else {
        this.log.info('validation success');
      }
    });

    // 判断用户是否已经存在
    const findUser = await this.userRepository.findOne({ email: user.email });
    if (findUser) {
      return new BaseResponse(ResponseCode.USER_EXISTED);
    }

    // 密码加密
    user.password = await bcrypt.hash(user.password, 10);

    const result = await this.userRepository.insert(user);
    if (!result) {
      this.log.error('database insert errors');
      return new BaseResponse(ResponseCode.FAIL);
    }

    return new BaseResponse(ResponseCode.SUCCESS);
  }

  async login(body: any): Promise<BaseResponse> {
    // 判断用户是否已经存在
    const findUser = await this.userRepository.findOne({ email: body.email });
    if (findUser) {
      const isSame = bcrypt.compareSync(body.password, findUser.password);
      if (isSame) {
        const token = this.tokenService.sign(findUser);
        return new BaseResponse(ResponseCode.SUCCESS, token);
      } else {
        return new BaseResponse(ResponseCode.LOGIN_FAILED);
      }
    } else {
      return new BaseResponse(ResponseCode.LOGIN_FAILED);
    }
  }
}
