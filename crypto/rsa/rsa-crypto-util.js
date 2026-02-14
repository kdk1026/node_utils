/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2025.06.03
 * @version 1.0
 * @description 예전엔 crypto 모듈을 설치했으나 어느 순간 내장 모듈이 되었음
 * @description 2026.02.14 수정
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

export const Convert = {
    /**
     * 키를 Base64 문자열로 변환
     * @param {Buffer} key 
     * @returns 
     */
    convertKeyToString: (key) => {
        if ( !key ) {
            throw new Error(ExceptionMessage.isNull('key'));
        }

        return key.toString('base64');
    },

    /**
     * Base64 문자열을 PublicKey Object로 변환
     * @param {string} base64PublicKey 
     */
    convertStringToPublicKey: (base64PublicKey) => {
        if ( !base64PublicKey?.trim() ) {
            throw new Error(ExceptionMessage.isNullOrEmpty('base64PublicKey'));
        }

        const pubBuffer = Buffer.from(base64PublicKey, 'base64');

        const recoveredPublicKey = crypto.createPublicKey({
            key: pubBuffer,
            type: 'spki',
            format: 'der'
        });

        return recoveredPublicKey;
    },

    /**
     * Base64 문자열을 PrivateKey Object로 변환
     * @param {string} base64PrivateKey 
     * @returns 
     */
    convertStringToPrivateKey: (base64PrivateKey) => {
        if ( !base64PrivateKey?.trim() ) {
            throw new Error(ExceptionMessage.isNullOrEmpty('base64PrivateKey'));
        }

        const pubBuffer = Buffer.from(base64PrivateKey, 'base64');

        const recoveredPublicKey = crypto.createPrivateKey({
            key: pubBuffer,
            type: 'pkcs8',
            format: 'der'
        });

        return recoveredPublicKey;
    }
};

/**
 * RSA 키 쌍 생성
 * - keySize: 보통 2048, 3072, 4096 비트 사용 (2048비트 이상 권장)
 * @param {number} keySize 
 */
export const generateRsaKeyPair = (keySize) => {
    if ( !keySize ) {
        throw new Error(ExceptionMessage.isNull('keySize'));
    }

    if ( keySize !== 2048 && keySize !== 3072 && keySize !== 4096 ) {
        throw new Error("keySize must be one of 2048, 3072, or 4096")
    }

    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: keySize,
        publicKeyEncoding: {
            type: 'spki',
            format: 'der'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'der'
        }
    });

    return { publicKey, privateKey };
};

/**
 * RSA 암호화
 * @param {crypto.KeyObject} publicKey 
 * @param {string} plainText 
 * @returns 
 */
export const encrypt = (publicKey, plainText) => {
    if ( !publicKey ) {
        throw new Error(ExceptionMessage.isNull('publicKey'));
    }

    if ( !plainText?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('plainText'));
    }

    const encryptedData = crypto.publicEncrypt({
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256'
    },
    Buffer.from(plainText, UTF_8));

    return encryptedData.toString('base64');
};

/**
 * RSA 복호화
 * @param {crypto.KeyObject} privateKey 
 * @param {string} cipherText 
 */
export const decrypt = (privateKey, cipherText) => {
    if ( !privateKey ) {
        throw new Error(ExceptionMessage.isNull('privateKey'));
    }

    if ( !cipherText?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('cipherText'));
    }

    const decryptedData = crypto.privateDecrypt({
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256'
    },
    Buffer.from(cipherText, 'base64'));

    return decryptedData.toString(UTF_8);
}