import { Router } from 'express';
import { register, update, list } from '../controllers/assistance-controller';

const router = Router();

router.get('/list/:id', list);
router.post('/register', register);
router.put('/update/:id', update);

export default router;
