import { Router } from "express";
import { postController } from "../controllers/postController";

const router = Router()

router.get('/', postController.getPosts)

export default router