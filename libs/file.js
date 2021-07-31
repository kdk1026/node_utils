/**
 * @author 김대광 <daekwang1026&#64;gmail.com>
 * @since 2021.05.13
 * @version 1.0
 * @description Java 유틸을 참고 (아래 링크 참고)
 * @link https://github.com/kdk1026/CommonJava8/blob/master/CommonJava8/src/main/java/common/util/file/FileUtil.java
 */

const fs = require('fs');
const moment = require('moment');

const SEPARATOR = {
    FOLDER_SEPARATOR : '/',
    EXTENSION_SEPARATOR : '.'
};

/**
 * 파일의 존재여부 확인
 * @param {string} filePath 
 * @returns 
 */
function isExistsFile(filePath) {
    try {
        fs.accessSync(filePath, fs.F_OK);
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * 해당 경로에서 파일명 추출
 * @param {string} filePath 
 * @returns 
 */
function getFilename(filePath) {
    if (filePath == null) {
        return filePath;
    }

    let pos = filePath.lastIndexOf(SEPARATOR.FOLDER_SEPARATOR);
    return (pos != -1 ? filePath.substring(pos + 1) : filePath);
}

/**
 * 파일 확장자 구하기
 * @param {string} filePath 
 * @returns 
 */
function getFileExtension(filePath) {
    if (filePath.lastIndexOf(SEPARATOR.EXTENSION_SEPARATOR) == -1) {
        return null;
    }

    let pos = filePath.lastIndexOf(SEPARATOR.EXTENSION_SEPARATOR);
    return filePath.substring(pos + 1);
}

/**
 * 파일 용량 구하기
 * @param {string} filePath 
 * @returns 
 */
function getFileSize(filePath) {
    let stats = fs.statSync(filePath);
    return stats.size;
}

/**
 * 파일 용량 구하기
 *   - B, KB, MB, GB, TB
 * @param {number} fileSize 
 * @returns 
 */
function readableFileSize(fileSize) {
    if (fileSize <= 0) return '0';
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];

    const i = parseInt(Math.floor(Math.log(fileSize) / Math.log(1024)));

    if (i == 0) {
        return fileSize + ' ' + units[i];
    }

    return (fileSize / Math.pow(1024, i)).toFixed(1) + " " + units[i];
}

/**
 * 파일의 수정한 날짜 구하기
 * @param {string} filePath 
 * @returns 
 */
function lastModified(filePath) {
    const stats = fs.statSync(filePath);
    const mtime = stats.mtime;
    return moment(mtime).format('YYYY-MM-DD HH:mm:ss');
}

/**
 * 텍스트 내용을 행당 경로에 파일로 생성
 * @param {string} filePath 
 * @param {string} text 
 */
function writeFile(filePath, text) {
    fs.writeFile(filePath, text, (err) => {
        if (err) {
            console.log(err);
        }
    });
}

/**
 * 파일을 텍스트로 읽음
 * @param {string} filePath 
 * @returns 
 */
function readFile(filePath) {
    const buff = fs.readFileSync(filePath);
    return buff.toString();
}

/**
 * 파일 삭제
 * @param {string} filePath 
 * @returns 
 */
function deleteFile(filePath) {
    try {
        fs.unlinkSync(filePath);
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * 파일 복사
 * @param {string} srcFilePath 
 * @param {string} destFilePath 
 */
function copyFile(srcFilePath, destFilePath) {
    fs.copyFile(srcFilePath, destFilePath, (err) => {
        if (err) {
            console.log(err);
        }
    });
}

/**
 * 해당 경로의 모든 파일 및 디렉토리를 반환
 * @param {string} filePath 
 * @returns 
 */
function getAllFileList(filePath) {
    return fs.readdirSync(filePath);
}

/**
 * 해당 경로의 파일 반환
 * @param {string} filePath 
 * @returns 
 */
function getFileList(filePath) {
    const dirents = fs.readdirSync(filePath, { withFileTypes: true });
    
    const filesNames = dirents
        .filter(dirent => dirent.isFile())
        .map(dirent => dirent.name);

    return filesNames;
}

/**
 * 해당 경로의 디렉토리 반환
 * @param {string} filePath 
 * @returns 
 */
function getDirectoryList(filePath) {
    const dirents = fs.readdirSync(filePath, { withFileTypes: true });

    const dirNames = dirents
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    return dirNames;
}

module.exports = {
    isExistsFile,
    getFilename,
    getFileExtension,
    getFileSize,
    readableFileSize,
    lastModified,
    writeFile,
    readFile,
    deleteFile,
    copyFile,
    getAllFileList,
    getFileList,
    getDirectoryList
};