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

  public async getUserPokedex(userId: string, language: string): Promise<PokedexResponse | PokedexDocument> {
    const userPokedex = await this.pokedexModel.findOne({ userId }).populate('pokemons');

    // Create pokedex for user if it does not exist
    if (!userPokedex) {
      return this.createPokedex({ userId: userId, pokemons: []})
    }

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
    const currentPokedex = await this.pokedexModel.findOne({ _id: pokedexId });
    if (currentPokedex) {
      return this.pokedexModel.updateOne({ _id: pokedexId }, { ...currentPokedex, ...newPokedex })
    }
    // return this.pokedexModel.findByIdAndUpdate(pokedexId, newPokedex);
  }

  public async deletePokedex(pokedexId: string): Promise<any> {
    return this.pokedexModel.deleteOne({ _id: pokedexId });
  }
}
