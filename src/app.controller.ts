import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('process_data')
  async processData(data: string) {
    try{
      return this.appService.handleProcessFileFromQueue(data);
    } catch (error){
      console.log(error);
      return [];
    }
  }
}
