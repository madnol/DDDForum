import { Router } from 'express';
import { userController } from '../controllers/userController';
const router = Router();

router.post('/new', userController.createUser);

router.put('/edit/:userId', userController.editUser);

router.get('/', userController.getUserByEmail);

export default router;