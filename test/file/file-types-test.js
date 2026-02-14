import { getFileMimeType, isDocFile, isImgFile, isRunableFile, isValidImage } from "../../file/file-type-util";
const fs = require('node:fs').promises;

console.log( 'getFileMimeType : ', getFileMimeType('D:/test/test.txt') );

console.log( 'isDocFile : ', isDocFile('txt', 'text/plain') );
console.log( 'isImgFile : ', isImgFile('jpg', 'image/jpeg') );

console.log( 'isRunableFile : ', isRunableFile('test.exe') );


async function runTest() {
    try {
        const validBuffer = await fs.readFile('d:/test/node/sunriseforever-woman-10093781_1920.jpg');
        const result1 = await isValidImage(validBuffer);
        console.log( 'isValidImage : ', result1);

    } catch (error) {
        console.error('테스트 중 오류 발생:', error.message);
    }
}

runTest();