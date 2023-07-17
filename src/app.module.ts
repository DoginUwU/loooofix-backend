import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StreamModule } from './models/streams/stream.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), StreamModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
