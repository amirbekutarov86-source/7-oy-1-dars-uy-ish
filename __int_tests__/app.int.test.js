const { add } = require('../src/calculator');

test('bir nechta amallar birga ishlaydi', () => {
  expect(add(add(1, 2), 3)).toBe(6);
});
