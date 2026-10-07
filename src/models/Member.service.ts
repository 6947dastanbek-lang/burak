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
    /** SPA  ⬇️ **/
    public async signup(input: MemberInput): Promise<Member> {
        const salt = await bcrypt.genSalt();
        input.memberPassword = await bcrypt.hash(input.memberPassword, salt);
        try {
            const result = await this.memberModel.create(input);
            result.memberPassword = "";
            return result.toJSON();
        } catch (err) {
            console.error("Error, model:signup", err);
            throw new Errors(HttpCode.BAD_REQUEST, Message.USED_NICK_PHONE);
        }
    }
    public async login(input: LoginInput): Promise<Member> {
        // TODO: Consider member status later
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
        if (!member)
            throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);
        const isMatch = await bcrypt.compare(
            input.memberPassword,
            member.memberPassword,
        );
        if (!isMatch) {
            throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);
        }
        return await this.memberModel.findById(member._id).lean().exec();
    }

    /** SSR ⬇️ **/
    public async processSignup(input: MemberInput): Promise<Member> {
        if (!input.memberNick || !input.memberPhone || !input.memberPassword) {
            // kerakli ma'lumotlardan biri yo'q bo'lsa
            throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
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
        } catch (err) {
            throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
            // o'zimizning custom Error'ni chiqaramiz
        }
    }
    public async processLogin(input: LoginInput): Promise<Member> {
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
        if (!member) {
            throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);
        }
        // Kiritilgan passwordni database'dagi
        // hash password bilan solishtiramiz
        const isMatch = await bcrypt.compare(
            input.memberPassword,
            member.memberPassword,
        );
        if (!isMatch) {
            throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);
        }
        return await this.memberModel.findById(member._id).exec();
    }
}

export default MemberService;
