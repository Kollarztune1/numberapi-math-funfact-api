import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 3000;
const NUMBERS_API_BASE_URL = "http://numbersapi.com";

app.use(cors());


const checkArmstrong = (num) => {
    const digits = num.toString().split("").map(Number);
    const power = digits.length;
    const sum = digits.reduce((acc, digit) => acc + Math.pow(digit, power), 0);
    return sum === num;
};


const checkPrime = (num) => {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
};


const checkPerfect = (num) => {
    let sum = 0;
    for (let i = 1; i < num; i++) {
        if (num % i === 0) sum += i;
    }
    return sum === num;
};


const sumDigits = (num) => {
    return num
        .toString()
        .split("")
        .reduce((sum, digit) => sum + parseInt(digit), 0);
};

app.get("/api/classify-number", async (req, res) => {
    const num = req.query.number;

    
    if (!num || !/^-?\d+$/.test(num)) {
        return res.status(400).json({
            number: num || "undefined",
            error: true
        });
    }

    const number = parseInt(num, 10);
    const isArmstrong = checkArmstrong(number);
    const isPrime = checkPrime(number);
    const isPerfect = checkPerfect(number);
    const digitSum = sumDigits(number);
    const isOdd = number % 2 !== 0;

    let properties = [];
    if (isArmstrong) properties.push("armstrong");
    if (isOdd) properties.push("odd");
    else properties.push("even");

    let funFact = `No fun fact available for ${number}.`;

    try {
        
        const response = await axios.get(`${NUMBERS_API_BASE_URL}/${number}/math`);
        funFact = response.data;
    } catch (error) {
        console.error("Error fetching fun fact:", error.message);
    }

    
    if (isArmstrong) {
        const digits = number.toString().split("").map(Number);
        const power = digits.length;
        const armstrongEquation = digits.map(d => `${d}^${power}`).join(" + ");
        funFact = `${number} is an Armstrong number because ${armstrongEquation} = ${number} // gotten from the Numbers API`;
    }

    res.json({
        number,
        is_prime: isPrime,
        is_perfect: isPerfect,
        properties,
        digit_sum: digitSum,
        fun_fact: funFact,
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
