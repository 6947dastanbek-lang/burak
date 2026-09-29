import { Request, Response } from "express";

import { T } from "../libs/types/common";

import { MemberInput } from "../libs/types/member";
// MemberInput → signup paytida keladigan member ma'lumotlari

import { MemberStatus, MemberType } from "../libs/enums/member.enum";
// MemberStatus → memberning holati (ACTIVE, ...)
// MemberType → member qanday turdagi user ekanini bildiradi

import MemberService from "../models/Member.service";
// MemberService → signup bilan bog'liq database/business logic shu yerda

const restaurantController: T = {};
// restaurantController → Restaurant/Admin uchun controller object

restaurantController.goHome = (req: Request, res: Response) => {
    // goHome → /admin sahifasi uchun controller

    try {
        console.log("goHome");

        res.send("Home Page");
        // browserga "Home Page" yuboramiz
    } catch (err) {
        console.log("Error, goHome:", err);
        // xato bo'lsa terminalga chiqaramiz
    }
};

restaurantController.getLogin = (req: Request, res: Response) => {
    // getLogin → /admin/login sahifasi

    try {
        console.log("getLogin");

        res.send("Login Page");
        // browserga Login Page yuboramiz
    } catch (err) {
        console.log("Error, getLogin:", err);
    }
};

restaurantController.getSignup = (req: Request, res: Response) => {
    // getSignup → /admin/signup sahifasi

    try {
        console.log("getSignup");

        res.send("Signup Page");
        // browserga Signup Page yuboramiz
    } catch (err) {
        console.log("Error, getSignup:", err);
    }
};

restaurantController.processLogin = (req: Request, res: Response) => {
    // processLogin → login qilish uchun kelgan POST requestni qabul qiladi

    try {
        console.log("processLogin");

        res.send("DONE");
        // hozircha login logic yozilmagan
        // shuning uchun faqat DONE yuboryapmiz
    } catch (err) {
        console.log("Error, processLogin:", err);
    }
};

restaurantController.processSignup = async (req: Request, res: Response) => {
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
        // Service'ga newMember yuboramiz
        // Service MongoDB'ga yangi member yaratadi
        // result → database'dan qaytgan yangi member

        res.send(result);
        // result'ni client/Postman'ga qaytaramiz
    } catch (err) {
        console.log("Error, processSignup:", err);
        // signup vaqtida xato chiqsa terminalga chiqaramiz
    }
};

export default restaurantController;
// boshqa fayllarda restaurantController'dan foydalanish uchun export qilamiz
