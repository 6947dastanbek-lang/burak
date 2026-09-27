import mongoose, { Schema } from "mongoose";

// Schema → Member document qanday tuzilishda bo‘lishini belgilaydi

import { MemberStatus, MemberType } from "../libs/enums/member.enum";

const memberSchema = new Schema(
    // Schema → MongoDB'dagi Member ma'lumotining strukturasi

    {
        memberType: {
            type: String,
            enum: MemberType,
            default: MemberType.USER,
        },
        memberStatus: {
            type: String,
            enum: MemberStatus,
            default: MemberStatus.ACTIVE,
        },
        memberNick: {
            type: String,
            // memberNick → username/nickname
            index: { unique: true, sparse: true },
            // unique: true → ikkita member bir xil nick bilan bo‘la olmaydi
            // sparse: true → qiymati yo‘q fieldlar unique tekshiruviga kiritilmaydi
            required: true,
        },
        memberPhone: {
            type: String,
            index: { unique: true, sparse: true },
            // unique → bir xil telefon raqami takrorlanmaydi
            // sparse → qiymat bo‘lmagan documentlar unique tekshiruviga kiritilmaydi
            required: true,
        },
        memberPassword: {
            type: String,
            select: false,
            // select: false → database'dan memberni olganda password
            // odatiy holatda natijaga qo‘shilmaydi
            required: true,
        },
        memberAddress: {
            type: String,
        },
        memberDesc: {
            type: String,
            // member haqida description
        },
        memberImage: {
            type: String,
            // member rasmi odatda image URL/path sifatida String bo‘ladi
        },
        memberPoints: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true },
    // timestamps → Mongoose avtomatik:
    // createdAt → qachon yaratilgan
    // updatedAt → qachon oxirgi marta o‘zgargan
);

// Model yaratamiz
// "Member" → MongoDB'dagi Member collection bilan ishlash uchun model
// memberSchema → yuqorida yaratgan schema
export default mongoose.model("Member", memberSchema);
