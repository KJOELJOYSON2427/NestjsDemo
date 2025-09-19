import { CreateGameInput } from "./args/create-input.types";

import { Injectable } from '@nestjs/common';
import { Game } from './types/games.type';


@Injectable()
export class GamesService {
  async create(createGameInput: CreateGameInput): Promise<Game> {
    // Normally you'd save to DB here
    return {
      id: 1, // fake ID
      name: createGameInput.name,
      genre: createGameInput.genre,
    };
  }
}
