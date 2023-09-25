import {Router} from 'express'
import { categoryController } from '../controllers/category.controller.js';

const router = Router();

router.get('/categories', categoryController.getAllCategories)
router.post('/create', categoryController.create);
router.put('/update/:_id', categoryController.update);
router.delete('/delete/:_id', categoryController.delete);
router.delete('/deleteAll', categoryController.deleteAll);




export default router;