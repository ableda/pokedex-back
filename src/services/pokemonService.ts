import { Model } from 'mongoose';
import axios from 'axios';
import { config } from '../config';
import { Pokemon, PokemonModel, PokemonResponse } from '../models/Pokemon';

export default class PokemonService {

  private readonly pokemonModel: Model<InstanceType<any>, {}>;
  private language: string;

  constructor(language: string) {
    this.language = language;
    this.pokemonModel = PokemonModel;
  }

  public async getAllPokemons(): Promise<PokemonResponse[]> {
    const pokemons = await this.pokemonModel.find({}, { name: 1, type: 1 });

    return pokemons.map((pokemon) => {
      return {
        _id: pokemon._id,
        name: pokemon.name[this.language],
        type: pokemon.type,
      }
    });
  }

  public async getPokemon(pokemonId: string): Promise<PokemonResponse | null> {
    const pokemonQuery = await this.pokemonModel.findById(pokemonId);

    if (!pokemonQuery) return null;

    return {
      ...pokemonQuery._doc,
      name: pokemonQuery._doc.name[this.language]
    };
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
