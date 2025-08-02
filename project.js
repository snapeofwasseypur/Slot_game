//Deposit the money
//Determine number of lines to bet on 
//collect a bet
//spin in a slot machine
//check if user won
//give the user there winnnings
//play again

const prompt = require("prompt-sync")();

const ROLS = 3;
const COLS = 3;
const SYMBOL_COUNT = {
    "A": 3,
    "B": 4,
    "C": 6,
    "D": 8
}
const SYMBOL_VALUES = {
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2
}

//spin
const Spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOL_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }

    const reels = [];
    for (let i = 0; i < COLS; i++) {
        reels.push([]);
        const reelSymbols = [...symbols];
        for (let j = 0; j < ROLS; j++) {
            const RandomIndex = Math.floor(Math.random() * reelSymbols.length);
            const SelectSymbol = reelSymbols[RandomIndex];
            reels[i].push(SelectSymbol);
            reelSymbols.splice(RandomIndex, 1);
        }
    }
    return reels;
};

//transpose to represent
const Transpose = (reels) => {
    const rows = [];

    for (let i = 0; i < ROLS; i++) {
        const row = [];
        for (let j = 0; j < COLS; j++) {
            row.push(reels[j][i]);
        }
        rows.push(row);
    }
    return rows;
};

//print nicely
const printRows = (rows) => {
    for (const row of rows) {
        let rowString = "";
        for (const [i, symbol] of row.entries()) {
            rowString += symbol;
            if (i != row.length - 1) {
                rowString += " | "
            }
        }
        console.log(rowString);
    }
};

//deposit amount
const Deposit = () => {
    while (true) {
        const depositAmount = prompt(" Enter the Deposit Amount: ");
        const numberDepositAmount = parseFloat(depositAmount);
        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
            console.log("Invalid Amount");
        } else {
            return numberDepositAmount;
        }
    }

};

//chosenbet
const ChosenLines = () => {
    while (true) {
        const ChoosenLines = prompt(" Enter the Number of Lines to Bet (1-3) : ");
        const NumberedChoosen = parseFloat(ChoosenLines);
        if (isNaN(NumberedChoosen) || NumberedChoosen <= 0 || NumberedChoosen >= 4) {
            console.log("Invalid Lines");
        } else {
            return ChoosenLines;
        }
    }
};

//no lines to bet
const BetGet = (depositBal, lines) => {
    while (true) {
        const ChoosenBetAmount = prompt(" Enter the amount of bet per line : ");
        const BetAmount = parseFloat(ChoosenBetAmount);
        if (isNaN(BetAmount) || BetAmount > depositBal / lines || BetAmount <= 0) {
            console.log("Invalid Lines");
        } else {
            return BetAmount;
        }
    }
};
//getwinnings
const getWinnings = (transpose, bet, lines) => {
    let winnnings = 0;
    for (let row = 0; row < lines; row++) {
        const symbols = transpose[row];
        let allsame = true;

        for (const symbol of symbols) {
            if (symbol != symbols[0]) {
                allsame = false;
                break;
            }
        }
        if (allsame) {
            winnnings += bet * SYMBOL_VALUES[symbols[0]];
        }
    }
    return winnnings;
};


const game = () => {
    let depositBal = Deposit();

    while (true) {
        console.log("you have a balance of $" + depositBal);
        const lines = ChosenLines();

        const bet = BetGet(depositBal, lines);
        depositBal -= bet * lines;
        const reels = Spin();
        console.log(reels);

        const transpose = Transpose(reels)
        console.log(transpose);

        const PrintRows = printRows(transpose);

        const winnnings = getWinnings(transpose, bet, lines);
        console.log("you win $" + winnnings.toString());
        if (depositBal <= 0) {
            console.log("you ran out of money! ");
            break;
        }
        const playagain = prompt("Do you want to play again Y/N?");
        if (playagain != "Y") {
            break;
        }
    }
};
game();

