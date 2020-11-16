import { Typegoose, prop, pre, instanceMethod } from 'typegoose';

interface PokemonName {
  english: string;
  japanese: string;
  chinese: string;
  french: string;
}

interface PokemonBase {
  HP: number;
  Attack: number;
  Defense: number;
  SpAttack: number;
  SpDefense: number;
  Speed: number;
}

export class Pokemon extends Typegoose {
  @prop()
  name!: PokemonName;

  @prop()
  type!: string[];

  @prop()
  base!: PokemonBase;
}

export const PokemonModel = new Pokemon().getModelForClass(Pokemon);
