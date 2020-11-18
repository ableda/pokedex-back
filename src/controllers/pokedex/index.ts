import { NextFunction, Request, Response } from 'express';
import { Pokedex } from '../../models/Pokedex';
import PokedexService from '../../services/pokedexService';
import { Languages } from '../../types/language';

export const createPokedex = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const inputPokedex = req.body;
    const pokedexService = new PokedexService();

    const response = await pokedexService.createPokedex(inputPokedex);
  
    res.json(response);
  } catch(error) {
    next(error);
  }
};

export const getUserPokedex = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.query.userId;

    if (req.user && req.user['_id'] !== userId) {
      throw new Error('You can only access your own resources');
    }

    if (!userId) {
      throw new Error('User id query param undefined');
    }

    let language = req.query.language;
    if (!language || !Object.values(Languages).includes(language as Languages)) {
      language = Languages.english;
    }

    const pokedexService = new PokedexService();
    const response = await pokedexService.getUserPokedex(userId as string, language as string);

    res.json(response);
  } catch(error) {
    console.log('Sending error to next');
    next(error);
  }
};

export const updatePokedex = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pokedexId = req.params.pokedexId;

    if (!pokedexId) {
      throw new Error('No pokedexId found in request parameters');
    }

    // TODO: validate body
    const newPokedex: Pokedex = req.body;

    if (newPokedex.pokemons.length > 5) {
      throw new Error('You cannot have more than 5 pokemons in your pokedex');
    }

    const pokedexService = new PokedexService();

    const response = await pokedexService.updatePokedex(pokedexId, newPokedex);
  
    res.json(response);
  } catch(error) {
    next(error);
  }
};

export const deletePokedex = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pokedexId = req.params.pokedexId;

    if (!pokedexId) {
      throw new Error('No pokedexId found in request parameters');
    }

    const pokedexService = new PokedexService();

    const response = await pokedexService.deletePokedex(pokedexId);
  
    res.json(response);
  } catch(error) {
    next(error);
  }
};
