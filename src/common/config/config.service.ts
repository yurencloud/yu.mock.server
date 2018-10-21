import * as dotenv from 'dotenv';
import * as fs from 'fs';

const environment = process.env.NODE_ENV || 'dev';

export class ConfigService {
  private readonly envConfig: { [prop: string]: string };

  constructor() {
    this.envConfig = dotenv.parse(fs.readFileSync(environment + '.env'));
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
