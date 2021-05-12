const file_types = require('./libs/file_types');

console.log( 'getFileMimeType : ', file_types.getFileMimeType('D:/test/test.txt') );

console.log( 'isDocFile : ', file_types.isDocFile('txt', 'text/plain') );
console.log( 'isImgFile : ', file_types.isImgFile('jpg', 'image/jpeg') );

console.log( 'isRunableFile : ', file_types.isRunableFile('test.exe') );