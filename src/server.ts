console.log("EXECUTED");

// setInterval(() => {
//     console.log("RUNNING");
// }, 1000);
import moment from "moment";
const time = moment().format("YYYY MM DD");
console.log(time);

const person: string = "Ali";
const count: number = 29;

// Architectural pattern: MVC, DI, MVP. //(butun application'ni qanday katta qismlarga bo‘lib tashkil qilish usuli)
// MVC ✅ ⬇️
// Model (data/database bilan ishlaydigan qism)
// View (foydalanuvchiga ko‘rinadigan qism)
// Controller (requestni qabul qilib, nima qilish kerakligini boshqaradigan qism)

// Design pattern: Middleware, Decorator  //(kod ichidagi ma'lum bir muammoni yechish uchun ishlatiladigan tayyor/tavsiya etilgan struktura)
/*Middleware ✅
(request va response orasida ishlaydigan qo‘shimcha funksiya)

Decorator ✅
(class yoki methodga qo‘shimcha xususiyat/xatti-harakat qo‘shish usuli) */
