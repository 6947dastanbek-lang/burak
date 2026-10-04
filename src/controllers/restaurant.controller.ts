import { Request, Response } from "express";

import { T } from "../libs/types/common";

import { MemberInput, LoginInput, AdminRequest } from "../libs/types/member";
// MemberInput → signup paytida keladigan member ma'lumotlari

import { MemberStatus, MemberType } from "../libs/enums/member.enum";
// MemberStatus → memberning holati (ACTIVE, ...)
// MemberType → member qanday turdagi user ekanini bildiradi

import MemberService from "../models/Member.service";
import Errors, { Message } from "../libs/Errors";
// MemberService → signup bilan bog'liq database/business logic shu yerda

const restaurantController: T = {};
// restaurantController → Restaurant/Admin uchun controller object

restaurantController.goHome = (req: Request, res: Response) => {
    // goHome → /admin sahifasi uchun controller

    try {
        console.log("goHome");

        res.render("home");
        // browserga "Home Page" yuboramiz
    } catch (err) {
        console.log("Error, goHome:", err);
        // xato bo'lsa terminalga chiqaramiz
        res.redirect("/admin");
    }
};

restaurantController.getSignup = (req: Request, res: Response) => {
    // getSignup → /admin/signup sahifasi

    try {
        console.log("getSignup");

        res.render("signup");
        // browserga Signup Page yuboramiz
    } catch (err) {
        console.log("Error, getSignup:", err);
        res.redirect("/admin");
    }
};
restaurantController.getLogin = (req: Request, res: Response) => {
    // getLogin → /admin/login sahifasi

    try {
        console.log("getLogin");

        res.render("login");
        // browserga Login Page yuboramiz
    } catch (err) {
        console.log("Error, getLogin:", err);
        res.redirect("/admin");
    }
};
restaurantController.processSignup = async (
    req: AdminRequest,
    res: Response,
) => {
    // processSignup → signup formdan kelgan POST requestni ishlaydi

    try {
        console.log("processSignup");
        // terminalga processSignup ishlaganini chiqaramiz

        console.log("body:", req.body);
        // req.body → Postman/form orqali kelgan ma'lumotlar

        const newMember: MemberInput = req.body;
        // req.body'dagi ma'lumotlarni newMember'ga olamiz
        // MemberInput → ma'lumotlarning TypeScript structure'i
        newMember.memberType = MemberType.RESTAURANT;
        // signup qilayotgan memberning turini RESTAURANT qilib belgilaymiz
        newMember.memberStatus = MemberStatus.ACTIVE;
        // yangi memberning statusini ACTIVE qilib belgilaymiz
        const memberService = new MemberService();
        // MemberService objectini yaratamiz
        // database bilan ishlashni Service'ga topshiramiz

        const result = await memberService.processSignup(newMember);
        // Service'MODELga newMember yuboramiz
        // Service MongoDB'ga yangi member yaratadi
        // result → database'dan qaytgan yangi member

        // TODO:SESSIONS AUTHENTICATION🛑
        req.session.member = result;
        req.session.save(function () {
            res.send(result);
        });

        // result'ni client/Postman'ga qaytaramiz
    } catch (err) {
        console.log("Error, processSignup:", err);
        // signup vaqtida xato chiqsa terminalga chiqaramiz
        const message =
            err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
        res.send(
            `<script>alert ("${message}"); window.location.replacee('admin/signup')</script>`,
        );
    }
};
restaurantController.processLogin = async (
    req: AdminRequest,
    res: Response,
) => {
    try {
        console.log("body:", req.body);

        const input: LoginInput = req.body;

        const memberService = new MemberService();

        const result = await memberService.processLogin(input);
        // TODO:SESSIONS AUTHENTICATION 🛑
        req.session.member = result;
        req.session.save(function () {
            res.send(result);
        });
    } catch (err) {
        console.log("Error, processLogin:", err);
        const message =
            err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
        res.send(
            `<script>alert ("${message}"); window.location.replacee('admin/login')</script>`,
        );
    }
};
restaurantController.logout = async (req: AdminRequest, res: Response) => {
    try {
        console.log("logout");
        req.session.destroy(function () {
            res.redirect("/admin"); //sent | redirect | json |render
        });
    } catch (err) {
        console.log("Error, logout:", err);
        res.redirect("/admin");
    }
};
restaurantController.checkAuthSession = async (
    req: AdminRequest,
    res: Response,
) => {
    try {
        console.log("checkAuthSession");
        if (req.session?.member)
            res.send(
                `<script>alert ("${req.session.member.memberNick}")</script>`,
            );
        else
            res.send(`<script>alert ("${Message.NOT_AUTHENTICATED}")</script>`);
    } catch (err) {
        console.log("Error, checkAuthSession:", err);
        res.send(err);
    }
};
export default restaurantController;
// boshqa fayllarda restaurantController'dan foydalanish uchun export qilamiz
