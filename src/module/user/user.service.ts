import { Injectable } from '@nestjs/common';
import { User } from '../../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserInterface } from './interfaces/user.interface';
import { BaseResponse } from '../../dto/base.response';
import { ResponseCode } from '../../constant/response-code';

@Injectable()
export class UserService implements UserInterface {
  private readonly users: User[] = [];

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  // TODO:创建用户，验证用户参数，密码加密
  // https://github.com/typestack/class-validator
  createUser(user: User): BaseResponse {
    const response = new BaseResponse();
    const result = this.userRepository.insert(user);
    result.then(data => {
      response.code = ResponseCode.SUCCESS.code;
      response.msg = ResponseCode.SUCCESS.msg;
    }).catch(e => {
      console.log(e);
      response.code = ResponseCode.FAIL.code;
      response.msg = ResponseCode.FAIL.msg;
    });

    response.code = ResponseCode.SUCCESS.code;
    response.msg = ResponseCode.SUCCESS.msg;
    return response;
  }
}
