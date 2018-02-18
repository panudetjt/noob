#!/usr/bin/env node
const transposition = require("./transposition")
const rl = require("readline");

process.stdin.setEncoding('utf8');

const prompts = rl.createInterface(process.stdin, process.stdout);

// // Promise, https://stackoverflow.com/a/34823397
function askPlainText() {
  return new Promise(resolve => {
    prompts.question('Enter your plaintext: ',  x=>resolve(x))
  })
}
function askRows(plaintext) {
  return new Promise(resolve => {
    prompts.question('Enter your rows key (e.g. 1,2,3 ): ', x=>resolve([plaintext, x.split(',')]))
  })
}
function askColumns([plaintext, rows]) {
  return new Promise(resolve => {
    prompts.question('Enter your columns key (e.g. 1,2,3 ): ', x=>resolve([plaintext, rows, x.split(',')]))
  })
}
function showOriginal([plaintext, rows, columns]) {
  return new Promise(resolve => {
    let splitedText = transposition.split(plaintext, rows.length, columns.length)
    console.log('Your plaintext is: ')
    process.stdout.write('\t\t')
    for (let j = 0; j < columns.length; j++) {
      process.stdout.write(columns[j]+'    ')
    }
    console.log()
    for (let i = 0; i < rows.length; i++) {
      console.log('\t', rows[i], ' ',splitedText[i])
    }
    resolve([plaintext, rows, columns])
  })
}
function encrypt([plaintext, rows, columns]) {
  return new Promise(resolve => {
    console.log('sort rows:')
    process.stdout.write('\t\t')
    for (let j = 0; j < columns.length; j++) {
      process.stdout.write(columns[j]+'    ')
    }
    console.log()
    let rowsRotate = transposition.rowsRotate(transposition.split(plaintext, rows.length, columns.length), rows)
    for (let i = 0; i < rows.length; i++) {
      console.log('\t', i+1, ' ', rowsRotate[i])
    }
    console.log('sort columns:')
    process.stdout.write('\t\t')
    for (let j = 0; j < columns.length; j++) {
      process.stdout.write((j+1)+'    ')
    }
    console.log()
    let columnsRotate = transposition.columnsRotate(rowsRotate, columns)
    for (let i = 0; i < rows.length; i++) {
      console.log('\t', i+1, ' ', columnsRotate[i])
    }
    process.stdout.write('Therefore your cipher text is: '+transposition.encrypt(plaintext, rows, columns) + '\n')
    resolve();
  })
}
askPlainText()
  .then(askRows)
  .then(askColumns)
  .then(showOriginal)
  .then(encrypt)
  .then(() => process.exit())