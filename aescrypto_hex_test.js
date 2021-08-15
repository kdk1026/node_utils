const {aesEncrypt, aesDecrypt} = require("./libs/aescrypto_hex");

function test() {

    let plainText = 'apple';

    let encrypt = aesEncrypt(plainText);
    console.log( 'encrypt : ', encrypt );

    let decrypt = aesDecrypt(encrypt);
    console.log( 'decrypt : ', decrypt );

}

test();