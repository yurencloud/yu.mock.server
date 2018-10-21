import { LoggerService } from '@nestjs/common';
import { configure, getLogger, Configuration } from 'log4js';
import { ConfigService } from '../config/config.service';

const config = new ConfigService();

configure(
  {
    appenders: {
      file: {
        type: 'file',
        filename: 'logs/server.log',
        maxLogSize: 100 * 1024 * 1024, // = 100Mb
        numBackups: 5, // 保留最多5个文件
        compress: true, // 压缩备份
        encoding: 'utf-8',
      },
      out: {
        type: 'stdout',
      },
    },
    categories: {
      default: { appenders: ['file', 'out'], level: config.get('LOG_LEVEL') },
    },
  },
);

const logger = getLogger();

export class Logger implements LoggerService {
  log(message: string, ...args: any[]) {
    logger.info(message, ...args);
  }

  error(message: string, ...args: any[]) {
    // 先报错，再打印路径
    logger.error(message, ...args);
    console.trace();
  }
  warn(message: string, ...args: any[]) {
    logger.warn(message, ...args);
  }
  info(message: string, ...args: any[]) {
    logger.info(message, ...args);
  }
}
