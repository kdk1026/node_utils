import { getFileMimeType, isDocFile, isImgFile, isRunableFile } from "../../file/file-type-util";

console.log( 'getFileMimeType : ', getFileMimeType('D:/test/test.txt') );

console.log( 'isDocFile : ', isDocFile('txt', 'text/plain') );
console.log( 'isImgFile : ', isImgFile('jpg', 'image/jpeg') );

console.log( 'isRunableFile : ', isRunableFile('test.exe') );