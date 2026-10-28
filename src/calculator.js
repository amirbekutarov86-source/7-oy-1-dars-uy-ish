// 1. Local modul: qo'shish, ayirish va natijani ekranga chiqarish
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function printResult(label, value) {
  console.log(`${label} = ${value}`);
}

module.exports = { add, subtract, printResult };
