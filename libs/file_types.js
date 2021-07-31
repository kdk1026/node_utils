/**
 * @author 김대광 <daekwang1026&#64;gmail.com>
 * @since 2021.05.12
 * @version 1.2
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
 * 문서 파일 체크
 *   - 확장자와 MimeType이 불일치하더라도 업로드 가능 여부만 체크
 * @param {string} extension 
 * @param {string} mimeType 
 * @returns 
 */
function isDocFile(extension, mimeType) {
    const extArr = [
        'txt', 'rtf', 'pdf',
        'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx',
        'hwp',
        'odt', 'odp', 'ods'
    ];

    const mimeArr = [
        'text/plain', 'application/rtf', 'application/pdf',
        'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/x-hwp', 'document/unknown', 'application/unknown', 'application/x-hwp-v5',
        'application/vnd.oasis.opendocument.text', 'application/vnd.oasis.opendocument.presentation', 'application/vnd.oasis.opendocument.spreadsheet'
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
        'jpg', 'jpeg', 'gif', 'png'
    ];

    const mimeArr = [
        'image/jpeg', 'image/gif', 'image/png'
    ];

    return extArr.includes(extension) && mimeArr.includes(mimeType);
}

/**
 * 지원 파일 체크 (실행 파일)
 *   - 결과가 true면 업로드 불가, false면 업로드 가능
 * @param {string} fileName 
 * @returns 
 */
function isRunableFile(fileName) {
    if (fileName == null) return false;
    if (fileName.lastIndexOf(SEPARATOR.EXTENSION_SEPARATOR) == -1) return false;

    let pos = fileName.lastIndexOf(SEPARATOR.EXTENSION_SEPARATOR);
    let extension = fileName.substring(pos + 1);

    const extReg = /(bat|bin|cmd|com|cpl|dll|exe|gadget|inf1|ins|isu|jse|lnk|msc|msi|msp|mst|paf|pif|ps1|reg|rgs|scr|sct|sh|shb|shs|u3p|vb|vbe|vbs|vbscript|ws|wsf|wsh)$/i;
    return extReg.test(extension);
}

module.exports = {
    getFileMimeType,
    isDocFile,
    isImgFile,
    isRunableFile
};