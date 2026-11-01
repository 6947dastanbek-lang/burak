import express, { Request, Response } from "express";
// express → router yaratish uchun
const router = express.Router();
// express.Router() → yangi Router yaratadi
// router → URL'larni controller'lar bilan bog‘lash uchun ishlatiladi
import memberController from "./controllers/member.controller";
import uploader from "./libs/utils/uploader";

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
router.post(
    "/member/update",
    memberController.verifyAuth,
    uploader("members").single("memberImage"),
    memberController.updateMember,
);
router.get("/member/top-users", memberController.getTopUsers);
/**PRODUCT**/
/**ORDER**/
export default router;
