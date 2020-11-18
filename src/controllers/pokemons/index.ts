import { NextFunction, Request, Response } from 'express';
import PokemonService from '../../services/pokemonService';
import { Languages } from '../../types/language';

const getPokemonServiceWithLanguage = (req: Request): PokemonService => {
  let language = req.query.language;

  if (!language || !Object.values(Languages).includes(language as Languages)) {
    language = Languages.english;
  }

  return new PokemonService(language as string);
}

export const getAllPokemons = async (req: Request, res: Response, next: NextFunction) => {
  try { 
    const pokemonService = getPokemonServiceWithLanguage(req);
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

    const pokemonService = getPokemonServiceWithLanguage(req);
    const response = await pokemonService.getPokemon(pokemonId);

    res.json(response);
  } catch(error) {
    next(error);
  }
}

export const seedPokemons = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pokemonService = getPokemonServiceWithLanguage(req);
    const response = await pokemonService.seedPokemons();
  
    res.json(response);
  } catch(error) {
    next(error);
  }
}

export const truncatePokemons = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pokemonService = getPokemonServiceWithLanguage(req);
    const response = await pokemonService.truncatePokemons();
  
    res.json(response);
  } catch(error) {
    next(error);
  }
}
