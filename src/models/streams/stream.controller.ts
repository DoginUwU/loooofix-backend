import { Controller, Get, HttpException, Param, Res } from '@nestjs/common';
import { StreamService } from './stream.service';
import type { Response } from 'express';

@Controller('streams')
export class StreamController {
  constructor(private streamService: StreamService) {}

  @Get()
  findAll(): string {
    return this.streamService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): string {
    return this.streamService.findOne(id);
  }

  @Get(':id/play')
  async play(@Param('id') id: number, @Res() res: Response) {
    try {
      const { data, headers } = await this.streamService.play(id);

      res.set(headers);

      data.pipe(res);
    } catch (error) {
      console.error(error);
      throw new HttpException('test', 404);
    }
  }
}
