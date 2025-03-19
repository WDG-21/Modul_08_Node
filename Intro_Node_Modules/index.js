// console.log("Läuft!")

// console.log("Node ist toll!")

// console.log("blablabla")

// import { writeFileSync, writeFile } from "fs"

// writeFileSync("meineDatei.txt", "Hallo Datei")

// writeFile("meineDatei.txt", "Hallo Datei", (error) => {
//   if (error) {
//     console.error("there was an error: ". error)
//   } else {
//     console.log("File was created ")

//     // weitere funktion
//     writeFile("bla.txt", "bla", (err) => {

//     })
//   }
// })



import { writeFile } from "fs/promises"


const myWriteFile = async () => {

  try {
    await writeFile("writtenInPromises.txt", "Ich wurde durch die promises writeFile geschrieben")
    console.log("successfully written file")
  } catch (error) {
    console.error("there was an error ", error)
  }
}

myWriteFile()

console.log("Zeile steht im Code nach 'writeFile'")