import {readFile} from "fs/promises"

const globalVariable = 123
let fileContent
try {
  const createdHere = 42
  // console.log(globalVariable)
   fileContent = await readFile("writtenInPromises.txt", "utf8")
} catch (error) {
    console.error("error reading file: ", error)
}
  
  
console.log(fileContent)