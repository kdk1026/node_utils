const file = require('./file/file-util');

console.log( 'isExistsFile : ', file.isExistsFile('D:/test/infoin.pem')  );

console.log( 'getFilename : ', file.getFilename('D:/test/infoin.pem') );
console.log( 'getFileExtension : ', file.getFileExtension('D:/test/infoin.pem') );

console.log( 'getFileSize : ', file.getFileSize('D:/유틸 자료실/윈도우 ISO/Win10 19H2(18363.720) x64 All in 1 Remiz 20.03.14.iso') );
console.log( 'readableFileSize : ', file.readableFileSize(8039723008) );

console.log( 'lastModified : ', file.lastModified('D:/test/test.txt') );

file.writeFile('D:/test/hello_write.txt', 'hi~~~');

console.log( 'readFile : ', file.readFile('D:/test/hello.txt') );
console.log( 'deleteFile : ', file.deleteFile('D:/test/hello3.txt') );

file.copyFile('D:/test/a/hello.txt', 'D:/test/b/hello_copy.txt');

console.log( 'getAllFileList : ', file.getAllFileList('D:/test') );

console.log( 'getFileList : ', file.getFileList('D:/test') );
console.log( 'getDirectoryList : ', file.getDirectoryList('D:/test') );