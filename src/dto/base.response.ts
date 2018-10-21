interface Code {
  code: string;
  msg: string;
}

export class BaseResponse {
  constructor(code: Code, data?: any, remark?: string) {
    this.code = code.code;
    this.msg = code.msg;
    this.data = data;
    this.remark = remark;
  }

  code: string;
  msg: string;
  data: any;
  remark: string;
}
