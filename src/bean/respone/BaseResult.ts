import { BaseResp } from './BaseResp';
import { ResultCodeType } from '../normal/ResultCodeType';
import { ResultCode } from '../enum/ResultCode';

export class BaseResult extends BaseResp {
  constructor(data: any, resultCode?: ResultCodeType) {
    super();
    this.data = data;

    if (!resultCode) {
      resultCode = ResultCode.SUCCESS;
    }
    this.code = resultCode.code;
    this.message = resultCode.message;
  }

  data: any;
}