import {Router} from 'express'
import { sizeController } from '../controllers/size.controller.js';

const router = Router();

router.post('/create', sizeController.create)
router.get('/sizes/:category_id', sizeController.getSizesByCategory);
router.put('/update/:_id', sizeController.update)

export default router;