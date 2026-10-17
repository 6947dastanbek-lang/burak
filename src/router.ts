import express, { Request, Response } from "express";
// express → router yaratish uchun
const router = express.Router();
// express.Router() → yangi Router yaratadi
// router → URL'larni controller'lar bilan bog‘lash uchun ishlatiladi
import memberController from "./controllers/member.controller";

router.post("/login", memberController.login);
router.post("/signup", memberController.signup);

export default router;
