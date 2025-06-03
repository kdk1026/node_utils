const digest = require('./crypto/digest-util');

function test() {
    let plainText = 'apple';

    console.log( digest.md5Hex(plainText) );
    console.log( digest.sha256Hex(plainText) );
    console.log( digest.sha512Hex(plainText) );
}

test();