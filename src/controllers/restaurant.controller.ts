import { NextFunction, Request, Response } from "express";

import { T } from "../libs/types/common";

import { MemberInput, LoginInput, AdminRequest } from "../libs/types/member";
// MemberInput → signup paytida keladigan member ma'lumotlari

import { MemberStatus, MemberType } from "../libs/enums/member.enum";
// MemberStatus → memberning holati (ACTIVE, ...)
// MemberType → member qanday turdagi user ekanini bildiradi

import MemberService from "../models/Member.service";
import Errors, { Message } from "../libs/Errors";
// MemberService → signup bilan bog'liq database/business logic shu yerda
const memberService = new MemberService();
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
    req: AdminRequest, //member.ts interface qildiq
    res: Response,
) => {
    try {
        console.log("processSignup");
        console.log("body:", req.body);
        const newMember: MemberInput = req.body;
        // MemberInput → ma'lumotlarning TypeScript structure'i
        newMember.memberType = MemberType.RESTAURANT;
        // signup qilayotgan memberning turini RESTAURANT qilib belgilaymiz

        // MemberService objectini yaratamiz
        // database bilan ishlashni Service'ga topshiramiz

        const result = await memberService.processSignup(newMember);
        // Service'MODELga newMember yuboramiz
        // Service MongoDB'ga yangi member yaratadi
        // result → database'dan qaytgan yangi member
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

        const result = await memberService.processLogin(input);
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
restaurantController.verifyRestaurant = (
    req: AdminRequest,
    res: Response,
    next: NextFunction,
) => {
    if (req.session?.member?.memberType === MemberType.RESTAURANT) {
        req.member = req.session.member;
        next();
    } else {
        const message = Message.NOT_AUTHENTICATED;
        res.send(
            `<script>alert ("${message}");window.location.replace('/admin/login'); </script>`,
        );
    }
};

export default restaurantController;
