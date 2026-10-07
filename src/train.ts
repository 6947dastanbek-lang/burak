/*
 * Project Standards
 *
 * - Logging standards => har methoddi log qiliw
 * - Naming standards
 *      function, method, variable → CAMEL =>getLogin
 *      class → PASCAL => MemberService
 *      folder → KEBAB => member-controller
 *      css → SNAKE =>
 * - Error handling =>
 */
/*
Traditional API => BSSR  (ADMIN)=> EJS
Rest API => SPA => REACT (USER'S application)
 GrapQL API =>
 */
//MITASK
//M-TASK✅

// function getSquareNumbers(
//     numbers: number[],
// ): { number: number; square: number }[] {
//     // function objectlardan iborat array qaytaradi

//     return numbers.map((number) => ({
//         // arraydagi HAR BIR number new object

//         number: number,

//         square: number ** 2,
//     }));
// }

// console.log(getSquareNumbers([1, 2, 3]));

//N-TASK✅
// function palindromCheck(word: string): boolean {
//     const reversedWord = word.split("").reverse().join("");

//     return word === reversedWord; //ikki qiymat bir xilmi?
// }

// console.log(palindromCheck("dad"));
// console.log(palindromCheck("son"));
// console.log(palindromCheck("level"));

//O-TASK✅
// function calculateSumOfNumbers(arr: unknown[]): number {
//     // unknown[] → array ichida har xil type bo‘lishi mumkin
//     // : number → function oxirida number qaytaradi

//     let som = 0;
//     for (let value of arr) {
//         // arr ichidagi har bir elementni bittadan value ga olamiz
//         if (typeof value === "number") {
//             // agar value number bo‘lsa, ichidagi kod ishlaydi
//             som += value;

//             // faqat number bo‘lgan qiymatni yig‘indiga qo‘shamiz
//         }
//     }
//     return som;
// }

// console.log(calculateSumOfNumbers([10, "10", { son: 10 }, true, 35]));
//P-TASK ✅
// function objectToArray(obj: object): any[][] {
//     return Object.entries(obj);
// }

// console.log(objectToArray({ a: 10, b: 20 }));

// //Q-TASK ✅
// function hasProperty(obj: object, property: string): boolean {
//     return property in obj;
// }

// console.log(hasProperty({ name: "BMW", model: "M3" }, "model")); // true

// console.log(hasProperty({ name: "BMW", model: "M3" }, "year")); // false

//R-TASK ✅
function calculate(str: string): number {
    return str
        .split("+") //boledi
        .map(Number) // nomer qiladi
        .reduce((son1, son2) => son1 + son2); //
}

console.log(calculate("10+9"));
console.log(calculate("90+7"));
/*
app.ts⬇️
import session from "express-session";
import ConnectMongoDB from "connect-mongodb-session";
const MongoDBStore = ConnectMongoDB(session);

const store = new MongoDBStore({
    uri: String(process.env.MONGO_URL),
    collection: "sessions",
});
app.use(
    session({
        secret: String(process.env.SESSION_SECRET),
        cookie: {
            maxAge: 1000 * 3600 * 6, //6 hrs
        },
        store: store,
        resave: true,
        saveUninitialized: true,
    }),
); */
/*
restaurant-controller.ts ⬇️

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
};*/
/*

*/
