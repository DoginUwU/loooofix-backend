import { Controller, Get, Param, Res } from '@nestjs/common';
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
    const { data, headers } = await this.streamService.play(id);

    res.set({
      'Content-Type': headers['content-type'],
      'Content-Length': headers['content-length'],
    });

    data.pipe(res);
  }
}
