import { convertKeyToString, decrypt, encrypt, generateTripleDesKey } from "../../crypto/des/des-crypto-util";

const test = () => {
    const desKey = generateTripleDesKey();
    const base64Key = convertKeyToString(desKey);

    console.log(base64Key);

    const key = 'TViOF9Z9yc01E2LS7MP97//KBY1PxD6T';
    const obj = encrypt(key, null, '야호');
    console.log(obj);

    const plainText = decrypt(key, obj.iv, true, obj.cipherText);
    console.log(plainText);
};

test();