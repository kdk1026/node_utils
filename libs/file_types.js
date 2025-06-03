/**
 * @author 김대광 <daekwang1026&#64;gmail.com>
 * @since 2021.05.12
 * @version 1.0
 * @description Java 유틸을 참고 (아래 링크 참고)
 * @link https://github.com/kdk1026/CommonJava8/blob/master/CommonJava8/src/main/java/common/util/file/FileUtil.java
 */

const mime = require('mime-types');

const SEPARATOR = {
    EXTENSION_SEPARATOR : '.'
}

/**
 * 파일 MIME Type 구하기
 * @param {string} filePath 
 * @returns 
 */
function getFileMimeType(filePath) {
    return mime.lookup(filePath);
}

/**
 * 파일 체크
 *   - 확장자와 MimeType이 불일치하더라도 업로드 가능 여부만 체크
 * @param {string} extension 
 * @param {string} mimeType 
 * @returns 
 */
function isAllFile(extension, mimeType) {
    const extArr = [
        "jpg", "jpeg", "png", "gif", "bmp",
        "pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx",
        "hwp", "txt", "zip"
    ];

    const mimeArr = [
        "image/jpeg", "image/png", "image/gif", "image/bmp",
        "application/pdf",
        "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "application/x-hwp", "application/haansofthwp", "application/vnd.hancom.hwp",
        "text/plain", "application/zip"
    ];

    return extArr.includes(extension) && mimeArr.includes(mimeType);
}

/**
 * 이미지 파일 체크
 *   - 확장자와 MimeType이 불일치하더라도 업로드 가능 여부만 체크
 * @param {string} extension 
 * @param {string} mimeType 
 * @returns 
 */
function isImgFile(extension, mimeType) {
    const extArr = [
        "jpg", "jpeg", "png", "gif", "bmp"
    ];

    const mimeArr = [
        "image/jpeg", "image/png", "image/gif", "image/bmp"
    ];

    return extArr.includes(extension) && mimeArr.includes(mimeType);
}

/**
 * 문서 파일 체크
 *   - 확장자와 MimeType이 불일치하더라도 업로드 가능 여부만 체크
 * @param {string} extension 
 * @param {string} mimeType 
 * @returns 
 */
function isDocFile(extension, mimeType) {
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
 *   - 확장자와 MimeType이 불일치하더라도 업로드 가능 여부만 체크
 * @param {string} extension 
 * @param {string} mimeType 
 * @returns 
 */
function isArchiveFile(extension, mimeType) {
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
 *   - 확장자와 MimeType이 불일치하더라도 업로드 가능 여부만 체크
 * @param {string} extension 
 * @param {string} mimeType 
 * @returns 
 */
function isAudioFile(extension, mimeType) {
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
 *   - 확장자와 MimeType이 불일치하더라도 업로드 가능 여부만 체크
 * @param {string} extension 
 * @param {string} mimeType 
 * @returns 
 */
function isVideoFile(extension, mimeType) {
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
function isRunableFile(extension) {
    const extArr = [
        "bat", "bin", "cmd", "com", "cpl", "dll", "exe", "gadget", "inf1",
        "ins", "isu", "jse", "lnk", "msc", "msi", "msp", "mst", "paf",
        "pif", "ps1", "reg", "rgs", "scr", "sct", "sh", "shb", "shs",
        "u3p", "vb", "vbe", "vbs", "vbscript", "ws", "wsf", "wsh"
    ];

    return extArr.includes(extension);
}

module.exports = {
    getFileMimeType,
    isAllFile,
    isImgFile,
    isDocFile,
    isArchiveFile,
    isAudioFile,
    isVideoFile,
    isRunableFile
};