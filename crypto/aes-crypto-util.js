/**
 * @author 김대광 <daekwang1026&#64;gmail.com>
 * @since 2025.06.03
 * @version 1.0
 * @description 예전엔 crypto 모듈을 설치했으나 어느 순간 내장 모듈이 되었음
 */

const crypto = require('crypto');

const UTF_8 = 'utf8';

const KEY_IS_NULL = 'key must not be null';

/**
 * 일반적인 CBC, ECB만 정의 (필요 시, 다른 알고리즘 추가 가능)
 * - crypto 모듈은 기본적으로 PKCS7 패딩을 사용
 * - PKCS5Padding은 사실상 PKCS7Padding과 동일하게 동작
 */
const aesAlgorithm = {
    /** 가장 일반적 (권장) */
    AES_128_CBC : 'aes-128-cbc',

    /** 가장 일반적 (권장) */
    AES_192_CBC : 'aes-192-cbc',

    /** 가장 일반적 (권장) */
    AES_256_CBC : 'aes-256-cbc',

    /** 권장하지 않음 */
    AES_128_ECB : 'aes-128-ecb',

    /** 권장하지 않음 */
    AES_192_ECB : 'aes-192-ecb',

    /** 권장하지 않음 */
    AES_256_ECB : 'aes-256-ecb'
};

/** AES 키 생성 (128, 192, 256 비트 가능) */
const generateAesKey = (keySize) => {
    if (keySize === null || keySize === undefined) {
        throw new Error('keySize must not be null');
    }

    if ( keySize !== 128 && keySize !== 192 && keySize !== 256 ) {
        throw new Error('keySize must be 128, 192, or 256 bits');
    }

    const keyBytes = keySize / 8;
    return crypto.randomBytes(keyBytes);
};

/** 키를 Base64 문자열로 변환 */
const convertKeyToString = (key) => {
    if (!key) {
        throw new Error(KEY_IS_NULL);
    }

    return Buffer.from(key).toString('base64');
};

/** Base64 문자열을 SecretKey로 변환 */
const convertStringToKey = (base64KeyString) => {
    if (!base64KeyString) {
        throw new Error('base64KeyString must not be null');
    }

    return Buffer.from(base64KeyString, 'base64');
};

/** AES 암호화 */
const aesEncrypt = (algorithm, base64KeyString, plainText) => {
    if ( !algorithm || algorithm.trim() === '' ) {
        throw new Error('algorithm must not be blank');
    }

    if ( !base64KeyString || base64KeyString.trim() === '' ) {
        throw new Error(BouncyCastleAesUtil.KEY_IS_NULL);
    }

    if ( !plainText || plainText.trim() === '' ) {
        throw new Error('plainText must not be blank');
    }

    let encryptedText = '';
    let generatedIvString = null;

    const key = convertStringToKey(base64KeyString);

    if ( algorithm.includes("ecb"))  {
        const cipher = crypto.createCipheriv(algorithm, key, null);
        let encrypted = cipher.update(plainText, UTF_8, 'base64');
        encrypted += cipher.final('base64');
        encryptedText = encrypted;
    } else {
        const iv = crypto.randomBytes(16);
        generatedIvString = Buffer.from(iv).toString('base64');

        const cipher = crypto.createCipheriv(algorithm, key, iv);
        let encrypted = cipher.update(plainText, UTF_8, 'base64');
        encrypted += cipher.final('base64');
        encryptedText = encrypted;
    }

    return {
        encryptedText: encryptedText,
        iv: generatedIvString
    }
};

/** AES 복호화 */
const aesDecrypt = (algorithm, base64KeyString, ivStr, cipherText) => {
    if ( !algorithm || algorithm.trim() === '' ) {
        throw new Error('algorithm must not be blank');
    }

    if ( !base64KeyString || base64KeyString.trim() === '' ) {
        throw new Error(KEY_IS_NULL);
    }

    if ( !cipherText || cipherText.trim() === '' ) {
        throw new Error('cipherText must not be null');
    }

    const key = convertStringToKey(base64KeyString);
    let decipher;

    if ( algorithm.includes("ecb") ) {
        decipher = crypto.createDecipheriv(algorithm, key, null);
    } else {
        if ( !ivStr || ivStr.trim() === '' ) {
            throw new Error('iv must not be blank');
        }

        const iv = Buffer.from(ivStr, 'base64');
        decipher = crypto.createDecipheriv(algorithm, key, iv);
    }

    let decryptedText = decipher.update(cipherText, 'base64', UTF_8);
    decryptedText += decipher.final(UTF_8);

    return decryptedText;
};

module.exports = {
    aesAlgorithm,
    generateAesKey,
    convertKeyToString,
    aesEncrypt,
    aesDecrypt
};