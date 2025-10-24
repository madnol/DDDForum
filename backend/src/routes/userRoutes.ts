import { Router } from 'express';
const router = Router();

router.post('/new', async (req, res) => {
    // ... (spostato dal file principale)
});

router.post('/edit/:userId', async (req, res) => {
    // ... (spostato dal file principale)
});

router.get('/', async (req, res) => {
    // ... (spostato dal file principale)
});

export default router;