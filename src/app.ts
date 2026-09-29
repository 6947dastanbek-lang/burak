import express from "express";

import path from "path";
import routerAdmin from "./router-admin";
import router from "./router";
import morgan from "morgan";
// morgan → serverga kelayotgan requestlarni terminalda ko‘rsatadi

import { MORGAN_FORMAT } from "./libs/config";
// MORGAN_FORMAT → Morgan qanday formatda log chiqarishini belgilaydi
// /**1-ENTRANCE**/
const app = express();

app.use(express.static(path.join(__dirname, "public"))); // joldi sizip beredetugin Node js modeli //public ishindegi static fayllardi browserge ber
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan(MORGAN_FORMAT));
/** 2-SESSIONS **/
/** 3-VIEWS **/
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
/** 4-ROUTERS **/
app.use("/admin", routerAdmin); //SSR:EJS
app.use("/", router); //SPA:REACT
export default app;
