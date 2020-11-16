import { NextFunction, Request, Response } from 'express';
import PokemonService from '../../services/pokemonService';

export const getAllPokemons = async (req: Request, res: Response, next: NextFunction) => {
  try { 
    const pokemonService = new PokemonService();
    const response = await pokemonService.getAllPokemons();

    res.json(response);
  } catch(error) {
    next(error);
  }
}

export const getPokemonById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pokemonId = req.params.pokemonId;

    if(!pokemonId) {
      throw new Error('No pokemon id in request');
    }

    const pokemonService = new PokemonService();
    const response = await pokemonService.getPokemon(pokemonId);

    res.json(response);
  } catch(error) {
    next(error);
  }
}

export const seedPokemons = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pokemonService = new PokemonService();
    const response = await pokemonService.seedPokemons();
  
    res.json(response);
  } catch(error) {
    next(error);
  }
}

export const truncatePokemons = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pokemonService = new PokemonService();
    const response = await pokemonService.truncatePokemons();
  
    res.json(response);
  } catch(error) {
    next(error);
  }
}
