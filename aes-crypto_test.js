const { AES_ALGORITHM, generateAesKey, convertKeyToString, aesEncrypt, aesDecrypt } = require("./libs/aes-crypto");

const test = () => {
    const aesKey = generateAesKey(128);
    const base64Key = convertKeyToString(aesKey);

    console.log(base64Key);

    const key = 'h7W8nf6LseiX24XJROz2SA==';
    const obj = aesEncrypt(AES_ALGORITHM.AES_128_CBC, key, '야호');
    console.log(obj);

    const plainText = aesDecrypt(AES_ALGORITHM.AES_128_CBC, key, obj.iv, obj.encryptedText);
    console.log(plainText);
};

test();