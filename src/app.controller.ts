import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';

@Controller()
export class AppController {
  // constructor(private readonly appService: AppService) {}

  @MessagePattern('process_data')
  async processData(data: Express.Multer.File, @Ctx() context: RmqContext) {
    // Process the data asynchronously
    console.log('Processing data:', data);
    return { processedData: 'Processed Data!' };
  }
}
