const inquirer = require("inquirer");

function greetings() {
  console.log("Welcome to my simple calculator");
}

async function getNumber(): Promise<number> {
  const number = await inquirer.prompt({
    type: "number",
    name: "firstNum",
    message: "Enter the Number",
    default() {
      return 0;
    },
  });

  return number.firstNum;
}
async function getOperator(): Promise<string> {
  const operator = await inquirer.prompt({
    type: "list",
    name: "operator",
    message: "Enter the Operator",
    choices: ["+", "-", "*", "/"],
    default() {
      return "+";
    },
  });

  return operator.operator;
}

function doCalculation(
  number: number,
  secondNumber: number,
  operator: string
): number {
  let result = 0;
  switch (operator) {
    case "+":
      result = number + secondNumber;
      break;
    case "-":
      result = number - secondNumber;
      break;
    case "*":
      result = number * secondNumber;
      break;
    case "/":
      result = number / secondNumber;
      break;
    default:
      result = number + secondNumber;
      break;
  }

  return result;
}

async function reCalculate(): Promise<boolean> {
  const result = await inquirer.prompt({
    type: "list",
    name: "choice",
    message: "Calculate again?",
    choices: ["Yes", "No"],
    default() {
      return false;
    },
  });

  if (result.choice === "Yes") {
    return true;
  } else {
    return false;
  }
}

async function main() {
  let doCalculate = true;

  while (doCalculate) {
    console.log("First Number: ");
    const firstnumber = await getNumber();

    const operator = await getOperator();

    console.log("Second Number: ");
    const secondNumber = await getNumber();

    const total = doCalculation(firstnumber, secondNumber, operator);
    console.log("Answer", total);

    if (!(await reCalculate())) {
      doCalculate = false;
    }
  }
}

greetings();
main();
