import mongoose from 'mongoose';
import { Pokedex, PokedexModel } from '../models/Pokedex';

export default class PokedexService {

  private readonly pokedexModel: mongoose.Model<any, {}>;

  constructor() {
    this.pokedexModel = PokedexModel;
  }

  public async createPokedex(pokedex: Pokedex): Promise<any> {
    console.log('creating pokedex');
    return this.pokedexModel.create(pokedex);
  }

  public async getUserPokedex(userId: string): Promise<any> {
    return this.pokedexModel.find({ userId }).populate('pokemons');
  }

  public async updatePokedex(pokedexId: string, newPokedex: Pokedex): Promise<any> {
    console.log(pokedexId, newPokedex);
    return this.pokedexModel.findByIdAndUpdate(pokedexId, newPokedex);
  }

  public async deletePokedex(pokedexId: string): Promise<any> {
    return this.pokedexModel.deleteOne({ _id: pokedexId });
  }
}
