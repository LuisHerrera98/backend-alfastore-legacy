import {Router} from 'express'
import { sizeController } from '../controllers/size.controller.js';
import { sellsController } from '../controllers/sells.controller.js';

const router = Router();

router.post('/create', sizeController.create)
router.get('/sizes/:category_id', sizeController.getSizesByCategory);
router.put('/update/:_id', sizeController.update)
router.delete('/deleteAll', sizeController.deleteAll)
router.put('/decrement', sizeController.sizeDecrement)
router.put('/increment', sizeController.sizeIncrement)

router.get('/dateSell', sellsController.createDate)

export default router;