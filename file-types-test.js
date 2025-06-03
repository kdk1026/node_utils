const fileTypes = require('./file/file-type-util');

console.log( 'getFileMimeType : ', fileTypes.getFileMimeType('D:/test/test.txt') );

console.log( 'isDocFile : ', fileTypes.isDocFile('txt', 'text/plain') );
console.log( 'isImgFile : ', fileTypes.isImgFile('jpg', 'image/jpeg') );

console.log( 'isRunableFile : ', fileTypes.isRunableFile('test.exe') );