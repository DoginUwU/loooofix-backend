import { HttpException, Injectable } from '@nestjs/common';
import { streamProviders } from 'src/database/stream.database';
import axios from 'axios';
import https from 'https';

@Injectable()
export class StreamService {
  findAll(): any {
    return streamProviders;
  }

  findOne(id: number): any {
    const provider = streamProviders.find((stream) => stream.id === Number(id));

    if (!provider) {
      throw new HttpException('Stream not found', 404);
    }

    return provider;
  }

  async play(id: number) {
    const provider = streamProviders.find((stream) => stream.id === Number(id));

    if (!provider) {
      throw new HttpException('Stream not found', 404);
    }

    const agent = new https.Agent({
      rejectUnauthorized: false,
    });

    const data = await axios.get(provider.url, {
      responseType: 'stream',
      httpAgent: agent,
    });

    return data;
  }
}
