import { Model } from 'mongoose';
import { Pokedex, PokedexDocument, PokedexModel, PokedexResponse } from '../models/Pokedex';

export default class PokedexService {

  private readonly pokedexModel: Model<PokedexDocument, {}>;

  constructor() {
    this.pokedexModel = PokedexModel;
  }

  public async createPokedex(pokedex: Pokedex): Promise<PokedexDocument> {
    return this.pokedexModel.create(pokedex);
  }

  public async getUserPokedex(userId: string, language: string): Promise<PokedexResponse | null> {
    const userPokedex = await this.pokedexModel.findOne({ userId }).populate('pokemons');

    if (!userPokedex) return null;

    return {
      userId: userPokedex.userId,
      pokemons: userPokedex.pokemons.map((pokemon: any) => {
        return {
          _id: pokemon._id,
          name: pokemon.name[language],
          type: pokemon.type,
        }
      })
    }
  }

  public async updatePokedex(pokedexId: string, newPokedex: Pokedex): Promise<any> {
    return this.pokedexModel.findByIdAndUpdate(pokedexId, newPokedex);
  }

  public async deletePokedex(pokedexId: string): Promise<any> {
    return this.pokedexModel.deleteOne({ _id: pokedexId });
  }
}
