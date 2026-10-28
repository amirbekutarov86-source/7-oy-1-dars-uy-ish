const { add, subtract } = require('../src/calculator');

test("qo'shish", () => {
  expect(add(2, 3)).toBe(5);
});

test('ayirish', () => {
  expect(subtract(5, 2)).toBe(3);
});
