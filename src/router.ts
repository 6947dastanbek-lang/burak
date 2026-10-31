import express, { Request, Response } from "express";
// express → router yaratish uchun
const router = express.Router();
// express.Router() → yangi Router yaratadi
// router → URL'larni controller'lar bilan bog‘lash uchun ishlatiladi
import memberController from "./controllers/member.controller";

/**MEMBER**/

router.post("/member/login", memberController.login);
router.post("/member/signup", memberController.signup);
router.post(
    "/member/logout",
    memberController.verifyAuth,
    memberController.logout,
);
router.get(
    "/member/detail",
    memberController.verifyAuth,
    memberController.getMemberDetail,
);
/**PRODUCT**/
/**ORDER**/
export default router;
