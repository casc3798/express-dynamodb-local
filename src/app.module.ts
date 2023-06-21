import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PetModule } from './pet/pet.module';

@Module({
  imports: [ConfigModule.forRoot(), PetModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
