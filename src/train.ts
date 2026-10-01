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
//MITASK
//N-TASK✅
// function palindromCheck(word: string): boolean {
//     const reversedWord = word.split("").reverse().join("");

//     return word === reversedWord; //ikki qiymat bir xilmi?
// }

// console.log(palindromCheck("dad"));
// console.log(palindromCheck("son"));
// console.log(palindromCheck("level"));
//MITASK
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
//MITASk
//P-TASK ✅
function objectToArray(obj: object): any[][] {
    return Object.entries(obj);
}

console.log(objectToArray({ a: 10, b: 20 }));
