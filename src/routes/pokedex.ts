import { Router } from 'express';
import { createPokedex, deletePokedex, getUserPokedex, updatePokedex } from '../controllers/pokedex';

const router: Router = Router();

router.post('/pokedex', createPokedex)
router.get('/pokedex', getUserPokedex)

router.put('/pokedex/:pokedexId', updatePokedex);

router.delete('/pokedex/:pokedexId', deletePokedex);

export default router;
