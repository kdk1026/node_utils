const forge = require('node-forge');

class RsaCryptoUtil {
    static DEFAULT_KEY_SIZE = 2048;
    static CHARSET = 'utf-8';

    /** 데이터의 길이가 키 길이와 일치해야 함 */
    static RSA_ECB_NOPADDING = 'RSA/ECB/NoPadding';

    /** JavaScript 라이브러인 jsencrypt 와 맞출려면 이것을 사용해야 함 (가장 일반적) */
    static RSA_ECB_PKCS1PADDING = 'RSA/ECB/PKCS1Padding';

    /** 보안성이 가장 높음 */
    static RSA_ECB_OAEPPADDING = 'RSA/ECB/OAEPPadding';

    // Generate 클래스
    static Generate = class {
        static generateKeyPair() {
            return forge.pki.rsa.generateKeyPair({ bits: this.DEFAULT_KEY_SIZE });
        }
    };

    // Convert 클래스
    static Convert = class {
        static getBase64PublicKey(keypair) {
            // 공개 키를 DER 형식으로 변환
            const derPublicKey = forge.asn1.toDer(forge.pki.publicKeyToAsn1(keypair.publicKey)).getBytes();
            return forge.util.encode64(derPublicKey);
        }

        static getBase64PrivateKey(keypair) {
            // 개인 키를 DER 형식으로 변환
            const derPrivateKey = forge.asn1.toDer(forge.pki.privateKeyToAsn1(keypair.privateKey)).getBytes();
            return forge.util.encode64(derPrivateKey);
        }

        static getPublicKeyFromBase64(base64PublicKey) {
            // Base64 공개키를 DER 형식으로 변환
            const derPublicKey = forge.util.decode64(base64PublicKey);
            // DER 형식의 공개키에서 공개키 객체 생성
            return forge.pki.publicKeyFromAsn1(forge.asn1.fromDer(derPublicKey));
        }
        
        static getPrivateKeyFromBase64(base64PrivateKey) {
            // Base64 개인키를 DER 형식으로 변환
            const derPrivateKey = forge.util.decode64(base64PrivateKey);
            // DER 형식의 개인키에서 개인키 객체 생성
            return forge.pki.privateKeyFromAsn1(forge.asn1.fromDer(derPrivateKey));
        }
    };

    static encrypt(plainText, publicKey, padding) {
        let encryptedText = '';
        const buffer = forge.util.createBuffer(plainText, RsaCryptoUtil.CHARSET);
        const binaryString = buffer.getBytes();

        if ( padding === RsaCryptoUtil.RSA_ECB_PKCS1PADDING ) {
            encryptedText = forge.util.encode64(publicKey.encrypt(binaryString, 'RSAES-PKCS1-V1_5'));
        } else if ( padding === RsaCryptoUtil.RSA_ECB_OAEPPADDING ) {
            const encryptedBytes = publicKey.encrypt(binaryString, 'RSA-OAEP');
            encryptedText = forge.util.encode64(encryptedBytes);
        } else {
            throw new Error('Unsupported padding type');
        }

        return encryptedText;
    }

    static decrypt(encryptedText, privateKey, padding) {
        let decryptedText = '';
        const binaryData = forge.util.decode64(encryptedText);

        if ( padding === RsaCryptoUtil.RSA_ECB_PKCS1PADDING ) {
            decryptedText = privateKey.decrypt(binaryData, 'RSAES-PKCS1-V1_5');
        } else if ( padding === RsaCryptoUtil.RSA_ECB_OAEPPADDING ) {
            decryptedText = privateKey.decrypt(binaryData, 'RSA-OAEP');
        } else {
            throw new Error('Unsupported padding type');
        }

        return decryptedText;
    }
}

module.exports = RsaCryptoUtil;