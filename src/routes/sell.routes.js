import {Router} from 'express'
import { sellsController } from '../controllers/sells.controller.js';

const router = Router();

router.get('/dateSells', sellsController.dateSells)
router.get('/sells/:date', sellsController.getSells)
router.post('/registerSell', sellsController.registerSell)

export default router;