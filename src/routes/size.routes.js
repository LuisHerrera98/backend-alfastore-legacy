import {Router} from 'express'
import { sizeController } from '../controllers/size.controller.js';

const router = Router();

router.post('/create', sizeController.create)
router.get('/sizes/:category_id', sizeController.getSizesByCategory);
router.put('/update/:_id', sizeController.update)
router.delete('/deleteAll', sizeController.deleteAll)
router.put('/decrement', sizeController.sizeDecrement)
router.put('/increment', sizeController.sizeIncrement)

export default router;