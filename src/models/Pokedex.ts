import mongoose from 'mongoose';
import { Pokemon } from './Pokemon';

export interface PokedexInput {
  userId: string;
  pokemons: string[];
}

export interface Pokedex {
  userId: string;
  pokemons: Pokemon[];
}

// Typegoose does not do array of references properly
const PokedexSchema = new mongoose.Schema({
  title: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  pokemons: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pokemon'
  }]
});

export const PokedexModel = mongoose.model('Pokedex', PokedexSchema);
