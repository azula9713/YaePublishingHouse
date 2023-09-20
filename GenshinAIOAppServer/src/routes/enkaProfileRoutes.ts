import { Router } from "express";

import { genEnkaProfile } from "../controllers/EnkaProfile";

const router = Router();

router.route("/:genshinUID").get(genEnkaProfile);

export default router;
