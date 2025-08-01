//Deposit the money
//Determine number of lines to bet on 
//collect a bet
//spin in a slot machine
//check if user won
//give the user there winnnings
//play again

const prompt = require("prompt-sync")();
const Deposit = () => {
    while (true) {
        const depositAmount = prompt(" Enter the Deposit Amount: ");
        const numberDepositAmount = parseFloat(depositAmount);
        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
            console.log("Invalid Amount");
        }else{
            return numberDepositAmount;
        }
    }

};

const ChosenLines = () =>{
    while (true) {
        const ChoosenLines = prompt(" Enter the Number of Lines to Bet : ");
        const NumberedChoosen = parseFloat(ChoosenLines);
        if (isNaN(NumberedChoosen) ||NumberedChoosen<=0 ||NumberedChoosen >= 4) {
            console.log("Invalid Lines");
        }else{
            return ChoosenLines;
        }
    }
};

const BetGet = (depositBal,lines)=>{
    while (true) {
        const ChoosenBetAmount = prompt(" Enter the amount of bet : ");
        const BetAmount = parseFloat(ChoosenBetAmount);
        if (isNaN(BetAmount) ||BetAmount>depositBal/lines||BetAmount<=0) {
            console.log("Invalid Lines");
        }else{
            return BetAmount;
        }
    }
};


let depositBal=Deposit();
const lines=ChosenLines();
const bet=BetGet(depositBal,lines);