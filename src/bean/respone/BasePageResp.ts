import { BasePageReq } from '../request/BasePageReq';

export class BasePageResp {
  constructor(data: any, total: number, req: BasePageReq) {
    this.data = data;
    this.totalNum = total;
    this.pageSize = req.pageSize;
    this.currentPage = req.page;
  }
  currentPage: number;
  data: any;
  isMore: number;
  pageSize: number;
  startIndex: number;
  totalNum: number;
  totalPage: number;
}