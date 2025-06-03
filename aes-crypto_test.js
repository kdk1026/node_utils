const { generateAesKey, convertKeyToString, aesEncrypt, aesAlgorithm, aesDecrypt } = require("./crypto/aes-crypto-util");

const test = () => {
    const aesKey = generateAesKey(128);
    const base64Key = convertKeyToString(aesKey);

    console.log(base64Key);

    const key = 'h7W8nf6LseiX24XJROz2SA==';
    const obj = aesEncrypt(aesAlgorithm.AES_128_CBC, key, '야호');
    console.log(obj);

    const plainText = aesDecrypt(aesAlgorithm.AES_128_CBC, key, obj.iv, obj.encryptedText);
    console.log(plainText);
};

test();