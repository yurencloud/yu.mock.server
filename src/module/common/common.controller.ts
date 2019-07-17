import { Body, Controller, FileInterceptor, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { BaseResult } from '../../bean/respone/BaseResult';
import { createWriteStream } from 'fs';
import { join } from 'path';

@ApiUseTags('通用接口')
@Controller('merchant-mock/common')
export class CommonController {
  constructor(
  ) {
  }

  @ApiOperation({ title: '上传文件' })
  @Post('/upload/oss')
  @UseInterceptors(FileInterceptor('file'))
  UploadedFile(@UploadedFile() file, @Body() body) {
    const writeImage = createWriteStream(join(__dirname, '..', '..', 'public', `${file.originalname}`));
    writeImage.write(file.buffer);
    return new BaseResult('http://localhost:3000/static/' + file.originalname);
  }
}
