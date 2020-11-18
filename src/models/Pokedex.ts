import { Schema, Document, model, Model } from 'mongoose';
import { Pokemon, PokemonResponse } from './Pokemon';

export interface PokedexInput {
  userId: string;
  pokemons: string[];
}

export interface Pokedex {
  userId: string;
  pokemons: Pokemon[];
}

export interface PokedexResponse {
  userId: string;
  pokemons: PokemonResponse[];
}

export interface PokedexDocument extends Document {
  userId: string;
  pokemons: Pokemon[];
}

// Typegoose does not do array of references properly
const PokedexSchema = new Schema({
  title: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  pokemons: [{
    type: Schema.Types.ObjectId,
    ref: 'Pokemon'
  }]
});

export const PokedexModel = model('Pokedex', PokedexSchema) as Model<PokedexDocument, {}>
