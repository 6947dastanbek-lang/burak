import express from "express";
// express → Express framework

const routerAdmin = express.Router();
// admin uchun alohida Router yaratdik

import restaurantController from "./controllers/restaurant.controller";
// restaurantController'ni controller faylidan olib keldik

routerAdmin.get("/", restaurantController.goHome);
// GET "/" → restaurantController.goHome ishlaydi

routerAdmin.get("/login", restaurantController.getLogin);
// GET "/login" → restaurantController.getLogin ishlaydi

routerAdmin.get("/signup", restaurantController.getSignup);
// GET "/signup" → restaurantController.getSignup ishlaydi

export default routerAdmin;
// routerAdmin'ni boshqa faylda ishlatish uchun export qilamiz
