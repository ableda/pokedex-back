import { Router } from 'express';
import { getAllPokemons, getPokemonById, seedPokemons, truncatePokemons } from '../controllers/pokemons';

const router: Router = Router();

router.get('/pokemon', getAllPokemons);

router.get('/pokemon/seed', seedPokemons);

router.delete('/pokemon/all', truncatePokemons);

router.get('/pokemon/:pokemonId', getPokemonById);

export default router;
