import dotenv from "dotenv";
// dotenv → .env faylidagi environment variable'larni o‘qish uchun ishlatiladi

dotenv.config();
// .env ichidagi qiymatlarni process.env ichiga yuklaydi

import mongoose from "mongoose";
// mongoose → MongoDB bilan ishlash uchun library

import app from "./app";
// ./app → app.ts faylidan app obyektini olib keladi

mongoose
    .connect(process.env.MONGO_URL as string, {})
    // as string → TypeScript'ga "bu qiymat string" deb aytyapmiz
    .then((data) => {
        // data → ulanishdan qaytgan ma'lumot
        console.log("MongoDB connection succeed");
        const PORT = process.env.PORT ?? 3003;
        // ?? → agar PORT null yoki undefined bo‘lsa
        // 3003 → default qiymat sifatida ishlatiladi
        app.listen(PORT, function () {
            // app.listen() → serverni ishga tushiradi
            // PORT → server qaysi portda ishlashini bildiradi
            // function() → server ishga tushgandan keyin bajariladi

            console.log(`The server is running successfully on port: ${PORT}`);
            // server muvaffaqiyatli ishga tushganini ko‘rsatadi
        });
    })

    .catch((err) => console.log("ERROR on connection MongoDB", err));
