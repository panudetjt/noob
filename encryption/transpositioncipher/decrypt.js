#!/usr/bin/env node
const transposition = require("./transposition")
const rl = require("readline");

process.stdin.setEncoding('utf8');

const prompts = rl.createInterface(process.stdin, process.stdout);

// // Promise, https://stackoverflow.com/a/34823397
function askCipher() {
  return new Promise(resolve => {
    prompts.question('Enter your cipher: ',  x=>resolve(x))
  })
}
function askRows(cipher) {
  return new Promise(resolve => {
    prompts.question('Enter your rows key (e.g. 1,2,3 ): ', x=>resolve([cipher, x.split(',')]))
  })
}
function askColumns([cipher, rows]) {
  return new Promise(resolve => {
    prompts.question('Enter your columns key (e.g. 1,2,3 ): ', x=>resolve([cipher, rows, x.split(',')]))
  })
}
function showOriginal([cipher, rows, columns]) {
  return new Promise(resolve => {
    let splitedText = transposition.split(cipher, rows.length, columns.length)
    console.log('Your cipher is : ')
    process.stdout.write('\t\t')
    for (let j = 0; j < columns.length; j++) {
      process.stdout.write(columns[j]+'    ')
    }
    console.log()
    for (let i = 0; i < rows.length; i++) {
      console.log('\t', rows[i], ' ',splitedText[i])
    }
    resolve([cipher, rows, columns])
  })
}
function decrypt([cipher, rows, columns]) {
  return new Promise(resolve => {
    console.log('sort columns:')
    process.stdout.write('\t\t')
    for (let j = 0; j < columns.length; j++) {
        process.stdout.write((j+1)+'    ')
    }
    console.log()
    let columnsRotate = transposition.deColumnsRotate(transposition.split(cipher, rows.length, columns.length), columns)
    for (let i = 0; i < rows.length; i++) {
        console.log('\t', rows[i], ' ', columnsRotate[i])
    }
    console.log('sort rows:')
    process.stdout.write('\t\t')
    for (let j = 0; j < columns.length; j++) {
        process.stdout.write((j+1)+'    ')
    }
    console.log()
    let rowsRotate = transposition.deRowsRotate(columnsRotate, rows)
    for (let i = 0; i < rows.length; i++) {
        console.log('\t', i+1, ' ', rowsRotate[i])
    }
    process.stdout.write('Therefore your plaintext is: '+transposition.decrypt(cipher, rows, columns) + '\n')
    resolve();
  })
}
askCipher()
  .then(askRows)
  .then(askColumns)
  .then(showOriginal)
  .then(decrypt)
  .then(() => process.exit())