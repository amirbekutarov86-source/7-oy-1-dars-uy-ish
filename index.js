const fs = require('fs');
const path = require('path');
const { add, subtract, printResult } = require('./src/calculator');
const { getUser } = require('./src/api');

const dataDir = path.join(__dirname, 'data');

// ---------- 1. Module tahlili ----------
function part1() {
  console.log('\n=== 1. Module tahlili ===');
  printResult('2 + 3', add(2, 3));
  printResult('5 - 2', subtract(5, 2));
}

// ---------- 2. fs moduli ----------
function part2() {
  console.log('\n=== 2. fs moduli ===');

  // readFileSync: matn faylidan o'qish
  const matn = fs.readFileSync(path.join(dataDir, 'matn.txt'), 'utf8');
  console.log('matn.txt ichida:\n' + matn);

  // writeFileSync: yangi fayl yaratib "Salom, dunyo!" yozish
  const salomPath = path.join(dataDir, 'salom.txt');
  fs.writeFileSync(salomPath, 'Salom, dunyo!');
  console.log('salom.txt yaratildi, ichida:', fs.readFileSync(salomPath, 'utf8'));
}

// ---------- 3. Buffer ----------
function part3() {
  console.log('\n=== 3. Buffer ===');

  // 10 ta tasodifiy raqamdan iborat array
  const raqamlar = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10));
  console.log('Array:', raqamlar);

  // Buffer formatida faylga yozish
  const buf = Buffer.from(raqamlar.join(''));
  const bufPath = path.join(dataDir, 'raqamlar.bin');
  fs.writeFileSync(bufPath, buf);
  console.log('Buffer:', buf);

  // Fayldan bufferni o'qib, matn sifatida chiqarish
  const o_qilgan = fs.readFileSync(bufPath);
  console.log('Fayldan o\'qilgan buffer:', o_qilgan);
  console.log('Matn sifatida:', o_qilgan.toString());
}

// ---------- axios ----------
async function part4() {
  console.log('\n=== Axios ===');
  try {
    const user = await getUser(1);
    console.log('Ism:', user.name);
    console.log('Email:', user.email);
    console.log('Shahar:', user.address.city);
  } catch (err) {
    console.error('Axios xatosi:', err.message);
  }
}

async function main() {
  part1();
  part2();
  part3();
  await part4();
}

main();
