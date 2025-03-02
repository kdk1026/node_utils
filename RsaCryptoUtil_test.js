const RsaCryptoUtil = require('./libs/RsaCryptoUtil');

// 키 페어 생성
const keypair = RsaCryptoUtil.Generate.generateKeyPair();

// Base64 인코딩된 공개 키와 개인 키
const base64PublicKey = RsaCryptoUtil.Convert.getBase64PublicKey(keypair);
const base64PrivateKey = RsaCryptoUtil.Convert.getBase64PrivateKey(keypair);

console.log('Public Key (Base64):', base64PublicKey);
console.log();
console.log('Private Key (Base64):', base64PrivateKey);
console.log();

// 공개 키와 개인 키 복원
const publicKey = RsaCryptoUtil.Convert.getPublicKeyFromBase64(base64PublicKey);
const privateKey = RsaCryptoUtil.Convert.getPrivateKeyFromBase64(base64PrivateKey);

// 메시지 암호화 및 복호화
const message = 'Hello, RSA!';
const encryptedMessage = RsaCryptoUtil.encrypt(message, publicKey, RsaCryptoUtil.RSA_ECB_PKCS1PADDING);
console.log('Encrypted Message:', encryptedMessage);

const decryptedMessage = RsaCryptoUtil.decrypt(encryptedMessage, privateKey, RsaCryptoUtil.RSA_ECB_PKCS1PADDING);
console.log('Decrypted Message:', decryptedMessage);
