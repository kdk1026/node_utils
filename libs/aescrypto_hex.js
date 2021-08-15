/**
 * @author 김대광 <daekwang1026&#64;gmail.com>
 * @since 2021.08.15
 * @description Java 유틸의 JavaDoc 링크 참고 (아래 링크 참고)
 * @link https://github.com/kdk1026/CommonJava8/blob/master/CommonJava8/src/main/java/common/util/crypto/aes/AesCryptoHexUtil.java
 * 
 * @link https://www.steemcoinpan.com/hive-101145/@wonsama/aes-128-ecb-java-nodejs
 */

const crypto = require("crypto");

// 키의 길이는 32바이트
const API_SECRET_KEY = process.env.API_SECRET_KEY || '012345678901234567890123456789ab';

const CRYPTO_CONFIG = {
    ALGORITHM : 'aes-128-ecb',
    IV : '',
    HEX : 'hex',
    CHARSET : 'UTF-8',
};

/**
 * AES 암호화
 * @param {string} plainText 
 * @param {(undefined|string)} key 
 * @returns 
 * @since 2021.08.15
 */
function aesEncrypt(plainText, key = API_SECRET_KEY) {
    const hexKey = Buffer.from(key, CRYPTO_CONFIG.HEX);
    const cipher = crypto.createCipheriv(CRYPTO_CONFIG.ALGORITHM, hexKey, CRYPTO_CONFIG.IV);
    let encrypted = cipher.update(plainText,CRYPTO_CONFIG.UTF_8,CRYPTO_CONFIG.HEX);
    encrypted += cipher.final(CRYPTO_CONFIG.HEX);
    return encrypted;
}

/**
 * AES 복호화
 * @param {string} encryptText 
 * @param {(undefined|string)} key 
 * @returns 
 * @since 2021.08.15
 */
function aesDecrypt(encryptText, key = API_SECRET_KEY) {
    const hexKey = Buffer.from(key, CRYPTO_CONFIG.HEX);
    const cipher = crypto.createDecipheriv(CRYPTO_CONFIG.ALGORITHM, hexKey, CRYPTO_CONFIG.IV);
    let decrypted = cipher.update(encryptText,CRYPTO_CONFIG.HEX, CRYPTO_CONFIG.UTF_8);
    decrypted += cipher.final(CRYPTO_CONFIG.UTF_8);
    return decrypted;
}

module.exports = {
    aesEncrypt,
    aesDecrypt
};