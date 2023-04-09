// import *  as fs from 'fs';
// const fs = new require('fs') as typeof import('fs');

import { writeFileSync } from "fs";
import Board from "./Board";


export class ParseFile {
    private fileAsText: string;
    constructor () {
        this.fileAsText = ''
    }

    loadFile(fileName: File | null) {
        if (fileName === null) return

        this.processFileWrapper(fileName)
        // console.log(this.fileAsText)
    }

    async processFileWrapper(fileName: File | null) {
        if (fileName === null) return
        return await this.loadPromise(fileName);
    }

    loadPromise(fileName: File) {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result !== 'string'){
                    return
                }
                this.fileAsText = reader.result
                // console.log(this.fileAsText)
                // console.log(reader.result)
                resolve(reader.result)
            }
            reader.readAsText(fileName, 'utf-8');
        });
    }

    getFile()  {

        return this.fileAsText;
    } 

    SaveBoard(fileName: string, board: Board) {
        writeFileSync(fileName, "NewData" + board.size)
    }
}