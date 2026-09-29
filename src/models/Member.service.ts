import MemberModel from "../schema/Member.model";
import { MemberInput } from "../libs/types/member";
import { Member } from "../libs/types/member";
import Errors, { HttpCode, Message } from "../libs/Errors";

class MemberService {
    private memberModel;

    constructor() {
        this.memberModel = MemberModel;
    }

    public async processSignup(input: MemberInput): Promise<Member> {
        // input → Controller'dan kelgan signup ma'lumotlari

        if (!input.memberNick || !input.memberPhone || !input.memberPassword) {
            // kerakli ma'lumotlardan biri yo'q bo'lsa

            throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
            // BAD_REQUEST = 400
            // CREATE_FAILED = yaratish amalga oshmadi
        }

        try {
            const result = await this.memberModel.create(input);
            // MongoDB'ga yangi Member yaratamiz

            result.memberPassword = "";
            // passwordni response'dan olib tashlaymiz

            return result;
            // Controller'ga result qaytadi
        } catch (err) {
            throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
            // Database'da xato bo'lsa,
            // o'zimizning custom Error'ni chiqaramiz
        }
    }
}

export default MemberService;
