import { Algorithm, convertKeyToString, decrypt, encrypt, generateAesKey } from "../../crypto/aes/aes-crypto-hex-util";

const test = () => {
    const aesKey = generateAesKey(256);
    const base64Key = convertKeyToString(aesKey);

    console.log(base64Key);

    const key = 'X95xa1p/479ak8sld5GEV+QGX9dGvJvrdVRGZDio4dY=';
    const obj = encrypt(Algorithm.AES_256_GCM, key, '야호');
    console.log(obj);

    const plainText = decrypt(Algorithm.AES_256_GCM, key, obj.iv, obj.cipherText, obj.authTag);
    console.log(plainText);
};

test();