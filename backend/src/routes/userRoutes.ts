import { Router } from 'express';
import { userController } from '../controllers/userController';
const router = Router();

router.post('/new', userController.createUser);

router.post('/edit/:userId', async (req, res) => {
    // ... (spostato dal file principale)
});

router.get('/', async (req, res) => {
    // ... (spostato dal file principale)
});

export default router;