import MemberModel from "../schema/Member.model";
import { LoginInput, Member, MemberInput } from "../libs/types/member";

import Errors, { HttpCode, Message } from "../libs/Errors";
import { MemberType } from "../libs/enums/member.enum";

// passwordni hash qilish va tekshirish uchun
import * as bcrypt from "bcryptjs";

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

        const exist = await this.memberModel
            .findOne({ memberType: MemberType.RESTAURANT })
            .exec();

        if (exist) {
            throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
        }
        // Passwordni database'ga yuborishdan oldin hash qilamiz
        const salt = await bcrypt.genSalt();

        input.memberPassword = await bcrypt.hash(input.memberPassword, salt);

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

    // Login qilish uchun
    public async processLogin(input: LoginInput): Promise<Member> {
        // MongoDB'dan memberNick bo'yicha member qidiramiz
        const member = await this.memberModel
            .findOne(
                {
                    memberNick: input.memberNick,
                },
                {
                    memberNick: 1,
                    memberPassword: 1,
                },
            )
            .exec();

        // Member topilmasa
        if (!member) {
            throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);
        }

        // Kiritilgan passwordni database'dagi
        // hash password bilan solishtiramiz
        const isMatch = await bcrypt.compare(
            input.memberPassword,
            member.memberPassword,
        );

        // Password noto'g'ri bo'lsa
        if (!isMatch) {
            throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);
        }

        // Hammasi to'g'ri bo'lsa memberni qaytaramiz
        return await this.memberModel.findById(member._id).exec();
    }
}

export default MemberService;
