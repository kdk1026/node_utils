import { md5Hex, sha256Hex, sha512Hex } from "../../crypto/digest-util";

function test() {
    let plainText = 'apple';

    console.log( 'MD5 :', md5Hex(plainText) );
    console.log( 'SHA256 :', sha256Hex(plainText) );
    console.log( 'SHA512 :', sha512Hex(plainText) );
}

test();