/**
 * Spit out csv file with grades
 *
 * By: Daniel Pawelko
 * Version: 1.0
 * Since: 2022-10-26
 */

// Imports
import { writeFileSync } from 'fs'
import { readFileSync } from 'fs'

function generateGaussian(mean: number, std: number) {
  // https://discourse.psychopy.org/t/javascript-gaussian-function/17724/2
  let _2PI = Math.PI * 2
  let u1 = Math.random()
  let u2 = Math.random()

  let z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(_2PI * u2)

  return z0 * std + mean
}

function makeArray(d1: number, d2: number) {
  // https://stackoverflow.com/questions/13808325/creating-a-2d-array-with-specific-length-and-width
  let arr = []
  for (let i = 0; i < d2; i++) {
    arr.push(new Array(d1))
  }
  return arr
}

// Function that grades and creates array
function grader(assArr: string[], namesArr: string[]) {
  // Defining array
  const arr: string[][] = makeArray(namesArr.length + 1, arrAss.length)

  // Adding student names
  arr[0] = arrNames
  arr[0].unshift('')

  // Adding assignments and grades
  for (let y = 1; y <= assArr.length - 1; y++) {
    arr[y][0] = arrAss[y]
    for (let x = 1; x <= namesArr.length - 1; x++) {
      arr[y][x] = Math.round(generateGaussian(75, 10)).toString()
    }
  }

  // Return array
  return arr
}

// Read files
const namesFile = readFileSync('./names.txt', 'utf-8')
const assFile = readFileSync('./ass.txt', 'utf-8')

// Convert files to arr
const arrNames = namesFile.toString().replace(/\r\n/g, '\n').split('\n')
arrNames.pop()
const arrAss = assFile.toString().replace(/\r\n/g, '\n').split('\n')
arrAss.pop()

// Call function
const returned: string[][] = grader(arrAss, arrNames)

// Export string
let exportString: string = ''

for (let y = 0; y < returned.length; y++) {
  for (let x = 0; x < returned[0].length; x++) {
    exportString += returned[y][x]
    exportString += ','
  }
  exportString += '\n'
}

// Spit out to file
writeFileSync('table.csv', exportString)
