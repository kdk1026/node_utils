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

/**
 * 레거시 시스템 위한 CBC/PKCS5Padding와 GCM만
 * - crypto 모듈은 기본적으로 PKCS7 패딩을 사용
 * - PKCS5Padding은 사실상 PKCS7Padding과 동일하게 동작
 */
export const Algorithm = {
    /** CBC = 과거 권장, 현재 비권장 : JavaScript 라이브러인 CryptoJS 와 맞출려면 이것을 사용해야 함 */

    AES_128_CBC : 'aes-128-cbc',
    AES_192_CBC : 'aes-192-cbc',
    AES_256_CBC : 'aes-256-cbc',

    /** 강력 권장 : JavaScript는 내장 보안 API인 Web Crypto API 이용하여 구현 */
    AES_256_GCM : 'aes-256-gcm'
};

/**
 * AES 키 생성 (128, 192, 256 비트 가능)
 * @param {number} keySize
 * @returns 
 */
export const generateAesKey = (keySize) => {
    if ( !keySize ) {
        throw new Error(ExceptionMessage.isNull('keySize'));
    }

    if ( keySize !== 128 && keySize !== 192 && keySize !== 256 ) {
        throw new Error('keySize must be 128, 192, or 256 bits');
    }

    const keyBytes = keySize / 8;
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
 * AES 암호화
 * @param {string} algorithm 
 * @param {string} base64KeyString 
 * @param {string} plainText 
 * @returns 
 */
export const encrypt = (algorithm, base64KeyString, plainText) => {
    if ( !algorithm?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('algorithm'));
    }

    if ( !base64KeyString?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('base64KeyString'));
    }

    if ( !plainText?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('base64KeyString'));
    }

    let generatedIvString = null;

    const key = convertStringToKey(base64KeyString);
    let ivBytes;

    if ( algorithm.includes("cbc"))  {
        ivBytes = crypto.randomBytes(16);
        generatedIvString = ivBytes.toString('base64');
    } else if ( algorithm.includes("gcm") ) {
        ivBytes = crypto.randomBytes(12);
        generatedIvString = ivBytes.toString('base64');
    }

    const cipher = crypto.createCipheriv(algorithm, key, ivBytes);
    let encrypted = cipher.update(plainText, UTF_8, 'hex');
    encrypted += cipher.final('hex');

    return {
        cipherText: encrypted,
        iv: generatedIvString,
        authTag: algorithm.includes("gcm") ? cipher.getAuthTag().toString('hex') : null
    }
};

/**
 * AES 복호화
 * @param {string} algorithm 
 * @param {string} base64KeyString 
 * @param {string} base64IvString 
 * @param {string} cipherText
 * @param {undefined|null|string} authTag
 * @returns 
 */
export const decrypt = (algorithm, base64KeyString, base64IvString, cipherText, authTag) => {
    if ( !algorithm?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('algorithm'));
    }

    if ( !base64KeyString?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('base64KeyString'));
    }

    if ( !base64IvString?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('base64IvString'));
    }

    if ( !cipherText?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('cipherText'));
    }

    if ( algorithm.includes("gcm") ) {
        if ( !authTag?.trim() ) {
            throw new Error(ExceptionMessage.isNullOrEmpty('authTag'));
        }
    }

    const key = convertStringToKey(base64KeyString);
    const ivBytes = Buffer.from(base64IvString, 'base64');
    let decipher;

    if ( algorithm.includes("cbc") ) {
        decipher = crypto.createDecipheriv(algorithm, key, ivBytes);
    } else if ( algorithm.includes("gcm") ) {
        decipher = crypto.createDecipheriv(algorithm, key, ivBytes);

        decipher.setAuthTag(Buffer.from(authTag, 'hex'));
    }

    let decryptedText = decipher.update(cipherText, 'hex', UTF_8);
    decryptedText += decipher.final(UTF_8);

    return decryptedText;
};