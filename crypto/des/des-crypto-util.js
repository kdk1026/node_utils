/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2026.02.14
 * @version 1.0
 */

const crypto = require('node:crypto');

const UTF_8 = 'utf8';

const ExceptionMessage = {
    isNull: (paramName) => {
        return `${paramName} is null`;
    },

    isNullOrEmpty: (paramName) => {
        return `${paramName} is null or empty`;
    }
};

const Algorithm = {
    DES_EDE3_CBC : 'des-ede3-cbc',
};

/**
 * Triple DES 키 생성 (192 비트)
 * @returns 
 */
export const generateTripleDesKey = () => {
    const keyBytes = 192 / 8;
    return crypto.randomBytes(keyBytes);
};

/**
 * 키를 Base64 문자열로 변환
 * @param {Buffer} key
 * @returns 
 */
export const convertKeyToString = (key) => {
    if (!key) {
        throw new Error(ExceptionMessage.isNull('key'));
    }

    return Buffer.from(key).toString('base64');
};

/**
 * Base64 문자열을 SecretKey로 변환
 * @param {string} base64KeyString 
 * @returns 
 */
const convertStringToKey = (base64KeyString) => {
    return Buffer.from(base64KeyString, 'base64');
};

/**
 * Triple DES 암호화
 * @param {string} base64KeyString
 * @param {null|string} ivStr - null or empty or 8바이트 문자열
 * @param {string} plainText 
 * @returns 
 */
export const encrypt = (base64KeyString, ivStr, plainText) => {
    if ( !base64KeyString?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('base64KeyString'));
    }

    if ( !plainText?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('base64KeyString'));
    }

    let generatedIvString = null;

    const key = convertStringToKey(base64KeyString);
    let ivBytes;

    if ( ivStr?.trim() ) {
        ivBytes = Buffer.from(ivStr, UTF_8);
    } else {
        ivBytes = crypto.randomBytes(8);
    }

    generatedIvString = ivBytes.toString('base64');

    const cipher = crypto.createCipheriv(Algorithm.DES_EDE3_CBC, key, ivBytes);
    let encrypted = cipher.update(plainText, UTF_8, 'base64');
    encrypted += cipher.final('base64');

    return {
        cipherText: encrypted,
        iv: generatedIvString
    }
};

/**
 * Triple DES 복호화
 * @param {string} base64KeyString 
 * @param {null|string} ivStr
 * @param {boolean} isBase64Iv 암호화 시, iv 인자 없이 암호화 한 경우 true
 * @param {string} cipherText
 * @returns 
 */
export const decrypt = (base64KeyString, ivStr, isBase64Iv, cipherText) => {
    if ( !base64KeyString?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('base64KeyString'));
    }

    if ( !cipherText?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('cipherText'));
    }

    const key = convertStringToKey(base64KeyString);
    let ivBytes;
    let decipher;


    if ( isBase64Iv ) {
        ivBytes = Buffer.from(ivStr, 'base64');
    } else {
        ivBytes = Buffer.from(ivStr, UTF_8);
    }

    decipher = crypto.createDecipheriv(Algorithm.DES_EDE3_CBC, key, ivBytes);

    let decryptedText = decipher.update(cipherText, 'base64', UTF_8);
    decryptedText += decipher.final(UTF_8);

    return decryptedText;
};