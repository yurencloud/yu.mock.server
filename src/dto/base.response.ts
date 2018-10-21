export class BaseResponse {
  constructor(code: string, msg: string, data?: any, remark?: string){
    this.code = code;
    this.msg = msg;
    this.data = data;
    this.remark = remark;
  }
  code: string;
  msg: string;
  data: any;
  remark: string;
}
