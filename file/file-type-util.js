/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2021.05.12
 * @version 1.1
 * @description 2026.02.14 수정
 */

import { lookup } from "mime-types";
import sharp from "sharp";

const ExceptionMessage = {
    isNull: (paramName) => {
        return `${paramName} is null`;
    },

    isNullOrEmpty: (paramName) => {
        return `${paramName} is null or empty`;
    }
};

/**
 * 파일 MIME Type 구하기
 * @param {string} filePath 
 * @returns 
 */
export function getFileMimeType(filePath) {
    if ( !filePath?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('filePath'));
    }

    return lookup(filePath);
}

/**
 * 파일 체크
 * @param {string} extension 
 * @param {string} mimeType 
 * @returns 
 */
export function isAllFile(extension, mimeType) {
    if ( !extension?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('extension'));
    }

    if ( !mimeType?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('mimeType'));
    }

    const extArr = [
        "jpg", "jpeg", "png", "gif",
        "pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx",
        "hwp", "txt", "zip", "rar", "7z"
    ];

    const mimeArr = [
        "image/jpeg", "image/png", "image/gif",
        "application/pdf",
        "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "application/x-hwp", "application/haansofthwp", "application/vnd.hancom.hwp",
        "text/plain", "application/zip", "application/x-rar-compressed", "application/x-7z-compressed"
    ];

    return extArr.includes(extension) && mimeArr.includes(mimeType);
}

/**
 * 이미지 파일 체크
 * @param {string} extension 
 * @param {string} mimeType 
 * @returns 
 */
export function isImgFile(extension, mimeType) {
    if ( !extension?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('extension'));
    }

    if ( !mimeType?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('mimeType'));
    }

    const extArr = [
        "jpg", "jpeg", "png", "gif"
    ];

    const mimeArr = [
        "image/jpeg", "image/png", "image/gif"
    ];

    return extArr.includes(extension) && mimeArr.includes(mimeType);
}

/**
 * 이미지 파일이 올바른 이미지 형식이거나 손상되지 않았는지 체크
 * @param {Buffer} buffer
 * @returns 
 */
export async function isValidImage(buffer) {
    try {
        const metadata = await sharp(buffer).metadata();
        return !!metadata;
    } catch (error) {
        console.error(error);
        return false;
    }
}

/**
 * 문서 파일 체크
 * @param {string} extension 
 * @param {string} mimeType 
 * @returns 
 */
export function isDocFile(extension, mimeType) {
    if ( !extension?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('extension'));
    }

    if ( !mimeType?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('mimeType'));
    }

    const extArr = [
        "pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx",
        "hwp", "txt"
    ];

    const mimeArr = [
        "application/pdf",
        "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "application/x-hwp", "application/haansofthwp", "application/vnd.hancom.hwp",
        "text/plain"
    ];

    return extArr.includes(extension) && mimeArr.includes(mimeType);
}

/**
 * 압축 파일 체크
 * @param {string} extension 
 * @param {string} mimeType 
 * @returns 
 */
export function isArchiveFile(extension, mimeType) {
    if ( !extension?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('extension'));
    }

    if ( !mimeType?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('mimeType'));
    }

    const extArr = [
        "zip", "rar", "7z"
    ];

    const mimeArr = [
        "application/zip", "application/x-rar-compressed", "application/x-7z-compressed"
    ];

    return extArr.includes(extension) && mimeArr.includes(mimeType);
}

/**
 * 오디오 파일 체크
 * @param {string} extension 
 * @param {string} mimeType 
 * @returns 
 */
export function isAudioFile(extension, mimeType) {
    if ( !extension?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('extension'));
    }

    if ( !mimeType?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('mimeType'));
    }

    const extArr = [
        "mp3", "wav"
    ];

    const mimeArr = [
        "audio/mpeg", "audio/wav"
    ];

    return extArr.includes(extension) && mimeArr.includes(mimeType);
}

/**
 * 비디오 파일 체크
 * @param {string} extension 
 * @param {string} mimeType 
 * @returns 
 */
export function isVideoFile(extension, mimeType) {
    if ( !extension?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('extension'));
    }

    if ( !mimeType?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('mimeType'));
    }

    const extArr = [
        "mp4", "avi", "mov", "mkv"
    ];

    const mimeArr = [
        "video/mp4", "video/x-msvideo", "video/quicktime", "video/x-matroska"
    ];

    return extArr.includes(extension) && mimeArr.includes(mimeType);
}

/**
 * 지원 파일 체크 (실행 파일)
 *   - 결과가 true면 업로드 불가, false면 업로드 가능
 * @param {string} fileName 
 * @returns 
 */
export function isRunableFile(extension) {
    if ( !extension?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('extension'));
    }

    const extArr = [
        "bat", "bin", "cmd", "com", "cpl", "dll", "exe", "gadget", "inf1",
        "ins", "isu", "jse", "lnk", "msc", "msi", "msp", "mst", "paf",
        "pif", "ps1", "reg", "rgs", "scr", "sct", "sh", "shb", "shs",
        "u3p", "vb", "vbe", "vbs", "vbscript", "ws", "wsf", "wsh"
    ];

    return extArr.includes(extension);
}