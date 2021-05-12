const {ALGORITHM, aesEncrypt, aesDecrypt} = require("./libs/aescrypto");

function test() {

    const key = '6a70a3ef154d4ebf';
    // const key = '6a70a3ef154d4ebf89f76e28';
    // const key = '6a70a3ef154d4ebf89f76e2802f42456';

    let plainText = 'apple';

    let encrypt = aesEncrypt(key, ALGORITHM.AES_128_CBC, plainText);
    console.log( 'encrypt : ', encrypt );

    let decrypt = aesDecrypt(key, ALGORITHM.AES_128_CBC, encrypt);
    console.log( 'decrypt : ', decrypt );

}

test();