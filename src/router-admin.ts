import express from "express";
// express → Express framework

const routerAdmin = express.Router();
// admin uchun alohida Router yaratdik

import restaurantController from "./controllers/restaurant.controller";
import productController from "./controllers/product.controller";
// restaurantController'ni controller faylidan olib keldik

routerAdmin.get("/", restaurantController.goHome);

routerAdmin
    .get("/login", restaurantController.getLogin)
    .post("/login", restaurantController.processLogin);

// ENG MUHIM:
// GET /login → login sahifasini ko‘rsatadi
// POST /loginProcess → login ma'lumotlarini QABUL QILIB, qayta ishlaydi

routerAdmin
    .get("/signup", restaurantController.getSignup)
    .post("/signup", restaurantController.processSignup);

routerAdmin.get("/logout", restaurantController.logout);
routerAdmin.get("/check-me", restaurantController.checkAuthSession);

/**Product */
routerAdmin.get(
    "/product/all",
    restaurantController.verifyRestaurant,
    productController.getAllProducts,
);
routerAdmin.post(
    "/product/create",
    restaurantController.verifyRestaurant,
    productController.createNewProduct,
);
routerAdmin.post(
    "/product/:id",
    restaurantController.verifyRestaurant,
    productController.updateChosenProduct,
);

/**User */
export default routerAdmin;
