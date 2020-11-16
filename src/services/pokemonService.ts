import mongoose from 'mongoose';
import axios from 'axios';
import { config } from '../config';
import { Pokemon, PokemonModel } from '../models/Pokemon';

export default class PokemonService {

  private readonly pokemonModel: mongoose.Model<any, {}>;

  constructor() {
    this.pokemonModel = PokemonModel;
  }

  public async getAllPokemons(): Promise<any> {
    return this.pokemonModel.find({}, { name: 1, type: 1 });
  }

  public async getPokemon(pokemonId: string): Promise<any> {
    return this.pokemonModel.findById(pokemonId);
  }
  
  public async seedPokemons(): Promise<any> {
    const response = await axios.get(config.pokemonSeed);

    const pokemons: Pokemon[] = response.data.map((element) => {
      return {
        name: { ...element.name },
        type: [ ...element.type ],
        base: {
          HP: element.base.HP,
          Attack: element.base.Attack,
          Defense: element.base.Defense,
          SpAttack: element.base['Sp. Attack'],
          SpDefense: element.base['Sp. Defense'],
          Speed: element.base.Speed
        }
      }
    });

    return this.pokemonModel.collection.insertMany(pokemons);
  }

  public async truncatePokemons(): Promise<any> {
    return this.pokemonModel.collection.deleteMany({});
  }
}
