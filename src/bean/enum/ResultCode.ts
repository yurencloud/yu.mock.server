import { ResultCodeType } from '../normal/ResultCodeType';

export class ResultCode {
  static SUCCESS: ResultCodeType = { code: 10000, message: '成功' };
  static FAIL: ResultCodeType = { code: 10001, message: '失败' };
}