import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    // Complete usando query builder
    return await this.repository
      .createQueryBuilder("games")
      .where("games.title ilike :title", { title: `%${param}%` })
      .getMany()
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return await this.repository.query(`SELECT COUNT(*) FROM games`); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    // Complete usando query builder
    const games = await this.repository.createQueryBuilder("games")
    .innerJoinAndSelect("games.users", "user")
    .where("games.id = :id", {id: id})
    .getOne()
    
    return games?.users as User[]

  }
}
