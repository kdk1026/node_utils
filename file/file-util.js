/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2021.05.13
 * @version 1.0
 * @description 2026.02.14 수정
 */

import path from 'node:path';

const fs = require('node:fs');
const moment = require('moment');

const SEPARATOR = {
    FOLDER_SEPARATOR : '/',
    EXTENSION_SEPARATOR : '.'
};

const ExceptionMessage = {
    isNull: (paramName) => {
        return `${paramName} is null`;
    },

    isNullOrEmpty: (paramName) => {
        return `${paramName} is null or empty`;
    }
};

/**
 * 파일의 존재여부 확인
 * @param {string} filePath 
 * @returns 
 */
export function isExistsFile(filePath) {
    if ( !filePath?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('filePath'));
    }

    try {
        fs.accessSync(filePath, fs.F_OK);
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

/**
 * 해당 경로에서 파일명 추출
 * @param {string} filePath 
 * @returns 
 */
export function getFilename(filePath) {
    if ( !filePath?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('filePath'));
    }

    return path.basename(filePath);
}

/**
 * 파일 확장자 구하기
 * @param {string} fileName 
 * @returns 
 */
export function getFileExtension(fileName) {
    if ( !fileName?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('fileName'));
    }

    const ext = path.extname(fileName);

    if (!ext) {
        return null;
    }

    return ext.startsWith('.') ? ext.slice(1) : ext;
}

/**
 * 파일 용량 구하기
 * @param {string} filePath 
 * @returns 
 */
export function getFileSize(filePath) {
    if ( !filePath?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('filePath'));
    }

    let stats = fs.statSync(filePath);
    return stats.size;
}

/**
 * 파일 용량 구하기
 *   - B, KB, MB, GB, TB
 * @param {number} fileSize 
 * @returns 
 */
export function readableFileSize(fileSize) {
    if (fileSize <= 0) return '0';
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];

    const i = Number(Math.floor(Math.log(fileSize) / Math.log(1024)));

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
export function lastModified(filePath) {
    if ( !filePath?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('filePath'));
    }

    const stats = fs.statSync(filePath);
    const mtime = stats.mtime;
    return moment(mtime).format('YYYY-MM-DD HH:mm:ss');
}

/**
 * 텍스트 내용을 행당 경로에 파일로 생성
 * @param {string} filePath 
 * @param {string} text 
 */
export function writeFile(filePath, text) {
    if ( !filePath?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('filePath'));
    }

    if ( !text?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('text'));
    }

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
export function readFile(filePath) {
    if ( !filePath?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('filePath'));
    }

    const buff = fs.readFileSync(filePath);
    return buff.toString();
}

/**
 * 파일 삭제
 * @param {string} filePath 
 * @returns 
 */
export function deleteFile(filePath) {
    if ( !filePath?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('filePath'));
    }

    try {
        fs.unlinkSync(filePath);
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

/**
 * 파일 복사
 * @param {string} srcFilePath 
 * @param {string} destFilePath 
 */
export function copyFile(srcFilePath, destFilePath) {
    if ( !srcFilePath?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('srcFilePath'));
    }

    if ( !destFilePath?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('destFilePath'));
    }

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
export function getAllFileList(filePath) {
    if ( !filePath?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('filePath'));
    }

    return fs.readdirSync(filePath);
}

/**
 * 해당 경로의 파일 반환
 * @param {string} filePath 
 * @returns 
 */
export function getFileList(filePath) {
    if ( !filePath?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('filePath'));
    }

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
export function getDirectoryList(filePath) {
    if ( !filePath?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('filePath'));
    }
    
    const dirents = fs.readdirSync(filePath, { withFileTypes: true });

    const dirNames = dirents
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    return dirNames;
}