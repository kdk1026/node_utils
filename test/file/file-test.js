import { copyFile, deleteFile, getAllFileList, getDirectoryList, getFileExtension, getFileList, getFilename, getFileSize, isExistsFile, lastModified, readableFileSize, readFile, writeFile } from "../../file/file-util";

console.log( 'isExistsFile : ', isExistsFile('D:/test/test.txt')  );

console.log( 'getFilename : ', getFilename('D:/test/text.txt') );
console.log( 'getFileExtension : ', getFileExtension('D:/test/test.txt') );

console.log( 'getFileSize : ', getFileSize('D:/test/test.txt') );
console.log( 'readableFileSize : ', readableFileSize(8039723008) );

console.log( 'lastModified : ', lastModified('D:/test/test.txt') );

writeFile('D:/test/hello_write.txt', '안녕~~~');

console.log( 'readFile : ', readFile('D:/test/test.txt') );
console.log( 'deleteFile : ', deleteFile('D:/test/test2.txt') );

copyFile('D:/test/test.txt', 'D:/test/test_copy.txt');

console.log( 'getAllFileList : ', getAllFileList('D:/test') );
console.log( 'getFileList : ', getFileList('D:/test') );
console.log( 'getDirectoryList : ', getDirectoryList('D:/test') );