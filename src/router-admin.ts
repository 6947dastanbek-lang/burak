import express from "express";
// express → Express framework

const routerAdmin = express.Router();
// admin uchun alohida Router yaratdik

import restaurantController from "./controllers/restaurant.controller";
// restaurantController'ni controller faylidan olib keldik

routerAdmin.get("/", restaurantController.goHome);
// GET "/" → restaurantController.goHome ishlaydi

routerAdmin
    .get("/login", restaurantController.getLogin)
    .post("/login", restaurantController.processLogin);
// GET "/login" → restaurantController.getLogin ishlaydi

// ENG MUHIM:
// GET /login → login sahifasini ko‘rsatadi
// POST /loginProcess → login ma'lumotlarini QABUL QILIB, qayta ishlaydi

routerAdmin
    .get("/signup", restaurantController.getSignup)
    .post("/signup", restaurantController.processSignup);
// GET "/signup" → restaurantController.getSignup ishlaydi
routerAdmin.get("/logout", restaurantController.logout);
routerAdmin.get("/check-me", restaurantController.checkAuthSession);

export default routerAdmin;
// routerAdmin'ni boshqa faylda ishlatish uchun export qilamiz
