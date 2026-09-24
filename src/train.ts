//MITASK
//M-TASK

function getSquareNumbers(
    numbers: number[],
): { number: number; square: number }[] {
    // function objectlardan iborat array qaytaradi

    return numbers.map((number) => ({
        // arraydagi HAR BIR number new object

        number: number,

        square: number ** 2,
    }));
}

console.log(getSquareNumbers([1, 2, 3]));
