import { User } from '../../../entity/user.entity';
import { BaseResponse } from '../../../dto/base.response';

export interface UserInterface {
  findAll(): Promise<User[]>;

  createUser(user: User): Promise<BaseResponse>;

  login(user: User): Promise<BaseResponse>;
}
