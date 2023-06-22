import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getStatus() {
    return {
      nodeEnv: this.configService.get<string>('nodeEnv'),
      appName: this.configService.get<string>('appName'),
      port: this.configService.get<number>('server.port'),
      host: this.configService.get<string>('server.host'),
    };
  }
}
