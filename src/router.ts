import express, { Request, Response } from "express";
// express → router yaratish uchun
// Request → kelayotgan request (so‘rov)ning TypeScript type'i
// Response → server yuboradigan response (javob)ning TypeScript type'i

const router = express.Router();
// express.Router() → yangi Router yaratadi
// router → URL'larni controller'lar bilan bog‘lash uchun ishlatiladi

import memberController from "./controllers/member.controller";
// memberController → member.controller.ts faylidan controller'ni olib kelamiz



router.post("/login", memberController.login);
router.post("/signup", memberController.signup);


export default router;
