import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
import { HttpModule } from '@nestjs/axios';
import { CommonModule } from 'src/common/common.module';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService, ConfigService],
  imports: [
    // Esto es para que tome el modelo y ya lo grabe en la bbdd
    MongooseModule.forFeature([
      {
        name: Pokemon.name,
        schema: PokemonSchema,
      }
    ]),
    HttpModule,
    CommonModule
  ]
})
export class PokemonModule {}
