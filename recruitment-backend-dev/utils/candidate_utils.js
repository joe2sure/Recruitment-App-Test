// import pdfParse from 'pdf-parse'
import docxParse from 'mammoth'
import fs from 'fs';
import path from 'path'


export const parseResume = async (fileBuffer,fileType) => {
    try {
        if(fileType == "application/pdf") {
            const rawData = await pdfParse(fileBuffer) // change pdf to raw text 

            // this is just a test to see the raw document data before working on the parsing logic
            fs.writeFile(path.join("my_files","resume_pdf.txt"), rawData.text, (err) => {
                if (err) throw err;
                console.log("Done saving file")
            })

            return [] // return an array with list of education, exprience and skills

        } else if (fileType == "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            const rawData = await docxParse.extractRawText({ buffer: fileBuffer }) // change docx to raw text 

            // this is just a test to see the raw document data before working on the parsing logic
            fs.writeFile(path.join("my_files","resume_dox.txt"), rawData.value, (err) => {
                if (err) throw err;
                console.log("Done saving file")
            })

            return [] // return an array with list of education, exprience and skills

        }
    } catch (error) {
        throw new Error(error)
    }

}

