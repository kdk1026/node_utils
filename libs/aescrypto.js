/**
 * @author 김대광 <daekwang1026&#64;gmail.com>
 * @since 2021.05.12
 * @version 1.0
 * @description Java 유틸을 참고 (아래 링크 참고)
 *  - AES 암호화는 다양한 활용법이 있으나 Base64 인코딩이 국룰로 알고 있음
 * @link https://github.com/kdk1026/CommonJava8/blob/master/CommonJava8/src/main/java/common/util/crypto/AesCryptoUtil.java
 */

const crypto = require("crypto");

const CRYPTO_CONFIG = {
    IV : new Buffer.alloc(16),
    CHARSET : 'UTF-8',
    BASE64 : 'base64'
};

const ALGORITHM = {
    AES_128_CBC : 'aes-128-cbc',
    AES_128_ECB : 'aes-128-ecb',
    AES_192_CBC : 'aes-192-cbc',
    AES_192_ECB : 'aes-192-ecb',
    AES_256_CBC : 'aes-256-cbc',
    AES_256_ECB : 'aes-256-ecb'
};

/**
 * 랜덤 바이트 어레이 생성
 *   - 자세히 모르겠음...
 *   - 다른 시스템과 연계시에는 사용못할 듯
 * 
 *   - 단독 사용 시, 다음과 같은 형태로 사용해야 할 듯
 *   - 암호화/복호화 메소드 인자에 bytesIV 추가
 *   - CRYPTO_CONFIG.IV 대신 인자 bytesIV 사용
 * @returns 
 */
function makeSecureIv() {
    return crypto.randomBytes(16);
}

/**
 * AES 암호화 + Base64 인코딩
 *   - AES-128 키 길이 : 16 byte
 *   - AES-192 키 길이 : 24 byte
 *   - AES-256 키 길이 : 32 byte
 * @param {string} key 
 * @param {string} algorithm 
 * @param {string} plainText
 * @returns 
 */
function aesEncrypt(key, algorithm, plainText) {
    let cipher;

    if ( algorithm.includes('cbc') ) {
        cipher = crypto.createCipheriv(algorithm, key, CRYPTO_CONFIG.IV);
    } else {
        cipher = crypto.createCipheriv(algorithm, key, null);
    }

    let encryptText = cipher.update(plainText, CRYPTO_CONFIG.CHARSET, CRYPTO_CONFIG.BASE64);
    encryptText += cipher.final(CRYPTO_CONFIG.BASE64);
    return encryptText;
}

/**
 * AES 복호화 + Base64 디코딩
 *   - AES-128 키 길이 : 16 byte
 *   - AES-192 키 길이 : 24 byte
 *   - AES-256 키 길이 : 32 byte
 * @param {string} key 
 * @param {string} algorithm 
 * @param {string} encryptText 
 * @returns 
 */
function aesDecrypt(key, algorithm, encryptText) {
    let cipher;

    if ( algorithm.includes('cbc') ) {
        cipher = crypto.createDecipheriv(algorithm, key, CRYPTO_CONFIG.IV);
    } else {
        cipher = crypto.createDecipheriv(algorithm, key, null);
    }

    let decryptText = cipher.update(encryptText, CRYPTO_CONFIG.BASE64);
    decryptText += cipher.final();
    return decryptText;
}

module.exports = {
    ALGORITHM,
    aesEncrypt,
    aesDecrypt
};