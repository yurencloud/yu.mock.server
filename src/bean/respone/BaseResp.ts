import { ResultCode } from '../enum/ResultCode';
import { ResultCodeType } from '../normal/ResultCodeType';

export class BaseResp {
  constructor(resultCode?: ResultCodeType, message?: string) {
    if (!resultCode) {
      resultCode = ResultCode.SUCCESS;
    }
    this.code = resultCode.code;
    if (!message) {
      this.message = resultCode.message;
    } else {
      this.message = message;
    }
  }

  code: number;
  message: string;
}