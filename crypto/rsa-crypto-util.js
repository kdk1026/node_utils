/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2025.06.03
 * @version 1.0
 * @description 예전엔 crypto 모듈을 설치했으나 어느 순간 내장 모듈이 되었음
 */

const forge = require('node-forge');

const KEY_IS_NULL = "key must not be null";
const UTF_8 = 'utf8';

/**
 * 일반적인 OAEP만 정의 (필요 시, 다른 알고리즘 추가 가능)
 */
const RsaAlgorithm = {
    /** 가장 일반적 (권장) */
    RSA_ECB_OAEP_WITH_SHA256_AND_MGF1_PADDING: "RSA-OAEP"
};

/**
 * 키를 Base64 문자열로 변환 및 Base64 문자열을 키로 변환
 */
const Convert = {
    /**
     * 공개키를 Base64 문자열로 변환
     * @param {forge.pki.PublicKey} publicKey
     * @returns {string}
     */
    convertPublicKeyToString: (publicKey) => {
        if (!publicKey) {
            throw new Error(KEY_IS_NULL);
        }
        // PEM format is common for RSA keys in Node.js
        const pem = forge.pki.publicKeyToPem(publicKey);
        // Extract base64 part, remove header/footer and newlines
        const base64Key = pem.replace(/-----BEGIN PUBLIC KEY-----|-----END PUBLIC KEY-----|\n/g, '');
        return base64Key;
    },

    /**
     * 개인키를 Base64 문자열로 변환
     * @param {forge.pki.PrivateKey} privateKey
     * @returns {string}
     */
    convertPrivateKeyToString: (privateKey) => {
        if (!privateKey) {
            throw new Error(KEY_IS_NULL);
        }
        // PEM format is common for RSA keys in Node.js
        const pem = forge.pki.privateKeyToPem(privateKey);
        // Extract base64 part, remove header/footer and newlines
        const base64Key = pem.replace(/-----BEGIN PRIVATE KEY-----|-----END PRIVATE KEY-----|\n/g, '');
        return base64Key;
    },

    /**
     * Base64 문자열을 PublicKey로 변환
     * @param {string} base64PublicKey
     * @returns {forge.pki.PublicKey}
     */
    convertStringToPublicKey: (base64PublicKey) => {
        if (!base64PublicKey || base64PublicKey.trim() === '') {
            throw new Error(isNull("base64PublicKey"));
        }

        try {
            // Add PEM header/footer to convert base64 string to PEM format for forge
            const pem = `-----BEGIN PUBLIC KEY-----\n${base64PublicKey}\n-----END PUBLIC KEY-----`;
            return forge.pki.publicKeyFromPem(pem);
        } catch (e) {
            console.error("Error converting string to public key:", e); // Equivalent to logger.error
            return null;
        }
    },

    /**
     * Base64 문자열을 PrivateKey로 변환
     * @param {string} base64PrivateKey
     * @returns {forge.pki.PrivateKey}
     */
    convertStringToPrivateKey: (base64PrivateKey) => {
        if (!base64PrivateKey || base64PrivateKey.trim() === '') {
            throw new Error(isNull("base64PrivateKey"));
        }

        try {
            // Add PEM header/footer to convert base64 string to PEM format for forge
            const pem = `-----BEGIN PRIVATE KEY-----\n${base64PrivateKey}\n-----END PRIVATE KEY-----`;
            return forge.pki.privateKeyFromPem(pem);
        } catch (e) {
            console.error("Error converting string to private key:", e); // Equivalent to logger.error
            return null;
        }
    }
};

/**
 * <pre>
 * RSA 키 쌍 생성
 * - keySize: 보통 2048, 3072, 4096 비트 사용 (2048비트 이상 권장)
 * </pre>
 * @param {number} keySize
 * @returns {Promise<{publicKey: forge.pki.PublicKey, privateKey: forge.pki.PrivateKey}>}
 */
const generateRsaKeyPair = async (keySize) => {
    if ( keySize === null || keySize === undefined ) {
        throw new Error("keySize must not be null");
    }

    if ( keySize !== 2048 && keySize !== 3072 && keySize !== 4096 ) {
        throw new Error("keySize must be one of 2048, 3072, or 4096");
    }

    return new Promise((resolve, reject) => {
        forge.pki.rsa.generateKeyPair({
            bits: keySize,
            workers: -1
        }, (err, keypair) => {
            if (err) {
                console.error("Error generating RSA key pair:", err);
                return reject(err);
            }
            resolve(keypair);
        });
    });
};

/**
 * RSA 암호화
 * @param {string} algorithm
 * @param {forge.pki.PublicKey} publicKey
 * @param {string} plainText
 * @returns {string}
 */
const encrypt = (algorithm, publicKey, plainText) => {
    if ( !algorithm || algorithm.trim() === '' ) {
        throw new Error("algorithm must not be blank");
    }

    if (!publicKey) {
        throw new Error(KEY_IS_NULL);
    }

    if ( !plainText || plainText.trim() === '' ) {
        throw new Error("plainText must not be blank");
    }

    let encryptedText = "";

    try {
        const pki = forge.pki;
        const buffer = forge.util.createBuffer(plainText, UTF_8);
        let encrypted;

        if (algorithm === RsaAlgorithm.RSA_ECB_OAEP_WITH_SHA256_AND_MGF1_PADDING) {
            const md = forge.md.sha256.create();
            const mgf1 = forge.mgf1.create(md); // MGF1 with SHA256
            encrypted = publicKey.encrypt(buffer.getBytes(), 'RSAES-OAEP', {
                md: md,
                mgf1: mgf1
            });
        } else {
            throw new Error(`Unsupported algorithm: ${algorithm}`);
        }

        encryptedText = forge.util.encode64(encrypted);

    } catch (e) {
        console.error("Error during encryption:", e);
    }

    return encryptedText;
};

/**
 * RSA 복호화
 * @param {string} algorithm
 * @param {forge.pki.PrivateKey} privateKey
 * @param {string} cipherText
 * @returns {string}
 */
const decrypt = (algorithm, privateKey, cipherText) => {
    if ( !algorithm || algorithm.trim() === '' ) {
        throw new Error("algorithm must not be blank");
    }

    if ( !privateKey ) {
        throw new Error(KEY_IS_NULL);
    }

    if ( !cipherText || cipherText.trim() === '' ) {
        throw new Error("cipherText must not be blank");
    }

    let decryptedText = "";

    try {
        const encryptedBytes = forge.util.decode64(cipherText);
        let decrypted;

        if (algorithm === RsaAlgorithm.RSA_ECB_OAEP_WITH_SHA256_AND_MGF1_PADDING) {
            const md = forge.md.sha256.create();
            const mgf1 = forge.mgf1.create(md);
            decrypted = privateKey.decrypt(encryptedBytes, 'RSAES-OAEP', {
                md: md,
                mgf1: mgf1
            });
        } else {
            throw new Error(`Unsupported algorithm: ${algorithm}`);
        }

        decryptedText = forge.util.decodeUtf8(decrypted);

    } catch (e) {
        console.error("Error during decryption:", e);
    }

    return decryptedText;
};

module.exports = {
    RsaAlgorithm,
    Convert,
    generateRsaKeyPair,
    encrypt,
    decrypt
};