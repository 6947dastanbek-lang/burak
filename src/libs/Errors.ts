export enum HttpCode {
    OK = 200,
    CREATED = 201,
    NOT_MODIFIED = 304,
    // NOT_MODIFIED → ma'lumot o‘zgarmagan
    BAD_REQUEST = 400,
    // BAD_REQUEST → client noto‘g‘ri request yubordi
    UNAUTHORIZED = 401,
    // UNAUTHORIZED → authentication kerak
    FORBIDDEN = 403,
    // FORBIDDEN → ruxsat yo‘q
    NOT_FOUND = 404,
    // NOT_FOUND → kerakli ma'lumot topilmadi
    INTERNAL_SERVER_ERROR = 500,
    // INTERNAL_SERVER_ERROR → server ichida xato
}

export enum Message {
    SOMETHING_WENT_WRONG = "Something went wrong!",
    // umumiy xato
    NO_DATA_FOUND = "No data is found!",
    // ma'lumot topilmadi
    USED_NICK_PHONE = "You are inserting already used nick or phone!",
    NO_MEMBER_NICK = "No member with that member nick",
    WRONG_PASSWORD = "Wrong password, please try again!",
    CREATE_FAILED = "Create is failed!",
    UPDATE_FAILED = "Update is failed!",
    NOT_AUTHENTICATED = "You are not authenticated,Please login first",
}
class Errors extends Error {
    // Errors → o‘zimiz yaratgan custom error class
    //
    // extends Error
    // ↓
    // JavaScriptdagi Error classidan meros olmoqda

    public code: HttpCode;
    // code → HTTP status code saqlaydi
    // masalan: 404

    public message: Message;
    // message → xato matnini saqlaydi
    // masalan: "No data is found!"
    static standard = {
        code: HttpCode.INTERNAL_SERVER_ERROR,
        message: Message.SOMETHING_WENT_WRONG,
    };

    constructor(statusCode: HttpCode, statusMessage: Message) {
        // constructor → Errors object yaratilganda ishlaydi
        //
        // statusCode → 404 kabi code
        // statusMessage → "No data is found!" kabi message

        super();
        // parent Error class constructorini chaqiradi

        this.code = statusCode;
        // kelgan statusCode'ni object ichidagi code'ga saqlaydi

        this.message = statusMessage;
        // kelgan statusMessage'ni object ichidagi message'ga saqlaydi
    }
}
export default Errors;
