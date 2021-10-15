import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppleModule } from './apple/apple.module';
import { AnimalsModule } from './animals/animals.module';

@Module({
  imports: [AppleModule, AnimalsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
